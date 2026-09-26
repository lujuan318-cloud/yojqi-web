'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Globe, Sparkles } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { useCart } from '@/context/CartContext';
import { CartDrawer } from './CartDrawer';

interface NavbarProps {
  lang: Language;
}

export function Navbar({ lang }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, totalCount } = useCart();
  const pathname = usePathname();
  const dict = getDictionary(lang);

  // Compute opposite language route
  const targetLang = lang === 'en' ? 'zh' : 'en';
  const switchedPath = pathname.replace(`/${lang}`, `/${targetLang}`) || `/${targetLang}`;

  const navLinks = [
    { href: `/${lang}/shop`, label: dict.nav.shop },
    { href: `/${lang}/retreats`, label: dict.nav.retreats, highlight: true },
    { href: `/${lang}/wisdom`, label: dict.nav.wisdom },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#fffdfa]/95 backdrop-blur-md border-b border-yojqi-border">
        {/* Subtle top notification banner */}
        <div className="bg-yojqi-ink text-[#fffdfa] text-xs py-1.5 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>
            {lang === 'zh'
              ? '重庆两江汇无人机机位江景公寓现已开放预约 · 全球多币种安全配送'
              : 'Chongqing Two-Rivers Drone Show Apartments Now Open for VIP Reservations'}
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href={`/${lang}`} className="flex flex-col group">
                <span className="font-serif text-3xl font-semibold tracking-widest text-yojqi-ink group-hover:text-yojqi-bronze transition-colors">
                  YOJQI
                </span>
                <span className="text-[10px] tracking-widest text-yojqi-body uppercase -mt-1 font-mono">
                  {dict.nav.tagline}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm tracking-wide font-medium transition-colors py-2 ${
                      isActive
                        ? 'text-yojqi-ink font-semibold'
                        : 'text-yojqi-body hover:text-yojqi-ink'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.highlight && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono rounded bg-amber-100 text-amber-900 border border-amber-200">
                        {lang === 'zh' ? '两江机位' : 'Skyline'}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-yojqi-bronze rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <Link
                href={switchedPath}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-yojqi-border text-xs font-medium text-yojqi-body hover:text-yojqi-ink hover:border-yojqi-bronze transition-colors"
                title={lang === 'en' ? '切换到中文' : 'Switch to English'}
              >
                <Globe className="w-3.5 h-3.5 text-yojqi-bronze" />
                <span>{dict.nav.switchLang}</span>
              </Link>

              {/* Shopping Bag Button */}
              <button
                onClick={openCart}
                className="relative p-2 text-yojqi-ink hover:text-yojqi-bronze transition-colors"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-6 h-6 stroke-[1.6]" />
                {totalCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-yojqi-ink text-[#fffdfa] text-[10px] font-bold flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 md:hidden text-yojqi-ink hover:text-yojqi-bronze"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-yojqi-border bg-[#fffdfa] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-base text-yojqi-ink border-b border-neutral-100"
              >
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-900 font-mono">
                    {lang === 'zh' ? '无人机机位' : 'Skyline View'}
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href={switchedPath}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-sm text-yojqi-bronze font-medium"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'en' ? '切换至中文界面 (Switch to ZH)' : 'Switch to English (切换至英文)'}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer lang={lang} />
    </>
  );
}
