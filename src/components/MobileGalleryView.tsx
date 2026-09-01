import React, { useState } from 'react';
import { useNovel } from '../context/NovelContext';
import { GalleryCategory, GalleryItem } from '../types';
import { AtmosphericMountainSky } from './AtmosphericMountainSky';
import { EagleIcon, DoveIcon, SignpostSymbol } from './Symbols';
import { Sparkles, Heart, X, Maximize2, Tag, ChevronRight, Film } from 'lucide-react';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Characters',
  'Places',
  'Scenes',
  'Aesthetic',
  'Moodboard',
];

export const MobileGalleryView: React.FC = () => {
  const { gallery, isFavorited, toggleFavorite, navigateTo, characters, chapters, language } = useNovel();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const isDarija = language === 'darija';

  const categoryLabels: Record<string, string> = {
    All: isDarija ? 'الكل' : 'All',
    Characters: isDarija ? 'الشخصيات' : 'Characters',
    Places: isDarija ? 'المواقع' : 'Places',
    Scenes: isDarija ? 'المشاهد' : 'Scenes',
    Aesthetic: isDarija ? 'الجماليات' : 'Aesthetic',
    Moodboard: isDarija ? 'المزاج' : 'Moodboard',
    Outfits: isDarija ? 'الأزياء' : 'Outfits',
    Other: isDarija ? 'أخرى' : 'Other',
  };

  const filteredItems = gallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#030611] text-[#e2ebf5] pb-28">
      {/* Header Mountain Sky */}
      <AtmosphericMountainSky
        variant="compact"
        showEagle={true}
        showMist={true}
        showStars={true}
        showMoon={true}
        className="py-7 px-5 text-center border-b border-white/[0.07]"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono tracking-widest text-[#9cb5d3] uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#e39264]" />
          <span>{isDarija ? 'أرشيف الصور والذكريات' : 'Visual Memories'}</span>
        </div>

        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-[#edf4fd] ${isDarija ? 'font-arabic' : 'font-display'}`}>
          {isDarija ? 'معرض الشفق' : 'THE GALLERY'}
        </h1>
        
        <p className={`text-xs sm:text-sm text-[#8fa8c8] mt-1 max-w-xs mx-auto ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
          {isDarija
            ? 'مشاهد، مناظر جبلية، وتفاصيل بصرية من عالم الشفق.'
            : 'Atmospheric mountain visions, scenery, and aesthetics from the world of Afterglow.'}
        </p>

        {/* Category Filter Ribbon */}
        <div className="flex gap-2 overflow-x-auto pt-5 pb-1 justify-center scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#192b4d] text-[#e39264] border border-[#7292bf]/50 shadow-[0_0_12px_rgba(114,146,191,0.3)]'
                  : 'bg-[#080e1c] text-[#718aa8] border border-white/[0.06] hover:text-white'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </AtmosphericMountainSky>

      {/* Visual Memory Reel */}
      <div className="max-w-md md:max-w-xl mx-auto px-4 pt-6 space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-[#6d84a3]">
            <DoveIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="font-serif italic text-sm">
              {isDarija ? 'لا توجد صور في هذا التصنيف.' : 'No visual memories found in this category.'}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isSaved = isFavorited('gallery', item.id);
            return (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="group relative cursor-pointer rounded-3xl overflow-hidden bg-[#081022] border border-white/[0.08] hover:border-[#7b9cca]/50 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.7)]"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-[#0c1428] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050917] via-[#050917]/35 to-transparent" />

                  {/* Category Tag */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-full backdrop-blur-md bg-[#080f22]/85 border border-white/10 text-[9px] font-mono uppercase text-[#e39264]">
                      {categoryLabels[item.category] || item.category}
                    </span>
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite('gallery', item.id);
                    }}
                    className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md border transition-all ${
                      isSaved
                        ? 'bg-[#192b4d] border-[#e39264] text-[#e39264]'
                        : 'bg-[#080f22]/70 border-white/10 text-[#8ea6c5] hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  {/* Bottom Caption */}
                  <div className={`absolute bottom-3.5 left-4 right-4 ${isDarija ? 'text-right' : ''}`}>
                    <h3 className={`text-base font-bold text-[#f0f6ff] group-hover:text-white ${isDarija ? 'font-arabic' : 'font-display'}`}>
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className={`text-xs text-[#9eb6cf] line-clamp-1 mt-0.5 ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Full-Screen Visual Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-[#02040b]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-300">
          {/* Modal Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#e39264]">
              {categoryLabels[activeModalItem.category] || activeModalItem.category} Memory
            </span>
            <button
              onClick={() => setActiveModalItem(null)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Image */}
          <div className="relative max-w-xl mx-auto my-auto rounded-2xl overflow-hidden border border-white/10 max-h-[65vh]">
            <img
              src={activeModalItem.imageUrl}
              alt={activeModalItem.title}
              className="w-full h-full object-contain max-h-[65vh]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Modal Footer Details */}
          <div className={`max-w-xl mx-auto w-full bg-[#080f24]/90 rounded-2xl p-4 border border-white/10 text-center ${isDarija ? 'font-arabic' : ''}`}>
            <h3 className="font-display text-lg font-bold text-[#edf4fd]">
              {activeModalItem.title}
            </h3>
            {activeModalItem.description && (
              <p className={`text-xs text-[#9ab4d2] mt-1 ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
                {activeModalItem.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
