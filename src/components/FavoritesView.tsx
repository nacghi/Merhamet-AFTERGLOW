import React, { useState } from 'react';
import {
  Heart,
  BookOpen,
  Users,
  Sparkles,
  Image as ImageIcon,
  Film,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';
import { FavoriteContentType } from '../types';

export const FavoritesView: React.FC = () => {
  const {
    favorites,
    chapters,
    characters,
    scenes,
    gallery,
    videos,
    navigateTo,
    toggleFavorite,
  } = useNovel();

  const [activeTab, setActiveTab] = useState<FavoriteContentType | 'all'>('all');

  const favChapters = chapters.filter((c) =>
    favorites.some((f) => f.contentType === 'chapter' && f.contentId === c.id)
  );

  const favCharacters = characters.filter((char) =>
    favorites.some((f) => f.contentType === 'character' && f.contentId === char.id)
  );

  const favScenes = scenes.filter((s) =>
    favorites.some((f) => f.contentType === 'scene' && f.contentId === s.id)
  );

  const favGallery = gallery.filter((g) =>
    favorites.some((f) => f.contentType === 'gallery' && f.contentId === g.id)
  );

  const favVideos = videos.filter((v) =>
    favorites.some((f) => f.contentType === 'video' && f.contentId === v.id)
  );

  const tabs = [
    { id: 'all', label: 'All Saved', count: favorites.length },
    { id: 'chapter', label: 'Chapters', count: favChapters.length, icon: BookOpen },
    { id: 'character', label: 'Characters', count: favCharacters.length, icon: Users },
    { id: 'scene', label: 'Scenes', count: favScenes.length, icon: Sparkles },
    { id: 'gallery', label: 'Photos & Art', count: favGallery.length, icon: ImageIcon },
    { id: 'video', label: 'Videos', count: favVideos.length, icon: Film },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c49b66] uppercase tracking-wider mb-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Personal Reading Vault</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#faebd7]">
            My Library & Bookmarks
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Quickly return to your favorite passages, characters, artwork, and scenes.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#c49b66] text-neutral-950 shadow-md shadow-[#c49b66]/20'
                : 'bg-[#131520] text-neutral-400 hover:text-white border border-white/10'
            }`}
          >
            {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
            <span>{tab.label}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {favorites.length === 0 ? (
        <div className="py-20 text-center text-neutral-500 bg-[#131520]/40 border border-dashed border-white/10 rounded-2xl space-y-3">
          <Heart className="w-10 h-10 text-neutral-600 mx-auto" />
          <p className="text-base font-medium text-neutral-300">No saved favorites yet</p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Click the heart icon on any chapter, character, scene, or artwork to save it to your library.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Saved Chapters */}
          {(activeTab === 'all' || activeTab === 'chapter') && favChapters.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#faebd7] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#c49b66]" />
                Saved Chapters ({favChapters.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favChapters.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => navigateTo('reader', { chapterId: ch.id })}
                    className="p-4 rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/50 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-mono text-[#c49b66] block">
                        Chapter {ch.chapterNumber}
                      </span>
                      <h4 className="font-serif font-bold text-white group-hover:text-[#faebd7]">
                        {ch.title}
                      </h4>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite('chapter', ch.id);
                      }}
                      className="p-2 rounded-lg text-rose-400 hover:bg-white/10 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Characters */}
          {(activeTab === 'all' || activeTab === 'character') && favCharacters.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#faebd7] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#c49b66]" />
                Favorite Characters ({favCharacters.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {favCharacters.map((char) => (
                  <div
                    key={char.id}
                    onClick={() => navigateTo('character-detail', { characterId: char.id })}
                    className="p-3 rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/50 transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={char.profileImage}
                      alt={char.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-serif font-bold text-sm text-white group-hover:text-[#faebd7] truncate">
                        {char.name}
                      </h4>
                      <p className="text-xs text-neutral-400 truncate">{char.role}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite('character', char.id);
                      }}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-white/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Scenes */}
          {(activeTab === 'all' || activeTab === 'scene') && favScenes.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#faebd7] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c49b66]" />
                Saved Scenes ({favScenes.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favScenes.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => navigateTo('scenes', { sceneId: s.id })}
                    className="p-4 rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/50 transition-all cursor-pointer flex items-start justify-between group"
                  >
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-base text-white group-hover:text-[#faebd7]">
                        {s.title}
                      </h4>
                      {s.quote && (
                        <p className="text-xs italic text-[#c49b66] line-clamp-2">"{s.quote}"</p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite('scene', s.id);
                      }}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-white/10 shrink-0 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Gallery */}
          {(activeTab === 'all' || activeTab === 'gallery') && favGallery.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#faebd7] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#c49b66]" />
                Saved Artwork ({favGallery.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {favGallery.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => navigateTo('gallery', { galleryItem: g })}
                    className="rounded-2xl bg-[#12141e] border border-white/10 overflow-hidden group cursor-pointer"
                  >
                    <div className="relative aspect-square">
                      <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite('gallery', g.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-2.5">
                      <h5 className="text-xs font-semibold text-white truncate">{g.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Videos */}
          {(activeTab === 'all' || activeTab === 'video') && favVideos.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#faebd7] flex items-center gap-2">
                <Film className="w-4 h-4 text-[#c49b66]" />
                Saved Videos ({favVideos.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {favVideos.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => navigateTo('videos', { videoItem: v })}
                    className="rounded-2xl bg-[#12141e] border border-white/10 overflow-hidden cursor-pointer group"
                  >
                    <div className="relative aspect-16/9">
                      <img
                        src={v.thumbnailUrl}
                        alt={v.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite('video', v.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h5 className="text-xs font-semibold text-white truncate">{v.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
