import React from 'react';
import { useNovel } from '../context/NovelContext';
import { AppView } from '../types';
import { Compass, BookOpen, Users, Image, Bookmark, Film } from 'lucide-react';
import { EagleIcon, DoveIcon } from './Symbols';

export const MobileBottomNav: React.FC = () => {
  const { currentView, navigateTo, language } = useNovel();
  const isDarija = language === 'darija';

  // Highlight mapping for sub-views
  const isHomeActive = currentView === 'home';
  const isStoryActive = currentView === 'chapters' || currentView === 'reader';
  const isWorldActive = currentView === 'characters' || currentView === 'character-detail';
  const isGalleryActive = currentView === 'gallery' || currentView === 'scenes' || currentView === 'videos';
  const isLibraryActive = currentView === 'favorites';

  const navItems = [
    {
      id: 'home' as AppView,
      label: isDarija ? 'الرئيسية' : 'Home',
      isActive: isHomeActive,
      icon: (active: boolean) => (
        <Compass
          className={`w-5 h-5 transition-transform duration-300 ${
            active ? 'text-[#eef5fc] scale-110 rotate-12' : 'text-[#6f85a3]'
          }`}
        />
      ),
    },
    {
      id: 'chapters' as AppView,
      label: isDarija ? 'الرواية' : 'Story',
      isActive: isStoryActive,
      icon: (active: boolean) => (
        <BookOpen
          className={`w-5 h-5 transition-transform duration-300 ${
            active ? 'text-[#eef5fc] scale-110' : 'text-[#6f85a3]'
          }`}
        />
      ),
    },
    {
      id: 'characters' as AppView,
      label: isDarija ? 'العالم' : 'World',
      isActive: isWorldActive,
      icon: (active: boolean) => (
        <EagleIcon
          className={`w-5 h-5 transition-transform duration-300 ${
            active ? 'text-[#eef5fc] scale-110' : 'text-[#6f85a3]'
          }`}
          glow={active}
        />
      ),
    },
    {
      id: 'gallery' as AppView,
      label: isDarija ? 'المعرض' : 'Gallery',
      isActive: isGalleryActive,
      icon: (active: boolean) => (
        <Film
          className={`w-5 h-5 transition-transform duration-300 ${
            active ? 'text-[#eef5fc] scale-110' : 'text-[#6f85a3]'
          }`}
        />
      ),
    },
    {
      id: 'favorites' as AppView,
      label: isDarija ? 'الخزانة' : 'Library',
      isActive: isLibraryActive,
      icon: (active: boolean) => (
        <DoveIcon
          className={`w-5 h-5 transition-transform duration-300 ${
            active ? 'text-[#eef5fc] scale-110' : 'text-[#6f85a3]'
          }`}
          glow={active}
        />
      ),
    },
  ];

  // Distraction-free reading hides bottom nav
  if (currentView === 'reader') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe">
      <div className="max-w-md md:max-w-xl mx-auto px-4 pb-3">
        <div className="relative backdrop-blur-2xl bg-[#060a17]/92 border border-white/[0.08] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.7)] flex items-center justify-around py-2 px-1">
          {navItems.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`relative flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-300 ${
                  item.isActive
                    ? 'text-[#eaf2fb]'
                    : 'text-[#677d9c] hover:text-[#a0b5d0]'
                }`}
              >
                {/* Active Moonlit Glow Indicator */}
                {item.isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b2b4d]/65 via-[#131e38]/30 to-transparent rounded-xl border-b-2 border-[#9bb6dc] shadow-[0_0_16px_rgba(155,182,220,0.25)]" />
                )}

                <div className="relative z-10 flex flex-col items-center gap-1">
                  {item.icon(item.isActive)}
                  <span
                    className={`text-[10px] tracking-wider uppercase transition-colors truncate ${
                      isDarija ? 'font-arabic text-[11px]' : 'font-sans font-medium'
                    } ${
                      item.isActive
                        ? 'text-[#e2edf8] font-bold'
                        : 'text-[#6a809f]'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
