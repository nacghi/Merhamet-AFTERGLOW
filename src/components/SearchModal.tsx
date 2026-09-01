import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Users,
  Film,
  Image as ImageIcon,
  Sparkles,
  X,
  ArrowRight,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';
import { EagleIcon, DoveIcon } from './Symbols';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    chapters,
    characters,
    scenes,
    gallery,
    videos,
    navigateTo,
  } = useNovel();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Grouped search results
  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();

    const matchedChapters = chapters.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        `chapter ${c.chapterNumber}`.includes(q) ||
        (c.excerpt && c.excerpt.toLowerCase().includes(q)) ||
        c.content.toLowerCase().includes(q)
    );

    const matchedCharacters = characters.filter(
      (char) =>
        char.name.toLowerCase().includes(q) ||
        (char.role && char.role.toLowerCase().includes(q)) ||
        char.shortDescription.toLowerCase().includes(q) ||
        char.personality.toLowerCase().includes(q) ||
        char.background.toLowerCase().includes(q)
    );

    const matchedScenes = scenes.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.quote && s.quote.toLowerCase().includes(q)) ||
        (s.location && s.location.toLowerCase().includes(q))
    );

    const matchedGallery = gallery.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.tags?.some((t) => t.toLowerCase().includes(q))
    );

    const matchedVideos = videos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
    );

    const totalCount =
      matchedChapters.length +
      matchedCharacters.length +
      matchedScenes.length +
      matchedGallery.length +
      matchedVideos.length;

    return {
      totalCount,
      chapters: matchedChapters,
      characters: matchedCharacters,
      scenes: matchedScenes,
      gallery: matchedGallery,
      videos: matchedVideos,
    };
  }, [query, chapters, characters, scenes, gallery, videos]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 md:pt-20 p-4 bg-[#02040b]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#080e1e] border border-[#7292bf]/30 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[82vh]">
        {/* Search input header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-[#050a16]">
          <Search className="w-4 h-4 text-[#e39264] shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search lore, chapters, cast, quotes, memories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-[#e8f1fc] text-sm focus:outline-none placeholder-[#677f9e]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#677f9e] hover:text-[#e8f1fc] text-xs font-mono px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-[#677f9e] hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="text-center py-12 text-[#6881a2]">
              <EagleIcon className="w-8 h-8 mx-auto mb-2 text-[#8ea8c8] opacity-60" />
              <p className="font-display text-xs tracking-wider uppercase">Search The Afterglow Universe</p>
              <p className="font-serif italic text-xs text-[#5f7694] mt-1">
                Type character names, locations, quotes, or chapter titles.
              </p>
            </div>
          )}

          {results && results.totalCount === 0 && (
            <div className="text-center py-10 text-[#6881a2]">
              <DoveIcon className="w-8 h-8 mx-auto mb-2 text-[#8ea8c8] opacity-50" />
              <p className="font-serif italic text-sm">No chronicle entries found matching "{query}"</p>
            </div>
          )}

          {results && (
            <>
              {/* Chapters */}
              {results.chapters.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#e39264] mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Chapters ({results.chapters.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.chapters.map((ch) => (
                      <div
                        key={ch.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateTo('reader', { chapterId: ch.id });
                        }}
                        className="p-3 rounded-xl bg-[#050a16] border border-white/[0.05] hover:border-[#7292bf]/40 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-[#8fa8c8]">
                            Chapter {ch.chapterNumber}
                          </span>
                          <h5 className="font-display text-xs font-bold text-[#eef4fb] group-hover:text-white">
                            {ch.title}
                          </h5>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#6c86a6] group-hover:text-[#e39264] transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Characters */}
              {results.characters.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#7292bf] mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Cast & World ({results.characters.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.characters.map((char) => (
                      <div
                        key={char.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateTo('character-detail', { characterId: char.id });
                        }}
                        className="p-2.5 rounded-xl bg-[#050a16] border border-white/[0.05] hover:border-[#7292bf]/40 cursor-pointer flex items-center gap-3 group transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#101930] shrink-0">
                          <img src={char.profileImage} alt={char.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="font-display text-xs font-bold text-[#eef4fb] group-hover:text-white truncate">
                            {char.name}
                          </h5>
                          <span className="text-[9px] font-mono text-[#7691b0] block truncate">
                            {char.role || 'Luminary'}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#6c86a6] group-hover:text-[#e39264] transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scenes */}
              {results.scenes.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#7292bf] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Memory Scenes ({results.scenes.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {results.scenes.map((sc) => (
                      <div
                        key={sc.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateTo('scenes', { sceneId: sc.id });
                        }}
                        className="p-2.5 rounded-xl bg-[#050a16] border border-white/[0.05] hover:border-[#7292bf]/40 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div className="min-w-0">
                          <h5 className="font-display text-xs font-bold text-[#eef4fb] group-hover:text-white truncate">
                            {sc.title}
                          </h5>
                          <p className="font-serif italic text-[11px] text-[#8fa8c8] truncate">
                            {sc.quote || sc.description}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#6c86a6] group-hover:text-[#e39264] transition-colors shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
