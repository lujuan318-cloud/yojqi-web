import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { validateInventoryHold } from '@/lib/inventory-hold';
import { calculateRoomQuote } from '@/lib/retreats-pricing';
import { getRoomByKey } from '@/lib/retreats-catalog';
import {
  getDirectAccountDetails,
  generateBookingReference,
} from '@/lib/payment-channels';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      room_key,
      check_in,
      check_out,
      hold_token,
      guest_name,
      guest_phone,
      guest_email,
      special_requests = '',
      estimated_arrival_time = '15:00',
      currency = 'cny',
      lang = 'zh',
      payment_channel = 'alipay',
    } = body;

    if (!room_key || !check_in || !check_out || !guest_name || !guest_phone) {
      return NextResponse.json(
        { success: false, error: '必填信息缺失（房型、入离日期、宾客姓名、联系电话为必填）。' },
        { status: 400 }
      );
    }

    const room = getRoomByKey(room_key);
    if (!room) {
      return NextResponse.json(
        { success: false, error: `Invalid room key: ${room_key}` },
        { status: 404 }
      );
    }

    // 1. Validate 10-minute hold if provided
    if (hold_token) {
      const holdValidation = validateInventoryHold(hold_token, room_key, check_in, check_out);
      if (!holdValidation.valid) {
        return NextResponse.json(
          { success: false, error: holdValidation.message || '临时锁房已过期，请重新选房。' },
          { status: 410 }
        );
      }
    }

    // 2. Final dynamic rate & availability check
    const quote = await calculateRoomQuote(room, check_in, check_out);
    if (!quote.available && quote.status === 'sold_out') {
      return NextResponse.json(
        { success: false, error: '该房型在您选择的日期区间已售罄，请选择其他房型或日期。' },
        { status: 409 }
      );
    }

    const accounts = getDirectAccountDetails();
    const reference = generateBookingReference(payment_channel as any);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // 3. User's Direct Payment Channel Handling (Alipay, PayPal, Wise)
    if (payment_channel === 'alipay') {
      return NextResponse.json({
        success: true,
        mode: 'direct_alipay',
        payment_reference: reference,
        account_details: accounts.alipay,
        order_summary: {
          room_key: quote.room_key,
          room_name: lang === 'zh' ? quote.nameZh : quote.nameEn,
          check_in,
          check_out,
          nights: quote.nights,
          total_amount: quote.total_amount,
          currency: quote.currency,
        },
      });
    }

    if (payment_channel === 'paypal') {
      const payPalAmountUrl = `${accounts.paypal.payPalMeUrl}/${quote.total_amount}CNY`;
      return NextResponse.json({
        success: true,
        mode: 'direct_paypal',
        payment_reference: reference,
        pay_url: payPalAmountUrl,
        account_details: accounts.paypal,
        order_summary: {
          room_key: quote.room_key,
          room_name: lang === 'zh' ? quote.nameZh : quote.nameEn,
          check_in,
          check_out,
          nights: quote.nights,
          total_amount: quote.total_amount,
          currency: quote.currency,
        },
      });
    }

    if (payment_channel === 'wise') {
      return NextResponse.json({
        success: true,
        mode: 'direct_wise',
        payment_reference: reference,
        account_details: accounts.wise,
        order_summary: {
          room_key: quote.room_key,
          room_name: lang === 'zh' ? quote.nameZh : quote.nameEn,
          check_in,
          check_out,
          nights: quote.nights,
          total_amount: quote.total_amount,
          currency: quote.currency,
        },
      });
    }

    // 4. International Credit Card (Stripe)
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey) {
      const stripe = new Stripe(stripeKey, {
        apiVersion: '2025-02-24.acacia' as any,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: lang === 'zh' ? `${quote.nameZh} (${quote.nights}晚)` : `${quote.nameEn} (${quote.nights} Nights)`,
                description: `${check_in} 至 ${check_out} · ${quote.bedInfoZh}`,
                images: quote.coverImage ? [quote.coverImage] : [],
              },
              unit_amount: Math.round(quote.total_amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        metadata: {
          order_type: 'STAY',
          room_key: quote.room_key,
          room_name_cn: quote.nameZh,
          room_name_en: quote.nameEn,
          property_id: String(quote.assigned_property_id),
          check_in,
          check_out,
          nights: String(quote.nights),
          guest_name,
          guest_phone,
          guest_email: guest_email || '',
          total_amount: String(quote.total_amount),
          currency: quote.currency,
          hold_token: hold_token || '',
          special_requests,
          arrival_time: estimated_arrival_time,
          payment_channel: 'stripe',
          payment_reference: reference,
          lang,
        },
        success_url: `${appUrl}/${lang}/retreats/booking-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/${lang}/retreats/${room.slug}`,
        locale: lang === 'zh' ? 'zh' : 'en',
      });

      return NextResponse.json({
        success: true,
        mode: 'stripe',
        url: session.url,
        session_id: session.id,
        payment_reference: reference,
      });
    }

    // Fallback: Preview direct confirmation mode
    return NextResponse.json({
      success: true,
      mode: 'preview_direct',
      payment_reference: reference,
      preview_confirm_url: `${appUrl}/api/retreats/confirm`,
      order_data: {
        order_reference: reference,
        room_key: quote.room_key,
        room_name_cn: quote.nameZh,
        room_name_en: quote.nameEn,
        property_id: quote.assigned_property_id,
        check_in,
        check_out,
        nights: quote.nights,
        guest_name,
        guest_phone,
        guest_email,
        total_amount: quote.total_amount,
        currency: quote.currency,
        hold_token,
        special_requests,
        estimated_arrival_time,
        payment_channel,
      },
    });
  } catch (error: any) {
    console.error('[POST /api/retreats/checkout error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Checkout creation failed' },
      { status: 500 }
    );
  }
}
