import React from 'react';
import { notFound } from 'next/navigation';
import { Language } from '@/lib/i18n';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Language;

  if (lang !== 'en' && lang !== 'zh') {
    notFound();
  }

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-yojqi-ivory text-yojqi-ink">
        <Navbar lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
      </div>
    </CartProvider>
  );
}
