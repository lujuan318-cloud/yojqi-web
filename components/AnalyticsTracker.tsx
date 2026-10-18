'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function TrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedRef = useRef<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fullUrl = `${pathname}${searchParams ? `?${searchParams.toString()}` : ''}`;
    // Debounce duplicate tracking on same path
    if (lastTrackedRef.current === fullUrl) return;
    lastTrackedRef.current = fullUrl;

    const searchParamsObj: Record<string, string> = {};
    if (searchParams) {
      searchParams.forEach((val, key) => {
        searchParamsObj[key] = val;
      });
    }

    const payload = {
      path: pathname || '/',
      pageTitle: document.title || '',
      referrer: document.referrer || '',
      searchParams: searchParamsObj,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || '',
    };

    try {
      const dataStr = JSON.stringify(payload);
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([dataStr], { type: 'application/json' });
        navigator.sendBeacon('/api/analytics/track', blob);
      } else {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: dataStr,
          keepalive: true,
        }).catch(() => {});
      }
    } catch (e) {
      // Non-blocking, fail silently
    }
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerInner />
    </Suspense>
  );
}
