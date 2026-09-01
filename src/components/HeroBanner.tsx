import React from 'react';
import {
  BookOpen,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  Clock,
  Bookmark,
  Feather,
  Flame,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';

export const HeroBanner: React.FC = () => {
  const {
    settings,
    chapters,
    characters,
    scenes,
    navigateTo,
    getLatestReadingProgress,
  } = useNovel();

  const publishedChapters = chapters.filter((c) => c.status === 'published');
  const latestChapter = publishedChapters[publishedChapters.length - 1];
  const firstChapter = publishedChapters[0];
  const latestProgress = getLatestReadingProgress();

  const totalWords = chapters.reduce((acc, c) => acc + (c.wordCount || 0), 0);

  return (
    <div className="relative overflow-hidden pt-6 pb-12 lg:py-16">
      {/* Background artwork blend */}
      <div className="absolute inset-0 z-0">
        <img
          src={settings.coverImage || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop'}
          alt="Afterglow Universe Backdrop"
          className="w-full h-full object-cover object-center opacity-20 filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/80 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0c0d12]/70 to-[#0c0d12]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Novel Introduction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c49b66]/15 border border-[#c49b66]/30 text-[#faebd7] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a373] animate-pulse" />
              <span>Epic Fantasy & Celestial Saga</span>
              <span className="w-1 h-1 rounded-full bg-[#c49b66]" />
              <span className="text-[#c49b66] lowercase">{settings.releaseSchedule || 'Weekly Releases'}</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#faebd7] tracking-wider leading-tight">
                {settings.novelTitle}
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl text-[#d4a373] font-normal leading-relaxed">
                "{settings.novelSubtitle}"
              </p>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl font-sans">
              {settings.synopsis}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {latestProgress ? (
                <button
                  onClick={() => navigateTo('reader', { chapterId: latestProgress.chapterId })}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b08044] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 font-bold text-sm transition-all shadow-xl shadow-[#c49b66]/25 flex items-center gap-2.5 group"
                >
                  <Bookmark className="w-4 h-4 text-neutral-950" />
                  <span>Resume Reading (Ch. {latestProgress.chapterNumber})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                firstChapter && (
                  <button
                    onClick={() => navigateTo('reader', { chapterId: firstChapter.id })}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b08044] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 font-bold text-sm transition-all shadow-xl shadow-[#c49b66]/25 flex items-center gap-2.5 group"
                  >
                    <BookOpen className="w-4 h-4 text-neutral-950" />
                    <span>Begin Chapter 1</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )
              )}

              {latestChapter && (
                <button
                  onClick={() => navigateTo('reader', { chapterId: latestChapter.id })}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#c49b66]/50 text-neutral-200 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 text-[#d4a373]" />
                  <span>Latest: Ch. {latestChapter.chapterNumber}</span>
                </button>
              )}

              <button
                onClick={() => navigateTo('characters')}
                className="px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-neutral-400 hover:text-neutral-200 text-sm transition-colors flex items-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                <span>Explore Codex</span>
              </button>
            </div>

            {/* Quick Universe Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg">
              <div>
                <div className="font-display font-bold text-2xl text-[#faebd7]">
                  {publishedChapters.length}
                </div>
                <div className="text-xs text-neutral-400">Published Chapters</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-[#faebd7]">
                  {totalWords.toLocaleString()}
                </div>
                <div className="text-xs text-neutral-400">Total Words</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-[#faebd7]">
                  {characters.length}
                </div>
                <div className="text-xs text-neutral-400">Main Characters</div>
              </div>
            </div>
          </div>

          {/* Featured Latest Chapter Card */}
          <div className="lg:col-span-5">
            {latestChapter && (
              <div className="relative group rounded-2xl bg-gradient-to-b from-[#181a26] to-[#10121a] border border-[#c49b66]/30 overflow-hidden shadow-2xl p-1">
                {latestChapter.coverImage && (
                  <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden">
                    <img
                      src={latestChapter.coverImage}
                      alt={latestChapter.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#c49b66] text-neutral-950 font-bold text-xs">
                        Chapter {latestChapter.chapterNumber}
                      </span>
                      {latestChapter.isNew && (
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/90 text-white font-bold text-xs uppercase tracking-wider animate-pulse">
                          New Release
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#c49b66]" />
                      {latestChapter.readingTimeMinutes || 8} min read
                    </span>
                    <span>{latestChapter.publicationDate}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#faebd7] group-hover:text-[#c49b66] transition-colors leading-snug">
                    {latestChapter.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed">
                    {latestChapter.excerpt ||
                      latestChapter.content.replace(/^#.*\n+/, '').substring(0, 160) + '...'}
                  </p>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      onClick={() => navigateTo('reader', { chapterId: latestChapter.id })}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#c49b66]/20 hover:bg-[#c49b66] text-[#faebd7] hover:text-neutral-950 font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-[#c49b66]/40"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read Chapter {latestChapter.chapterNumber}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
