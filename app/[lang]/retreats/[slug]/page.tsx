import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n';
import { getRoomBySlug, getRoomCatalog } from '@/lib/retreats-catalog';
import { SANCTUARY_PROPERTIES, getSanctuaryBySlug } from '@/lib/retreats-data';
import { DirectRoomDetailView } from '@/components/DirectRoomDetailView';
import { RetreatDetailView } from '@/components/RetreatDetailView';

export async function generateStaticParams() {
  const locales = ['en', 'zh'];
  const params: { lang: string; slug: string }[] = [];

  const catalog = getRoomCatalog();
  for (const lang of locales) {
    for (const room of catalog) {
      params.push({ lang, slug: room.slug });
    }
    for (const prop of SANCTUARY_PROPERTIES) {
      params.push({ lang, slug: prop.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const isZh = lang === 'zh';

  // Check official Hostex catalog first
  const room = getRoomBySlug(slug);
  if (room) {
    const title = isZh
      ? `${room.nameZh} · 官网直订 | YOJQI 重庆宿集`
      : `${room.nameEn} · Direct Booking | YOJQI Stays`;
    const description = isZh ? room.subtitleZh : room.subtitleEn;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [{ url: room.coverImage }],
      },
    };
  }

  // Fallback to legacy marketing property
  const property = getSanctuaryBySlug(slug);
  if (property) {
    const title = isZh ? `${property.nameZh} | 重庆两江无人机机位宿集 | YOJQI` : `${property.nameEn} | Chongqing Drone Show Apartment | YOJQI`;
    const description = isZh ? property.subtitleZh : property.subtitleEn;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [{ url: property.heroImage }],
      },
    };
  }

  return { title: 'Room Not Found | YOJQI' };
}

export default async function RetreatPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  // 1. Direct Booking Room Type from Hostex PMS Catalog
  const directRoom = getRoomBySlug(slug);
  if (directRoom) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <DirectRoomDetailView room={directRoom} lang={lang as Language} />
      </div>
    );
  }

  // 2. Legacy Sanctuary Property
  const property = getSanctuaryBySlug(slug);
  if (property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <RetreatDetailView property={property} lang={lang as Language} />
      </div>
    );
  }

  notFound();
}
