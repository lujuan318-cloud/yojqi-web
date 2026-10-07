import { NextRequest, NextResponse } from 'next/server';
import { queryAllRoomsAvailability, calculateRoomQuote } from '@/lib/retreats-pricing';
import { getRoomByKey } from '@/lib/retreats-catalog';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const checkIn = searchParams.get('check_in');
    const checkOut = searchParams.get('check_out');
    const guests = parseInt(searchParams.get('guests') || '2', 10);
    const roomKey = searchParams.get('room_key');

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { success: false, error: 'Check-in and check-out dates are required (format YYYY-MM-DD).' },
        { status: 400 }
      );
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        { success: false, error: 'Check-out date must be after check-in date.' },
        { status: 400 }
      );
    }

    // Specific single room request
    if (roomKey) {
      const room = getRoomByKey(roomKey);
      if (!room) {
        return NextResponse.json(
          { success: false, error: `Room key not found: ${roomKey}` },
          { status: 404 }
        );
      }
      const quote = await calculateRoomQuote(room, checkIn, checkOut);
      return NextResponse.json({
        success: true,
        data: quote,
      });
    }

    // All available rooms
    const quotes = await queryAllRoomsAvailability(checkIn, checkOut, guests);

    return NextResponse.json({
      success: true,
      check_in: checkIn,
      check_out: checkOut,
      guests,
      data: quotes,
      total: quotes.length,
    });
  } catch (error: any) {
    console.error('[GET /api/retreats/availability error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to query availability' },
      { status: 500 }
    );
  }
}
