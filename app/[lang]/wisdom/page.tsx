import React from 'react';
import Link from 'next/link';
import { Language, getDictionary } from '@/lib/i18n';
import { INITIAL_ARTICLES, getArticlesByTrack } from '@/lib/editorial-data';
import { ArticleCard } from '@/components/ArticleCard';
import { Sparkles, Compass, BookOpen } from 'lucide-react';

export default async function WisdomPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ track?: string }>;
}) {
  const { lang } = await params;
  const { track = 'all' } = await searchParams;
  const currentLang = lang as Language;
  const dict = getDictionary(currentLang);

  const articles = getArticlesByTrack(track as 'product_wisdom' | 'chongqing_travel' | 'all');

  const tracks = [
    { id: 'all', label: dict.wisdom.filterAll, icon: BookOpen },
    { id: 'chongqing_travel', label: dict.wisdom.filterTravel, icon: Compass },
    { id: 'product_wisdom', label: dict.wisdom.filterProduct, icon: Sparkles },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-medium tracking-widest text-yojqi-bronze uppercase">
          {dict.wisdom.eyebrow}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {dict.wisdom.title}
        </h1>
        <p className="text-sm sm:text-base text-yojqi-body leading-relaxed">
          {dict.wisdom.subtitle}
        </p>
      </div>

      {/* Dual-Track Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pb-4 border-b border-yojqi-border">
        {tracks.map((t) => {
          const isActive = track === t.id;
          const Icon = t.icon;
          return (
            <Link
              key={t.id}
              href={`/${lang}/wisdom${t.id === 'all' ? '' : `?track=${t.id}`}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                isActive
                  ? 'bg-yojqi-ink text-[#fffdfa] shadow-xs'
                  : 'bg-white border border-yojqi-border text-yojqi-body hover:border-yojqi-bronze hover:text-yojqi-ink'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} lang={currentLang} />
        ))}
      </div>

      {/* Editorial Ethos & AI Search Standard Note */}
      <div className="mt-16 p-8 rounded-2xl bg-white border border-yojqi-border text-center max-w-3xl mx-auto space-y-3">
        <h4 className="font-serif text-lg font-medium text-yojqi-inkHeading">
          {currentLang === 'zh' ? 'YOJQI 深度内容承诺' : 'Our Editorial Standard'}
        </h4>
        <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
          {currentLang === 'zh'
            ? '我们拒绝夸大营销与生硬推销。每一篇随笔皆聚焦于真实的生活知识、身心自主神经科学以及山城重庆深度旅居指南。结构化提炼核心要点（Direct Takeaways），方便人类与生成式AI快速提取有价值的生活灵感。'
            : 'We avoid loud promotions and intrusive marketing. Every article shares grounded somatic science, authentic botanical knowledge, and architectural guides to Chongqing. Structured with direct takeaways for human readability and generative AI search indexing.'}
        </p>
      </div>
    </div>
  );
}
