import { NextRequest, NextResponse } from 'next/server';
import {
  cancelHostexReservation,
  getHostexReservation,
  notifyWeComCancellation,
} from '@/lib/hostex-pms';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservation_code, guest_phone, reason = '客人官网自主申请取消' } = body;

    if (!reservation_code) {
      return NextResponse.json(
        { success: false, error: '缺少预订确认码 (reservation_code)。' },
        { status: 400 }
      );
    }

    // 1. Fetch live reservation from Hostex to verify & retrieve details
    const existing = await getHostexReservation(reservation_code);

    // If existing reservation found, verify phone number (last 4 digits match or empty)
    if (existing && guest_phone) {
      const cleanInput = guest_phone.replace(/\D/g, '');
      const existingPhone = (existing.guest_phone || '').replace(/\D/g, '');
      if (
        cleanInput &&
        existingPhone &&
        !existingPhone.endsWith(cleanInput.slice(-4)) &&
        !cleanInput.endsWith(existingPhone.slice(-4))
      ) {
        return NextResponse.json(
          { success: false, error: '预订人手机号核验不符，请核对后重试。' },
          { status: 403 }
        );
      }
    }

    if (existing && existing.status === 'cancelled') {
      return NextResponse.json({
        success: true,
        already_cancelled: true,
        reservation_code,
        message: '该订单此前已取消，房源已在各大渠道开房。',
      });
    }

    // 2. Call Hostex OpenAPI v3 to cancel the reservation & reopen rooms across OTAs
    const cancelRes = await cancelHostexReservation(reservation_code, reason);

    if (!cancelRes.success) {
      return NextResponse.json(
        { success: false, error: cancelRes.error_msg || '百居易取消预订失败，请联系管家协助。' },
        { status: 500 }
      );
    }

    // 3. Notify Operations WeCom Bot
    await notifyWeComCancellation({
      reservation_code,
      guest_name: existing?.guest_name || '官网客人',
      guest_phone: guest_phone || existing?.guest_phone || '',
      room_name: existing?.listing_name || existing?.room_type_name || '白虹江景宿集',
      check_in: existing?.check_in_date || '',
      check_out: existing?.check_out_date || '',
      total_amount: existing?.rate_amount || existing?.received_amount || 0,
      reason,
    });

    return NextResponse.json({
      success: true,
      reservation_code,
      message: '预订已成功取消。百居易房态已秒级释放，全网OTA库存已恢复开房。如有已支付款项，专属管家将与您联系办理原路退还。',
    });
  } catch (error: any) {
    console.error('[POST /api/retreats/cancel error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Cancellation request failed' },
      { status: 500 }
    );
  }
}
