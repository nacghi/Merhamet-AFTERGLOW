import React, { useState } from 'react';
import { useNovel } from '../context/NovelContext';
import { Chapter } from '../types';
import { AtmosphericMountainSky } from './AtmosphericMountainSky';
import { EagleIcon, DoveIcon, SignpostSymbol, MountainRidgeIcon } from './Symbols';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Search,
  ArrowRight,
  Sparkles,
  Flame,
  Bookmark,
} from 'lucide-react';

function toRoman(num: number): string {
  const romanMap: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let result = '';
  for (const [val, roman] of romanMap) {
    while (num >= val) {
      result += roman;
      num -= val;
    }
  }
  return result || `${num}`;
}

export const MobileStoryView: React.FC = () => {
  const { chapters, readingProgress, navigateTo, language } = useNovel();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const isDarija = language === 'darija';

  const publishedChapters = chapters
    .filter((c) => c.status === 'published')
    .sort((a, b) => a.chapterNumber - b.chapterNumber);

  const filteredChapters = publishedChapters.filter((ch) => {
    const prog = readingProgress[`local-reader_${ch.id}`]?.progress || 0;
    const titleMatch =
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ch.titleDarija && ch.titleDarija.toLowerCase().includes(searchTerm.toLowerCase()));
    const excerptMatch =
      (ch.excerpt && ch.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ch.excerptDarija && ch.excerptDarija.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSearch = !searchTerm || titleMatch || excerptMatch;

    if (!matchesSearch) return false;
    if (filter === 'unread') return prog === 0;
    if (filter === 'read') return prog > 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#030611] text-[#e2ebf5] pb-28">
      {/* Header Mountain Skyline */}
      <AtmosphericMountainSky
        variant="compact"
        showEagle={true}
        showMist={true}
        showStars={true}
        showMoon={true}
        className="py-8 px-5 text-center border-b border-white/[0.07]"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono tracking-widest text-[#9cb5d3] uppercase mb-2">
          <SignpostSymbol className="w-3.5 h-3.5 text-[#e39264]" />
          <span>{isDarija ? 'مخطوطات الورياغل' : 'The Pass Chronicles'}</span>
        </div>

        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-[#edf4fd] ${isDarija ? 'font-arabic' : 'font-display'}`}>
          {isDarija ? 'فصول حكاية الشفق' : 'THE CHRONICLES'}
        </h1>
        
        <p className={`text-xs sm:text-sm text-[#8fa8c8] mt-1 max-w-xs mx-auto ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
          {isDarija
            ? 'عبر ممرات جبال الأطلس، تتبع خطوات لينا وسورين وسط الثلج والذكريات.'
            : 'Traverse the mountain trails of light, dusk, and sovereign memory.'}
        </p>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {[
            { id: 'all' as const, label: isDarija ? 'جميع الفصول' : 'All Chapters' },
            { id: 'unread' as const, label: isDarija ? 'لم يُقرأ' : 'Unread' },
            { id: 'read' as const, label: isDarija ? 'قيد القراءة' : 'In Progress' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                filter === tab.id
                  ? 'bg-[#182949] text-[#e39264] border border-[#7292bf]/50 shadow-[0_0_12px_rgba(114,146,191,0.3)]'
                  : 'bg-[#080e1c]/80 text-[#718aa8] border border-white/[0.06] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </AtmosphericMountainSky>

      {/* Chapters Mountain Waypoint Trail */}
      <div className="max-w-md md:max-w-xl mx-auto px-4 pt-6 space-y-4">
        {filteredChapters.length === 0 ? (
          <div className="text-center py-14 text-[#6e85a4]">
            <DoveIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="font-serif italic text-sm">
              {isDarija ? 'لا توجد فصول مطابقة.' : 'No chapters match your selection.'}
            </p>
          </div>
        ) : (
          filteredChapters.map((chapter, index) => {
            const prog = readingProgress[`local-reader_${chapter.id}`]?.progress || 0;
            const isCompleted = prog >= 95;
            const romanNum = toRoman(chapter.chapterNumber);

            return (
              <div
                key={chapter.id}
                onClick={() => navigateTo('reader', { chapterId: chapter.id })}
                className="group relative cursor-pointer rounded-2xl bg-[#081022]/90 border border-white/[0.07] hover:border-[#7b9cca]/50 p-4 sm:p-5 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(8,16,36,0.7)] overflow-hidden"
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#142345]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative flex flex-col gap-2.5">
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#e39264] tracking-widest uppercase font-semibold flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-[#e39264]" />
                      <span>{isDarija ? `الفصل ${chapter.chapterNumber}` : `CHAPTER ${romanNum}`}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-[#8fd19e] text-[10px] bg-[#11261b] px-2 py-0.5 rounded-full border border-[#2b593a]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{isDarija ? 'مكتمل' : 'Completed'}</span>
                        </span>
                      ) : prog > 0 ? (
                        <span className="text-[#8eb1d4] text-[10px] bg-[#13213a] px-2 py-0.5 rounded-full border border-[#7899c4]/30">
                          {prog}% {isDarija ? 'مقروء' : 'read'}
                        </span>
                      ) : (
                        <span className="text-[#657d9d] text-[10px]">
                          {isDarija ? 'جديد' : 'Unread'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chapter Title */}
                  <h3 className={`text-lg font-bold text-[#edf4fd] group-hover:text-white transition-colors ${isDarija ? 'font-arabic text-xl' : 'font-display'}`}>
                    {isDarija ? chapter.titleDarija || chapter.title : chapter.title}
                  </h3>

                  {/* Excerpt */}
                  {(chapter.excerpt || chapter.excerptDarija) && (
                    <p className={`text-xs sm:text-sm text-[#8fa8c8] line-clamp-2 leading-relaxed ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
                      “{isDarija ? chapter.excerptDarija || chapter.excerpt : chapter.excerpt}”
                    </p>
                  )}

                  {/* Progress bar if in progress */}
                  {prog > 0 && prog < 95 && (
                    <div className="w-full h-1 bg-[#131f38] rounded-full overflow-hidden my-1">
                      <div
                        className="h-full bg-gradient-to-r from-[#7a9ec7] to-[#e39264] rounded-full"
                        style={{ width: `${prog}%` }}
                      />
                    </div>
                  )}

                  {/* Footer Meta Row */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.05] mt-1 text-[11px] font-mono text-[#6c86a6]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#7994b6]" />
                        <span>{chapter.readingTimeMinutes || 7} {isDarija ? 'دقائق' : 'min'}</span>
                      </span>
                      <span>•</span>
                      <span>{chapter.wordCount || 1900} {isDarija ? 'كلمة' : 'words'}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#9fb9dc] group-hover:text-[#e39264] transition-colors font-sans text-xs font-semibold">
                      <span>{prog > 0 ? (isDarija ? 'متابعة' : 'Resume') : (isDarija ? 'قراءة' : 'Read')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
