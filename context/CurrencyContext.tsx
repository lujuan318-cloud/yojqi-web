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

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
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
