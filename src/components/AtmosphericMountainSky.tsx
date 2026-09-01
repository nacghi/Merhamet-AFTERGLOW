import React, { useMemo } from 'react';
import { EagleIcon, DoveIcon } from './Symbols';

interface AtmosphericMountainSkyProps {
  variant?: 'full' | 'compact' | 'header' | 'reader' | 'sanctuary';
  showEagle?: boolean;
  showDove?: boolean;
  showMist?: boolean;
  showStars?: boolean;
  showMoon?: boolean;
  showPines?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const AtmosphericMountainSky: React.FC<AtmosphericMountainSkyProps> = ({
  variant = 'full',
  showEagle = true,
  showDove = false,
  showMist = true,
  showStars = true,
  showMoon = true,
  showPines = true,
  className = '',
  children,
}) => {
  // Generate stable twinkling stars
  const stars = useMemo(() => {
    const count = variant === 'reader' ? 24 : variant === 'compact' ? 32 : 54;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (i * 19.7 + 7) % 100,
      y: (i * 13.3 + 5) % (variant === 'compact' ? 55 : 85),
      size: i % 4 === 0 ? 2.2 : i % 2 === 0 ? 1.5 : 1,
      opacity: 0.25 + ((i % 5) * 0.15),
      delay: (i * 0.35) % 4,
      duration: 2.8 + ((i % 3) * 0.9),
    }));
  }, [variant]);

  return (
    <div
      className={`relative overflow-hidden select-none bg-gradient-to-b from-[#02040b] via-[#050a1b] to-[#0a1226] ${className}`}
    >
      {/* 1. Deep Celestial Sky Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(38,62,110,0.35)_0%,rgba(10,18,38,0.6)_50%,transparent_100%)] pointer-events-none" />

      {/* 2. Soft Moon / Afterglow Celestial Aura */}
      {showMoon && (
        <div className="absolute top-8 right-[12%] pointer-events-none">
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[radial-gradient(circle,rgba(226,238,255,0.25)_0%,rgba(114,146,191,0.12)_40%,transparent_75%)] animate-pulse-glow flex items-center justify-center">
            {/* Delicate Crescent Moon */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-r-2 border-t-2 border-[#f0f6ff]/80 shadow-[0_0_16px_rgba(240,246,255,0.7)] rotate-[-25deg]" />
          </div>
        </div>
      )}

      {/* 3. Starry Constellations & Twilight Sparkles */}
      {showStars && (
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-[#f0f6ff] animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                boxShadow: star.size > 1.8 ? '0 0 8px rgba(240, 246, 255, 0.9)' : 'none',
              }}
            />
          ))}
          {/* North Star (Guide of Alweryaghl) */}
          <div
            className="absolute top-12 left-10 w-2.5 h-2.5 rounded-full bg-white opacity-90 animate-ping pointer-events-none"
            style={{ animationDuration: '4.5s' }}
          />
        </div>
      )}

      {/* 4. Signature Soaring Eagle crossing the night sky */}
      {showEagle && (
        <div className="absolute top-10 left-0 w-full pointer-events-none overflow-hidden h-20">
          <div className="animate-glide-eagle absolute flex items-center gap-1 opacity-70">
            <EagleIcon className="w-5 h-5 text-[#d8e7fa] drop-shadow-[0_0_12px_rgba(216,231,250,0.8)]" />
          </div>
        </div>
      )}

      {/* Dove of Hope in Sanctuary variant */}
      {showDove && (
        <div className="absolute top-16 right-16 pointer-events-none">
          <div className="animate-gentle-sway opacity-60">
            <DoveIcon className="w-6 h-6 text-[#e8f1fd] drop-shadow-[0_0_10px_rgba(232,241,253,0.7)]" />
          </div>
        </div>
      )}

      {/* 5. Atmospheric Drifting Mist Layers */}
      {showMist && (
        <>
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 mix-blend-screen">
            <div className="absolute -bottom-12 -left-1/4 w-[180%] h-48 bg-gradient-to-r from-transparent via-[#8fa9cb]/25 to-transparent blur-3xl animate-drift-mist" />
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15 mix-blend-screen">
            <div className="absolute bottom-6 -right-1/4 w-[160%] h-36 bg-gradient-to-l from-transparent via-[#e39264]/15 to-transparent blur-2xl animate-drift-mist" style={{ animationDuration: '32s' }} />
          </div>
        </>
      )}

      {/* 6. Multi-Layered Mountain Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none flex flex-col justify-end">
        <svg
          viewBox="0 0 1200 480"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full object-cover transition-all ${
            variant === 'compact' || variant === 'header'
              ? 'h-36 sm:h-44'
              : variant === 'reader'
              ? 'h-24 opacity-40'
              : 'h-52 sm:h-64 md:h-80'
          }`}
        >
          {/* Layer A: Far Distant Mountain Ridge (Hazy Midnight Horizon) */}
          <path
            d="M0 480L0 220L110 170L230 210L360 110L490 190L620 95L750 175L890 115L1020 200L1130 150L1200 180L1200 480Z"
            fill="url(#skyFarMountainGrad)"
            opacity="0.55"
          />

          {/* Layer B: Mid Crags with Moonlit Edge */}
          <path
            d="M0 480L0 270L130 195L260 260L390 170L520 235L660 145L800 220L930 160L1060 225L1200 190L1200 480Z"
            fill="url(#skyMidMountainGrad)"
            opacity="0.8"
          />

          {/* Layer C: Foreground Pine Forest Ridge & Deep Crags */}
          <path
            d="M0 480L0 340L60 320L120 350L180 310L240 340L320 280L400 330L480 290L560 340L640 300L720 350L800 310L880 340L960 290L1040 330L1120 310L1200 340L1200 480Z"
            fill="url(#skyForeMountainGrad)"
          />

          {/* Layer D: Pine Tree Silhouettes along the ridge */}
          {showPines && (
            <g fill="#040713" opacity="0.95">
              {/* Pine Clusters */}
              <path d="M40 330L48 300L56 330ZM44 315L48 295L52 315Z" />
              <path d="M160 320L170 285L180 320ZM165 300L170 280L175 300Z" />
              <path d="M300 290L310 255L320 290ZM305 270L310 250L315 270Z" />
              <path d="M460 300L470 265L480 300ZM465 280L470 260L475 280Z" />
              <path d="M620 310L630 275L640 310ZM625 290L630 270L635 290Z" />
              <path d="M780 320L790 280L800 320ZM785 298L790 275L795 298Z" />
              <path d="M940 300L950 265L960 300ZM945 280L950 260L955 280Z" />
              <path d="M1100 320L1110 285L1120 320ZM1105 300L1110 280L1115 300Z" />
            </g>
          )}

          <defs>
            <linearGradient id="skyFarMountainGrad" x1="600" y1="95" x2="600" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2c3e66" />
              <stop offset="0.45" stopColor="#162343" />
              <stop offset="1" stopColor="#080e1c" />
            </linearGradient>

            <linearGradient id="skyMidMountainGrad" x1="600" y1="145" x2="600" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1b2848" />
              <stop offset="0.5" stopColor="#0e172e" />
              <stop offset="1" stopColor="#050814" />
            </linearGradient>

            <linearGradient id="skyForeMountainGrad" x1="600" y1="280" x2="600" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0f1629" />
              <stop offset="0.6" stopColor="#070a16" />
              <stop offset="1" stopColor="#020308" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 7. Content Overlay */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
