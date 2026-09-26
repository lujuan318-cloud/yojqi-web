'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles, User, MessageSquare, Phone, Calendar, Users, Building } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface SanctuaryInquiryFormProps {
  lang: Language;
  defaultSuite?: string;
}

export function SanctuaryInquiryForm({ lang, defaultSuite }: SanctuaryInquiryFormProps) {
  const isZh = lang === 'zh';
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState<'wechat' | 'whatsapp' | 'phone'>('wechat');
  const [suite, setSuite] = useState(defaultSuite || 'Baihong Full Riverfront Suite');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const SUITE_OPTIONS = [
    { value: 'Baihong Full Riverfront Suite', labelZh: '百宏·两江全景无人机天幕套房 (270°江景露台)', labelEn: 'Baihong Full Riverfront Suite (270° Drone Balcony)' },
    { value: 'Yojqi Serenity High-Rise Suite', labelZh: 'YOJQI·静谧高空江景套房 (云端茶席+沉香居停)', labelEn: 'YOJQI Serenity High-Rise Suite (Cloud Tea & Scent Sanctuary)' },
    { value: 'Two-Rivers VIP Master Suite', labelZh: '两江汇流顶层 VIP 尊享套房 (私享夜景天幕首排)', labelEn: 'Two-Rivers VIP Master Suite (Top-Floor Front Row)' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !contact.trim()) {
      setErrorMsg(isZh ? '请填写您的称呼与联系方式' : 'Please provide your name and contact info.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contact,
          contactType,
          suite,
          checkInDate,
          checkOutDate,
          guests,
          notes,
          lang,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || (isZh ? '提交失败，请稍后重试' : 'Submission failed.'));
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(isZh ? '网络异常，请直接通过微信联系管家' : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-emerald-200 rounded-2xl p-8 text-center space-y-4 shadow-sm animate-in fade-in">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-yojqi-ink">
          {isZh ? '预约意向已成功送达！' : 'Inquiry Successfully Received!'}
        </h3>
        <p className="text-sm text-yojqi-body max-w-md mx-auto leading-relaxed">
          {isZh
            ? '感谢您的垂询。YOJQI 重庆宿集 VIP 专属管家将在 15 分钟内通过微信或电话与您取得联系，为您锁定绝佳无人机天幕机位及定制尊享礼遇。'
            : 'Thank you for your interest. Our resident VIP concierge in Chongqing will contact you via WhatsApp / WeChat within 15 minutes to confirm drone show vantage availability.'}
        </p>
        <div className="pt-2">
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs font-mono text-yojqi-bronze hover:underline"
          >
            {isZh ? '提交另一条预约意向' : 'Submit another inquiry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdfa] border border-yojqi-border rounded-2xl p-6 sm:p-8 shadow-sm my-8">
      {/* Header */}
      <div className="border-b border-yojqi-border pb-5 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-yojqi-bronze uppercase">
          <Sparkles className="w-4 h-4" />
          <span>{isZh ? '尊享一对一专属管家快速预约' : 'VIP Resident Concierge Direct Inquiry'}</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-yojqi-ink mt-1">
          {isZh ? '预约重庆高空两江无人机机位套房' : 'Reserve Your Skyline Drone Show Suite'}
        </h3>
        <p className="text-sm text-yojqi-body mt-1">
          {isZh
            ? '提交入住需求后，管家团队将在 15 分钟内为您核准房态、确认无人机排期与高空露台朝向。'
            : 'Direct response within 15 minutes. Secure front-row balcony access with zero crowd congestion.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Name & Contact Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-yojqi-body mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-yojqi-bronze" />
              <span>{isZh ? '贵宾姓名 / 称呼 *' : 'Full Name *'}</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isZh ? '例如：张先生 / Alice' : 'e.g. Alexander Vance'}
              className="w-full px-3.5 py-2.5 rounded-lg border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-yojqi-body mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-yojqi-bronze" />
              <span>{isZh ? '微信号 / WhatsApp / 手机号 *' : 'WeChat / WhatsApp / Phone *'}</span>
            </label>
            <div className="flex gap-2">
              <select
                value={contactType}
                onChange={(e) => setContactType(e.target.value as any)}
                className="px-2 py-2.5 rounded-lg border border-yojqi-border bg-neutral-50 text-xs text-yojqi-body shrink-0"
              >
                <option value="wechat">{isZh ? '微信' : 'WeChat'}</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="phone">{isZh ? '电话' : 'Phone'}</option>
              </select>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={isZh ? '输入账号或手机号' : '+1 / WeChat ID / Phone'}
                className="w-full px-3.5 py-2.5 rounded-lg border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Suite Selection & Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-yojqi-body mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-yojqi-bronze" />
              <span>{isZh ? '意向艺术套房' : 'Preferred Suite'}</span>
            </label>
            <select
              value={suite}
              onChange={(e) => setSuite(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors"
            >
              {SUITE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {isZh ? opt.labelZh : opt.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-yojqi-body mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-yojqi-bronze" />
              <span>{isZh ? '同行人数' : 'Guest Count'}</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors"
            >
              <option value="1-2">{isZh ? '1 - 2 位 (情侣/好友/商旅)' : '1 - 2 Guests'}</option>
              <option value="3-4">{isZh ? '3 - 4 位 (家庭/私密小聚)' : '3 - 4 Guests'}</option>
              <option value="5+">{isZh ? '5 位以上 (包层/尊享定制)' : '5+ Guests (Full Floor)'}</option>
            </select>
          </div>
        </div>

        {/* Row 3: Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-yojqi-body mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-yojqi-bronze" />
              <span>{isZh ? '拟入住日期 (选填)' : 'Check-in Date (Optional)'}</span>
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-yojqi-body mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-yojqi-bronze" />
              <span>{isZh ? '拟退房日期 (选填)' : 'Check-out Date (Optional)'}</span>
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-medium text-yojqi-body mb-1.5 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-yojqi-bronze" />
            <span>{isZh ? '个性化要求 / 礼宾需求 (选填)' : 'Special Requests / Concierge Needs (Optional)'}</span>
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={isZh ? '例如：希望推荐最佳摄影机位、需要准备草本茶饮、商务接机等' : 'e.g. Balcony photography tripod spot, airport transfer, herbal tea setup'}
            className="w-full px-3.5 py-2 rounded-lg border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors resize-none"
          />
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs border border-rose-200">
            {errorMsg}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl yojqi-btn-primary flex items-center justify-center gap-2 text-sm font-semibold tracking-wide disabled:opacity-50 shadow-md"
        >
          {loading ? (
            <span>{isZh ? '正在提交意向...' : 'Submitting Inquiry...'}</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{isZh ? '立即提交预约意向 · 15分钟内管家致电/微信回复' : 'Submit Reservation Request (15-Min Response)'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
