'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DirectBookingSearchBar } from './DirectBookingSearchBar';
import { DirectRoomCard } from './DirectRoomCard';
import { DirectBookingDrawer } from './DirectBookingDrawer';
import { AIConciergeWidget } from './AIConciergeWidget';
import { Language, getDictionary } from '@/lib/i18n';
import { RoomAvailabilityQuote } from '@/lib/retreats-pricing';
import { Sparkles, HelpCircle, Shield, Award, MapPin, Inbox, RotateCcw } from 'lucide-react';

interface DirectRetreatsClientProps {
  lang: Language;
  initialRooms: RoomAvailabilityQuote[];
  initialCheckIn: string;
  initialCheckOut: string;
}

export function DirectRetreatsClient({
  lang,
  initialRooms,
  initialCheckIn,
  initialCheckOut,
}: DirectRetreatsClientProps) {
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  // Filter states
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(0);
  const [beds, setBeds] = useState('all');
  const [displayFilter, setDisplayFilter] = useState<'all' | 'room_type' | 'individual_room'>('all');
  const [hasFiltered, setHasFiltered] = useState(false);

  const [allRooms, setAllRooms] = useState<RoomAvailabilityQuote[]>(initialRooms);
  const [filteredRooms, setFilteredRooms] = useState<RoomAvailabilityQuote[]>(initialRooms);
  const [loading, setLoading] = useState(false);

  // Selected room for checkout drawer
  const [selectedRoom, setSelectedRoom] = useState<RoomAvailabilityQuote | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Search handler calling /api/retreats/availability
  const handleSearch = async (newCheckIn: string, newCheckOut: string, newGuests: number, newBeds: string) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
    setGuests(newGuests);
    setBeds(newBeds);
    setHasFiltered(true);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/retreats/availability?check_in=${newCheckIn}&check_out=${newCheckOut}&guests=${newGuests || 1}`
      );
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        let results: RoomAvailabilityQuote[] = json.data;

        // 1. Filter: ONLY show available rooms when dates are picked
        results = results.filter((r) => r.available && r.status !== 'sold_out');

        // 2. Filter: Beds requirement
        if (newBeds !== 'all') {
          if (newBeds === '1') {
            results = results.filter((r) => r.bedInfoZh.includes('1张') || r.bedInfoEn.toLowerCase().includes('1 king'));
          } else if (newBeds === '2') {
            results = results.filter((r) => r.bedInfoZh.includes('2张') || r.bedInfoEn.toLowerCase().includes('2 king'));
          } else if (newBeds === '3') {
            results = results.filter((r) => r.bedInfoZh.includes('3张') || r.bedInfoEn.toLowerCase().includes('3 king'));
          } else if (newBeds === '4') {
            results = results.filter((r) => r.bedInfoZh.includes('4张') || r.bedInfoEn.toLowerCase().includes('4 king') || r.bedInfoEn.toLowerCase().includes('4 large'));
          }
        }

        setFilteredRooms(results);
      }
    } catch (err) {
      console.error('Failed to search availability:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCheckIn('');
    setCheckOut('');
    setGuests(0);
    setBeds('all');
    setDisplayFilter('all');
    setHasFiltered(false);
    setFilteredRooms(allRooms);
  };

  const handleOpenBookNow = (room: RoomAvailabilityQuote) => {
    // If dates are not set yet, set default dates (tomorrow to day after tomorrow)
    if (!checkIn || !checkOut) {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const dayAfter = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const roomWithDates = {
        ...room,
        check_in: tomorrow,
        check_out: dayAfter,
        nights: 1,
      };
      setSelectedRoom(roomWithDates);
    } else {
      setSelectedRoom(room);
    }
    setIsDrawerOpen(true);
  };

  const currentPool = hasFiltered ? filteredRooms : allRooms;
  const roomTypesCount = currentPool.filter((r) => r.display_type === 'room_type').length;
  const individualRoomsCount = currentPool.filter((r) => r.display_type === 'individual_room').length;
  const displayedRooms = currentPool.filter((room) => {
    if (displayFilter === 'all') return true;
    return room.display_type === displayFilter;
  });

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-4 pt-4 sm:pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>{dict.retreats.directBookingTitle}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-yojqi-inkHeading leading-tight">
          {dict.retreats.title}
        </h1>

        <p className="font-serif text-base sm:text-xl text-amber-950/90 italic max-w-2xl mx-auto leading-relaxed">
          {dict.retreats.directBookingPunchline}
        </p>

        <p className="text-xs sm:text-sm text-yojqi-body max-w-2xl mx-auto leading-relaxed">
          {isZh
            ? '坐落于重庆洪崖洞与解放碑高空核心之巅，正对两江交汇与天幕无人机编队主空域。全屋高织静音隔音中空玻璃，工夫茶席与专属沉香礼遇，为旅人打造静谧云端居停。'
            : 'Perched high above the confluence of Yangtze & Jialing rivers in Chongqing. Acoustic double-glazing, private tea terraces, and front-row drone show vistas insulated from street crowds.'}
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="relative z-10">
        <DirectBookingSearchBar
          lang={lang}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          beds={beds}
          hasFiltered={hasFiltered}
          onSearch={handleSearch}
          onReset={handleReset}
          isLoading={loading}
        />
      </div>

      {/* Trust & Guarantee Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs text-amber-950">
        <div className="bg-[#fffdfa] border border-amber-200/60 p-3.5 rounded-2xl flex items-center gap-2.5 shadow-xs">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="font-semibold block">{isZh ? '官方房态实时保障' : 'Official Real-Time Availability'}</span>
            <span className="text-[11px] text-neutral-500">{isZh ? '预订即锁定专属房源，确保有房无忧' : 'Guaranteed suite reservation with zero double-booking'}</span>
          </div>
        </div>

        <div className="bg-[#fffdfa] border border-amber-200/60 p-3.5 rounded-2xl flex items-center gap-2.5 shadow-xs">
          <Award className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <span className="font-semibold block">{isZh ? '官网直订 95 折专享特惠' : 'Guaranteed 5% Direct Discount'}</span>
            <span className="text-[11px] text-neutral-500">{isZh ? '优于Booking与携程公开价' : 'Lowest rate guaranteed vs OTA'}</span>
          </div>
        </div>

        <div className="bg-[#fffdfa] border border-amber-200/60 p-3.5 rounded-2xl flex items-center gap-2.5 shadow-xs">
          <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
          <div>
            <span className="font-semibold block">{isZh ? '两江汇流高空一线机位' : 'Front-Row Riverfront Vantage'}</span>
            <span className="text-[11px] text-neutral-500">{isZh ? '洪崖洞/解放碑商圈，高空私享大阳台' : 'High-floor private balconies over rivers'}</span>
          </div>
        </div>
      </div>

      {/* Rooms List Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-yojqi-border pb-3 gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze">
              {hasFiltered ? (isZh ? '实时房态直查' : 'Live Availability') : (isZh ? '官方直订房源全览' : 'Official Direct Stay Catalog')}
            </span>
            <h2 className="font-serif text-2xl font-bold text-yojqi-inkHeading">
              {hasFiltered ? (isZh ? '当前时段可预订房源' : 'Available on Your Dates') : (isZh ? '选择心仪房源并即时直订' : 'Select Your Sanctuary')}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/${lang}/retreats/manage`}
              className="text-xs text-amber-900 hover:text-amber-700 font-medium hover:underline flex items-center gap-1"
            >
              <span>{isZh ? '🔍 订单查询与退改' : '🔍 Manage Booking'}</span>
            </Link>
            <span className="text-xs font-mono text-neutral-300">|</span>
            <span className="text-xs font-mono text-neutral-500">
              {displayedRooms.length} {isZh ? '个房源显示中' : 'rooms shown'}
            </span>
          </div>
        </div>

        {/* Display Mode Tabs (按表格标注的“展示方式”分为：房型 / 房间) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="inline-flex p-1 bg-amber-50/80 border border-amber-200/80 rounded-2xl gap-1">
            <button
              type="button"
              onClick={() => setDisplayFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                displayFilter === 'all'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-amber-100/60'
              }`}
            >
              <span>{isZh ? '全部房源' : 'All Listings'}</span>
              <span className="ml-1.5 opacity-80 font-mono text-[11px]">({currentPool.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayFilter('room_type')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                displayFilter === 'room_type'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-amber-100/60'
              }`}
            >
              <span>{isZh ? '主力房型' : 'Room Types'}</span>
              <span className="ml-1.5 opacity-80 font-mono text-[11px]">({roomTypesCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayFilter('individual_room')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                displayFilter === 'individual_room'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-amber-100/60'
              }`}
            >
              <span>{isZh ? '独立专属房间' : 'Dedicated Rooms'}</span>
              <span className="ml-1.5 opacity-80 font-mono text-[11px]">({individualRoomsCount})</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500 hidden sm:block">
            {displayFilter === 'room_type' && (
              <span>{isZh ? '📌 房型：多物理房源共享房态，系统自动安排最优房间' : '📌 Pooled Room Types: Shared availability with auto-assignment'}</span>
            )}
            {displayFilter === 'individual_room' && (
              <span>{isZh ? '📌 房间：1:1 独立物理房源直订，所见即所订，精准指定房源' : '📌 Dedicated Rooms: Direct 1:1 physical property reservation'}</span>
            )}
            {displayFilter === 'all' && (
              <span>{isZh ? '📌 可按“主力房型”或“独立专属房间”分类查看' : '📌 Filter by Pooled Room Types or Dedicated Rooms'}</span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-amber-100">
            <div className="w-8 h-8 border-3 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-amber-900 font-mono">
              {isZh ? '正在查询实时房态与优享价格...' : 'Checking live room availability and rates...'}
            </p>
          </div>
        ) : displayedRooms.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-amber-200/80 p-8">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-amber-950">
                {isZh ? '抱歉，您所选日期内该房型已全部订满' : 'All rooms are fully booked for the selected dates'}
              </h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                {isZh
                  ? '建议更换日期重试，或重置筛选查看所有房型及联系管家协助调配。'
                  : 'Please try different dates or reset filters to browse all room types.'}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold transition-all shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isZh ? '查看全部房型' : 'Show All Rooms'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedRooms.map((room) => (
              <DirectRoomCard
                key={room.room_key}
                room={room}
                lang={lang}
                isDateSelected={hasFiltered}
                onBookNow={handleOpenBookNow}
              />
            ))}
          </div>
        )}
      </div>

      {/* Direct Booking Drawer Modal */}
      <DirectBookingDrawer
        room={selectedRoom}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        lang={lang}
      />

      {/* Floating AI Butler Concierge */}
      <AIConciergeWidget lang={lang} />

      {/* Stay & Booking Policy FAQs */}
      <div className="pt-8 border-t border-yojqi-border">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-yojqi-bronze uppercase tracking-widest mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isZh ? '预订与居停须知' : 'Stay & Booking Policy'}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
            {isZh ? '官网直订常见问题' : 'Frequently Asked Questions'}
          </h3>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-yojqi-border shadow-xs space-y-1.5">
            <h4 className="font-serif text-sm sm:text-base font-semibold text-yojqi-inkHeading">
              {isZh ? '官网直订如何保障房态？会有超售风险吗？' : 'How does direct booking guarantee room availability?'}
            </h4>
            <p className="text-xs text-yojqi-body leading-relaxed">
              {isZh
                ? 'YOJQI 官网为官方直订渠道，房态数据实时互通。在您选定房型时，系统会为您优先保留 10 分钟；预订确认后，房源即刻为您专属锁定并出具凭据，全网统一实时保障，彻底杜绝错单与超售风险，确保预订即有房。'
                : 'YOJQI Direct is an official booking channel with real-time room availability. When selecting your stay, rooms are reserved for 10 minutes; once confirmed, your suite is officially locked and guaranteed with zero risk of overbooking.'}
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-yojqi-border shadow-xs space-y-1.5">
            <h4 className="font-serif text-sm sm:text-base font-semibold text-yojqi-inkHeading">
              {isZh ? '入离时间和行李寄存如何安排？' : 'Check-in times and luggage storage'}
            </h4>
            <p className="text-xs text-yojqi-body leading-relaxed">
              {isZh
                ? '标准入住时间为 15:00，退房时间为 12:00。若您提前抵达或晚间出发，民宿全天候提供免费行李安全寄存。如前序客人已退房打扫完毕，管家将优先安排提早办理入住。'
                : 'Standard check-in is 15:00 and check-out is 12:00. Complimentary luggage storage is available all day before check-in and after check-out.'}
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-yojqi-border shadow-xs space-y-1.5">
            <h4 className="font-serif text-sm sm:text-base font-semibold text-yojqi-inkHeading">
              {isZh ? '支持哪些支付方式？' : 'What payment methods are supported?'}
            </h4>
            <p className="text-xs text-yojqi-body leading-relaxed">
              {isZh
                ? '支持国内支付宝扫码/即时付款、PayPal、Wise 跨境国际汇款，以及 Visa、Mastercard 等主流国际信用卡。付款确认后即刻出具官方住宿凭据与预订确认码。'
                : 'We accept Alipay, PayPal, Wise multi-currency wire transfers, and major credit cards (Visa/Mastercard/Apple Pay). Once confirmed, you will instantly receive your official stay voucher and reservation code.'}
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-yojqi-border shadow-xs space-y-1.5">
            <h4 className="font-serif text-sm sm:text-base font-semibold text-yojqi-inkHeading">
              {isZh ? '如果行程有变，如何取消预订？' : 'How does cancellation work?'}
            </h4>
            <p className="text-xs text-yojqi-body leading-relaxed">
              {isZh
                ? '大床房及双床房在入住前 48 小时可享受免费全额取消与改签保障。取消申请审核后款项将原路退回，专属管家亦将全程跟进协助。'
                : 'King and twin rooms offer complimentary cancellation up to 48 hours prior to check-in. Refunds are processed back to the original payment method with our concierge assisting throughout.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
