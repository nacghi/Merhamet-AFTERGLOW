import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  Sparkles,
  Image as ImageIcon,
  Film,
  Heart,
  Search,
  Lock,
  LayoutDashboard,
  Menu,
  X,
  Compass,
  Bookmark,
  ChevronRight,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';
import { AppView } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    navigateTo,
    setIsSearchOpen,
    creatorAuth,
    setIsCreatorLoginOpen,
    chapters,
    characters,
    scenes,
    gallery,
    videos,
    favorites,
    getLatestReadingProgress,
    settings,
  } = useNovel();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const latestProgress = getLatestReadingProgress();

  const publishedChapters = chapters.filter((c) => c.status === 'published');

  const navItems: { id: AppView; label: string; icon: React.FC<{ className?: string }>; count?: number }[] = [
    { id: 'home', label: 'Overview', icon: Compass },
    { id: 'chapters', label: 'Chapters', icon: BookOpen, count: publishedChapters.length },
    { id: 'characters', label: 'Characters', icon: Users, count: characters.length },
    { id: 'scenes', label: 'Scenes', icon: Sparkles, count: scenes.length },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, count: gallery.length },
    { id: 'videos', label: 'Cinema', icon: Film, count: videos.length },
    { id: 'favorites', label: 'Library', icon: Heart, count: favorites.length },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d14]/90 backdrop-blur-md border-b border-[#c49b66]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="group text-left flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c49b66] to-[#785428] p-[1px] shadow-md shadow-[#c49b66]/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0c0d14] rounded-[7px] flex items-center justify-center">
                  <span className="font-display font-bold text-sm text-[#faebd7]">A</span>
                </div>
              </div>
              <div>
                <h1 className="font-display font-bold text-lg tracking-widest text-[#faebd7] group-hover:text-[#c49b66] transition-colors leading-none">
                  {settings.novelTitle || 'AFTERGLOW'}
                </h1>
                <span className="text-[10px] tracking-widest text-[#c49b66]/80 uppercase font-sans">
                  The Novel Universe
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#c49b66]/15 text-[#faebd7] border border-[#c49b66]/30 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#d4a373]' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-300 font-mono">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Continue Reading Pill if user has progress */}
            {latestProgress && currentView !== 'reader' && (
              <button
                onClick={() => navigateTo('reader', { chapterId: latestProgress.chapterId })}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#c49b66]/20 to-transparent border border-[#c49b66]/30 hover:border-[#c49b66]/60 text-xs text-[#faebd7] transition-all group"
                title="Continue reading from your latest bookmark"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#d4a373] animate-pulse" />
                <span className="truncate max-w-[130px]">
                  Ch. {latestProgress.chapterNumber || '?'}: {latestProgress.chapterTitle || 'Continue'}
                </span>
                <span className="text-[10px] text-[#c49b66] font-mono">
                  {latestProgress.progress}%
                </span>
              </button>
            )}

            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 hover:border-[#c49b66]/40 text-xs flex items-center gap-2 transition-colors"
              title="Search the Afterglow universe (Cmd+K)"
            >
              <Search className="w-4 h-4 text-[#c49b66]" />
              <span className="hidden md:inline">Search lore</span>
              <kbd className="hidden md:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-neutral-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Creator Studio Link / Login Gate */}
            {creatorAuth.isAuthenticated ? (
              <button
                onClick={() => navigateTo('creator-dashboard')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  currentView === 'creator-dashboard'
                    ? 'bg-[#c49b66] text-neutral-950 shadow-md shadow-[#c49b66]/30'
                    : 'bg-[#c49b66]/20 hover:bg-[#c49b66]/30 text-[#faebd7] border border-[#c49b66]/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-inherit" />
                <span className="hidden sm:inline">Creator Studio</span>
                <span className="sm:hidden">Studio</span>
              </button>
            ) : (
              <button
                onClick={() => setIsCreatorLoginOpen(true)}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-neutral-200 border border-white/10 text-xs flex items-center gap-1.5 transition-colors"
                title="Creator & Author Login"
              >
                <Lock className="w-3.5 h-3.5 text-[#c49b66]" />
                <span className="hidden sm:inline">Creator</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0c0d14] px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
          {latestProgress && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('reader', { chapterId: latestProgress.chapterId });
              }}
              className="w-full mb-3 p-3 rounded-xl bg-[#c49b66]/15 border border-[#c49b66]/30 text-left flex items-center justify-between text-[#faebd7]"
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-[#d4a373]" />
                <div>
                  <div className="text-xs font-semibold">Resume Reading</div>
                  <div className="text-xs text-neutral-400">
                    Chapter {latestProgress.chapterNumber}: {latestProgress.chapterTitle}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#c49b66]/20 text-[#faebd7]">
                {latestProgress.progress}%
              </span>
            </button>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo(item.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#c49b66]/20 text-[#faebd7] border border-[#c49b66]/40'
                    : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4a373]' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-neutral-400 font-mono">
                      {item.count}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
