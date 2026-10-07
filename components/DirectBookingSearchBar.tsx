'use client';

import React, { useState } from 'react';
import { Calendar, Users, Search, Sparkles } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';

interface DirectBookingSearchBarProps {
  lang: Language;
  checkIn: string;
  checkOut: string;
  guests: number;
  onSearch: (checkIn: string, checkOut: string, guests: number) => void;
  isLoading?: boolean;
}

export function DirectBookingSearchBar({
  lang,
  checkIn: initialCheckIn,
  checkOut: initialCheckOut,
  guests: initialGuests,
  onSearch,
  isLoading = false,
}: DirectBookingSearchBarProps) {
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);

  const calculateNights = (inDate: string, outDate: string) => {
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights(checkIn, checkOut);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkOut <= checkIn) {
      const nextDay = new Date(new Date(checkIn).getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      setCheckOut(nextDay);
      onSearch(checkIn, nextDay, guests);
    } else {
      onSearch(checkIn, checkOut, guests);
    }
  };

  return (
    <div className="bg-[#fffdfa] border border-amber-200/80 rounded-2xl shadow-lg p-4 sm:p-6 transition-all duration-300">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
        {/* Check-in */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>{dict.retreats.checkIn}</span>
          </label>
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (e.target.value >= checkOut) {
                const nextDay = new Date(new Date(e.target.value).getTime() + 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split('T')[0];
                setCheckOut(nextDay);
              }
            }}
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-mono"
            required
          />
        </div>

        {/* Check-out */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>{dict.retreats.checkOut}</span>
            <span className="text-[11px] text-amber-800 lowercase font-mono">
              ({nights} {isZh ? '晚' : nights > 1 ? 'nights' : 'night'})
            </span>
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-mono"
            required
          />
        </div>

        {/* Guests */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span>{dict.retreats.guests}</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
          >
            <option value={1}>{isZh ? '1 位宾客' : '1 Guest'}</option>
            <option value={2}>{isZh ? '2 位宾客 (标准)' : '2 Guests (Standard)'}</option>
            <option value={3}>{isZh ? '3 位宾客' : '3 Guests'}</option>
            <option value={4}>{isZh ? '4 位宾客 (套房/家庭)' : '4 Guests (Family)'}</option>
            <option value={6}>{isZh ? '6 位宾客 (四卧套房)' : '6 Guests (4-Bed Suite)'}</option>
            <option value={8}>{isZh ? '8 位宾客 (独栋包层)' : '8 Guests (Entire Floor)'}</option>
          </select>
        </div>

        {/* Search CTA */}
        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer h-[42px]"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{dict.retreats.searchAvailability}</span>
          </button>
        </div>
      </form>

      {/* Direct Booking Privilege Ribbon */}
      <div className="mt-3.5 pt-3 border-t border-amber-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-amber-900 font-sans">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-medium">
            {isZh
              ? '✨ 官网直接预订专享：全单立省 5% · 东方欢迎茶礼 · 优先选房 · 免费行李寄存'
              : '✨ Official Direct Booking Privileges: Guaranteed 5% Off · Welcome Kung Fu Tea · Early Drop-off'}
          </span>
        </div>
        <div className="text-neutral-500 font-mono text-[10px]">
          {isZh ? '百居易实时房态引擎保障 · 实时防超售' : 'Powered by Hostex Live PMS'}
        </div>
      </div>
    </div>
  );
}
