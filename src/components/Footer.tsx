import React from 'react';
import {
  BookOpen,
  Heart,
  Lock,
  Sparkles,
  Compass,
  ArrowUp,
  Feather,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';

export const Footer: React.FC = () => {
  const { settings, navigateTo, setIsCreatorLoginOpen, creatorAuth } = useNovel();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#c49b66]/20 bg-[#0a0b10] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c49b66] to-[#785428] p-[1px]">
              <div className="w-full h-full bg-[#0c0d14] rounded-[7px] flex items-center justify-center font-display font-bold text-xs text-[#faebd7]">
                A
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm tracking-wider text-[#faebd7]">
                {settings.novelTitle}
              </h4>
              <p className="text-[11px] text-neutral-500 font-serif italic">
                By {settings.authorName} • {settings.releaseSchedule}
              </p>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-[#faebd7] transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => navigateTo('chapters')}
              className="hover:text-[#faebd7] transition-colors"
            >
              Chapters
            </button>
            <button
              onClick={() => navigateTo('characters')}
              className="hover:text-[#faebd7] transition-colors"
            >
              Codex
            </button>
            <button
              onClick={() => navigateTo('scenes')}
              className="hover:text-[#faebd7] transition-colors"
            >
              Scenes
            </button>
            <button
              onClick={() => navigateTo('gallery')}
              className="hover:text-[#faebd7] transition-colors"
            >
              Art Gallery
            </button>
            <button
              onClick={() => navigateTo('videos')}
              className="hover:text-[#faebd7] transition-colors"
            >
              Cinema Lounge
            </button>
            <button
              onClick={() => navigateTo('favorites')}
              className="hover:text-[#faebd7] transition-colors flex items-center gap-1 text-rose-400"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Library</span>
            </button>
          </div>

          {/* Author Studio & Scroll to top */}
          <div className="flex items-center gap-3">
            {creatorAuth.isAuthenticated ? (
              <button
                onClick={() => navigateTo('creator-dashboard')}
                className="px-3 py-1.5 rounded-xl bg-[#c49b66]/20 text-[#faebd7] hover:bg-[#c49b66] hover:text-black font-semibold text-xs border border-[#c49b66]/40 transition-all flex items-center gap-1.5"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Creator Studio</span>
              </button>
            ) : (
              <button
                onClick={() => setIsCreatorLoginOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-neutral-200 border border-white/10 text-xs transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#c49b66]" />
                <span>Author Portal</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} {settings.novelTitle}. All universe rights reserved.</p>
          <p className="font-serif italic text-neutral-500">
            "The twilight shall claim no soul that burns with its own celestial fire."
          </p>
        </div>
      </div>
    </footer>
  );
};
