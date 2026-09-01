import React, { useState, useEffect, useRef } from 'react';
import { useNovel } from '../context/NovelContext';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Volume2,
  VolumeX,
  Languages,
  ArrowLeft,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { EagleIcon, DoveIcon, SignpostSymbol } from './Symbols';
import { ambientAudio } from '../services/ambientAudio';
import { NovelTextRenderer } from './NovelTextRenderer';

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

export const MobileReaderView: React.FC = () => {
  const {
    chapters,
    selectedChapterId,
    navigateTo,
    readingProgress,
    saveProgress,
    readerSettings,
    updateReaderSettings,
    isFavorited,
    toggleFavorite,
    language,
    toggleLanguage,
  } = useNovel();

  const [showControls, setShowControls] = useState(true);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(() => ambientAudio.getIsPlaying());

  const containerRef = useRef<HTMLDivElement>(null);
  const isDarija = language === 'darija';

  const publishedChapters = chapters
    .filter((c) => c.status === 'published')
    .sort((a, b) => a.chapterNumber - b.chapterNumber);

  const currentChapter =
    publishedChapters.find((c) => c.id === selectedChapterId) || publishedChapters[0];

  const currentIndex = publishedChapters.findIndex((c) => c.id === currentChapter?.id);
  const prevChapter = currentIndex > 0 ? publishedChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex >= 0 && currentIndex < publishedChapters.length - 1
      ? publishedChapters[currentIndex + 1]
      : null;

  const isSaved = currentChapter ? isFavorited('chapter', currentChapter.id) : false;

  // Auto-hide controls after 4 seconds of reading
  useEffect(() => {
    if (!showControls) return;
    const timer = setTimeout(() => {
      if (!showSettingsDrawer) {
        setShowControls(false);
      }
    }, 4500);
    return () => clearTimeout(timer);
  }, [showControls, showSettingsDrawer]);

  // Scroll listener for reading progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const currentProg = Math.min(
          100,
          Math.max(0, Math.round((el.scrollTop / totalHeight) * 100))
        );
        setScrollProgress(currentProg);

        if (
          currentChapter &&
          Math.abs(
            currentProg - (readingProgress[`local-reader_${currentChapter.id}`]?.progress || 0)
          ) >= 4
        ) {
          saveProgress(currentChapter.id, currentProg, el.scrollTop);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentChapter, readingProgress, saveProgress]);

  const toggleSound = () => {
    const active = ambientAudio.toggle();
    setIsAudioPlaying(active);
  };

  const handleToggleControls = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('a')) {
      return;
    }
    setShowControls((prev) => !prev);
  };

  if (!currentChapter) {
    return (
      <div className="min-h-screen bg-[#030611] text-[#e2ebf5] flex items-center justify-center p-6 text-center">
        <div>
          <p className="font-serif italic text-base text-[#8fa8c8]">
            {isDarija ? 'الفصل غير موجود.' : 'Chapter not found.'}
          </p>
          <button
            onClick={() => navigateTo('chapters')}
            className="mt-4 px-4 py-2 rounded-xl bg-[#14223d] text-xs font-mono text-[#e39264]"
          >
            {isDarija ? 'الرجوع للرواية' : 'Return to Story'}
          </button>
        </div>
      </div>
    );
  }

  const roman = toRoman(currentChapter.chapterNumber);
  const chapterTitle = isDarija
    ? currentChapter.titleDarija || currentChapter.title
    : currentChapter.title;
  const chapterContent = isDarija
    ? currentChapter.contentDarija || currentChapter.content
    : currentChapter.content;
  const chapterExcerpt = isDarija
    ? currentChapter.excerptDarija || currentChapter.excerpt
    : currentChapter.excerpt;

  return (
    <div
      ref={containerRef}
      onClick={handleToggleControls}
      className="min-h-screen bg-[#030611] text-[#d6e2ee] selection:bg-[#5b7ea8]/40 selection:text-[#ffffff] pb-28 relative"
      style={{
        fontSize: `${readerSettings.fontSize || 19}px`,
        lineHeight: readerSettings.lineHeight || 1.75,
      }}
    >
      {/* Subtle Night Atmosphere Background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,28,58,0.45)_0%,rgba(3,6,17,0.98)_100%)]" />

      {/* 1. Top Floating Reading Header (Fades away while reading) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl bg-[#030611]/92 border-b border-white/[0.06] ${
          showControls
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigateTo('chapters')}
            className="p-2 rounded-xl text-[#8fa8c8] hover:text-white hover:bg-white/[0.04] transition-all flex items-center gap-1.5 text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{isDarija ? 'الفصول' : 'Story'}</span>
          </button>

          {/* Chapter indicator */}
          <div className="text-center truncate px-2">
            <span className="text-[10px] font-mono tracking-widest text-[#e39264] uppercase block">
              {isDarija ? `الفصل ${currentChapter.chapterNumber}` : `CHAPTER ${roman}`}
            </span>
            <span className={`text-xs font-bold text-[#eef4fb] truncate block max-w-[180px] sm:max-w-xs ${isDarija ? 'font-arabic' : 'font-display'}`}>
              {chapterTitle}
            </span>
          </div>

          {/* Right Tools: Language, Sound, Bookmark, Settings */}
          <div className="flex items-center gap-1">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-xl text-[#8fa8c8] hover:text-white hover:bg-white/[0.04] transition-all"
              title={isDarija ? 'Switch to English' : 'التحويل إلى الدارجة'}
            >
              <Languages className="w-4 h-4 text-[#e39264]" />
            </button>

            {/* Sound Ambience */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl transition-all ${
                isAudioPlaying ? 'text-[#e39264] bg-[#142340]' : 'text-[#8fa8c8] hover:text-white'
              }`}
              title={isAudioPlaying ? 'Mute Mountain Wind' : 'Play Mountain Wind'}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleFavorite('chapter', currentChapter.id)}
              className={`p-2 rounded-xl transition-all ${
                isSaved ? 'text-[#e39264]' : 'text-[#8fa8c8] hover:text-white'
              }`}
              title={isSaved ? 'Remove Bookmark' : 'Bookmark Chapter'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Settings */}
            <button
              onClick={() => setShowSettingsDrawer((prev) => !prev)}
              className="p-2 rounded-xl text-[#8fa8c8] hover:text-white transition-all"
              title="Typography & Atmosphere"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar under header */}
        <div className="w-full h-[2px] bg-white/[0.04]">
          <div
            className="h-full bg-gradient-to-r from-[#7a9ec7] to-[#e39264] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* 2. Settings Drawer */}
      {showSettingsDrawer && (
        <div className="fixed top-14 right-4 z-50 w-72 rounded-2xl backdrop-blur-2xl bg-[#081022]/95 border border-white/10 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8da7c7] pb-2 border-b border-white/[0.06] mb-3">
            <span>{isDarija ? 'إعدادات القراءة' : 'Reading Atmosphere'}</span>
            <button
              onClick={() => setShowSettingsDrawer(false)}
              className="text-[#8da7c7] hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#9eb6d2] mb-1.5 font-mono">
                <span>{isDarija ? 'حجم الخط' : 'Font Size'}</span>
                <span>{readerSettings.fontSize}px</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateReaderSettings({ fontSize: Math.max(15, readerSettings.fontSize - 1) })
                  }
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-[#9eb6d2] hover:text-white"
                >
                  A-
                </button>
                <input
                  type="range"
                  min="15"
                  max="28"
                  value={readerSettings.fontSize}
                  onChange={(e) => updateReaderSettings({ fontSize: Number(e.target.value) })}
                  className="w-full accent-[#7292bf]"
                />
                <button
                  onClick={() =>
                    updateReaderSettings({ fontSize: Math.min(28, readerSettings.fontSize + 1) })
                  }
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-[#9eb6d2] hover:text-white"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Line Height */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#9eb6d2] mb-1.5 font-mono">
                <span>{isDarija ? 'التباعد' : 'Spacing'}</span>
                <span>{readerSettings.lineHeight.toFixed(2)}x</span>
              </div>
              <div className="flex gap-2">
                {[1.6, 1.75, 1.95].map((lh) => (
                  <button
                    key={lh}
                    onClick={() => updateReaderSettings({ lineHeight: lh })}
                    className={`flex-1 py-1 rounded-lg text-xs font-mono transition-all ${
                      readerSettings.lineHeight === lh
                        ? 'bg-[#182949] text-[#e39264] border border-[#7292bf]/40'
                        : 'bg-white/5 text-[#8aa4c4] border border-white/5 hover:text-white'
                    }`}
                  >
                    {lh === 1.6
                      ? isDarija
                        ? 'ضيق'
                        : 'Tight'
                      : lh === 1.75
                      ? isDarija
                        ? 'عادي'
                        : 'Normal'
                      : isDarija
                      ? 'مريح'
                      : 'Spacious'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Reading Text Body */}
      <main className="relative z-10 max-w-2xl mx-auto px-5 sm:px-6 pt-24 pb-16">
        {/* Chapter Title & Header */}
        <div className={`text-center mb-12 pb-8 border-b border-white/[0.06] ${isDarija ? 'font-arabic' : ''}`}>
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#e39264] mb-3">
            <EagleIcon className="w-3.5 h-3.5" />
            <span>{isDarija ? `الفصل ${currentChapter.chapterNumber}` : `Chapter ${roman}`}</span>
          </div>

          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#edf4fd] tracking-wide leading-tight ${isDarija ? 'font-arabic text-[#edf4fd]' : 'font-display'}`}>
            {chapterTitle}
          </h1>

          {chapterExcerpt && (
            <p className={`text-base sm:text-lg text-[#9cb5d3] max-w-lg mx-auto mt-4 leading-relaxed ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
              “{chapterExcerpt}”
            </p>
          )}

          <div className="flex items-center justify-center gap-4 text-xs font-mono text-[#6983a3] mt-4">
            <span>{currentChapter.readingTimeMinutes || 7} {isDarija ? 'دقائق قراءة' : 'min read'}</span>
            <span>•</span>
            <span>{currentChapter.wordCount || 1900} {isDarija ? 'كلمة' : 'words'}</span>
          </div>
        </div>

        {/* Prose Content with full Moroccan Darija / Arabic typography */}
        <div className="novel-prose text-[#d3e0ed] space-y-6">
          <NovelTextRenderer content={chapterContent} isArabic={isDarija} />
        </div>

        {/* Chapter End Signpost Flourish */}
        <div className="text-center my-14 pt-8 border-t border-white/[0.06]">
          <DoveIcon className="w-6 h-6 text-[#8ea8c8] mx-auto mb-3 opacity-80" />
          <p className={`text-xs text-[#718dae] ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
            {isDarija
              ? `نهاية الفصل ${currentChapter.chapterNumber} • جبال الورياغل`
              : `End of Chapter ${roman} • Alweryaghl Chronicle`}
          </p>
        </div>

        {/* Chapter Navigation Footer */}
        <div className="flex items-center justify-between gap-3 pt-6">
          {prevChapter ? (
            <button
              onClick={() => navigateTo('reader', { chapterId: prevChapter.id })}
              className="flex-1 p-3.5 rounded-2xl bg-[#081022] border border-white/[0.08] hover:border-[#7b9cca]/40 text-left transition-all group"
            >
              <span className="text-[10px] font-mono uppercase text-[#738ea0] flex items-center gap-1 mb-1">
                <ChevronLeft className="w-3 h-3" />
                {isDarija ? 'الفصل السابق' : 'Previous Chapter'}
              </span>
              <h5 className={`text-xs font-bold text-[#eef4fb] truncate group-hover:text-white ${isDarija ? 'font-arabic' : 'font-display'}`}>
                {isDarija
                  ? prevChapter.titleDarija || prevChapter.title
                  : `Ch. ${prevChapter.chapterNumber}: ${prevChapter.title}`}
              </h5>
            </button>
          ) : (
            <div className="flex-1" />
          )}

          {nextChapter && (
            <button
              onClick={() => navigateTo('reader', { chapterId: nextChapter.id })}
              className="flex-1 p-3.5 rounded-2xl bg-gradient-to-r from-[#142345] to-[#1d325e] border border-[#7b9cca]/40 hover:border-[#e39264]/60 text-right transition-all group shadow-[0_4px_16px_rgba(16,28,58,0.5)]"
            >
              <span className="text-[10px] font-mono uppercase text-[#e39264] flex items-center justify-end gap-1 mb-1">
                {isDarija ? 'الفصل التالي' : 'Next Chapter'}
                <ChevronRight className="w-3 h-3" />
              </span>
              <h5 className={`text-xs font-bold text-[#eef4fb] truncate group-hover:text-white ${isDarija ? 'font-arabic' : 'font-display'}`}>
                {isDarija
                  ? nextChapter.titleDarija || nextChapter.title
                  : `Ch. ${nextChapter.chapterNumber}: ${nextChapter.title}`}
              </h5>
            </button>
          )}
        </div>
      </main>

      {/* 4. Bottom Floating Reading Status Pill (Visible when controls are hidden) */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 pointer-events-none ${
          !showControls ? 'opacity-85 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="px-3.5 py-1.5 rounded-full backdrop-blur-md bg-[#070d1e]/85 border border-white/10 text-[10px] font-mono text-[#8fa8c8] flex items-center gap-2 shadow-lg">
          <span className="text-[#e39264] font-semibold">
            {isDarija ? `فصل ${currentChapter.chapterNumber}` : `Ch. ${roman}`}
          </span>
          <span>•</span>
          <span>{scrollProgress}%</span>
        </div>
      </div>
    </div>
  );
};
