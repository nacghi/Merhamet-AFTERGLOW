import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ArrowUpDown,
  Clock,
  Heart,
  Sparkles,
  Calendar,
  Eye,
  FileText,
  Bookmark,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';
import { Chapter } from '../types';

export const ChaptersView: React.FC = () => {
  const {
    chapters,
    characters,
    navigateTo,
    toggleFavorite,
    isFavorited,
    readingProgress,
    creatorAuth,
  } = useNovel();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  const filteredChapters = useMemo(() => {
    return chapters
      .filter((ch) => {
        // If guest, only published
        if (!creatorAuth.isAuthenticated && ch.status !== 'published') return false;
        if (filterStatus === 'published' && ch.status !== 'published') return false;
        if (filterStatus === 'draft' && ch.status !== 'draft') return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            ch.title.toLowerCase().includes(q) ||
            `chapter ${ch.chapterNumber}`.includes(q) ||
            (ch.excerpt && ch.excerpt.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => {
        return sortOrder === 'asc'
          ? a.chapterNumber - b.chapterNumber
          : b.chapterNumber - a.chapterNumber;
      });
  }, [chapters, searchQuery, sortOrder, filterStatus, creatorAuth.isAuthenticated]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c49b66] uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Novel Index & Chronicles</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#faebd7]">
            Table of Chapters
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Follow the journey of Lina Solis and Soren Vance across the twilight wastes.
          </p>
        </div>

        {/* Filter / Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#13151f] border border-white/10 focus:border-[#c49b66] text-white pl-9 pr-3 py-2 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 bg-[#13151f] hover:bg-white/10 border border-white/10 rounded-xl text-xs text-neutral-300 flex items-center gap-1.5 transition-colors"
            title="Toggle sort order"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#c49b66]" />
            <span>{sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}</span>
          </button>

          {creatorAuth.isAuthenticated && (
            <div className="flex items-center bg-[#13151f] p-0.5 rounded-xl border border-white/10 text-xs">
              {(['all', 'published', 'draft'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-2.5 py-1.5 rounded-lg capitalize transition-colors ${
                    filterStatus === status
                      ? 'bg-[#c49b66] text-neutral-950 font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chapters Grid */}
      {filteredChapters.length === 0 ? (
        <div className="py-20 text-center text-neutral-500 bg-[#13151f]/50 border border-dashed border-white/10 rounded-2xl">
          <BookOpen className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <p className="text-base font-medium text-neutral-300">No chapters found</p>
          <p className="text-xs text-neutral-500 mt-1">Try clearing your search query or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.map((chapter) => {
            const isFav = isFavorited('chapter', chapter.id);
            const userProgressKey = `local-reader_${chapter.id}`;
            const progress = readingProgress[userProgressKey];

            // Characters appearing in this chapter
            const connectedCharacters = characters.filter((c) =>
              c.relatedChapterIds?.includes(chapter.id) || chapter.characterIds?.includes(c.id)
            );

            return (
              <div
                key={chapter.id}
                className="group flex flex-col justify-between rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/50 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#c49b66]/10"
              >
                {/* Cover Image & Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-[#0a0b10]">
                  {chapter.coverImage ? (
                    <img
                      src={chapter.coverImage}
                      alt={chapter.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1b1e2c] to-[#0c0d14]">
                      <span className="font-display text-4xl font-bold text-[#c49b66]/30">
                        {chapter.chapterNumber}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141e] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#c49b66] text-neutral-950 font-bold text-xs shadow-md">
                        Chapter {chapter.chapterNumber}
                      </span>
                      {chapter.isNew && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-wider">
                          New
                        </span>
                      )}
                      {chapter.status === 'draft' && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-600/90 text-white font-bold text-[10px] uppercase tracking-wider">
                          Draft
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite('chapter', chapter.id);
                      }}
                      className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white/70 hover:text-rose-400 hover:scale-110 transition-all"
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Reading Progress Indicator if present */}
                  {progress && progress.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60">
                      <div
                        className="h-full bg-gradient-to-r from-[#c49b66] to-[#faebd7]"
                        style={{ width: `${progress.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#c49b66]" />
                        {chapter.readingTimeMinutes || 8} min read
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5" />
                        {chapter.publicationDate}
                      </span>
                    </div>

                    <h3
                      onClick={() => navigateTo('reader', { chapterId: chapter.id })}
                      className="font-serif text-xl font-bold text-[#faebd7] group-hover:text-[#c49b66] transition-colors cursor-pointer leading-snug"
                    >
                      {chapter.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {chapter.excerpt || chapter.content.replace(/^[#>\s*-]+/gm, '').substring(0, 140) + '...'}
                    </p>
                  </div>

                  {/* Connected Characters */}
                  {connectedCharacters.length > 0 && (
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-neutral-500">Characters in this chapter:</span>
                      <div className="flex -space-x-1.5">
                        {connectedCharacters.slice(0, 4).map((c) => (
                          <img
                            key={c.id}
                            src={c.profileImage}
                            alt={c.name}
                            title={c.name}
                            className="w-6 h-6 rounded-full object-cover border border-[#12141e]"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => navigateTo('reader', { chapterId: chapter.id })}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#c49b66] text-[#faebd7] hover:text-neutral-950 border border-white/10 hover:border-[#c49b66] text-xs font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{progress && progress.progress > 0 ? `Resume (${progress.progress}%)` : 'Read Chapter'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
