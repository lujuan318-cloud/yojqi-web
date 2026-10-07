import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createHostexReservation, notifyWeComDirectBooking } from '@/lib/hostex-pms';
import { releaseInventoryHold } from '@/lib/inventory-hold';

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey) {
    return NextResponse.json({ received: true, note: 'Stripe secret not configured' });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2025-02-24.acacia' as any,
  });

  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } else {
      // In development / testing without secret header verification
      event = JSON.parse(payload) as Stripe.Event;
    }
  } catch (err: any) {
    console.error('[Stripe Webhook Signature Verification Failed]:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};

      // Homestay Direct Booking Flow
      if (metadata.order_type === 'STAY') {
        const candidatePropertyId = Number(metadata.property_id) || 12512775;

        // 1. Synchronize to Hostex OpenAPI v3 to auto-lock inventory and close OTA
        const hostexResult = await createHostexReservation({
          property_id: candidatePropertyId,
          room_key: metadata.room_key || 'balcony_king_b',
          room_name_cn: metadata.room_name_cn || '白虹全江景阳台大床房',
          room_name_en: metadata.room_name_en || 'Baihong Balcony King Room',
          check_in_date: metadata.check_in || '',
          check_out_date: metadata.check_out || '',
          guest_name: metadata.guest_name || '官网直订贵宾',
          guest_phone: metadata.guest_phone || '',
          guest_email: metadata.guest_email || session.customer_details?.email || '',
          total_amount: Number(metadata.total_amount || 0),
          currency: metadata.currency || 'CNY',
          special_requests: metadata.special_requests || '',
          estimated_arrival_time: metadata.arrival_time || '15:00',
          stripe_session_id: session.id,
        });

        const reservationCode =
          hostexResult.reservation_code ||
          `YQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

        // 2. Alert operations team on WeChat Work bot
        await notifyWeComDirectBooking({
          reservation_code: reservationCode,
          room_name: metadata.room_name_cn || '白虹全江景阳台大床房',
          guest_name: metadata.guest_name || '官网直订贵宾',
          guest_phone: metadata.guest_phone || '',
          guest_email: metadata.guest_email || session.customer_details?.email || '',
          check_in: metadata.check_in || '',
          check_out: metadata.check_out || '',
          nights: Number(metadata.nights || 1),
          total_amount: Number(metadata.total_amount || 0),
          currency: metadata.currency || 'CNY',
          property_id: candidatePropertyId,
          arrival_time: metadata.arrival_time || '15:00',
          special_requests: metadata.special_requests || '',
        });

        // 3. Release temporary hold
        if (metadata.hold_token) {
          releaseInventoryHold(metadata.hold_token);
        }

        console.log(`[Stripe Webhook] STAY order confirmed & Hostex locked: ${reservationCode}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Stripe Webhook Handler Error]:', error);
    return NextResponse.json({ error: error.message || 'Webhook processing failed' }, { status: 500 });
  }
}
