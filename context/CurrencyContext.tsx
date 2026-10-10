'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CNY' | 'HKD';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to USD
  nameEn: string;
  nameZh: string;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, nameEn: 'USD ($)', nameZh: '美元 ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, nameEn: 'EUR (€)', nameZh: '欧元 (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, nameEn: 'GBP (£)', nameZh: '英镑 (£)' },
  CNY: { code: 'CNY', symbol: '¥', rate: 7.25, nameEn: 'CNY (¥)', nameZh: '人民币 (¥)' },
  HKD: { code: 'HKD', symbol: 'HK$', rate: 7.82, nameEn: 'HKD (HK$)', nameZh: '港币 (HK$)' },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
  formatFromCny: (amountInCNY: number) => string;
  convertFromCny: (amountInCNY: number) => number;
  currentConfig: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('yojqi_currency') as Currency;
      if (saved && CURRENCIES[saved]) {
        setCurrencyState(saved);
      } else if (typeof window !== 'undefined') {
        // Intelligently default to CNY on Chinese route (/zh), USD on English route (/en)
        if (window.location.pathname.startsWith('/zh')) {
          setCurrencyState('CNY');
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (isMounted) {
      try {
        localStorage.setItem('yojqi_currency', c);
      } catch {
        // Ignore
      }
    }
  };

  const currentConfig = CURRENCIES[currency] || CURRENCIES.USD;

  // Convert USD amounts (e.g. Products in store) to selected currency
  const convertPrice = (amountInUSD: number): number => {
    return Number((amountInUSD * currentConfig.rate).toFixed(2));
  };

  const formatPrice = (amountInUSD: number): string => {
    const converted = convertPrice(amountInUSD);
    if (currency === 'CNY' || currency === 'HKD') {
      return `${currentConfig.symbol}${Math.round(converted)}`;
    }
    return `${currentConfig.symbol}${converted.toFixed(2)}`;
  };

  // Convert CNY amounts (e.g. Hostex homestay rates) to selected currency
  const convertFromCny = (amountInCNY: number): number => {
    if (currency === 'CNY') return amountInCNY;
    const cnyRate = CURRENCIES.CNY.rate || 7.25;
    const amountInUSD = amountInCNY / cnyRate;
    return Number((amountInUSD * currentConfig.rate).toFixed(2));
  };

  const formatFromCny = (amountInCNY: number): string => {
    if (currency === 'CNY') {
      return `¥${Math.round(amountInCNY)}`;
    }
    const converted = convertFromCny(amountInCNY);
    if (currency === 'HKD') {
      return `HK$${Math.round(converted)}`;
    }
    return `${currentConfig.symbol}${Math.round(converted)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        formatFromCny,
        convertFromCny,
        currentConfig,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
