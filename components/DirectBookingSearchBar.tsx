'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Users,
  Bed,
  Search,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Moon,
  Clock,
  ArrowRight,
} from 'lucide-react';
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

  const [checkIn, setCheckIn] = useState(initialCheckIn || '');
  const [checkOut, setCheckOut] = useState(initialCheckOut || '');
  const [guests, setGuests] = useState(initialGuests || 0);
  const [beds, setBeds] = useState(initialBeds || 'all');

  const checkInInputRef = useRef<HTMLInputElement>(null);
  const checkOutInputRef = useRef<HTMLInputElement>(null);

  // Sync internal state if parent props change
  useEffect(() => {
    setCheckIn(initialCheckIn || '');
  }, [initialCheckIn]);

  useEffect(() => {
    setCheckOut(initialCheckOut || '');
  }, [initialCheckOut]);

  useEffect(() => {
    setGuests(initialGuests || 0);
  }, [initialGuests]);

  useEffect(() => {
    setBeds(initialBeds || 'all');
  }, [initialBeds]);

  // Compute today's date in local YYYY-MM-DD
  const getTodayStr = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getOffsetDateStr = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayStr();

  // Helper to calculate nights between 2 dates
  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 0;
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights(checkIn, checkOut);

  // Friendly date formatting: e.g. "10月10日 周六" or "10/10 Sat"
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      const weekdaysZh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const weekdaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const weekday = isZh ? weekdaysZh[date.getDay()] : weekdaysEn[date.getDay()];
      return isZh ? `${m}月${d}日 (${weekday})` : `${m}/${d} (${weekday})`;
    } catch {
      return dateStr;
    }
  };

  // Open native calendar picker safely
  const triggerPicker = (inputRef: React.RefObject<HTMLInputElement | null>) => {
    if (!inputRef.current) return;
    try {
      if (typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker();
      } else {
        inputRef.current.focus();
      }
    } catch {
      inputRef.current.focus();
    }
  };

  const handleCheckInChange = (newIn: string) => {
    setCheckIn(newIn);
    if (newIn) {
      // If checkout is empty or before checkin, automatically set checkout to next day
      if (!checkOut || checkOut <= newIn) {
        const nextDay = new Date(new Date(newIn).getTime() + 24 * 60 * 60 * 1000);
        const y = nextDay.getFullYear();
        const m = String(nextDay.getMonth() + 1).padStart(2, '0');
        const d = String(nextDay.getDate()).padStart(2, '0');
        setCheckOut(`${y}-${m}-${d}`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalIn = checkIn;
    let finalOut = checkOut;

    // If no dates chosen, default to tomorrow and day after
    if (!finalIn) {
      finalIn = getOffsetDateStr(1);
      finalOut = getOffsetDateStr(2);
      setCheckIn(finalIn);
      setCheckOut(finalOut);
    } else if (!finalOut || finalOut <= finalIn) {
      const nextDay = new Date(new Date(finalIn).getTime() + 24 * 60 * 60 * 1000);
      const y = nextDay.getFullYear();
      const m = String(nextDay.getMonth() + 1).padStart(2, '0');
      const d = String(nextDay.getDate()).padStart(2, '0');
      finalOut = `${y}-${m}-${d}`;
      setCheckOut(finalOut);
    }

    onSearch(finalIn, finalOut, guests, beds);
  };

  // 1-Click Preset Selection
  const applyPreset = (daysIn: number, durationNights: number) => {
    const inDate = getOffsetDateStr(daysIn);
    const outDate = getOffsetDateStr(daysIn + durationNights);
    setCheckIn(inDate);
    setCheckOut(outDate);
    onSearch(inDate, outDate, guests, beds);
  };

  const handleResetClick = () => {
    setCheckIn('');
    setCheckOut('');
    setGuests(0);
    setBeds('all');
    onReset();
  };

  return (
    <div className="bg-[#fffdfa] border-2 border-amber-200/90 rounded-3xl shadow-xl p-4 sm:p-6 transition-all duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Input Row: Grid layout adapted for all screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end">
          {/* 1. CHECK-IN DATE CARD */}
          <div
            onClick={() => triggerPicker(checkInInputRef)}
            className="sm:col-span-1 lg:col-span-3 bg-neutral-50 hover:bg-amber-50/50 border border-yojqi-border hover:border-amber-600 rounded-2xl p-3 sm:p-3.5 transition-all cursor-pointer relative group"
          >
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-yojqi-bronze font-medium mb-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>{dict.retreats.checkIn}</span>
              </span>
              <span className="text-[10px] text-amber-800 font-sans group-hover:underline">
                {isZh ? '点击选择 📅' : 'Select'}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="font-serif text-sm sm:text-base font-bold text-yojqi-ink">
                {checkIn ? formatDisplayDate(checkIn) : (isZh ? '选择入住日期' : 'Check-in date')}
              </span>
              <span className="text-[11px] text-neutral-400 font-sans">
                {isZh ? '15:00起' : 'From 15:00'}
              </span>
            </div>

            {/* Hidden native date input with fallback pointer click */}
            <input
              ref={checkInInputRef}
              type="date"
              value={checkIn}
              min={todayStr}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>

          {/* 2. CHECK-OUT DATE CARD */}
          <div
            onClick={() => triggerPicker(checkOutInputRef)}
            className="sm:col-span-1 lg:col-span-3 bg-neutral-50 hover:bg-amber-50/50 border border-yojqi-border hover:border-amber-600 rounded-2xl p-3 sm:p-3.5 transition-all cursor-pointer relative group"
          >
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-yojqi-bronze font-medium mb-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>{dict.retreats.checkOut}</span>
              </span>
              {nights > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-bold">
                  {nights} {isZh ? '晚' : nights > 1 ? 'nights' : 'night'}
                </span>
              )}
            </div>

            <div className="flex items-baseline justify-between">
              <span className="font-serif text-sm sm:text-base font-bold text-yojqi-ink">
                {checkOut ? formatDisplayDate(checkOut) : (isZh ? '选择退房日期' : 'Check-out date')}
              </span>
              <span className="text-[11px] text-neutral-400 font-sans">
                {isZh ? '12:00前' : 'Before 12:00'}
              </span>
            </div>

            <input
              ref={checkOutInputRef}
              type="date"
              value={checkOut}
              min={checkIn || todayStr}
              onChange={(e) => setCheckOut(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>

          {/* 3. GUESTS SELECTOR */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-1">
            <label className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze flex items-center gap-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-amber-700" />
              <span>{dict.retreats.guests}</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all cursor-pointer"
            >
              <option value={0}>{isZh ? '人数不限' : 'Any Guests'}</option>
              <option value={1}>{isZh ? '1 位宾客' : '1 Guest'}</option>
              <option value={2}>{isZh ? '2 位 (标准双人)' : '2 Guests'}</option>
              <option value={3}>{isZh ? '3 位宾客' : '3 Guests'}</option>
              <option value={4}>{isZh ? '4 位 (两室套房)' : '4 Guests'}</option>
              <option value={6}>{isZh ? '6 位 (家庭聚会)' : '6 Guests'}</option>
              <option value={8}>{isZh ? '8 位 (整套包栋)' : '8 Guests'}</option>
            </select>
          </div>

          {/* 4. BEDS SELECTOR */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-1">
            <label className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze flex items-center gap-1.5 font-medium">
              <Bed className="w-3.5 h-3.5 text-amber-700" />
              <span>{isZh ? '床数需求' : 'Beds'}</span>
            </label>
            <select
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all cursor-pointer"
            >
              <option value="all">{isZh ? '床数不限' : 'Any Beds'}</option>
              <option value="1">{isZh ? '1张特大床 (1 King Bed)' : '1 King Bed'}</option>
              <option value="2">{isZh ? '2张特大床 (2 King Beds)' : '2 King Beds'}</option>
              <option value="3">{isZh ? '3张特大床 (3 King Beds)' : '3 King Beds'}</option>
              <option value="4">{isZh ? '4张特大床 (整套公寓)' : '4 King Beds (Apartment)'}</option>
            </select>
          </div>

          {/* 5. SEARCH & RESET BUTTONS */}
          <div className="sm:col-span-2 lg:col-span-2 flex items-center gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer min-h-[44px]"
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
                className="p-2.5 rounded-xl border border-neutral-300 hover:border-amber-700 hover:bg-amber-50 text-neutral-600 hover:text-amber-900 transition-colors min-h-[44px] shrink-0 flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Date Presets Bar (一键快速选期，确保任何浏览器 100% 顺畅选日期) */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-amber-900/80 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>{isZh ? '快捷选期:' : 'Quick Dates:'}</span>
          </span>

          <button
            type="button"
            onClick={() => applyPreset(0, 1)}
            className="px-2.5 py-1 text-xs rounded-full bg-white hover:bg-amber-100 border border-amber-200 text-amber-950 font-medium transition-colors cursor-pointer shadow-2xs"
          >
            {isZh ? '今晚入住 · 1晚' : 'Tonight · 1N'}
          </button>

          <button
            type="button"
            onClick={() => applyPreset(1, 1)}
            className="px-2.5 py-1 text-xs rounded-full bg-white hover:bg-amber-100 border border-amber-200 text-amber-950 font-medium transition-colors cursor-pointer shadow-2xs"
          >
            {isZh ? '明天入住 · 1晚' : 'Tomorrow · 1N'}
          </button>

          <button
            type="button"
            onClick={() => applyPreset(2, 2)}
            className="px-2.5 py-1 text-xs rounded-full bg-white hover:bg-amber-100 border border-amber-200 text-amber-950 font-medium transition-colors cursor-pointer shadow-2xs"
          >
            {isZh ? '后天入住 · 2晚' : 'In 2 Days · 2N'}
          </button>

          <button
            type="button"
            onClick={() => {
              // Calculate days to next Friday
              const now = new Date();
              const day = now.getDay();
              const daysToFriday = (5 - day + 7) % 7 || 7;
              applyPreset(daysToFriday, 2);
            }}
            className="px-2.5 py-1 text-xs rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-medium transition-colors cursor-pointer shadow-2xs"
          >
            {isZh ? '本周末 · 2晚 (周五-周日)' : 'This Weekend · 2N'}
          </button>
        </div>
      </form>

      {/* Dynamic Filter Status Banner */}
      <div className="mt-3 pt-3 border-t border-amber-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
        {hasFiltered ? (
          <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {isZh
                ? `已按 ${formatDisplayDate(checkIn)} 至 ${formatDisplayDate(checkOut)} 筛选：仅展示可预订房型（已售罄房型已自动隐藏）`
                : `Filtered by ${checkIn} to ${checkOut}: Showing available rooms only`}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-amber-900 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              {isZh
                ? '默认展示全部精选房源（含7大主力房型与9套独立专属房间） · 选择日期后实时展示当前空房并享直订特惠'
                : 'Showing all curated residences (7 Flagship Room Types & 9 Dedicated Suites). Select dates to view live availability.'}
            </span>
          </div>
        )}

        <div className="text-neutral-500 font-mono text-[10px]">
          {isZh ? '官方直订优选保障 · 官网预订立享 95 折与专属礼遇' : 'Official Direct Stay Guarantee · 5% Direct Discount & Welcome Tea'}
        </div>
      </div>
    </div>
  );
}
