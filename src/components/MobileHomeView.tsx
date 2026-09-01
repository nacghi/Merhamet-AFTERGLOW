import React, { useState } from 'react';
import { useNovel } from '../context/NovelContext';
import { AtmosphericMountainSky } from './AtmosphericMountainSky';
import {
  AfterglowVisualMark,
  EagleIcon,
  DoveIcon,
  SignpostSymbol,
  MountainRidgeIcon,
  AlweryaghlCrest,
} from './Symbols';
import { ambientAudio } from '../services/ambientAudio';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Languages,
  ChevronRight,
  Sparkles,
  Compass,
  Heart,
  Feather,
  Flame,
  Film,
  Bookmark,
} from 'lucide-react';

export const MobileHomeView: React.FC = () => {
  const {
    chapters,
    characters,
    scenes,
    gallery,
    readingProgress,
    navigateTo,
    settings,
    language,
    toggleLanguage,
    isFavorited,
    toggleFavorite,
  } = useNovel();

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(ambientAudio.getIsPlaying());
  const isDarija = language === 'darija';

  const handleAudioToggle = () => {
    const nextState = ambientAudio.toggle();
    setIsAudioPlaying(nextState);
  };

  // Find latest in-progress or first chapter
  const publishedChapters = chapters.filter((c) => c.status === 'published');
  const progressList = Object.values(readingProgress) as import('../types').ReadingProgress[];
  const latestProgress =
    progressList.length > 0
      ? [...progressList].sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0]
      : null;

  const currentChapter = latestProgress
    ? chapters.find((c) => c.id === latestProgress.chapterId) || publishedChapters[0]
    : publishedChapters[0];

  const currentPercent = latestProgress ? latestProgress.progress : 0;

  return (
    <div className="min-h-screen bg-[#030611] text-[#e2ebf5] pb-28 selection:bg-[#7292bf]/30">
      {/* 1. Living Mountain Landscape Header */}
      <div className="relative overflow-hidden">
        <AtmosphericMountainSky
          variant="full"
          showEagle={true}
          showMist={true}
          showStars={true}
          showPines={true}
          showMoon={true}
          className="min-h-[530px] flex flex-col justify-between p-4 sm:p-6"
        >
          {/* Top Utility Layer: Audio toggle, Realm badge, Language switch */}
          <div className="flex items-center justify-between pt-1 relative z-20">
            {/* Audio Ambience Button */}
            <button
              onClick={handleAudioToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all text-xs font-mono tracking-wider ${
                isAudioPlaying
                  ? 'bg-[#1a2c4e]/80 border-[#7292bf]/60 text-[#edf4fd] shadow-[0_0_15px_rgba(114,146,191,0.3)]'
                  : 'bg-white/[0.04] border-white/10 text-[#8ba4c4] hover:text-white hover:bg-white/[0.08]'
              }`}
              title={isAudioPlaying ? 'Mute Mountain Ambience' : 'Play Mountain Wind'}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#e39264] animate-pulse" />
                  <span className="text-[10px] uppercase font-semibold">Wind Alive</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase">Atmosphere</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#7b9cca]/40 text-xs font-mono text-[#a5bedb] hover:text-white transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              <Languages className="w-3.5 h-3.5 text-[#e39264]" />
              <span className="font-semibold">{isDarija ? 'الدارجة المغربية' : 'English'}</span>
            </button>
          </div>

          {/* Central Living Landscape Core: Afterglow Brand Mark & Poetic Heart */}
          <div className="my-auto text-center relative z-20 py-4 flex flex-col items-center">
            {/* Visual Mark Logo */}
            <div className="relative mb-3 flex items-center justify-center">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#7292bf]/20 via-[#e39264]/15 to-[#7292bf]/20 rounded-full blur-xl animate-pulse-glow" />
              <AfterglowVisualMark size={118} className="drop-shadow-[0_12px_28px_rgba(0,0,0,0.8)]" />
            </div>

            {/* Title & Lore Subtitle */}
            <div className="space-y-1">
              <h1 className="font-display text-3xl sm:text-4xl tracking-[0.28em] font-extrabold text-[#edf4fd] uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                {settings.novelTitle || 'AFTERGLOW'}
              </h1>
              
              {isDarija ? (
                <div className="text-center font-arabic pt-1">
                  <p className="text-xl font-bold text-[#e39264] tracking-wide">
                    مَرْحَمَتْ : الشَّفَقْ
                  </p>
                  <p className="text-xs text-[#9eb6d3] mt-1 font-arabic-sans max-w-xs mx-auto">
                    حكاية جبال الورياغل بين الفقد والرجوع
                  </p>
                </div>
              ) : (
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#8fa8c8] mt-1">
                  {settings.novelSubtitle || 'MERHAMET : THE AFTERGLOW'}
                </p>
              )}
            </div>

            {/* Poster Signpost Tagline Banner */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050c1e]/75 backdrop-blur-md border border-[#7899c4]/25 shadow-lg">
              <SignpostSymbol className="w-4 h-4 text-[#e39264]" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#cadcf1]">
                {isDarija
                  ? 'الذكريات • الألم • الحب • الشفق'
                  : 'Memories • Pain • Love • Afterglow'}
              </span>
            </div>
          </div>

          {/* "Continue Journey" Floating Hearthstone Portal */}
          {currentChapter && (
            <div className="relative z-30 -mb-7 max-w-md mx-auto w-full">
              <div className="rounded-2xl backdrop-blur-2xl bg-[#091124]/92 border border-[#7899c4]/30 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.8)] transition-all hover:border-[#7899c4]/50">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#8da8ca] mb-2">
                  <span className="flex items-center gap-1.5 text-[#e39264] font-semibold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{isDarija ? 'متابعة القراءة' : 'Resume Chronicle'}</span>
                  </span>
                  <span className="text-[#9cb7d6]">
                    {currentPercent > 0 ? `${currentPercent}%` : isDarija ? 'فصل جديد' : 'New Chapter'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-bold text-[#f0f6ff] truncate ${isDarija ? 'font-arabic text-right' : 'font-display'}`}>
                      {isDarija
                        ? currentChapter.titleDarija || currentChapter.title
                        : `Chapter ${currentChapter.chapterNumber}: ${currentChapter.title}`}
                    </h3>
                    <p className={`text-xs text-[#8da6c5] truncate mt-0.5 ${isDarija ? 'font-arabic-sans text-right' : 'font-serif italic'}`}>
                      {isDarija
                        ? currentChapter.excerptDarija || currentChapter.excerpt
                        : currentChapter.excerpt || 'Enter the nocturnal mountain pass...'}
                    </p>
                  </div>

                  <button
                    onClick={() => navigateTo('reader', { chapterId: currentChapter.id })}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#192b4e] to-[#253e70] hover:from-[#213763] hover:to-[#2e4d8a] border border-[#8daecc]/40 text-[#ffffff] font-display text-xs tracking-wider uppercase font-semibold shadow-[0_0_18px_rgba(114,146,191,0.35)] transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <span>{currentPercent > 0 ? (isDarija ? 'أكمل' : 'Read') : (isDarija ? 'ابدأ' : 'Begin')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-[#131f38] rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-gradient-to-r from-[#7a9ec7] to-[#e39264] transition-all duration-500 rounded-full"
                    style={{ width: `${Math.max(currentPercent, 8)}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </AtmosphericMountainSky>
      </div>

      {/* 2. Main Atmospheric Content Body */}
      <div className="max-w-md md:max-w-xl mx-auto px-4 pt-14 space-y-9">
        {/* Poetic Inscription Card */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#081022] to-[#040814] border border-[#7899c4]/20 p-5 text-center shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e39264]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <AlweryaghlCrest className="w-6 h-6 text-[#e39264] mb-2 opacity-90" />
            
            {isDarija ? (
              <div className="font-arabic space-y-1.5">
                <p className="text-base sm:text-lg font-bold text-[#edf4fd] leading-relaxed">
                  «الحُب ليس نهاية الفقد... بل بداية لشيء آخر»
                </p>
                <p className="text-xs sm:text-sm text-[#9cb5d3] leading-relaxed">
                  كاين شي حب ما كيطفاش. كيبقى. وخا الدنيا كاملة تنسى ضواها.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="font-serif italic text-sm sm:text-base text-[#edf4fd] leading-relaxed">
                  “Some loves don’t burn out. They stay.”
                </p>
                <p className="font-mono text-[11px] text-[#8fa8c8] tracking-wider uppercase">
                  When the light fades, fate reveals the hearts never meant to part
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Four Primary Mountain Portals */}
        <div className="grid grid-cols-4 gap-2.5">
          {[
            {
              id: 'chapters' as const,
              label: isDarija ? 'الرواية' : 'Story',
              sub: `${publishedChapters.length} ${isDarija ? 'فصول' : 'Chs'}`,
              icon: BookOpen,
              accent: 'from-[#1a2d52] to-[#0f1b34]',
            },
            {
              id: 'characters' as const,
              label: isDarija ? 'الشخصيات' : 'World',
              sub: `${characters.length} ${isDarija ? 'أبطال' : 'Cast'}`,
              icon: EagleIcon,
              accent: 'from-[#233550] to-[#121c2e]',
            },
            {
              id: 'gallery' as const,
              label: isDarija ? 'المعرض' : 'Gallery',
              sub: `${gallery.length} ${isDarija ? 'صور' : 'Arts'}`,
              icon: Film,
              accent: 'from-[#192b4a] to-[#0d172a]',
            },
            {
              id: 'favorites' as const,
              label: isDarija ? 'الخزانة' : 'Library',
              sub: isDarija ? 'المحفوظات' : 'Saved',
              icon: Bookmark,
              accent: 'from-[#202744] to-[#0e1224]',
            },
          ].map((portal) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.id}
                onClick={() => navigateTo(portal.id)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#081022]/85 border border-white/[0.07] hover:border-[#7b9cca]/50 hover:bg-[#0e1a38] transition-all group text-center shadow-lg"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-b ${portal.accent} border border-white/10 flex items-center justify-center text-[#9eb8d8] group-hover:text-white group-hover:scale-110 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)]`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[11px] font-medium text-[#d3e3f6] mt-2 group-hover:text-white truncate ${isDarija ? 'font-arabic' : ''}`}>
                  {portal.label}
                </span>
                <span className="text-[9px] font-mono text-[#6e87a8] mt-0.5">
                  {portal.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section: The Mountain Pass Chronicle (Chapters Timeline) */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#e39264] rounded-full shadow-[0_0_8px_rgba(227,146,100,0.6)]" />
              <h2 className={`text-sm tracking-[0.2em] uppercase font-bold text-[#eef4fb] ${isDarija ? 'font-arabic text-base' : 'font-display'}`}>
                {isDarija ? 'فصول حكاية الشفق' : 'The Pass Chronicles'}
              </h2>
            </div>
            <button
              onClick={() => navigateTo('chapters')}
              className="text-xs font-mono text-[#8fa8c8] hover:text-[#e2ebf5] flex items-center gap-1 transition-colors"
            >
              <span>{isDarija ? 'جميع الفصول' : 'All Chapters'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {publishedChapters.slice(0, 3).map((chapter) => {
              const prog = readingProgress[`local-reader_${chapter.id}`]?.progress || 0;
              return (
                <div
                  key={chapter.id}
                  onClick={() => navigateTo('reader', { chapterId: chapter.id })}
                  className="group relative cursor-pointer rounded-2xl bg-[#081022]/90 border border-white/[0.07] hover:border-[#7b9cca]/50 p-4 transition-all duration-300 hover:shadow-[0_10px_28px_rgba(8,16,36,0.6)] overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-3.5">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#162544] to-[#0c1527] border border-[#3b537e]/50 flex flex-col items-center justify-center shrink-0 shadow-md">
                        <span className="text-[9px] font-mono uppercase text-[#7a95b8]">CH</span>
                        <span className="text-xs font-display font-extrabold text-[#edf4fd]">
                          {chapter.chapterNumber}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <h4 className={`text-sm font-bold text-[#e8f1fc] group-hover:text-white truncate ${isDarija ? 'font-arabic text-base' : 'font-display'}`}>
                          {isDarija ? chapter.titleDarija || chapter.title : chapter.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[#7791b1] mt-0.5">
                          <span>{chapter.readingTimeMinutes || 7} {isDarija ? 'دقائق' : 'min'}</span>
                          <span>•</span>
                          <span>{isDarija ? 'جبال الورياغل' : 'Alweryaghl Pass'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {prog > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#162744] border border-[#7899c4]/30 text-[10px] font-mono text-[#8faecf]">
                          {prog}%
                        </span>
                      )}
                      <div className="w-7 h-7 rounded-lg bg-white/[0.04] group-hover:bg-[#182a4d] flex items-center justify-center text-[#7e99bc] group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Souls of the Mountain (Character Showcase) */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <EagleIcon className="w-4 h-4 text-[#e39264]" />
              <h2 className={`text-sm tracking-[0.2em] uppercase font-bold text-[#eef4fb] ${isDarija ? 'font-arabic text-base' : 'font-display'}`}>
                {isDarija ? 'أرواح الورياغل' : 'Souls of the Ridge'}
              </h2>
            </div>
            <button
              onClick={() => navigateTo('characters')}
              className="text-xs font-mono text-[#8fa8c8] hover:text-[#e2ebf5] flex items-center gap-1 transition-colors"
            >
              <span>{isDarija ? 'استكشف الكل' : 'View Cast'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {characters.map((char) => (
              <div
                key={char.id}
                onClick={() => navigateTo('character-detail', { characterId: char.id })}
                className="snap-start shrink-0 w-36 cursor-pointer group rounded-2xl bg-[#081022] border border-white/[0.07] hover:border-[#7b9cca]/50 p-2.5 transition-all text-center shadow-md"
              >
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-[#121c32]">
                  <img
                    src={char.profileImage}
                    alt={char.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-1.5 left-2 right-2 text-left">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#e39264] block truncate">
                      {isDarija ? char.roleDarija || char.role : char.role}
                    </span>
                  </div>
                </div>

                <h4 className={`text-xs font-bold text-[#edf4fd] truncate ${isDarija ? 'font-arabic text-sm' : 'font-display'}`}>
                  {isDarija ? char.nameDarija || char.name : char.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Mountain Memory Moments */}
        {scenes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8fa8c8]" />
                <h2 className={`text-sm tracking-[0.2em] uppercase font-bold text-[#eef4fb] ${isDarija ? 'font-arabic text-base' : 'font-display'}`}>
                  {isDarija ? 'لحظات الشفق الخالدة' : 'Twilight Echoes'}
                </h2>
              </div>
              <button
                onClick={() => navigateTo('scenes')}
                className="text-xs font-mono text-[#8fa8c8] hover:text-[#e2ebf5] flex items-center gap-1 transition-colors"
              >
                <span>{isDarija ? 'الكل' : 'View All'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {scenes.slice(0, 2).map((scene) => (
                <div
                  key={scene.id}
                  onClick={() => navigateTo('scenes', { sceneId: scene.id })}
                  className="relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#7b9cca]/50 group cursor-pointer aspect-[16/9] bg-[#0c1428] shadow-lg"
                >
                  <img
                    src={scene.image || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'}
                    alt={scene.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-[#030612]/50 to-transparent" />

                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-[#080e1d]/85 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase text-[#e39264]">
                        {scene.mood || 'Alweryaghl Nocturne'}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-base font-bold text-[#edf4fd] group-hover:text-white">
                        {scene.title}
                      </h3>
                      {scene.quote && (
                        <p className="font-serif italic text-xs text-[#9bb3cf] line-clamp-1 mt-1">
                          “{scene.quote}”
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mountain Sanctuary Signoff */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#060c1c] to-[#02050e] border border-white/[0.06] text-center shadow-lg">
          <DoveIcon className="w-5 h-5 text-[#8fa8c8] mx-auto mb-2.5 opacity-85" />
          <p className={`text-xs text-[#89a1be] leading-relaxed max-w-xs mx-auto ${isDarija ? 'font-arabic-sans' : 'font-serif italic'}`}>
            {isDarija
              ? 'تحت قمم الأطلس الباردة، فين كيطير النسر وفين كترتاح الحمامة، كل سطر فهاد الرواية كيحمل قطعة من الروح.'
              : '“Under the high Atlas peaks where eagles soar through the midnight haze, every chapter holds a piece of eternity.”'}
          </p>
          <span className="text-[10px] font-mono text-[#5d7390] uppercase tracking-widest mt-3 block">
            — {settings.authorName || 'Novel Author'} • Alweryaghl Chronicle
          </span>
        </div>
      </div>
    </div>
  );
};
