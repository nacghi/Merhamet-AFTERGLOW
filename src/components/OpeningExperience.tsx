import React, { useState, useEffect } from 'react';
import { EagleIcon, DoveIcon, AfterglowVisualMark, SignpostSymbol } from './Symbols';
import { Volume2, VolumeX, Sparkles, Compass, Languages } from 'lucide-react';
import { ambientAudio } from '../services/ambientAudio';
import { useNovel } from '../context/NovelContext';

interface OpeningExperienceProps {
  onComplete: () => void;
}

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({ onComplete }) => {
  const { language, toggleLanguage } = useNovel();
  const isDarija = language === 'darija';

  const [stage, setStage] = useState<'sky' | 'eagle' | 'title' | 'quote' | 'ready'>('sky');
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    // Stage 1: Sky & Mountains fade in
    const t1 = setTimeout(() => setStage('eagle'), 1000);
    // Stage 2: Eagle & Logo soar
    const t2 = setTimeout(() => setStage('title'), 2600);
    // Stage 3: Title & Subtle quote
    const t3 = setTimeout(() => setStage('quote'), 4200);
    // Stage 4: Enter prompt
    const t4 = setTimeout(() => setStage('ready'), 5600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleToggleAudio = () => {
    const active = ambientAudio.toggle();
    setIsAudioActive(active);
  };

  const handleEnter = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#02040b] text-[#e2ebf5] flex flex-col justify-between overflow-hidden select-none animate-in fade-in duration-1000">
      {/* Night Sky with Deep Mountain Twilight Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#050b1d] to-[#0a142e]" />

      {/* Starlight Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#edf4ff] animate-pulse"
            style={{
              left: `${(i * 17.3) % 100}%`,
              top: `${(i * 11.7) % 65}%`,
              width: `${i % 4 === 0 ? 2 : 1}px`,
              height: `${i % 4 === 0 ? 2 : 1}px`,
              opacity: 0.25 + (i % 5) * 0.15,
              animationDuration: `${2.5 + (i % 3)}s`,
              animationDelay: `${(i * 0.2) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* Top Bar Controls */}
      <div className="relative z-30 flex items-center justify-between p-5 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2 text-xs tracking-widest text-[#8ea4c4] font-mono uppercase opacity-75">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e39264] animate-ping" />
          <span>{isDarija ? 'مقدمة الورياغل' : 'Nocturne Prologue'}</span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#a5bedb] transition-all"
          >
            <Languages className="w-3.5 h-3.5 text-[#e39264]" />
            <span>{isDarija ? 'الدارجة' : 'EN'}</span>
          </button>

          {/* Sound toggle */}
          <button
            onClick={handleToggleAudio}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#c8d8ec] transition-all"
            title={isAudioActive ? 'Mute Mountain Wind' : 'Play Mountain Atmosphere'}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4 text-[#e39264]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleEnter}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono tracking-wider text-[#9fb9db] hover:text-white transition-all"
          >
            {isDarija ? 'تخطي' : 'Skip'}
          </button>
        </div>
      </div>

      {/* Center Cinematic Realm Portal */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 max-w-xl mx-auto my-auto">
        {/* Brand Visual Logo (Mountain, Moon, Eagle, Dove) */}
        <div
          className={`transition-all duration-1000 transform mb-5 ${
            stage === 'sky'
              ? 'opacity-0 -translate-y-8 scale-90'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#7292bf]/20 via-[#e39264]/20 to-[#7292bf]/20 rounded-full blur-xl animate-pulse" />
            <AfterglowVisualMark size={110} className="drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]" />
          </div>
        </div>

        {/* Brand Title: AFTERGLOW / الشفق */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            stage === 'sky' || stage === 'eagle'
              ? 'opacity-0 translate-y-6'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-[0.28em] sm:tracking-[0.34em] text-[#e8f1fc]">
            AFTERGLOW
          </h1>
          
          {isDarija ? (
            <p className="font-arabic text-2xl font-bold text-[#e39264] mt-1.5 tracking-wide">
              مَرْحَمَتْ : الشَّفَقْ
            </p>
          ) : (
            <p className="font-mono text-xs tracking-[0.35em] text-[#8fa8c8] mt-1 uppercase">
              MERHAMET : THE AFTERGLOW
            </p>
          )}

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#e39264]/80 to-transparent mx-auto mt-3" />
        </div>

        {/* Poetic Inscription */}
        <div
          className={`mt-4 max-w-md leading-relaxed transition-all duration-1000 delay-400 ${
            stage === 'quote' || stage === 'ready'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {isDarija ? (
            <div className="font-arabic space-y-1">
              <p className="text-lg font-bold text-[#f0f6ff]">
                «كاين شي حب ما كيطفاش... كيبقى»
              </p>
              <p className="text-xs text-[#9cb5d3] font-arabic-sans">
                ملي كيطفا الضو، القدر كيكشف القلوب اللي عمرها كانت مكتوبة تفارق.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="font-serif italic text-base text-[#f0f6ff]">
                “Some loves don't burn out. They stay.”
              </p>
              <p className="font-serif italic text-xs text-[#9cb5d3]">
                When the light fades, fate reveals the hearts never meant to part.
              </p>
            </div>
          )}
        </div>

        {/* Action button */}
        <div
          className={`mt-8 transition-all duration-1000 delay-500 ${
            stage === 'ready' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={handleEnter}
            className="group relative px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#14203a] via-[#1c2c50] to-[#14203a] border border-[#7f9ec2]/40 text-[#eef5fc] font-display text-xs tracking-[0.2em] uppercase font-bold shadow-[0_0_25px_rgba(127,158,194,0.3)] hover:shadow-[0_0_35px_rgba(227,146,100,0.4)] hover:border-[#e39264]/60 transition-all duration-500 flex items-center gap-3"
          >
            <DoveIcon className="w-4 h-4 text-[#9db9db] group-hover:text-[#e39264] transition-colors" />
            <span>{isDarija ? 'دخول عالم الشفق' : 'Enter the Universe'}</span>
            <Compass className="w-4 h-4 text-[#7f9ec2] group-hover:rotate-45 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Layered Mountain Silhouette Base */}
      <div className="relative z-10 w-full pointer-events-none">
        <svg
          viewBox="0 0 1200 280"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-32 sm:h-44 object-cover"
        >
          <path
            d="M0 280L0 140L130 100L260 140L410 70L530 130L670 50L800 120L930 70L1070 130L1200 110L1200 280Z"
            fill="#101a33"
            opacity="0.6"
          />
          <path
            d="M0 280L0 190L160 130L340 210L500 110L650 190L820 100L980 170L1120 120L1200 160L1200 280Z"
            fill="#080e1e"
            opacity="0.8"
          />
          <path
            d="M0 280L0 230L190 170L380 240L560 160L740 230L900 160L1060 210L1200 180L1200 280Z"
            fill="#030611"
          />
        </svg>
      </div>
    </div>
  );
};
