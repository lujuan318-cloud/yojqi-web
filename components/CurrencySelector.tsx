'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Coins } from 'lucide-react';
import { useCurrency, CURRENCIES, Currency } from '@/context/CurrencyContext';
import { Language } from '@/lib/i18n';

interface CurrencySelectorProps {
  lang: Language;
  className?: string;
}

export function CurrencySelector({ lang, className = '' }: CurrencySelectorProps) {
  const { currency, setCurrency, currentConfig } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-yojqi-border text-xs font-medium text-yojqi-body hover:text-yojqi-ink hover:border-yojqi-bronze transition-colors bg-[#fffdfa]"
        aria-expanded={isOpen}
      >
        <Coins className="w-3.5 h-3.5 text-yojqi-bronze" />
        <span>{currency}</span>
        <ChevronDown className="w-3 h-3 text-neutral-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-lg shadow-lg bg-white border border-yojqi-border py-1 z-50 animate-in fade-in-50 slide-in-from-top-1">
          {Object.values(CURRENCIES).map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCurrency(c.code as Currency);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                currency === c.code
                  ? 'bg-yojqi-sand text-yojqi-ink font-semibold'
                  : 'text-yojqi-body hover:bg-neutral-50 hover:text-yojqi-ink'
              }`}
            >
              <span>{lang === 'zh' ? c.nameZh : c.nameEn}</span>
              <span className="font-mono text-[11px] text-neutral-400">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
