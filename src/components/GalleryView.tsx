import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Heart,
  Tag,
  Users,
  BookOpen,
  Filter,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';
import { GalleryCategory, GalleryItem } from '../types';

export const GalleryView: React.FC = () => {
  const {
    gallery,
    characters,
    chapters,
    selectedGalleryItem,
    navigateTo,
    toggleFavorite,
    isFavorited,
  } = useNovel();

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  React.useEffect(() => {
    if (selectedGalleryItem) {
      setActiveLightboxItem(selectedGalleryItem);
    }
  }, [selectedGalleryItem]);

  const categories: GalleryCategory[] = [
    'All',
    'Characters',
    'Places',
    'Scenes',
    'Outfits',
    'Aesthetic',
    'Moodboard',
    'Other',
  ];

  const filteredGallery = gallery.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c49b66] uppercase tracking-wider mb-2">
            <ImageIcon className="w-4 h-4" />
            <span>Visual Worldbuilding & Aesthetic Moodboards</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#faebd7]">
            Afterglow Art Gallery
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Visual portraits, landscapes of the Twilight Realm, ancient artifacts, and aesthetic studies.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#c49b66] text-neutral-950 shadow-md shadow-[#c49b66]/20'
                : 'bg-[#131520] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGallery.map((item) => {
          const isFav = isFavorited('gallery', item.id);
          const char = characters.find((c) => c.id === item.relatedCharacterId);
          const ch = chapters.find((c) => c.id === item.relatedChapterId);

          return (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group cursor-pointer rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#090a0f]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141e] via-transparent to-black/30" />

                {/* Top category badge & favorite */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-[#faebd7] border border-white/10">
                    {item.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite('gallery', item.id);
                    }}
                    className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-rose-400 transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-300'
                      }`}
                    />
                  </button>
                </div>

                <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 space-y-2">
                <h4 className="font-serif font-bold text-base text-[#faebd7] group-hover:text-[#c49b66] transition-colors truncate">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Tag Pills */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#131520] border border-[#c49b66]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-res Image */}
            <div className="md:w-3/5 bg-black flex items-center justify-center p-2">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[70vh] w-full object-contain rounded-xl"
              />
            </div>

            {/* Sidebar Details */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div className="space-y-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#c49b66]/20 text-[#d4a373] uppercase tracking-wider">
                  {activeLightboxItem.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#faebd7]">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {activeLightboxItem.description}
                </p>

                {activeLightboxItem.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activeLightboxItem.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Related Universe Links */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {activeLightboxItem.relatedCharacterId && (
                  <div>
                    <span className="text-[11px] text-neutral-400 block mb-1">
                      Related Character:
                    </span>
                    {(() => {
                      const c = characters.find((char) => char.id === activeLightboxItem.relatedCharacterId);
                      if (!c) return null;
                      return (
                        <button
                          onClick={() => {
                            setActiveLightboxItem(null);
                            navigateTo('character-detail', { characterId: c.id });
                          }}
                          className="w-full p-2 rounded-xl bg-white/5 hover:bg-[#c49b66]/20 text-xs text-white flex items-center gap-2 transition-colors"
                        >
                          <img
                            src={c.profileImage}
                            alt={c.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-semibold">{c.name}</span>
                        </button>
                      );
                    })()}
                  </div>
                )}

                {activeLightboxItem.relatedChapterId && (
                  <div>
                    <span className="text-[11px] text-neutral-400 block mb-1">
                      Related Chapter:
                    </span>
                    {(() => {
                      const ch = chapters.find((ch) => ch.id === activeLightboxItem.relatedChapterId);
                      if (!ch) return null;
                      return (
                        <button
                          onClick={() => {
                            setActiveLightboxItem(null);
                            navigateTo('reader', { chapterId: ch.id });
                          }}
                          className="w-full p-2 rounded-xl bg-white/5 hover:bg-[#c49b66]/20 text-xs text-white flex items-center gap-2 transition-colors"
                        >
                          <BookOpen className="w-4 h-4 text-[#c49b66]" />
                          <span>Ch. {ch.chapterNumber}: {ch.title}</span>
                        </button>
                      );
                    })()}
                  </div>
                )}

                <button
                  onClick={() => toggleFavorite('gallery', activeLightboxItem.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#c49b66]/20 hover:bg-[#c49b66] text-[#faebd7] hover:text-neutral-950 font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-[#c49b66]/40"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorited('gallery', activeLightboxItem.id)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-neutral-300'
                    }`}
                  />
                  <span>
                    {isFavorited('gallery', activeLightboxItem.id)
                      ? 'Saved in Library'
                      : 'Add to Favorites'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
