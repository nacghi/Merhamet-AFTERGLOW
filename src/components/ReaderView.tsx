import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sliders,
  Sparkles,
  Users,
  Bookmark,
  Share2,
  Clock,
  BookOpen,
  CheckCircle,
  X,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';
import { Chapter, Character, Scene } from '../types';

export const ReaderView: React.FC = () => {
  const {
    chapters,
    characters,
    scenes,
    selectedChapterId,
    navigateTo,
    saveProgress,
    readingProgress,
    toggleFavorite,
    isFavorited,
    readerSettings,
    updateReaderSettings,
    showToast,
  } = useNovel();

  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Find active chapter or fallback to first
  const publishedChapters = useMemo(
    () => chapters.filter((c) => c.status === 'published').sort((a, b) => a.chapterNumber - b.chapterNumber),
    [chapters]
  );

  const currentChapter = useMemo(() => {
    return chapters.find((c) => c.id === selectedChapterId) || publishedChapters[0];
  }, [chapters, selectedChapterId, publishedChapters]);

  const currentIndex = publishedChapters.findIndex((c) => c.id === currentChapter?.id);
  const prevChapter = currentIndex > 0 ? publishedChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex >= 0 && currentIndex < publishedChapters.length - 1 ? publishedChapters[currentIndex + 1] : null;

  const isFav = currentChapter ? isFavorited('chapter', currentChapter.id) : false;

  // Characters and scenes appearing in this chapter
  const connectedCharacters = useMemo(() => {
    if (!currentChapter) return [];
    return characters.filter(
      (c) =>
        c.relatedChapterIds?.includes(currentChapter.id) ||
        currentChapter.characterIds?.includes(c.id)
    );
  }, [characters, currentChapter]);

  const connectedScenes = useMemo(() => {
    if (!currentChapter) return [];
    return scenes.filter((s) => s.chapterId === currentChapter.id);
  }, [scenes, currentChapter]);

  // Scroll listener to update reading progress
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight <= 0) {
        setScrollProgress(100);
        return;
      }
      const currentScroll = window.scrollY;
      const percentage = Math.min(100, Math.max(0, Math.round((currentScroll / totalHeight) * 100)));
      setScrollProgress(percentage);

      if (currentChapter) {
        saveProgress(currentChapter.id, percentage, currentScroll, currentScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentChapter, saveProgress]);

  // Restore scroll position on chapter open
  useEffect(() => {
    if (currentChapter) {
      const key = `local-reader_${currentChapter.id}`;
      const saved = readingProgress[key];
      if (saved && saved.scrollOffset && saved.scrollOffset > 100) {
        window.scrollTo({ top: saved.scrollOffset, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentChapter?.id]);

  if (!currentChapter) {
    return (
      <div className="py-20 text-center text-neutral-400">
        <p>No chapter selected.</p>
        <button
          onClick={() => navigateTo('chapters')}
          className="mt-4 px-4 py-2 bg-[#c49b66] text-black rounded-xl text-xs font-semibold"
        >
          View Chapters
        </button>
      </div>
    );
  }

  // Parse custom markdown to semantic styled prose elements
  const renderFormattedProse = (content: string) => {
    const blocks = content.split(/\n\n+/);
    let hasDroppedCap = false;

    return blocks.map((block, idx) => {
      const trimmed = block.trim();

      // Heading 1 (# Title)
      if (trimmed.startsWith('# ')) {
        return (
          <h1
            key={idx}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-[#faebd7] my-8 pb-4 border-b border-[#c49b66]/20 text-center"
          >
            {trimmed.replace(/^#\s+/, '')}
          </h1>
        );
      }

      // Heading 2 (## Subtitle)
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="font-display text-2xl sm:text-3xl font-semibold text-[#faebd7] mt-10 mb-4 tracking-wide"
          >
            {trimmed.replace(/^##\s+/, '')}
          </h2>
        );
      }

      // Heading 3 (### Section)
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="font-display text-xl font-medium text-[#d4a373] mt-8 mb-3"
          >
            {trimmed.replace(/^###\s+/, '')}
          </h3>
        );
      }

      // Blockquote (> Quote)
      if (trimmed.startsWith('>')) {
        const quoteText = trimmed.replace(/^>\s*/gm, '');
        return (
          <blockquote
            key={idx}
            className="my-8 py-4 px-6 rounded-r-2xl border-l-4 border-[#c49b66] bg-[#c49b66]/5 font-serif italic text-lg sm:text-xl text-[#faebd7] shadow-inner"
          >
            "{quoteText}"
          </blockquote>
        );
      }

      // Divider (--- or ***)
      if (trimmed === '---' || trimmed === '***' || trimmed === '✦ ✦ ✦') {
        return (
          <div key={idx} className="my-10 text-center select-none opacity-70">
            <span className="text-[#c49b66] tracking-[1em] text-sm">✦ ✦ ✦</span>
          </div>
        );
      }

      // Normal paragraph with drop-cap on first prose paragraph
      const isFirstProse = !hasDroppedCap && !trimmed.startsWith('#');
      if (isFirstProse) hasDroppedCap = true;

      // Handle bold (**text**) and italic (*text*)
      const renderedText = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      return (
        <p
          key={idx}
          className={`${isFirstProse ? 'first-of-chapter' : ''}`}
          dangerouslySetInnerHTML={{ __html: renderedText }}
        />
      );
    });
  };

  const themeClass =
    readerSettings.theme === 'sepia'
      ? 'reader-theme-sepia'
      : readerSettings.theme === 'paper'
      ? 'reader-theme-paper'
      : readerSettings.theme === 'nocturne'
      ? 'reader-theme-nocturne'
      : 'reader-theme-midnight';

  const fontClass =
    readerSettings.font === 'display'
      ? 'font-display'
      : readerSettings.font === 'sans'
      ? 'font-sans'
      : 'font-serif';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClass}`}>
      {/* Sticky Progress & Reader Navigation Bar */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-opacity-95 border-b border-black/10 dark:border-white/10">
        {/* Real-time reading progress bar */}
        <div className="w-full h-1 bg-black/10 dark:bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#c49b66] to-[#faebd7] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <button
            onClick={() => navigateTo('chapters')}
            className="flex items-center gap-1.5 text-xs opacity-75 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Chapters</span>
          </button>

          {/* Chapter Quick Switcher Drawer Trigger */}
          <button
            onClick={() => setIsChapterDrawerOpen(!isChapterDrawerOpen)}
            className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#c49b66]" />
            <span className="truncate max-w-[160px] sm:max-w-[240px]">
              Ch. {currentChapter.chapterNumber}: {currentChapter.title}
            </span>
          </button>

          {/* Reader Customizer Toggle & Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite('chapter', currentChapter.id)}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="Bookmark Chapter"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFav ? 'fill-rose-500 text-rose-500' : 'opacity-70'
                }`}
              />
            </button>

            <button
              onClick={() => setIsControlsOpen(!isControlsOpen)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1 text-xs ${
                isControlsOpen
                  ? 'bg-[#c49b66] text-black font-semibold'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-80'
              }`}
              title="Typography and Reader Settings"
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden md:inline font-mono">Aa</span>
            </button>
          </div>
        </div>

        {/* Reader Customizer Panel Dropdown */}
        {isControlsOpen && (
          <div className="max-w-xl mx-auto mx-4 sm:mx-auto mt-2 mb-4 p-5 rounded-2xl bg-[#161824] border border-[#c49b66]/40 shadow-2xl text-[#faebd7] space-y-4 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4a373] flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5" />
                Reading Comfort & Typography
              </h4>
              <button
                onClick={() => setIsControlsOpen(false)}
                className="p-1 rounded-md text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Themes */}
            <div>
              <label className="block text-xs text-neutral-400 mb-2">Reading Palette</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'midnight', label: 'Midnight', bg: 'bg-[#0c0d12]', text: 'text-[#d1d5db]' },
                  { id: 'sepia', label: 'Sepia', bg: 'bg-[#f7efe1]', text: 'text-[#3b2c1a]' },
                  { id: 'paper', label: 'Paper', bg: 'bg-[#fcfbf9]', text: 'text-[#1f242e]' },
                  { id: 'nocturne', label: 'Nocturne', bg: 'bg-[#0d131f]', text: 'text-[#cbd5e1]' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateReaderSettings({ theme: t.id as any })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      readerSettings.theme === t.id
                        ? 'border-[#c49b66] ring-2 ring-[#c49b66]/30'
                        : 'border-white/10 hover:border-white/30'
                    } ${t.bg} ${t.text}`}
                  >
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-xs text-neutral-400 mb-2">Typeface</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'serif', label: 'Cormorant (Serif)', font: 'font-serif' },
                  { id: 'display', label: 'Cinzel (Display)', font: 'font-display' },
                  { id: 'sans', label: 'Jakarta (Modern)', font: 'font-sans' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => updateReaderSettings({ font: f.id as any })}
                    className={`py-2 px-2 rounded-xl border text-xs font-medium text-center transition-all ${
                      readerSettings.font === f.id
                        ? 'bg-[#c49b66]/20 border-[#c49b66] text-[#faebd7]'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                    } ${f.font}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size & Line Spacing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5">
                  Size: {readerSettings.fontSize}px
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateReaderSettings({ fontSize: Math.max(15, readerSettings.fontSize - 1) })
                    }
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold"
                  >
                    A-
                  </button>
                  <input
                    type="range"
                    min="15"
                    max="26"
                    value={readerSettings.fontSize}
                    onChange={(e) => updateReaderSettings({ fontSize: Number(e.target.value) })}
                    className="w-full accent-[#c49b66]"
                  />
                  <button
                    onClick={() =>
                      updateReaderSettings({ fontSize: Math.min(26, readerSettings.fontSize + 1) })
                    }
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold"
                  >
                    A+
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1.5">
                  Line Spacing: {readerSettings.lineHeight}
                </label>
                <div className="flex items-center gap-1.5">
                  {[1.5, 1.7, 2.0].map((lh) => (
                    <button
                      key={lh}
                      onClick={() => updateReaderSettings({ lineHeight: lh })}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                        readerSettings.lineHeight === lh
                          ? 'bg-[#c49b66] text-black font-bold border-[#c49b66]'
                          : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      {lh}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chapter Drawer Modal */}
      {isChapterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#141622] border border-[#c49b66]/40 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#faebd7] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#c49b66]" />
                Select Chapter
              </h3>
              <button
                onClick={() => setIsChapterDrawerOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {publishedChapters.map((ch) => {
                const isCurrent = ch.id === currentChapter.id;
                const prog = readingProgress[`local-reader_${ch.id}`];

                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setIsChapterDrawerOpen(false);
                      navigateTo('reader', { chapterId: ch.id });
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#c49b66]/20 border-[#c49b66] text-[#faebd7]'
                        : 'bg-white/5 border-white/5 hover:border-white/20 text-neutral-300'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-mono text-[#d4a373] block mb-0.5">
                        Chapter {ch.chapterNumber}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-white">{ch.title}</h4>
                    </div>
                    {prog && prog.progress > 0 && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                        {prog.progress}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Chapter Content Container */}
      <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 md:py-16">
        {/* Chapter Header */}
        <header className="text-center space-y-4 mb-12 pb-8 border-b border-black/10 dark:border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c49b66]/15 border border-[#c49b66]/30 text-xs font-semibold uppercase tracking-widest text-[#d4a373]">
            <span>Chapter {currentChapter.chapterNumber}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {currentChapter.readingTimeMinutes || 8} min read
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider leading-tight text-inherit">
            {currentChapter.title}
          </h1>

          <div className="text-xs opacity-60 font-mono">
            Published on {currentChapter.publicationDate}
          </div>

          {/* Chapter Cover Photo */}
          {currentChapter.coverImage && (
            <div className="mt-8 rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
              <img
                src={currentChapter.coverImage}
                alt={currentChapter.title}
                className="w-full max-h-[380px] object-cover"
              />
            </div>
          )}
        </header>

        {/* Formatted Reading Prose */}
        <article
          ref={contentRef}
          className={`novel-prose ${fontClass} leading-relaxed text-inherit`}
          style={{
            fontSize: `${readerSettings.fontSize}px`,
            lineHeight: readerSettings.lineHeight,
          }}
        >
          {renderFormattedProse(currentChapter.content)}
        </article>

        {/* Connected Lore Strip: Characters & Scenes */}
        {(connectedCharacters.length > 0 || connectedScenes.length > 0) && (
          <section className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 space-y-6">
            <h3 className="font-display text-lg font-bold tracking-wider text-[#d4a373] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Universe Connections for This Chapter
            </h3>

            {connectedCharacters.length > 0 && (
              <div>
                <div className="text-xs uppercase tracking-wider opacity-60 mb-3">
                  Characters Present:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {connectedCharacters.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => navigateTo('character-detail', { characterId: char.id })}
                      className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#c49b66]/40 text-left flex items-center gap-3 transition-colors group"
                    >
                      <img
                        src={char.profileImage}
                        alt={char.name}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-serif font-bold group-hover:text-[#c49b66] truncate">
                          {char.name}
                        </h4>
                        <p className="text-xs opacity-75 truncate">{char.role || char.shortDescription}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {connectedScenes.length > 0 && (
              <div>
                <div className="text-xs uppercase tracking-wider opacity-60 mb-3">
                  Key Chapter Scenes:
                </div>
                <div className="space-y-3">
                  {connectedScenes.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => navigateTo('scenes', { sceneId: s.id })}
                      className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#c49b66]/40 transition-colors cursor-pointer"
                    >
                      <h5 className="text-sm font-bold text-[#faebd7]">{s.title}</h5>
                      {s.quote && (
                        <p className="text-xs italic text-[#c49b66] mt-1">"{s.quote}"</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Footer Navigation (Previous / Next Chapter) */}
        <footer className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevChapter ? (
            <button
              onClick={() => navigateTo('reader', { chapterId: prevChapter.id })}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#c49b66]/20 border border-black/10 dark:border-white/10 text-left transition-colors flex items-center gap-3"
            >
              <ChevronLeft className="w-5 h-5 text-[#c49b66]" />
              <div>
                <span className="text-[10px] uppercase tracking-wider opacity-60 block">Previous</span>
                <span className="text-xs font-serif font-bold">
                  Ch. {prevChapter.chapterNumber}: {prevChapter.title}
                </span>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <button
              onClick={() => navigateTo('reader', { chapterId: nextChapter.id })}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#c49b66] hover:bg-[#d4a373] text-neutral-950 font-bold text-xs transition-all shadow-lg shadow-[#c49b66]/20 flex items-center justify-between sm:justify-start gap-3"
            >
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-wider opacity-80 block">Next Chapter</span>
                <span className="text-xs font-bold">
                  Ch. {nextChapter.chapterNumber}: {nextChapter.title}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-950" />
            </button>
          ) : (
            <div className="text-xs opacity-60 text-center font-serif italic">
              ✦ End of available published chronicles ✦
            </div>
          )}
        </footer>
      </main>
    </div>
  );
};
