import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { validateInventoryHold } from '@/lib/inventory-hold';
import { calculateRoomQuote } from '@/lib/retreats-pricing';
import { getRoomByKey } from '@/lib/retreats-catalog';

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

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // 3. If Stripe key is configured, create live Stripe Checkout Session
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
              unit_amount: Math.round(quote.total_amount * 100), // in cents
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
      });
    }

    // 4. Test / Preview Mode (Graceful instant confirmation)
    // When Stripe is not set in local dev, provide direct checkout confirmation endpoint
    const mockOrderReference = `YQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      mode: 'preview_direct',
      preview_confirm_url: `${appUrl}/api/retreats/confirm`,
      order_data: {
        order_reference: mockOrderReference,
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
      },
      message: '测试/直连模式：金额已校验，可直接提交正式确认。',
    });
  } catch (error: any) {
    console.error('[POST /api/retreats/checkout error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Checkout creation failed' },
      { status: 500 }
    );
  }
}
