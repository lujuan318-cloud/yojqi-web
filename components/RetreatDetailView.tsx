'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Eye,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { SanctuaryProperty } from '@/lib/retreats-data';
import { Language, getDictionary } from '@/lib/i18n';
import { WeChatModal } from '@/components/WeChatModal';
import { SanctuaryInquiryForm } from '@/components/SanctuaryInquiryForm';
import { DroneScheduleWidget } from '@/components/DroneScheduleWidget';

interface RetreatDetailViewProps {
  property: SanctuaryProperty;
  lang: Language;
}

export function RetreatDetailView({ property, lang }: RetreatDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(property.heroImage);
  const [wechatModalOpen, setWechatModalOpen] = useState(false);
  const dict = getDictionary(lang);

  const specs = lang === 'zh' ? property.roomSpecsZh : property.roomSpecsEn;

  return (
    <div className="space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href={`/${lang}/retreats`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-yojqi-body hover:text-yojqi-ink transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{lang === 'zh' ? '返回所有重庆机位宿集' : 'Back to Chongqing Retreats'}</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            {lang === 'zh' ? property.badgeZh : property.badgeEn}
          </span>
          <span className="text-xs text-yojqi-body flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-yojqi-bronze" />
            {lang === 'zh' ? property.locationZh : property.locationEn}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {lang === 'zh' ? property.nameZh : property.nameEn}
        </h1>

        <p className="text-sm sm:text-base text-yojqi-bronze italic max-w-3xl">
          {lang === 'zh' ? property.subtitleZh : property.subtitleEn}
        </p>
      </div>

      {/* Gallery Section */}
      <div className="space-y-4">
        <div className="relative w-full aspect-16/9 md:aspect-21/9 rounded-2xl overflow-hidden bg-neutral-900 border border-yojqi-border shadow-md">
          <Image
            src={selectedImage}
            alt={lang === 'zh' ? property.nameZh : property.nameEn}
            fill
            priority
            className="object-cover transition-all duration-300"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {property.gallery.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {property.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-28 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImage === img
                    ? 'border-yojqi-bronze shadow-xs'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Sanctuary photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid: Details & Host Concierge Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Story, Drone Angle, Amenities */}
        <div className="lg:col-span-8 space-y-10">
          {/* Drone Show Experience Spotlight Box */}
          <div className="bg-[#fff8f0] border-l-4 border-amber-600 rounded-r-2xl p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-amber-900 font-semibold">
              <Eye className="w-5 h-5 text-amber-700" />
              <h3 className="font-serif text-xl">{dict.retreats.droneShowSectionTitle}</h3>
            </div>
            <p className="text-sm text-yojqi-bodyStrong leading-relaxed">
              {lang === 'zh' ? property.droneShowFeatureZh : property.droneShowFeatureEn}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-medium text-yojqi-inkHeading">
              {lang === 'zh' ? '空间设计与居停意境' : 'Aesthetic Architecture & Sanctuary Design'}
            </h3>
            <p className="text-sm sm:text-base text-yojqi-body leading-relaxed whitespace-pre-line">
              {lang === 'zh' ? property.descriptionZh : property.descriptionEn}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-medium text-yojqi-inkHeading">
              {dict.retreats.amenitiesTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(lang === 'zh' ? property.amenitiesZh : property.amenitiesEn).map((amenity, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-yojqi-border flex items-start gap-3 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-yojqi-body">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Concierge Booking Card */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="bg-white rounded-2xl border border-yojqi-border p-6 shadow-card space-y-6">
            <div className="pb-4 border-b border-yojqi-border">
              <span className="text-xs font-mono font-medium text-yojqi-bronze uppercase block mb-1">
                {dict.retreats.roomSpecsTitle}
              </span>
              <h4 className="font-serif text-xl font-medium text-yojqi-inkHeading">
                {specs.view}
              </h4>
            </div>

            {/* Spec items */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">{dict.retreats.suiteSize}</span>
                <span className="font-medium text-yojqi-ink">{specs.area}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">{dict.retreats.guestCapacity}</span>
                <span className="font-medium text-yojqi-ink">{specs.capacity}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">{lang === 'zh' ? '床型规制' : 'Bedding'}</span>
                <span className="font-medium text-yojqi-ink">{specs.bedType}</span>
              </div>
            </div>

            {/* Concierge Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setWechatModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl yojqi-btn-primary text-xs font-medium tracking-wide flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>{dict.retreats.bookViaWechat}</span>
              </button>

              <div className="p-3 bg-neutral-50 rounded-xl text-[11px] text-yojqi-body leading-relaxed border border-neutral-100">
                {lang === 'zh' ? property.hostConcierge.noteZh : property.hostConcierge.noteEn}
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'zh' ? '官方直营·优先锁定期位' : 'Direct Host Coordination Guaranteed'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Schedule Widget */}
      <DroneScheduleWidget lang={lang} />

      {/* Direct VIP Inquiry Form */}
      <SanctuaryInquiryForm
        lang={lang}
        defaultSuite={lang === 'zh' ? property.nameZh : property.nameEn}
      />

      {/* Concierge Modal */}
      <WeChatModal
        isOpen={wechatModalOpen}
        onClose={() => setWechatModalOpen(false)}
        lang={lang}
        wechatId={property.hostConcierge.wechat}
      />
    </div>
  );
}
