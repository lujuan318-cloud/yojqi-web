import { NextRequest, NextResponse } from 'next/server';
import { getOrderByEmailAndNumber, getOrderByNumber } from '@/lib/admin-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, email } = body;

    if (!orderNumber) {
      return NextResponse.json({ error: 'Order Number is required' }, { status: 400 });
    }

    let order = email
      ? getOrderByEmailAndNumber(orderNumber, email)
      : getOrderByNumber(orderNumber);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found. Please check your Order Number and Email address.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error tracking order' }, { status: 500 });
  }
}
