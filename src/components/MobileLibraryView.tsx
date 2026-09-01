import React, { useState } from 'react';
import { useNovel } from '../context/NovelContext';
import { AtmosphericMountainSky } from './AtmosphericMountainSky';
import { DoveIcon, EagleIcon, SignpostSymbol } from './Symbols';
import {
  Bookmark,
  Heart,
  BookOpen,
  Image,
  Sparkles,
  ChevronRight,
  Clock,
  Trash2,
  Flame,
} from 'lucide-react';

export const MobileLibraryView: React.FC = () => {
  const {
    favorites,
    readingProgress,
    chapters,
    characters,
    scenes,
    gallery,
    videos,
    navigateTo,
    toggleFavorite,
    language,
  } = useNovel();

  const [activeTab, setActiveTab] = useState<'all' | 'chapters' | 'characters' | 'scenes' | 'gallery'>('all');
  const isDarija = language === 'darija';

  // In-progress reading list
  const progressItems = Object.values(readingProgress) as import('../types').ReadingProgress[];
  const inProgressList = [...progressItems]
    .filter((p) => p.progress > 0)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  // Favorites categorized
  const favoritedChapters = chapters.filter((c) =>
    favorites.some((f) => f.contentType === 'chapter' && f.contentId === c.id)
  );
  const favoritedCharacters = characters.filter((c) =>
    favorites.some((f) => f.contentType === 'character' && f.contentId === c.id)
  );
  const favoritedScenes = scenes.filter((s) =>
    favorites.some((f) => f.contentType === 'scene' && f.contentId === s.id)
  );
  const favoritedGallery = gallery.filter((g) =>
    favorites.some((f) => f.contentType === 'gallery' && f.contentId === g.id)
  );

  return (
    <div className="min-h-screen bg-[#030611] text-[#e2ebf5] pb-28">
      {/* Header Mountain Sanctuary */}
      <AtmosphericMountainSky
        variant="compact"
        showEagle={false}
        showMist={true}
        showStars={true}
        showMoon={true}
        className="py-7 px-5 text-center border-b border-white/[0.07]"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono tracking-widest text-[#9cb5d3] uppercase mb-2">
          <DoveIcon className="w-3.5 h-3.5 text-[#e39264]" />
          <span>{isDarija ? 'الخزانة الخاصة' : 'Private Sanctuary'}</span>
        </div>

        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-[#edf4fd] ${isDarija ? 'font-arabic' : 'font-display'}`}>
          {isDarija ? 'خزانة الشفق' : 'THE SANCTUARY'}
        </h1>
        
        <p className={`text-xs sm:text-sm text-[#8fa8c8] mt-1 max-w-xs mx-auto ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
          {isDarija
            ? 'مجموعتك الشخصية من الفصول المحفوظة، الشخصيات، وتقدم القراءة.'
            : 'Your personal collection of memories, marked chapters, and lore.'}
        </p>

        {/* Tab switcher */}
        <div className="flex gap-2 overflow-x-auto pt-5 pb-1 justify-center scrollbar-none">
          {[
            { id: 'all' as const, label: isDarija ? 'الكل' : 'Everything' },
            { id: 'chapters' as const, label: isDarija ? `فصول (${favoritedChapters.length})` : `Chapters (${favoritedChapters.length})` },
            { id: 'characters' as const, label: isDarija ? `شخصيات (${favoritedCharacters.length})` : `Cast (${favoritedCharacters.length})` },
            { id: 'scenes' as const, label: isDarija ? `مشاهد (${favoritedScenes.length})` : `Scenes (${favoritedScenes.length})` },
            { id: 'gallery' as const, label: isDarija ? `صور (${favoritedGallery.length})` : `Art (${favoritedGallery.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#192b4d] text-[#e39264] border border-[#7292bf]/50 shadow-[0_0_12px_rgba(114,146,191,0.3)]'
                  : 'bg-[#080e1c] text-[#718aa8] border border-white/[0.06] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </AtmosphericMountainSky>

      <div className="max-w-md md:max-w-xl mx-auto px-4 pt-6 space-y-6">
        {/* Continue Reading Stream */}
        {inProgressList.length > 0 && (activeTab === 'all' || activeTab === 'chapters') && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-[#e39264]" />
              <h3 className={`text-xs tracking-wider uppercase font-bold text-[#eef4fb] ${isDarija ? 'font-arabic text-sm' : 'font-display'}`}>
                {isDarija ? 'قيد القراءة حالياً' : 'Active Manuscripts'}
              </h3>
            </div>

            <div className="space-y-2.5">
              {inProgressList.map((prog) => {
                const chapter = chapters.find((c) => c.id === prog.chapterId);
                if (!chapter) return null;

                return (
                  <div
                    key={prog.chapterId}
                    onClick={() => navigateTo('reader', { chapterId: chapter.id })}
                    className="p-3.5 rounded-2xl bg-[#081022] border border-white/[0.07] hover:border-[#7b9cca]/50 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className={`min-w-0 ${isDarija ? 'text-right' : ''}`}>
                      <span className="text-[10px] font-mono text-[#8fa8c8] uppercase">
                        {isDarija
                          ? `الفصل ${chapter.chapterNumber} • ${prog.progress}% مقروء`
                          : `Chapter ${chapter.chapterNumber} • ${prog.progress}% Read`}
                      </span>
                      <h4 className={`text-sm font-bold text-[#edf4fd] truncate group-hover:text-white ${isDarija ? 'font-arabic' : 'font-display'}`}>
                        {isDarija ? chapter.titleDarija || chapter.title : chapter.title}
                      </h4>
                    </div>

                    <button className="px-3.5 py-1.5 rounded-xl bg-[#142342] text-[11px] font-display uppercase tracking-wider text-[#e39264] shrink-0 flex items-center gap-1 group-hover:bg-[#1a2e56]">
                      <span>{isDarija ? 'متابعة' : 'Resume'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bookmarked Chapters */}
        {(activeTab === 'all' || activeTab === 'chapters') && favoritedChapters.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Bookmark className="w-4 h-4 text-[#7292bf]" />
              <h3 className={`text-xs tracking-wider uppercase font-bold text-[#eef4fb] ${isDarija ? 'font-arabic text-sm' : 'font-display'}`}>
                {isDarija ? 'الفصول المحفوظة' : 'Saved Chapters'}
              </h3>
            </div>

            <div className="space-y-2">
              {favoritedChapters.map((ch) => (
                <div
                  key={ch.id}
                  className="p-3.5 rounded-2xl bg-[#081022] border border-white/[0.06] flex items-center justify-between gap-3"
                >
                  <div
                    onClick={() => navigateTo('reader', { chapterId: ch.id })}
                    className={`min-w-0 cursor-pointer flex-1 ${isDarija ? 'text-right' : ''}`}
                  >
                    <span className="text-[10px] font-mono text-[#e39264] uppercase">
                      {isDarija ? `الفصل ${ch.chapterNumber}` : `Chapter ${ch.chapterNumber}`}
                    </span>
                    <h4 className={`text-sm font-bold text-[#edf4fd] truncate ${isDarija ? 'font-arabic' : 'font-display'}`}>
                      {isDarija ? ch.titleDarija || ch.title : ch.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => toggleFavorite('chapter', ch.id)}
                    className="p-2 text-[#e39264] hover:text-white"
                    title={isDarija ? 'إزالة' : 'Remove'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookmarked Characters */}
        {(activeTab === 'all' || activeTab === 'characters') && favoritedCharacters.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <EagleIcon className="w-4 h-4 text-[#e39264]" />
              <h3 className={`text-xs tracking-wider uppercase font-bold text-[#eef4fb] ${isDarija ? 'font-arabic text-sm' : 'font-display'}`}>
                {isDarija ? 'الشخصيات المحفوظة' : 'Saved Characters'}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {favoritedCharacters.map((char) => (
                <div
                  key={char.id}
                  onClick={() => navigateTo('character-detail', { characterId: char.id })}
                  className="p-3 rounded-2xl bg-[#081022] border border-white/[0.06] hover:border-[#7b9cca]/50 cursor-pointer flex items-center gap-3 group"
                >
                  <img
                    src={char.profileImage}
                    alt={char.name}
                    className="w-10 h-10 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className={`text-xs font-bold text-[#edf4fd] truncate ${isDarija ? 'font-arabic' : 'font-display'}`}>
                      {isDarija ? char.nameDarija || char.name : char.name}
                    </h4>
                    <span className="text-[9px] font-mono text-[#8fa8c8] block truncate">
                      {isDarija ? char.roleDarija || char.role : char.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {favorites.length === 0 && inProgressList.length === 0 && (
          <div className="text-center py-16 text-[#6d84a3]">
            <DoveIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className={`text-sm ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
              {isDarija
                ? 'خزانتك فارغة حالياً. ابدأ بقراءة فصل أو احفظ شخصياتك المفضلة.'
                : 'Your sanctuary is empty. Start reading or bookmark characters to see them here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
