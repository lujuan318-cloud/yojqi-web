import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { lang } = await params;
  const { session_id } = await searchParams;
  const currentLang = lang as Language;
  const dict = getDictionary(currentLang);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-medium text-emerald-700 uppercase tracking-widest">
          {currentLang === 'zh' ? '支付已完成' : 'Payment Confirmed'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading">
          {currentLang === 'zh' ? '感谢您选择 YOJQI' : 'Thank You for Your Order'}
        </h1>
        <p className="text-sm text-yojqi-body max-w-md mx-auto leading-relaxed">
          {currentLang === 'zh'
            ? '您的专属香丸随身物件已进入出库仪式准备程序。我们将通过邮件发送实时国际运单追踪编号。'
            : 'Your wearable somatic anchors are now entering dispatch ceremony preparation. Tracking details have been dispatched to your email.'}
        </p>
      </div>

      {session_id && (
        <div className="inline-block p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-500">
          Session ID: {session_id.slice(0, 16)}...
        </div>
      )}

      <div className="pt-6">
        <Link
          href={`/${lang}/shop`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl yojqi-btn-primary text-xs font-medium"
        >
          <span>{dict.shop.continueShopping}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
