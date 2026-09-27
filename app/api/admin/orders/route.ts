import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, updateOrderFulfillment, getOrderByNumber } from '@/lib/admin-store';

export async function GET(req: NextRequest) {
  try {
    const orders = getAllOrders();
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching orders' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, orderStatus, carrier, carrierNameZh, carrierNameEn, trackingNumber, adminNotes } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const updated = updateOrderFulfillment(orderId, {
      orderStatus,
      carrier,
      carrierNameZh,
      carrierNameEn,
      trackingNumber,
      adminNotes,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating order' }, { status: 500 });
  }
}
