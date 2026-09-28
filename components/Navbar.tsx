'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Menu,
  X,
  Globe,
  Sparkles,
  Shield,
  Search,
  User,
  Compass,
  Calendar,
  Sparkle,
  Users,
  Store,
  Headphones,
  Bot,
  MapPin,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { useCart } from '@/context/CartContext';
import { CartDrawer } from './CartDrawer';
import { CurrencySelector } from './CurrencySelector';
import { SearchModal } from './SearchModal';

interface NavbarProps {
  lang: Language;
}

export function Navbar({ lang }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart, totalCount } = useCart();
  const pathname = usePathname();
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  // Compute opposite language route
  const targetLang = lang === 'en' ? 'zh' : 'en';
  const switchedPath = pathname.replace(`/${lang}`, `/${targetLang}`) || `/${targetLang}`;

  // V2 Top-Level Navigation Architecture
  const primaryNavLinks = [
    { href: `/${lang}`, label: dict.nav.discover || 'Discover', exact: true },
    { href: `/${lang}/today`, label: dict.nav.today || 'Today', exact: false },
    { href: `/${lang}/journey`, label: dict.nav.journey || 'Journey', exact: false },
    { href: `/${lang}/friends`, label: dict.nav.friends || 'Friends', exact: false },
    { href: `/${lang}/shop`, label: dict.nav.shop || 'Shop', exact: false },
  ];

  const secondaryPillars = [
    { href: `/${lang}/talismans`, label: dict.nav.talismans, icon: Flame, badge: isZh ? '朱砂开光' : 'Sealed' },
    { href: `/${lang}/retreats`, label: dict.nav.retreats, icon: MapPin, badge: isZh ? '两江机位' : 'Skyline' },
    { href: `/${lang}/listen`, label: dict.nav.listen || 'Listening Room', icon: Headphones },
    { href: `/${lang}/companion`, label: dict.nav.companion || 'Companion', icon: Bot },
  ];

  const isLinkActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href || pathname === `${href}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#fffdfa]/95 backdrop-blur-md border-b border-yojqi-border">
        {/* Subtle top notification & discovery banner */}
        <div className="bg-yojqi-ink text-[#fffdfa] text-xs py-1.5 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="truncate max-w-xl">
            {isZh
              ? 'YOJQI V2 东方身心空间全新升级 · 探索个人身心旅程与重庆天幕宿集'
              : 'YOJQI V2 Eastern Wellness Platform · Begin Your Personalized Journey Today'}
          </span>
          <Link
            href={`/${lang}/today`}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-white underline underline-offset-2 ml-1"
          >
            <span>{isZh ? '进入今日空间' : 'Enter Today'}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
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

            {/* Desktop Navigation (V2 Standard: DISCOVER | TODAY | JOURNEY | FRIENDS | SHOP) */}
            <nav className="hidden lg:flex items-center space-x-8">
              {primaryNavLinks.map((link) => {
                const active = isLinkActive(link.href, link.exact);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-widest font-medium transition-colors py-2 flex items-center gap-1.5 ${
                      active
                        ? 'text-yojqi-ink font-semibold'
                        : 'text-yojqi-body hover:text-yojqi-ink'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-yojqi-bronze rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Fast Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-yojqi-body hover:text-yojqi-ink transition-colors"
                aria-label="Search"
                title="Search (Cmd+K)"
              >
                <Search className="w-5 h-5 stroke-[1.6]" />
              </button>

              {/* Multi-Currency Selector */}
              <CurrencySelector lang={lang} />

              {/* Language Switcher */}
              <Link
                href={switchedPath}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-yojqi-border text-xs font-medium text-yojqi-body hover:text-yojqi-ink hover:border-yojqi-bronze transition-colors"
                title={lang === 'en' ? '切换到中文' : 'Switch to English'}
              >
                <Globe className="w-3.5 h-3.5 text-yojqi-bronze" />
                <span>{dict.nav.switchLang}</span>
              </Link>

              {/* Account / User Portal */}
              <Link
                href={`/${lang}/account`}
                className={`p-2 transition-colors ${
                  pathname.includes('/account') ? 'text-yojqi-bronze' : 'text-yojqi-body hover:text-yojqi-ink'
                }`}
                aria-label="Account"
                title={dict.nav.account}
              >
                <User className="w-5 h-5 stroke-[1.6]" />
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
                className="p-2 lg:hidden text-yojqi-ink hover:text-yojqi-bronze"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-yojqi-border bg-[#fffdfa] px-4 pt-3 pb-8 space-y-4 animate-in slide-in-from-top-2 shadow-lg">
            <button
              onClick={() => {
                setSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between py-2.5 px-3 bg-neutral-50 rounded-xl text-xs text-yojqi-body border border-neutral-100"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-yojqi-bronze" />
                <span>{isZh ? '搜索身心状态、仪式、符咒与选品...' : 'Search states, rituals, products...'}</span>
              </span>
              <span className="font-mono text-[10px] text-neutral-400">⌘K</span>
            </button>

            {/* V2 Primary Items */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block px-2">
                {isZh ? '核心旅程空间' : 'Core Journey Space'}
              </span>
              {primaryNavLinks.map((link) => {
                const active = isLinkActive(link.href, link.exact);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2 px-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active ? 'bg-yojqi-lift text-yojqi-ink font-semibold' : 'text-yojqi-body hover:bg-neutral-50'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Complementary Sanctuaries & Features */}
            <div className="pt-2 border-t border-yojqi-border space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block px-2">
                {isZh ? '特色实体与空间' : 'Featured Sanctuaries'}
              </span>
              {secondaryPillars.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg text-sm text-yojqi-body hover:bg-neutral-50"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-amber-700" />
                      <span>{item.label}</span>
                    </span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-amber-100 text-amber-900 border border-amber-200">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Account & Direct Links */}
            <div className="pt-2 border-t border-yojqi-border flex flex-col gap-2 text-xs text-neutral-500">
              <Link
                href={`/${lang}/account`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-1.5 px-2 hover:text-yojqi-bronze"
              >
                <User className="w-4 h-4 text-yojqi-bronze" />
                <span>{dict.nav.account}</span>
              </Link>
              <Link
                href={`/${lang}/track-order`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-1.5 px-2 hover:text-yojqi-bronze"
              >
                <span>📦 {dict.nav.trackOrder}</span>
              </Link>
              <Link
                href={switchedPath}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-1.5 px-2 text-yojqi-bronze font-medium"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'en' ? '切换至中文界面 (Switch to ZH)' : 'Switch to English (切换至英文)'}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE THUMB-FRIENDLY BOTTOM NAVIGATION BAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fffdfa]/95 backdrop-blur-md border-t border-yojqi-border px-2 py-2 flex items-center justify-around shadow-lg">
        <Link
          href={`/${lang}`}
          className={`flex flex-col items-center gap-0.5 text-[10px] py-1 px-2 rounded-lg transition-colors ${
            pathname === `/${lang}` || pathname === `/${lang}/`
              ? 'text-yojqi-ink font-semibold'
              : 'text-yojqi-body hover:text-yojqi-ink'
          }`}
        >
          <Compass className="w-5 h-5 stroke-[1.6]" />
          <span>{dict.nav.discover || 'Discover'}</span>
        </Link>

        <Link
          href={`/${lang}/today`}
          className={`flex flex-col items-center gap-0.5 text-[10px] py-1 px-2 rounded-lg transition-colors ${
            pathname.startsWith(`/${lang}/today`)
              ? 'text-yojqi-ink font-semibold'
              : 'text-yojqi-body hover:text-yojqi-ink'
          }`}
        >
          <Calendar className="w-5 h-5 stroke-[1.6]" />
          <span>{dict.nav.today || 'Today'}</span>
        </Link>

        <Link
          href={`/${lang}/journey`}
          className={`flex flex-col items-center gap-0.5 text-[10px] py-1 px-2 rounded-lg transition-colors ${
            pathname.startsWith(`/${lang}/journey`)
              ? 'text-yojqi-ink font-semibold'
              : 'text-yojqi-body hover:text-yojqi-ink'
          }`}
        >
          <Sparkle className="w-5 h-5 stroke-[1.6]" />
          <span>{dict.nav.journey || 'Journey'}</span>
        </Link>

        <Link
          href={`/${lang}/friends`}
          className={`flex flex-col items-center gap-0.5 text-[10px] py-1 px-2 rounded-lg transition-colors ${
            pathname.startsWith(`/${lang}/friends`)
              ? 'text-yojqi-ink font-semibold'
              : 'text-yojqi-body hover:text-yojqi-ink'
          }`}
        >
          <Users className="w-5 h-5 stroke-[1.6]" />
          <span>{dict.nav.friends || 'Friends'}</span>
        </Link>

        <Link
          href={`/${lang}/shop`}
          className={`flex flex-col items-center gap-0.5 text-[10px] py-1 px-2 rounded-lg transition-colors ${
            pathname.startsWith(`/${lang}/shop`)
              ? 'text-yojqi-ink font-semibold'
              : 'text-yojqi-body hover:text-yojqi-ink'
          }`}
        >
          <Store className="w-5 h-5 stroke-[1.6]" />
          <span>{dict.nav.shop || 'Shop'}</span>
        </Link>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer lang={lang} />

      {/* Fast Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        lang={lang}
      />
    </>
  );
}
