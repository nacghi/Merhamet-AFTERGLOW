import React, { useState } from 'react';
import { useNovel } from '../context/NovelContext';
import { Scene } from '../types';
import { AtmosphericMountainSky } from './AtmosphericMountainSky';
import { EagleIcon, DoveIcon, AlweryaghlCrest } from './Symbols';
import { Sparkles, BookOpen, MapPin, ChevronRight, X, Heart, ArrowRight } from 'lucide-react';

export const MobileScenesView: React.FC = () => {
  const { scenes, selectedSceneId, navigateTo, chapters, characters, isFavorited, toggleFavorite, language } = useNovel();
  const [activeSceneModal, setActiveSceneModal] = useState<Scene | null>(() => {
    return scenes.find((s) => s.id === selectedSceneId) || null;
  });

  const isDarija = language === 'darija';

  return (
    <div className="min-h-screen bg-[#030611] text-[#e2ebf5] pb-28">
      {/* Header Mountain Skyline */}
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
          <span>{isDarija ? 'شظايا الذكريات' : 'Memory Fragments'}</span>
        </div>

        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-[#edf4fd] ${isDarija ? 'font-arabic' : 'font-display'}`}>
          {isDarija ? 'مشاهد الشفق الخالدة' : 'PIVOTAL SCENES'}
        </h1>
        
        <p className={`text-xs sm:text-sm text-[#8fa8c8] mt-1 max-w-xs mx-auto ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
          {isDarija
            ? 'لحظات فارقة ومشاعر لا تُنسى بين ثلوج ممر الورياغل.'
            : 'Crystallized moments of destiny, tragedy, and transcendence in the mountain heights.'}
        </p>
      </AtmosphericMountainSky>

      {/* Scenes Stream */}
      <div className="max-w-md md:max-w-xl mx-auto px-4 pt-6 space-y-4">
        {scenes.length === 0 ? (
          <div className="text-center py-16 text-[#6b82a1]">
            <DoveIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="font-serif italic text-sm">
              {isDarija ? 'لا توجد مشاهد مسجلة حالياً.' : 'No memory fragments recorded yet.'}
            </p>
          </div>
        ) : (
          scenes.map((scene) => {
            const isSaved = isFavorited('scene', scene.id);
            const linkedChapter = chapters.find((c) => c.id === scene.chapterId);

            return (
              <div
                key={scene.id}
                onClick={() => setActiveSceneModal(scene)}
                className="group relative cursor-pointer rounded-3xl overflow-hidden bg-[#081022] border border-white/[0.08] hover:border-[#7b9cca]/50 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.7)]"
              >
                {/* Scene Backdrop */}
                <div className="relative w-full aspect-[16/10] bg-[#0c1428] overflow-hidden">
                  <img
                    src={scene.image || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'}
                    alt={scene.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040713] via-[#040713]/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full backdrop-blur-md bg-[#070e20]/85 border border-white/10 text-[9px] font-mono uppercase text-[#e39264]">
                      {scene.mood || 'Twilight Memory'}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite('scene', scene.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                        isSaved
                          ? 'bg-[#192b4d] border-[#e39264] text-[#e39264]'
                          : 'bg-[#080f22]/70 border-white/10 text-[#8ea6c5] hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Scene Info */}
                  <div className={`absolute bottom-3.5 left-4 right-4 ${isDarija ? 'text-right' : ''}`}>
                    {linkedChapter && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8da6c5] mb-0.5 block">
                        {isDarija
                          ? `الفصل ${linkedChapter.chapterNumber} • ${linkedChapter.titleDarija || linkedChapter.title}`
                          : `Chapter ${linkedChapter.chapterNumber} • ${linkedChapter.title}`}
                      </span>
                    )}
                    <h3 className={`text-lg font-bold text-[#f0f6ff] group-hover:text-white ${isDarija ? 'font-arabic' : 'font-display'}`}>
                      {scene.title}
                    </h3>
                    {scene.quote && (
                      <p className={`text-xs text-[#9eb6cf] line-clamp-1 mt-1 ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
                        “{scene.quote}”
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Scene Detail Immersive Modal */}
      {activeSceneModal && (
        <div className="fixed inset-0 z-50 bg-[#02040b]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
          <div className="max-w-xl mx-auto w-full my-auto space-y-4">
            {/* Header / Close */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#e39264]">
                {isDarija ? 'مشهد من الشفق' : 'Fragment Memory'}
              </span>
              <button
                onClick={() => setActiveSceneModal(null)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cinematic Image Card */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#070d1e]">
              <img
                src={activeSceneModal.image || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'}
                alt={activeSceneModal.title}
                className="w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
              />

              <div className={`p-5 space-y-4 ${isDarija ? 'text-right' : ''}`}>
                <div>
                  <h2 className={`text-xl font-bold text-[#edf4fd] ${isDarija ? 'font-arabic' : 'font-display'}`}>
                    {activeSceneModal.title}
                  </h2>
                  {activeSceneModal.location && (
                    <span className={`flex items-center gap-1 text-xs font-mono text-[#7792b2] mt-1 ${isDarija ? 'justify-end' : ''}`}>
                      <MapPin className="w-3.5 h-3.5 text-[#e39264]" />
                      <span>{activeSceneModal.location}</span>
                    </span>
                  )}
                </div>

                {activeSceneModal.quote && (
                  <div className="p-3.5 rounded-xl bg-[#0e1a36] border border-[#7292bf]/25 text-center">
                    <p className={`text-sm text-[#d4e2f2] ${isDarija ? 'font-arabic' : 'font-serif italic'}`}>
                      “{activeSceneModal.quote}”
                    </p>
                  </div>
                )}

                <p className={`text-sm text-[#b4c8dc] leading-relaxed ${isDarija ? 'font-arabic-sans' : 'font-serif'}`}>
                  {activeSceneModal.description}
                </p>

                {/* Chapter jump */}
                {activeSceneModal.chapterId && (
                  <button
                    onClick={() => {
                      const chId = activeSceneModal.chapterId;
                      setActiveSceneModal(null);
                      navigateTo('reader', { chapterId: chId });
                    }}
                    className={`w-full py-3 rounded-xl bg-gradient-to-r from-[#192b4e] to-[#253e70] border border-[#8daecc]/40 text-[#ffffff] font-display text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
                      isDarija ? 'font-arabic' : ''
                    }`}
                  >
                    <span>{isDarija ? 'قراءة هذا المشهد في الفصل' : 'Read Chapter of this Scene'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
