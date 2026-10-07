'use client';

import React, { useState, useEffect } from 'react';
import { DirectBookingSearchBar } from './DirectBookingSearchBar';
import { DirectRoomCard } from './DirectRoomCard';
import { DirectBookingDrawer } from './DirectBookingDrawer';
import { AIConciergeWidget } from './AIConciergeWidget';
import { Language, getDictionary } from '@/lib/i18n';
import { RoomAvailabilityQuote } from '@/lib/retreats-pricing';
import { Sparkles, HelpCircle, Shield, Award, MapPin } from 'lucide-react';

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

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(2);

  const [rooms, setRooms] = useState<RoomAvailabilityQuote[]>(initialRooms);
  const [loading, setLoading] = useState(false);

  // Selected room for checkout drawer
  const [selectedRoom, setSelectedRoom] = useState<RoomAvailabilityQuote | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Search handler calling /api/retreats/availability
  const handleSearch = async (newCheckIn: string, newCheckOut: string, newGuests: number) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
    setGuests(newGuests);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/retreats/availability?check_in=${newCheckIn}&check_out=${newCheckOut}&guests=${newGuests}`
      );
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRooms(json.data);
      }
    } catch (err) {
      console.error('Failed to search availability:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenBookNow = (room: RoomAvailabilityQuote) => {
    setSelectedRoom(room);
    setIsDrawerOpen(true);
  };

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

      {/* Top Search Bar */}
      <div className="sticky top-20 z-30 pt-1">
        <DirectBookingSearchBar
          lang={lang}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          onSearch={handleSearch}
          isLoading={loading}
        />
      </div>

      {/* Trust & Guarantee Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs text-amber-950">
        <div className="bg-[#fffdfa] border border-amber-200/60 p-3.5 rounded-xl flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="font-semibold block">{isZh ? '百居易中央房态实时直连' : 'Hostex Real-time PMS Sync'}</span>
            <span className="text-[11px] text-neutral-500">{isZh ? '自动锁房并同步OTA关房，杜绝超售' : 'Instant inventory lock, no double-booking'}</span>
          </div>
        </div>

        <div className="bg-[#fffdfa] border border-amber-200/60 p-3.5 rounded-xl flex items-center gap-2.5">
          <Award className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <span className="font-semibold block">{isZh ? '官网直订 95 折专享特惠' : 'Guaranteed 5% Direct Discount'}</span>
            <span className="text-[11px] text-neutral-500">{isZh ? '优于Booking与携程公开价' : 'Lowest rate guaranteed vs OTA'}</span>
          </div>
        </div>

        <div className="bg-[#fffdfa] border border-amber-200/60 p-3.5 rounded-xl flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
          <div>
            <span className="font-semibold block">{isZh ? '两江汇流高空一线机位' : 'Front-Row Riverfront Vantage'}</span>
            <span className="text-[11px] text-neutral-500">{isZh ? '洪崖洞/解放碑商圈，高空私享大阳台' : 'High-floor private balconies over rivers'}</span>
          </div>
        </div>
      </div>

      {/* Live Available Rooms Catalog */}
      <div className="space-y-8">
        <div className="flex items-baseline justify-between border-b border-yojqi-border pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze">
              {isZh ? '7大主力房型清单' : 'Available Suites & Room Types'}
            </span>
            <h2 className="font-serif text-2xl font-bold text-yojqi-inkHeading">
              {isZh ? '选择心仪房型并即时直订' : 'Select Your Sanctuary'}
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-500">
            {rooms.length} {isZh ? '个房型可售' : 'room types listed'}
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-amber-900 font-mono">
              {isZh ? '正在从百居易中央房态查询实时日历与价格...' : 'Checking live Hostex PMS calendar and rates...'}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {rooms.map((room) => (
              <DirectRoomCard
                key={room.room_key}
                room={room}
                lang={lang}
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

      {/* FAQ Section */}
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
          <div className="p-5 bg-white rounded-xl border border-yojqi-border shadow-xs space-y-1.5">
            <h4 className="font-serif text-sm sm:text-base font-semibold text-yojqi-inkHeading">
              {isZh ? '官网直订如何保障房态？会有超售风险吗？' : 'How does Hostex prevent double-booking?'}
            </h4>
            <p className="text-xs text-yojqi-body leading-relaxed">
              {isZh
                ? 'YOJQI 官网已直连百居易 (Hostex) OpenAPI v3。在您点击直订时，系统会原子锁定物理房间 10 分钟；支付确认后，百居易会秒级向 Booking.com、携程等全网 OTA 下发关房指令，彻底杜绝多渠道错配与超售。'
                : 'Direct bookings connect live with Hostex OpenAPI v3. Room inventory is pre-held for 10 minutes and automatically locked across Booking.com and Ctrip upon payment.'}
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-yojqi-border shadow-xs space-y-1.5">
            <h4 className="font-serif text-sm sm:text-base font-semibold text-yojqi-inkHeading">
              {isZh ? '入离时间和行李寄存如何安排？' : 'Check-in times and luggage storage'}
            </h4>
            <p className="text-xs text-yojqi-body leading-relaxed">
              {isZh
                ? '标准入住时间为 15:00，退房时间为 12:00。若您提前抵达或晚间出发，民宿全天候提供免费行李安全寄存。如前序客人已退房打扫完毕，管家将优先安排提早办理入住。'
                : 'Standard check-in is 15:00 and check-out is 12:00. Complimentary luggage storage is available all day before check-in and after check-out.'}
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-yojqi-border shadow-xs space-y-1.5">
            <h4 className="font-serif text-sm sm:text-base font-semibold text-yojqi-inkHeading">
              {isZh ? '官网直订可以享受哪些专属礼遇？' : 'What perks do direct guests receive?'}
            </h4>
            <p className="text-xs text-yojqi-body leading-relaxed">
              {isZh
                ? '官网直订客人享受立省 5% 直订专享折扣、赠送高山冷泡工夫迎宾茶礼、赠送 YOJQI 东方身心香丸礼包，以及专属管家 1 对 1 山城出行非遗老餮路线定制。'
                : 'Direct guests enjoy a 5% discount, complimentary Kung Fu welcome tea set, YOJQI scent anchor gift, and personalized trip curation.'}
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-yojqi-border shadow-xs space-y-1.5">
            <h4 className="font-serif text-sm sm:text-base font-semibold text-yojqi-inkHeading">
              {isZh ? '退改政策是怎样的？' : 'Cancellation & refund policy'}
            </h4>
            <p className="text-xs text-yojqi-body leading-relaxed">
              {isZh
                ? '大床房及双床房在入住前 48 小时可全额免费取消；四室整套套房在入住前 72 小时可免费取消。超时取消按首晚房费收取，其余款项原路自动退回。'
                : 'Free cancellation up to 48 hours before check-in for king/twin rooms, and 72 hours for 4-bedroom suites.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
