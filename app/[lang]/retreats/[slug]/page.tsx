import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n';
import { SANCTUARY_PROPERTIES, getSanctuaryBySlug } from '@/lib/retreats-data';
import { RetreatDetailView } from '@/components/RetreatDetailView';

export async function generateStaticParams() {
  const locales = ['en', 'zh'];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
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
  const property = getSanctuaryBySlug(slug);

  if (!property) {
    return { title: 'Sanctuary Not Found | YOJQI' };
  }

  const title = lang === 'zh' ? `${property.nameZh} | 重庆两江无人机机位宿集 | YOJQI` : `${property.nameEn} | Chongqing Drone Show Apartment | YOJQI`;
  const description = lang === 'zh' ? property.subtitleZh : property.subtitleEn;

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

export default async function RetreatPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const property = getSanctuaryBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <RetreatDetailView property={property} lang={lang as Language} />
    </div>
  );
}
