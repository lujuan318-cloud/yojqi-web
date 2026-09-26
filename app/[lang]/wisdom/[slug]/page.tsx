import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Clock, ChevronLeft, Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { INITIAL_ARTICLES, getArticleBySlug } from '@/lib/editorial-data';
import { getProductBySlug } from '@/lib/products-data';
import { getSanctuaryBySlug } from '@/lib/retreats-data';

export async function generateStaticParams() {
  const locales = ['en', 'zh'];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
    for (const art of INITIAL_ARTICLES) {
      params.push({ lang, slug: art.slug });
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
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found | YOJQI' };
  }

  const title = lang === 'zh' ? `${article.titleZh} | YOJQI 东方静思录` : `${article.titleEn} | YOJQI Somatic Journal`;
  const description = lang === 'zh' ? article.summaryZh : article.summaryEn;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: article.featuredImage }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const currentLang = lang as Language;
  const article = getArticleBySlug(slug);
  const dict = getDictionary(currentLang);

  if (!article) {
    notFound();
  }

  const isTravel = article.track === 'chongqing_travel';
  const relatedProduct = article.relatedProductSlug ? getProductBySlug(article.relatedProductSlug) : null;
  const relatedProperty = article.relatedPropertySlug ? getSanctuaryBySlug(article.relatedPropertySlug) : null;

  const fourStep = currentLang === 'zh' ? article.fourStepPracticeZh : article.fourStepPracticeEn;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          href={`/${lang}/wisdom`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-yojqi-body hover:text-yojqi-ink transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{currentLang === 'zh' ? '返回所有随笔与指南' : 'Back to Somatic Journal'}</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span
            className={`px-3 py-1 text-xs font-medium tracking-wide rounded-full flex items-center gap-1.5 ${
              isTravel
                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
            }`}
          >
            {isTravel ? <Compass className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            {isTravel
              ? (currentLang === 'zh' ? '重庆天幕机位与旅宿' : 'Chongqing Drone Show & Travel')
              : (currentLang === 'zh' ? '躯体身心疗愈与迷走神经' : 'Somatic Healing & Vagus Nerve')}
          </span>
          <span className="text-xs text-yojqi-body font-mono">
            {article.publishDate} · {currentLang === 'zh' ? article.readTimeZh : article.readTimeEn}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading leading-[1.2]">
          {currentLang === 'zh' ? article.titleZh : article.titleEn}
        </h1>

        <p className="text-sm sm:text-base text-yojqi-body italic max-w-2xl">
          {currentLang === 'zh' ? article.summaryZh : article.summaryEn}
        </p>
      </div>

      {/* Strict 820x400 Featured Image Crop Container */}
      <div className="editorial-hero-crop shadow-card">
        <Image
          src={article.featuredImage}
          alt={currentLang === 'zh' ? article.titleZh : article.titleEn}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 820px) 100vw, 820px"
        />
      </div>

      {/* AI Search Optimization Direct Takeaway Banner */}
      <div className="yojqi-takeaway shadow-xs">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-yojqi-bronze mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yojqi-bronze" />
          <span>{dict.wisdom.directTakeaway}</span>
        </div>
        <p className="font-serif text-base sm:text-lg text-yojqi-inkHeading leading-relaxed">
          {currentLang === 'zh' ? article.directTakeawayZh : article.directTakeawayEn}
        </p>
      </div>

      {/* 4-Step Somatic Practice (if available) */}
      {fourStep && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-yojqi-border shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-yojqi-inkHeading">
              {dict.wisdom.fourStepPractice}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-yojqi-warm border border-yojqi-border">
              <span className="font-mono text-xs font-bold text-yojqi-bronze">01</span>
              <h4 className="font-serif text-sm font-semibold text-yojqi-ink mt-1">
                {fourStep.step1.title}
              </h4>
              <p className="text-xs text-yojqi-body mt-1 leading-relaxed">
                {fourStep.step1.desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-yojqi-warm border border-yojqi-border">
              <span className="font-mono text-xs font-bold text-yojqi-bronze">02</span>
              <h4 className="font-serif text-sm font-semibold text-yojqi-ink mt-1">
                {fourStep.step2.title}
              </h4>
              <p className="text-xs text-yojqi-body mt-1 leading-relaxed">
                {fourStep.step2.desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-yojqi-warm border border-yojqi-border">
              <span className="font-mono text-xs font-bold text-yojqi-bronze">03</span>
              <h4 className="font-serif text-sm font-semibold text-yojqi-ink mt-1">
                {fourStep.step3.title}
              </h4>
              <p className="text-xs text-yojqi-body mt-1 leading-relaxed">
                {fourStep.step3.desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-yojqi-warm border border-yojqi-border">
              <span className="font-mono text-xs font-bold text-yojqi-bronze">04</span>
              <h4 className="font-serif text-sm font-semibold text-yojqi-ink mt-1">
                {fourStep.step4.title}
              </h4>
              <p className="text-xs text-yojqi-body mt-1 leading-relaxed">
                {fourStep.step4.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Article Body HTML */}
      <div
        className="prose prose-neutral max-w-none text-yojqi-body text-sm sm:text-base leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{
          __html: currentLang === 'zh' ? article.contentHtmlZh : article.contentHtmlEn,
        }}
      />

      {/* Connected Product or Sanctuary Recommendation */}
      <div className="pt-8 border-t border-yojqi-border">
        {relatedProduct && (
          <div className="p-6 rounded-2xl bg-white border border-yojqi-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-yojqi-sand shrink-0">
                <Image
                  src={relatedProduct.heroImage}
                  alt={currentLang === 'zh' ? relatedProduct.nameZh : relatedProduct.nameEn}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <span className="text-xs font-mono font-medium text-yojqi-bronze uppercase block">
                  {dict.wisdom.exploreProduct}
                </span>
                <h4 className="font-serif text-lg font-medium text-yojqi-inkHeading">
                  {currentLang === 'zh' ? relatedProduct.nameZh : relatedProduct.nameEn}
                </h4>
                <p className="text-xs text-yojqi-body line-clamp-1 mt-0.5">
                  {currentLang === 'zh' ? relatedProduct.taglineZh : relatedProduct.taglineEn}
                </p>
              </div>
            </div>

            <Link
              href={`/${lang}/product/${relatedProduct.slug}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl yojqi-btn-primary text-xs font-medium flex items-center justify-center gap-2 shrink-0"
            >
              <span>${relatedProduct.price.toFixed(2)} · {currentLang === 'zh' ? '探索此选品' : 'View Product'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {relatedProperty && (
          <div className="p-6 rounded-2xl bg-white border border-yojqi-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                <Image
                  src={relatedProperty.heroImage}
                  alt={currentLang === 'zh' ? relatedProperty.nameZh : relatedProperty.nameEn}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <span className="text-xs font-mono font-medium text-amber-700 uppercase block">
                  {dict.wisdom.exploreSanctuary}
                </span>
                <h4 className="font-serif text-lg font-medium text-yojqi-inkHeading">
                  {currentLang === 'zh' ? relatedProperty.nameZh : relatedProperty.nameEn}
                </h4>
                <p className="text-xs text-yojqi-body line-clamp-1 mt-0.5">
                  {currentLang === 'zh' ? relatedProperty.badgeZh : relatedProperty.badgeEn}
                </p>
              </div>
            </div>

            <Link
              href={`/${lang}/retreats/${relatedProperty.slug}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl yojqi-btn-secondary text-xs font-medium flex items-center justify-center gap-2 shrink-0"
            >
              <span>{currentLang === 'zh' ? '探索此机位公寓' : 'Explore Apartment'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
