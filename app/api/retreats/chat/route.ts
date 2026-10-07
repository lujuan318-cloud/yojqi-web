import { NextRequest, NextResponse } from 'next/server';
import { askOpenAIConcierge } from '@/lib/hostex-pms';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], lang = 'zh' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message content is required.' },
        { status: 400 }
      );
    }

    const reply = await askOpenAIConcierge(message, history, lang === 'en' ? 'en' : 'zh');

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error: any) {
    console.error('[POST /api/retreats/chat error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'AI concierge error' },
      { status: 500 }
    );
  }
}
