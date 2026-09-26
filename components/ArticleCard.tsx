'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { EditorialArticle } from '@/lib/editorial-data';
import { Language, getDictionary } from '@/lib/i18n';

interface ArticleCardProps {
  article: EditorialArticle;
  lang: Language;
}

export function ArticleCard({ article, lang }: ArticleCardProps) {
  const dict = getDictionary(lang);

  const isTravel = article.track === 'chongqing_travel';

  return (
    <article className="group bg-white rounded-2xl border border-yojqi-border hover:border-yojqi-borderAccent hover:shadow-cardHover transition-all duration-300 overflow-hidden flex flex-col">
      {/* Strict 820x400 Crop Ratio Container */}
      <Link
        href={`/${lang}/wisdom/${article.slug}`}
        className="relative w-full aspect-[820/400] bg-neutral-100 overflow-hidden block"
      >
        <Image
          src={article.featuredImage}
          alt={lang === 'zh' ? article.titleZh : article.titleEn}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 text-[11px] font-medium tracking-wide rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-xs ${
              isTravel
                ? 'bg-amber-900/85 text-amber-100'
                : 'bg-emerald-950/85 text-emerald-100'
            }`}
          >
            {isTravel ? <Compass className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            {isTravel
              ? (lang === 'zh' ? '重庆天幕机位与旅宿' : 'Chongqing Drone Show & Travel')
              : (lang === 'zh' ? '躯体身心疗愈与迷走神经' : 'Somatic Healing & Vagus Nerve')}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-yojqi-body mb-2.5">
            <span className="font-mono text-neutral-400">{article.publishDate}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-400" />
              <span>{lang === 'zh' ? article.readTimeZh : article.readTimeEn}</span>
            </span>
          </div>

          <Link href={`/${lang}/wisdom/${article.slug}`}>
            <h3 className="font-serif text-xl font-medium text-yojqi-inkHeading group-hover:text-yojqi-bronze transition-colors line-clamp-2 leading-snug">
              {lang === 'zh' ? article.titleZh : article.titleEn}
            </h3>
          </Link>

          <p className="text-xs text-yojqi-body line-clamp-2 mt-2 leading-relaxed">
            {lang === 'zh' ? article.summaryZh : article.summaryEn}
          </p>

          {/* AI Search Optimization Direct Takeaway Snippet */}
          <div className="mt-4 p-3 bg-yojqi-warm rounded-lg border-l-3 border-yojqi-bronze text-xs text-yojqi-bodyStrong leading-relaxed">
            <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-yojqi-bronze mb-1">
              {dict.wisdom.directTakeaway}
            </div>
            <p className="line-clamp-2">
              {lang === 'zh' ? article.directTakeawayZh : article.directTakeawayEn}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
          <span className="text-yojqi-body font-medium">
            {lang === 'zh' ? article.authorZh : article.authorEn}
          </span>
          <Link
            href={`/${lang}/wisdom/${article.slug}`}
            className="flex items-center gap-1 text-yojqi-ink group-hover:text-yojqi-bronze font-medium transition-colors"
          >
            <span>{lang === 'zh' ? '阅读全文' : 'Read Article'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
