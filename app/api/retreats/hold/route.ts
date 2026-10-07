import { NextRequest, NextResponse } from 'next/server';
import { createInventoryHold } from '@/lib/inventory-hold';
import { getRoomByKey } from '@/lib/retreats-catalog';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { room_key, check_in, check_out, property_id } = body;

    if (!room_key || !check_in || !check_out) {
      return NextResponse.json(
        { success: false, error: 'room_key, check_in, and check_out are required.' },
        { status: 400 }
      );
    }

    const room = getRoomByKey(room_key);
    if (!room) {
      return NextResponse.json(
        { success: false, error: `Invalid room_key: ${room_key}` },
        { status: 404 }
      );
    }

    const candidatePropertyId = Number(property_id) || room.default_property_id;
    const holdResult = createInventoryHold(room_key, candidatePropertyId, check_in, check_out);

    if (!holdResult.success) {
      return NextResponse.json(
        { success: false, error: holdResult.message || 'Room is currently held by another guest.' },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      hold_token: holdResult.hold_token,
      expires_at: holdResult.expires_at,
      property_id: candidatePropertyId,
      message: '房间已为您临时锁定 10 分钟，请在此期间完成入住人填写与支付。',
    });
  } catch (error: any) {
    console.error('[POST /api/retreats/hold error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to hold room' },
      { status: 500 }
    );
  }
}
