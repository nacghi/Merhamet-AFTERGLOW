import React, { useState } from 'react';
import { useNovel } from '../context/NovelContext';
import { Character } from '../types';
import { AtmosphericMountainSky } from './AtmosphericMountainSky';
import { EagleIcon, DoveIcon, AlweryaghlCrest } from './Symbols';
import {
  Heart,
  ChevronRight,
  BookOpen,
  Sparkles,
  Shield,
  Compass,
  ArrowLeft,
  Share2,
  Flame,
} from 'lucide-react';

export const MobileWorldView: React.FC = () => {
  const {
    characters,
    selectedCharacterId,
    navigateTo,
    chapters,
    scenes,
    isFavorited,
    toggleFavorite,
    language,
  } = useNovel();

  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(
    selectedCharacterId || (characters[0]?.id || null)
  );

  const isDarija = language === 'darija';
  const selectedChar = characters.find((c) => c.id === activeCharacterId) || characters[0];
  const isSaved = selectedChar ? isFavorited('character', selectedChar.id) : false;

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
          <EagleIcon className="w-3.5 h-3.5 text-[#e39264]" />
          <span>{isDarija ? 'أرواح جبال الورياغل' : 'The Living Codex'}</span>
        </div>

        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-[#edf4fd] ${isDarija ? 'font-arabic' : 'font-display'}`}>
          {isDarija ? 'شخصيات الشفق' : 'WORLD & CAST'}
        </h1>
        
        <p className={`text-xs sm:text-sm text-[#8fa8c8] mt-1 max-w-xs mx-auto ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
          {isDarija
            ? 'الأرواح اللي كترسم قدر الشفق بين جبال الأطلس والصنوبر.'
            : 'The figures who shape the twilight destiny across the high mountain passes.'}
        </p>

        {/* Character Avatar Switcher Ribbon */}
        <div className="flex gap-2.5 overflow-x-auto pt-5 pb-1 justify-center scrollbar-none">
          {characters.map((char) => {
            const isSelected = char.id === selectedChar?.id;
            return (
              <button
                key={char.id}
                onClick={() => setActiveCharacterId(char.id)}
                className={`relative group shrink-0 rounded-2xl p-1 transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-t from-[#e39264] to-[#7292bf] scale-105 shadow-[0_0_16px_rgba(227,146,100,0.35)]'
                    : 'bg-[#0a1226] border border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#101930]">
                  <img
                    src={char.profileImage}
                    alt={char.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </AtmosphericMountainSky>

      {/* Selected Character Spotlight Card */}
      {selectedChar && (
        <div className="max-w-md md:max-w-xl mx-auto px-4 pt-6 space-y-6">
          {/* Main Cinematic Portrait & Details Card */}
          <div className="relative rounded-3xl overflow-hidden bg-[#081022] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
            {/* Portrait Backdrop */}
            <div className="relative w-full aspect-[4/3] bg-[#0c1429] overflow-hidden">
              <img
                src={selectedChar.profileImage}
                alt={selectedChar.name}
                className="w-full h-full object-cover object-top filter brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081022] via-[#081022]/45 to-transparent" />

              {/* Floating Favorite Button */}
              <button
                onClick={() => toggleFavorite('character', selectedChar.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all ${
                  isSaved
                    ? 'bg-[#182a4d] border-[#e39264] text-[#e39264]'
                    : 'bg-[#080f22]/70 border-white/10 text-[#8da6c5] hover:text-white'
                }`}
                title={isSaved ? 'Remove from Saved' : 'Save Character'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              {/* Character Title Overlay */}
              <div className={`absolute bottom-4 left-4 right-4 ${isDarija ? 'text-right' : ''}`}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#e39264] font-semibold block">
                  {isDarija ? selectedChar.roleDarija || selectedChar.role : selectedChar.role || 'Luminary'}
                </span>
                <h2 className={`text-2xl sm:text-3xl font-bold text-[#f0f6ff] ${isDarija ? 'font-arabic' : 'font-display'}`}>
                  {isDarija ? selectedChar.nameDarija || selectedChar.name : selectedChar.name}
                </h2>
              </div>
            </div>

            {/* Character Info Body */}
            <div className="p-5 space-y-5">
              {/* Iconic Quote */}
              {(selectedChar.quote || selectedChar.quoteDarija) && (
                <div className="p-4 rounded-2xl bg-[#0e1933]/85 border border-[#7292bf]/30">
                  <p className={`text-sm sm:text-base text-[#d4e2f2] leading-relaxed text-center ${isDarija ? 'font-arabic' : 'font-serif italic'}`}>
                    “{isDarija ? selectedChar.quoteDarija || selectedChar.quote : selectedChar.quote}”
                  </p>
                </div>
              )}

              {/* Short Summary */}
              <div className={isDarija ? 'text-right' : ''}>
                <h4 className={`text-[11px] font-mono uppercase tracking-wider text-[#7994b6] mb-1.5 flex items-center gap-1.5 ${isDarija ? 'justify-end' : ''}`}>
                  <Compass className="w-3.5 h-3.5 text-[#e39264]" />
                  <span>{isDarija ? 'الجوهر والشخصية' : 'Essence & Persona'}</span>
                </h4>
                <p className={`text-sm text-[#b8ccdf] leading-relaxed ${isDarija ? 'font-arabic-sans' : 'font-serif'}`}>
                  {isDarija
                    ? selectedChar.shortDescriptionDarija || selectedChar.shortDescription
                    : selectedChar.shortDescription || selectedChar.personality}
                </p>
              </div>

              {/* Lore Background */}
              {selectedChar.background && (
                <div className={isDarija ? 'text-right' : ''}>
                  <h4 className={`text-[11px] font-mono uppercase tracking-wider text-[#7994b6] mb-1.5 flex items-center gap-1.5 ${isDarija ? 'justify-end' : ''}`}>
                    <Shield className="w-3.5 h-3.5 text-[#7292bf]" />
                    <span>{isDarija ? 'أصل الحكاية والتاريخ' : 'Origins & Chronicle'}</span>
                  </h4>
                  <p className={`text-xs sm:text-sm text-[#9eb6ce] leading-relaxed ${isDarija ? 'font-arabic-sans' : 'font-serif'}`}>
                    {selectedChar.background}
                  </p>
                </div>
              )}

              {/* Character Relationships */}
              {selectedChar.relationships && selectedChar.relationships.length > 0 && (
                <div className={isDarija ? 'text-right' : ''}>
                  <h4 className={`text-[11px] font-mono uppercase tracking-wider text-[#7994b6] mb-2 flex items-center gap-1.5 ${isDarija ? 'justify-end' : ''}`}>
                    <Sparkles className="w-3.5 h-3.5 text-[#e39264]" />
                    <span>{isDarija ? 'روابط القدر' : 'Ties of Destiny'}</span>
                  </h4>
                  <div className="space-y-2.5">
                    {selectedChar.relationships.map((rel, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#091124] border border-white/[0.06] flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#e39264] mt-1.5 shrink-0" />
                        <div className={`flex-1 min-w-0 ${isDarija ? 'text-right' : ''}`}>
                          <div className={`flex items-center gap-2 ${isDarija ? 'justify-end' : ''}`}>
                            <span className={`text-xs font-bold text-[#eef4fb] ${isDarija ? 'font-arabic' : 'font-display'}`}>
                              {rel.targetCharacterName || 'Ally'}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#142342] text-[#8faecf]">
                              {isDarija ? rel.relationshipTypeDarija || rel.relationshipType : rel.relationshipType}
                            </span>
                          </div>
                          <p className={`text-xs text-[#8aa3be] mt-1 ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
                            {rel.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Chapters Jump */}
              {selectedChar.relatedChapterIds && selectedChar.relatedChapterIds.length > 0 && (
                <div className="pt-2">
                  <h4 className={`text-[11px] font-mono uppercase tracking-wider text-[#7994b6] mb-2 flex items-center gap-1.5 ${isDarija ? 'justify-end' : ''}`}>
                    <BookOpen className="w-3.5 h-3.5 text-[#7292bf]" />
                    <span>{isDarija ? 'فصول متعلقة' : 'Featured in Chapters'}</span>
                  </h4>
                  <div className={`flex flex-wrap gap-2 ${isDarija ? 'justify-end' : ''}`}>
                    {selectedChar.relatedChapterIds.map((chId) => {
                      const ch = chapters.find((c) => c.id === chId);
                      if (!ch) return null;
                      return (
                        <button
                          key={chId}
                          onClick={() => navigateTo('reader', { chapterId: chId })}
                          className="px-3 py-1.5 rounded-xl bg-[#111e38] border border-white/[0.08] hover:border-[#7b9cca]/50 text-xs text-[#d6e3f2] hover:text-white transition-all flex items-center gap-1.5"
                        >
                          <span className={isDarija ? 'font-arabic' : 'font-display'}>
                            {isDarija
                              ? `فصل ${ch.chapterNumber}: ${ch.titleDarija || ch.title}`
                              : `Ch. ${ch.chapterNumber}: ${ch.title}`}
                          </span>
                          <ChevronRight className="w-3 h-3 text-[#e39264]" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
