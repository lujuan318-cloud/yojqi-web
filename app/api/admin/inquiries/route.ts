import { NextRequest, NextResponse } from 'next/server';
import { getAllInquiries, updateInquiryStatus } from '@/lib/admin-store';

export async function GET(req: NextRequest) {
  try {
    const inquiries = getAllInquiries();
    return NextResponse.json({ success: true, inquiries });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching inquiries' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { inquiryId, status, staffNotes } = body;

    if (!inquiryId || !status) {
      return NextResponse.json({ error: 'Inquiry ID and status are required' }, { status: 400 });
    }

    const updated = updateInquiryStatus(inquiryId, status, staffNotes);
    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating inquiry' }, { status: 500 });
  }
}
