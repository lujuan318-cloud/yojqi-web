import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/admin-store';

export async function GET(req: NextRequest) {
  try {
    const analytics = getAnalyticsSummary();
    return NextResponse.json({ success: true, analytics });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching analytics' }, { status: 500 });
  }
}
