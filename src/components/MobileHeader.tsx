import React, { useState } from 'react';
import { useNovel } from '../context/NovelContext';
import { Search, Volume2, VolumeX, Sparkles, User, Feather, RotateCcw } from 'lucide-react';
import { EagleIcon, DoveIcon } from './Symbols';
import { ambientAudio } from '../services/ambientAudio';

interface MobileHeaderProps {
  onReplayPrologue?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onReplayPrologue }) => {
  const { currentView, navigateTo, setIsSearchOpen, creatorAuth, setIsCreatorLoginOpen } = useNovel();
  const [isAudioPlaying, setIsAudioPlaying] = useState(() => ambientAudio.getIsPlaying());

  const toggleSound = () => {
    const active = ambientAudio.toggle();
    setIsAudioPlaying(active);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#040713]/85 border-b border-white/[0.06] transition-colors">
      <div className="max-w-md md:max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Replay Prologue / Eagle Crest */}
        <button
          onClick={() => {
            if (onReplayPrologue) onReplayPrologue();
            else navigateTo('home');
          }}
          className="p-2 rounded-xl text-[#9cb1cd] hover:text-[#e2ebf5] hover:bg-white/[0.04] transition-all flex items-center gap-1.5 group"
          title="Replay Prologue Atmosphere"
        >
          <EagleIcon className="w-4 h-4 text-[#8fa7c7] group-hover:text-[#e39264] transition-colors" />
        </button>

        {/* Center: Brand Title */}
        <button
          onClick={() => navigateTo('home')}
          className="flex flex-col items-center justify-center group text-center"
        >
          <span className="font-display text-sm tracking-[0.32em] font-bold text-[#eef4fb] group-hover:text-[#ffffff] transition-colors">
            AFTERGLOW
          </span>
          <span className="text-[9px] font-mono tracking-widest text-[#728aa8] uppercase -mt-0.5">
            The Chronicle
          </span>
        </button>

        {/* Right: Audio Toggle, Search & Creator / Profile */}
        <div className="flex items-center gap-1">
          {/* Ambient Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-all ${
              isAudioPlaying
                ? 'bg-[#182744] border-[#7292bf]/50 text-[#e39264] shadow-[0_0_12px_rgba(114,146,191,0.3)]'
                : 'border-transparent text-[#7e95b3] hover:text-[#c4d6eb] hover:bg-white/[0.04]'
            }`}
            title={isAudioPlaying ? 'Mute Night Atmosphere' : 'Play Mountain Wind & Twilight Ambience'}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-xl text-[#7e95b3] hover:text-[#c4d6eb] hover:bg-white/[0.04] transition-all"
            title="Search Lore & Chapters"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Creator / Codex Access */}
          <button
            onClick={() => {
              if (creatorAuth.isAuthenticated) {
                navigateTo('creator-dashboard');
              } else {
                setIsCreatorLoginOpen(true);
              }
            }}
            className={`p-2 rounded-xl border transition-all ${
              creatorAuth.isAuthenticated
                ? 'bg-[#16233d] border-[#e39264]/60 text-[#e39264]'
                : 'border-transparent text-[#7e95b3] hover:text-[#c4d6eb] hover:bg-white/[0.04]'
            }`}
            title={creatorAuth.isAuthenticated ? 'Creator Studio' : 'Author Login'}
          >
            <Feather className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
