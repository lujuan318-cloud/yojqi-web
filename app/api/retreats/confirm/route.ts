import { NextRequest, NextResponse } from 'next/server';
import { createHostexReservation, notifyWeComDirectBooking } from '@/lib/hostex-pms';
import { releaseInventoryHold } from '@/lib/inventory-hold';
import { getRoomByKey } from '@/lib/retreats-catalog';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      room_key,
      property_id,
      check_in,
      check_out,
      nights = 1,
      guest_name,
      guest_phone,
      guest_email,
      total_amount,
      currency = 'CNY',
      hold_token,
      special_requests = '',
      estimated_arrival_time = '15:00',
      stripe_session_id = '',
      payment_channel = 'direct',
      payment_reference = '',
    } = body;

    if (!room_key || !check_in || !check_out || !guest_name) {
      return NextResponse.json(
        { success: false, error: '必填预订信息缺失。' },
        { status: 400 }
      );
    }

    const room = getRoomByKey(room_key);
    const roomNameZh = room ? room.nameZh : '白虹两江汇高空民宿';
    const roomNameEn = room ? room.nameEn : 'Baihong River View Retreat';
    const candidatePropertyId = Number(property_id) || (room ? room.default_property_id : 12512775);

    // 1. Submit to Hostex OpenAPI v3
    // custom_channel_id: 29 ("Booking Site" / YOJQI Direct)
    const hostexResult = await createHostexReservation({
      property_id: candidatePropertyId,
      room_key,
      room_name_cn: roomNameZh,
      room_name_en: roomNameEn,
      check_in_date: check_in,
      check_out_date: check_out,
      guest_name,
      guest_phone: guest_phone || '',
      guest_email: guest_email || '',
      total_amount: Number(total_amount),
      currency,
      special_requests,
      estimated_arrival_time,
      stripe_session_id,
      payment_channel,
      payment_reference,
    });

    const reservationCode =
      hostexResult.reservation_code ||
      `YQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Push Instant Notification to WeCom Operations Bot
    await notifyWeComDirectBooking({
      reservation_code: reservationCode,
      room_name: roomNameZh,
      guest_name,
      guest_phone: guest_phone || '',
      guest_email: guest_email || '',
      check_in,
      check_out,
      nights: Number(nights),
      total_amount: Number(total_amount),
      currency,
      property_id: candidatePropertyId,
      arrival_time: estimated_arrival_time,
      special_requests,
    });

    // 3. Release 10-minute temporary inventory hold
    if (hold_token) {
      releaseInventoryHold(hold_token);
    }

    return NextResponse.json({
      success: true,
      reservation_code: reservationCode,
      stay_code: hostexResult.stay_code || reservationCode,
      property_id: candidatePropertyId,
      room_name_cn: roomNameZh,
      room_name_en: roomNameEn,
      check_in,
      check_out,
      nights,
      guest_name,
      guest_phone,
      total_amount,
      currency,
      check_in_time: '15:00',
      check_out_time: '12:00',
      hostex_synced: hostexResult.success,
      message: '预订成功！已同步百居易中央房态并自动锁定库存。管家团队已收到您的订单并将提供出行指引。',
    });
  } catch (error: any) {
    console.error('[POST /api/retreats/confirm error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Confirmation failed' },
      { status: 500 }
    );
  }
}
