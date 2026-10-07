import { NextResponse } from 'next/server';
import { getRoomCatalog } from '@/lib/retreats-catalog';

export async function GET() {
  try {
    const catalog = getRoomCatalog();
    return NextResponse.json({
      success: true,
      data: catalog,
      total: catalog.length,
    });
  } catch (error: any) {
    console.error('[GET /api/retreats/rooms error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch room catalog' },
      { status: 500 }
    );
  }
}
