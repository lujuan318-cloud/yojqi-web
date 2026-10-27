import { NextRequest, NextResponse } from 'next/server';
import { recordLiveEvent } from '@/lib/analytics-tracker';

export async function POST(req: NextRequest) {
  try {
    let payload: any = {};
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      payload = await req.json().catch(() => ({}));
    } else {
      // Beacon / text plain
      const raw = await req.text().catch(() => '');
      if (raw) {
        try {
          payload = JSON.parse(raw);
        } catch {
          payload = {};
        }
      }
    }

    // Extract headers
    const userAgent = req.headers.get('user-agent') || '';
    const headerReferrer = req.headers.get('referer') || '';
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || '';
    const country = req.headers.get('cf-ipcountry') || req.headers.get('x-vercel-ip-country') || 'China';
    const city = req.headers.get('cf-ipcity') || req.headers.get('x-vercel-ip-city') || 'Chongqing';

    // 1. Exclude Admin & API paths
    const reqPath = payload.path || '/';
    if (reqPath.includes('/admin') || reqPath.startsWith('/api') || reqPath.includes('/_next')) {
      return NextResponse.json({ success: true, ignored: 'admin_path' });
    }

    // 2. Exclude Internal staff & Admin sessions
    const isInternalCookie = req.cookies.get('yojqi_is_internal')?.value === '1' || !!req.cookies.get('yojqi_admin_auth');
    if (isInternalCookie || payload.isInternal) {
      return NextResponse.json({ success: true, ignored: 'internal_staff' });
    }

    // 3. Exclude Localhost & Internal IPs
    const isLocalhost = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp === '::ffff:127.0.0.1';
    if (isLocalhost) {
      return NextResponse.json({ success: true, ignored: 'localhost' });
    }

    // 4. Exclude automated crawlers, test tools & headless bots
    const uaLower = userAgent.toLowerCase();
    const isBot = /bot|spider|crawl|lighthouse|headless|python-requests|node-fetch|postman/i.test(uaLower);
    if (isBot) {
      return NextResponse.json({ success: true, ignored: 'crawler_or_bot' });
    }

    // Cookie visitor ID
    const cookieVid = req.cookies.get('yojqi_vid')?.value;
    const isNewVisitor = !cookieVid;
    const visitorId: string = cookieVid || payload.visitorId || `vid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const event = recordLiveEvent({
      path: payload.path || '/',
      pageTitle: payload.pageTitle,
      referrer: payload.referrer || headerReferrer,
      searchParams: payload.searchParams,
      userAgent,
      visitorId,
      ip: clientIp,
      city,
      country,
    });

    const res = NextResponse.json({ success: true, eventId: event.id });

    // Set persistent 1-year visitor tracking cookie
    if (isNewVisitor) {
      res.cookies.set('yojqi_vid', visitorId, {
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
      });
    }

    return res;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
