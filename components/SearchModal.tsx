'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Shield, Wind, Sparkles, Building, BookOpen, ArrowRight } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { PRODUCTS } from '@/lib/products-data';
import { SANCTUARY_PROPERTIES } from '@/lib/retreats-data';
import { INITIAL_ARTICLES } from '@/lib/editorial-data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function SearchModal({ isOpen, onClose, lang }: SearchModalProps) {
  const isZh = lang === 'zh';
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.nameZh.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.taglineZh.toLowerCase().includes(q) ||
          p.taglineEn.toLowerCase().includes(q) ||
          p.category.includes(q)
      )
    : [];

  const matchedSanctuaries = q
    ? SANCTUARY_PROPERTIES.filter(
        (s) =>
          s.nameZh.toLowerCase().includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          s.subtitleZh.toLowerCase().includes(q) ||
          s.locationZh.toLowerCase().includes(q)
      )
    : [];

  const matchedArticles = q
    ? INITIAL_ARTICLES.filter(
        (a) =>
          a.titleZh.toLowerCase().includes(q) ||
          a.titleEn.toLowerCase().includes(q) ||
          a.summaryZh.toLowerCase().includes(q) ||
          a.summaryEn.toLowerCase().includes(q)
      )
    : [];

  const totalResults = matchedProducts.length + matchedSanctuaries.length + matchedArticles.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#fffdfa] rounded-2xl shadow-2xl border border-yojqi-border overflow-hidden z-10">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-yojqi-border flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isZh ? '搜索草木香丸、道家符咒、无人机套房、身心专栏...' : 'Search scent anchors, talismans, drone suites, wisdom...'}
            className="w-full bg-transparent text-base text-yojqi-ink placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-neutral-400 hover:text-yojqi-ink">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline px-2 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-100 rounded border border-neutral-200">
            ESC
          </kbd>
        </div>

        {/* Results / Quick Links */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="space-y-4 py-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block px-2">
                {isZh ? '快捷探索分类' : 'Quick Category Exploration'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Link
                  href={`/${lang}/shop?category=balance`}
                  onClick={onClose}
                  className="p-3 bg-neutral-50 hover:bg-yojqi-sand rounded-xl text-xs font-medium text-yojqi-ink text-center border border-neutral-100 transition-colors"
                >
                  {isZh ? '龙涎定心' : 'Ambergris'}
                </Link>
                <Link
                  href={`/${lang}/talismans`}
                  onClick={onClose}
                  className="p-3 bg-amber-50 hover:bg-amber-100/80 rounded-xl text-xs font-medium text-amber-900 text-center border border-amber-200/80 transition-colors"
                >
                  {isZh ? '道家符咒 (10款)' : 'Taoist Talismans'}
                </Link>
                <Link
                  href={`/${lang}/retreats`}
                  onClick={onClose}
                  className="p-3 bg-neutral-50 hover:bg-yojqi-sand rounded-xl text-xs font-medium text-yojqi-ink text-center border border-neutral-100 transition-colors"
                >
                  {isZh ? '重庆无人机宿集' : 'Drone Suites'}
                </Link>
                <Link
                  href={`/${lang}/wisdom`}
                  onClick={onClose}
                  className="p-3 bg-neutral-50 hover:bg-yojqi-sand rounded-xl text-xs font-medium text-yojqi-ink text-center border border-neutral-100 transition-colors"
                >
                  {isZh ? '静思专栏' : 'Wisdom Journal'}
                </Link>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8 text-neutral-400 text-sm">
              {isZh ? `未找到与 “${query}” 相关的内容，请尝试其他关键词` : `No results found for "${query}".`}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Matched Products */}
              {matchedProducts.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-yojqi-bronze font-semibold block px-2">
                    {isZh ? `选品与符咒 (${matchedProducts.length})` : `Products & Talismans (${matchedProducts.length})`}
                  </span>
                  <div className="space-y-1">
                    {matchedProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/${lang}/product/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-yojqi-border transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          {p.category === 'protection' ? (
                            <Shield className="w-4 h-4 text-amber-700 shrink-0" />
                          ) : (
                            <Wind className="w-4 h-4 text-yojqi-bronze shrink-0" />
                          )}
                          <div>
                            <h5 className="font-serif text-sm font-medium text-yojqi-ink group-hover:text-yojqi-bronze transition-colors">
                              {isZh ? p.nameZh : p.nameEn}
                            </h5>
                            <span className="text-[11px] text-neutral-400 block line-clamp-1">
                              {isZh ? p.taglineZh : p.taglineEn}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-yojqi-bronze transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Sanctuaries */}
              {matchedSanctuaries.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-800 font-semibold block px-2">
                    {isZh ? `重庆宿集 (${matchedSanctuaries.length})` : `Sanctuaries (${matchedSanctuaries.length})`}
                  </span>
                  <div className="space-y-1">
                    {matchedSanctuaries.map((s) => (
                      <Link
                        key={s.id}
                        href={`/${lang}/retreats/${s.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-yojqi-border transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Building className="w-4 h-4 text-amber-700 shrink-0" />
                          <div>
                            <h5 className="font-serif text-sm font-medium text-yojqi-ink group-hover:text-yojqi-bronze transition-colors">
                              {isZh ? s.nameZh : s.nameEn}
                            </h5>
                            <span className="text-[11px] text-neutral-400 block">
                              {isZh ? s.locationZh : s.locationEn}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-yojqi-bronze transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Articles */}
              {matchedArticles.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block px-2">
                    {isZh ? `专栏文章 (${matchedArticles.length})` : `Wisdom Articles (${matchedArticles.length})`}
                  </span>
                  <div className="space-y-1">
                    {matchedArticles.map((a) => (
                      <Link
                        key={a.id}
                        href={`/${lang}/wisdom/${a.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-yojqi-border transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-neutral-400 shrink-0" />
                          <h5 className="font-serif text-sm font-medium text-yojqi-ink group-hover:text-yojqi-bronze transition-colors truncate max-w-md">
                            {isZh ? a.titleZh : a.titleEn}
                          </h5>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-yojqi-bronze transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
