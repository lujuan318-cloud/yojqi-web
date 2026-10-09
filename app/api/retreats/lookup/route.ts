import { NextRequest, NextResponse } from 'next/server';
import { getHostexReservation } from '@/lib/hostex-pms';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservation_code, guest_phone } = body;

    if (!reservation_code) {
      return NextResponse.json(
        { success: false, error: '请输入预订确认码 (Reservation Code)' },
        { status: 400 }
      );
    }

    const reservation = await getHostexReservation(reservation_code);
    if (!reservation) {
      return NextResponse.json(
        { success: false, error: '未查找到该预订记录，请核对预订码。' },
        { status: 404 }
      );
    }

    // Verify phone if supplied
    if (guest_phone && reservation.guest_phone) {
      const cleanInput = guest_phone.replace(/\D/g, '');
      const cleanTarget = reservation.guest_phone.replace(/\D/g, '');
      if (
        cleanInput &&
        cleanTarget &&
        !cleanTarget.endsWith(cleanInput.slice(-4)) &&
        !cleanInput.endsWith(cleanTarget.slice(-4))
      ) {
        return NextResponse.json(
          { success: false, error: '手机号核验不一致，请核对预订人联系电话。' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      reservation: {
        code: reservation.reservation_code || reservation.stay_code || reservation_code,
        status: reservation.status, // 'confirmed', 'cancelled', 'checked_in', etc.
        guest_name: reservation.guest_name,
        guest_phone: reservation.guest_phone,
        check_in_date: reservation.check_in_date,
        check_out_date: reservation.check_out_date,
        total_amount: reservation.rate_amount || reservation.received_amount || 0,
        currency: reservation.currency || 'CNY',
        property_id: reservation.property_id,
        remarks: reservation.remarks,
      },
    });
  } catch (error: any) {
    console.error('[POST /api/retreats/lookup error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Lookup failed' },
      { status: 500 }
    );
  }
}
