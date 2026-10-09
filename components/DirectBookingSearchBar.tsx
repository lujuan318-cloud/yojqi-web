'use client';

import React, { useState } from 'react';
import { Calendar, Users, Bed, Search, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';

interface DirectBookingSearchBarProps {
  lang: Language;
  checkIn: string;
  checkOut: string;
  guests: number;
  beds: string;
  hasFiltered: boolean;
  onSearch: (checkIn: string, checkOut: string, guests: number, beds: string) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export function DirectBookingSearchBar({
  lang,
  checkIn: initialCheckIn,
  checkOut: initialCheckOut,
  guests: initialGuests,
  beds: initialBeds,
  hasFiltered,
  onSearch,
  onReset,
  isLoading = false,
}: DirectBookingSearchBarProps) {
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [beds, setBeds] = useState(initialBeds || 'all');

  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 0;
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights(checkIn, checkOut);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn) {
      // If no check-in chosen, pick tomorrow by default
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const dayAfter = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      setCheckIn(tomorrow);
      setCheckOut(dayAfter);
      onSearch(tomorrow, dayAfter, guests, beds);
      return;
    }

    if (!checkOut || checkOut <= checkIn) {
      const nextDay = new Date(new Date(checkIn).getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      setCheckOut(nextDay);
      onSearch(checkIn, nextDay, guests, beds);
    } else {
      onSearch(checkIn, checkOut, guests, beds);
    }
  };

  const handleResetClick = () => {
    setCheckIn('');
    setCheckOut('');
    setGuests(0);
    setBeds('all');
    onReset();
  };

  return (
    <div className="bg-[#fffdfa] border border-amber-200/90 rounded-3xl shadow-xl p-4 sm:p-6 transition-all duration-300">
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
              if (e.target.value && (!checkOut || e.target.value >= checkOut)) {
                const nextDay = new Date(new Date(e.target.value).getTime() + 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split('T')[0];
                setCheckOut(nextDay);
              }
            }}
            placeholder={isZh ? '选择入住日期' : 'Check-in date'}
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-mono"
          />
        </div>

        {/* Check-out */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>{dict.retreats.checkOut}</span>
            {nights > 0 && (
              <span className="text-[11px] text-amber-800 lowercase font-mono">
                ({nights} {isZh ? '晚' : nights > 1 ? 'nights' : 'night'})
              </span>
            )}
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || new Date().toISOString().split('T')[0]}
            onChange={(e) => setCheckOut(e.target.value)}
            placeholder={isZh ? '选择退房日期' : 'Check-out date'}
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-mono"
          />
        </div>

        {/* Guests / Capacity */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span>{dict.retreats.guests}</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
          >
            <option value={0}>{isZh ? '人数不限' : 'Any Guests'}</option>
            <option value={1}>{isZh ? '1 位宾客' : '1 Guest'}</option>
            <option value={2}>{isZh ? '2 位 (标准)' : '2 Guests'}</option>
            <option value={3}>{isZh ? '3 位宾客' : '3 Guests'}</option>
            <option value={4}>{isZh ? '4 位 (套房)' : '4 Guests'}</option>
            <option value={6}>{isZh ? '6 位 (家庭)' : '6 Guests'}</option>
            <option value={8}>{isZh ? '8 位 (整套)' : '8 Guests'}</option>
          </select>
        </div>

        {/* Beds Filter */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze flex items-center gap-1.5 font-medium">
            <Bed className="w-3.5 h-3.5 text-amber-700" />
            <span>{isZh ? '床数需求' : 'Beds'}</span>
          </label>
          <select
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
          >
            <option value="all">{isZh ? '床型不限' : 'Any Beds'}</option>
            <option value="1">{isZh ? '1张特大床 (1.8m)' : '1 King Bed'}</option>
            <option value="2">{isZh ? '2张独立双床' : '2 Twin Beds'}</option>
            <option value="4">{isZh ? '4张大床 (整套)' : '4 Beds Suite'}</option>
          </select>
        </div>

        {/* Buttons: Search + Reset */}
        <div className="md:col-span-2 flex items-center gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2.5 px-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer h-[42px]"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{dict.retreats.searchAvailability}</span>
          </button>

          {hasFiltered && (
            <button
              type="button"
              onClick={handleResetClick}
              title={isZh ? '重置并展示全部房型' : 'Show all room types'}
              className="p-2.5 rounded-xl border border-neutral-300 hover:border-amber-700 hover:bg-amber-50 text-neutral-600 hover:text-amber-900 transition-colors h-[42px] shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Dynamic Ribbon status */}
      <div className="mt-3.5 pt-3 border-t border-amber-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans">
        {hasFiltered ? (
          <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {isZh
                ? `已按日期 ${checkIn} 至 ${checkOut} 筛选：仅展示有房可订的房型（已售罄及容量不足房型已自动隐藏）`
                : `Filtered by ${checkIn} to ${checkOut}: Showing available rooms only`}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-medium">
              {isZh
                ? '默认展示全部 7 大主力房型 · 选择入住日期后将实时同步百居易房态并只展示可订房型'
                : 'Showing all 7 flagship rooms. Select dates above to filter strictly available rooms.'}
            </span>
          </div>
        )}

        <div className="text-neutral-500 font-mono text-[10px]">
          {isZh ? '百居易 OpenAPI 实时直连 · 官网直订立享 95 折' : 'Hostex Live Sync · 5% Direct Privilege'}
        </div>
      </div>
    </div>
  );
}
