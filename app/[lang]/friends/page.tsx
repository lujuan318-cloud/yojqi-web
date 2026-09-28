'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Sparkles,
  Users,
  Heart,
  Send,
  MessageCircle,
  Plus,
  Coffee,
  Flame,
  BookOpen,
  Gift,
  Check,
  Filter
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { getCommunityPosts, toggleFeelYou, addPostNote } from '@/lib/journey-store';
import { CommunityPost } from '@/lib/journey-data';
import { CareModal } from '@/components/CareModal';

export default function FriendsPage() {
  const params = useParams();
  const lang = (params.lang as Language) || 'en';
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [careModalOpen, setCareModalOpen] = useState(false);
  const [activePostForCare, setActivePostForCare] = useState<CommunityPost | null>(null);
  const [noteInputMap, setNoteInputMap] = useState<Record<string, string>>({});
  const [activeNoteBoxId, setActiveNoteBoxId] = useState<string | null>(null);

  const reloadPosts = () => {
    setPosts(getCommunityPosts());
  };

  useEffect(() => {
    reloadPosts();
  }, []);

  const handleFeelYou = (postId: string) => {
    const updated = toggleFeelYou(postId);
    if (updated) {
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...updated } : p)));
    }
  };

  const handleOpenCare = (post: CommunityPost) => {
    setActivePostForCare(post);
    setCareModalOpen(true);
  };

  const handleAddNote = (postId: string) => {
    const content = (noteInputMap[postId] || '').trim();
    if (!content) return;
    const updated = addPostNote(postId, content, isZh ? '同行知音' : 'A thoughtful traveler');
    if (updated) {
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...updated } : p)));
      setNoteInputMap((prev) => ({ ...prev, [postId]: '' }));
      setActiveNoteBoxId(null);
    }
  };

  const categories = [
    { id: 'all', labelZh: '全部心境', labelEn: 'All States' },
    { id: 'tired', labelZh: '身心疲惫', labelEn: 'Tired' },
    { id: 'stressed', labelZh: '思绪纷扰', labelEn: 'Stressed' },
    { id: 'lonely', labelZh: '独处落寞', labelEn: 'Lonely' },
    { id: 'grateful', labelZh: '心怀从容', labelEn: 'Grateful' },
    { id: 'hopeful', labelZh: '心生微光', labelEn: 'Hopeful' },
    { id: 'talk', labelZh: '无处安放', labelEn: 'Just need to talk' },
  ];

  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((p) => p.feelingCategory === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* 1. Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono uppercase tracking-widest">
          <Users className="w-3.5 h-3.5" />
          <span>{dict.friendsPage.headline}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {dict.friendsPage.headline}
        </h1>
        <p className="font-serif text-lg sm:text-xl text-yojqi-bronze italic max-w-xl mx-auto">
          “{dict.friendsPage.subheadline}”
        </p>
      </div>

      {/* 2. Share Feeling Trigger Callout */}
      <div className="p-6 rounded-3xl bg-yojqi-lift border border-amber-900/15 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-lg font-semibold text-yojqi-inkHeading">
            {isZh ? '今夜，有想倾诉的心绪吗？' : 'Carrying something heavy tonight?'}
          </h3>
          <p className="text-xs text-yojqi-body">
            {isZh
              ? '前往倾听室自由安放，可完全私藏，亦可隐去身份匿名托付。'
              : 'Express in the Listening Room. Keep 100% private, or share anonymously.'}
          </p>
        </div>

        <Link
          href={`/${lang}/listen`}
          className="px-6 py-3 rounded-xl yojqi-btn-primary text-xs font-mono uppercase tracking-widest flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{dict.friendsPage.shareFeelingBtn}</span>
        </Link>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span>{isZh ? '状态' : 'Filter'}:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-yojqi-ink text-[#fffdfa]'
                : 'bg-yojqi-sand text-yojqi-body hover:bg-neutral-200'
            }`}
          >
            {isZh ? cat.labelZh : cat.labelEn}
          </button>
        ))}
      </div>

      {/* 4. Anonymous Community Posts Stream */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-5"
          >
            {/* Top Post Meta */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze font-mono text-[11px]">
                  {isZh ? post.feelingLabelZh : post.feelingLabelEn}
                </span>
                <span className="text-neutral-400 font-serif">·</span>
                <span className="text-neutral-500 font-mono text-[11px]">{post.authorAlias}</span>
              </div>
              <span className="text-neutral-400 text-[11px] font-mono">{post.timestamp}</span>
            </div>

            {/* Post Content */}
            <p className="font-serif text-base sm:text-lg text-yojqi-ink leading-relaxed">
              “{post.content}”
            </p>

            {/* Care Items Received by this Post */}
            {post.careItems && post.careItems.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-900/10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 block font-semibold">
                  {isZh ? '同修送达的温存心意' : 'Care Items Received'}
                </span>
                <div className="space-y-1.5">
                  {post.careItems.map((ci) => (
                    <div key={ci.id} className="flex items-start gap-2 text-xs text-amber-950">
                      <span className="text-amber-700 font-medium">[{isZh ? ci.typeLabelZh : ci.typeLabelEn}]</span>
                      <span className="text-neutral-600 leading-snug">{ci.message}</span>
                      <span className="text-[10px] text-neutral-400 ml-auto shrink-0 font-mono">— {ci.from}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Thread */}
            {post.notes && post.notes.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                  {isZh ? '留言寄语' : 'Gentle Notes'}
                </span>
                <div className="space-y-1.5">
                  {post.notes.map((note) => (
                    <div key={note.id} className="p-2.5 rounded-xl bg-yojqi-warm text-xs text-yojqi-ink flex items-start justify-between gap-3">
                      <p className="leading-relaxed">
                        <strong className="font-medium text-yojqi-bronze mr-1.5">{note.author}:</strong>
                        {note.content}
                      </p>
                      <span className="text-[10px] font-mono text-neutral-400 shrink-0">{note.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inline Note Box */}
            {activeNoteBoxId === post.id && (
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={noteInputMap[post.id] || ''}
                  onChange={(e) =>
                    setNoteInputMap((prev) => ({ ...prev, [post.id]: e.target.value }))
                  }
                  placeholder={isZh ? '留下一句温暖的寄语...' : 'Leave a gentle note...'}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-yojqi-border bg-white text-yojqi-ink focus:outline-none focus:border-yojqi-bronze"
                />
                <button
                  type="button"
                  onClick={() => handleAddNote(post.id)}
                  className="px-4 py-2 rounded-xl yojqi-btn-primary text-xs font-mono uppercase tracking-wider"
                >
                  {isZh ? '发送' : 'Send'}
                </button>
              </div>
            )}

            {/* Community Actions (I Feel You, Send Care, Leave Note) */}
            <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* 1. I Feel You */}
                <button
                  type="button"
                  onClick={() => handleFeelYou(post.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs transition-colors ${
                    post.hasFeltYou
                      ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.hasFeltYou ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{dict.friendsPage.feelYouBtn}</span>
                  <span className="font-mono text-[11px]">({post.feelYouCount})</span>
                </button>

                {/* 2. Leave Note */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveNoteBoxId(activeNoteBoxId === post.id ? null : post.id)
                  }
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-200 text-neutral-600 hover:border-neutral-400 text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{dict.friendsPage.leaveNoteBtn}</span>
                  <span className="font-mono text-[11px]">({post.notes?.length || 0})</span>
                </button>
              </div>

              {/* 3. Send Care */}
              <button
                type="button"
                onClick={() => handleOpenCare(post)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yojqi-sand text-yojqi-bronze hover:bg-yojqi-lift text-xs font-medium transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{dict.friendsPage.sendCareBtn}</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Send Care Modal */}
      <CareModal
        isOpen={careModalOpen}
        onClose={() => setCareModalOpen(false)}
        postId={activePostForCare?.id}
        recipientName={activePostForCare?.authorAlias}
        lang={lang}
        onCareSent={reloadPosts}
      />
    </div>
  );
}
