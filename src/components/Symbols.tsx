import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * The Signature Visual Mark of AFTERGLOW
 * Combines mountain peaks, crescent moonlight, soaring wings, and a celestial twilight star.
 */
export const AfterglowVisualMark: React.FC<IconProps> = ({ className = 'w-8 h-8', size, glow = true }) => {
  const sizeProps = size ? { width: size, height: size } : {};

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'drop-shadow-[0_0_14px_rgba(155,186,224,0.6)]' : ''}`}
      {...sizeProps}
    >
      {/* Outer subtle celestial orbit */}
      <circle cx="32" cy="32" r="28" stroke="url(#afterglow-orbit-grad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

      {/* Crescent Moon aura */}
      <path
        d="M32 8C20 8 10 18 10 30C10 42 20 52 32 52C34.5 52 36.8 51.6 39 50.8C30 48 23 40 23 30C23 20 30 12 39 9.2C36.8 8.4 34.5 8 32 8Z"
        fill="url(#afterglow-moon-grad)"
        opacity="0.85"
      />

      {/* Mountain Silhouettes */}
      <path
        d="M16 48L28 32L34 39L42 29L52 48H16Z"
        fill="url(#afterglow-mountain-grad)"
      />

      {/* Eagle Wings Soaring from the Peak */}
      <path
        d="M32 24C28 20 20 18 14 21C18 24 23 26 27 27L32 30L37 27C41 26 46 24 50 21C44 18 36 20 32 24Z"
        fill="url(#afterglow-wings-grad)"
      />

      {/* Celestial Star at Zenith */}
      <path
        d="M32 10L33.5 15L38 16.5L33.5 18L32 23L30.5 18L26 16.5L30.5 15L32 10Z"
        fill="#FCE794"
        className="animate-pulse"
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="afterglow-orbit-grad" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9CBADF" stopOpacity="0.8" />
          <stop offset="0.5" stopColor="#E39264" stopOpacity="0.4" />
          <stop offset="1" stopColor="#587DA8" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="afterglow-moon-grad" x1="10" y1="8" x2="39" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E2EDF8" />
          <stop offset="1" stopColor="#789DC9" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="afterglow-mountain-grad" x1="32" y1="29" x2="32" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1C2E52" />
          <stop offset="1" stopColor="#080F22" />
        </linearGradient>
        <linearGradient id="afterglow-wings-grad" x1="14" y1="18" x2="50" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#E39264" />
          <stop offset="1" stopColor="#CBE0F8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const EagleIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, glow = false }) => {
  const sizeProps = size ? { width: size, height: size } : {};

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'drop-shadow-[0_0_10px_rgba(226,235,245,0.7)]' : ''}`}
      {...sizeProps}
    >
      {/* Eagle soaring in majestic dusk sky */}
      <path
        d="M24 16C23.2 13.5 21.5 11 19 9.5C18.2 9 17.2 9.2 17.5 10.2C18.2 12.5 19 14.8 19.2 17C15.5 15.5 11 15 6.5 16.5C4.2 17.3 2 19 1 21C2.5 21.2 4.2 21 5.8 20.5C9.5 19.5 13.5 19.5 17 21C14 22.8 10.5 24.5 7 26.5C5.8 27.2 5.5 28.5 6.8 28.8C10.5 29.5 14.5 28 18 26C16 28.5 13.5 31.5 11 34.5C10.2 35.5 11 36.5 12.2 36.2C15.8 35 19.5 32.5 22.5 29.5C23.2 32 23.5 35 24 38C24.5 35 24.8 32 25.5 29.5C28.5 32.5 32.2 35 35.8 36.2C37 36.5 37.8 35.5 37 34.5C34.5 31.5 32 28.5 30 26C33.5 28 37.5 29.5 41.2 28.8C42.5 28.5 42.2 27.2 41 26.5C37.5 24.5 34 22.8 31 21C34.5 19.5 38.5 19.5 42.2 20.5C43.8 21 45.5 21.2 47 21C46 19 43.8 17.3 41.5 16.5C37 15 32.5 15.5 28.8 17C29 14.8 29.8 12.5 30.5 10.2C30.8 9.2 29.8 9 29 9.5C26.5 11 24.8 13.5 24 16Z"
        fill="currentColor"
      />
      {/* Eye of the eagle */}
      <circle cx="24" cy="19" r="1.3" fill="#E39264" />
    </svg>
  );
};

export const DoveIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, glow = false }) => {
  const sizeProps = size ? { width: size, height: size } : {};

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'drop-shadow-[0_0_10px_rgba(216,226,236,0.7)]' : ''}`}
      {...sizeProps}
    >
      {/* Dove of peace and hope spreading soft wings */}
      <path
        d="M25 14C23.5 12.5 21 11.2 18.5 11C17.2 10.9 16.5 11.8 17.2 12.8C18.8 15 20.8 17.2 21.5 19.5C18 19 14.2 19.5 10.5 21C8.2 22 6.5 23.5 5 25.5C6.8 25.5 8.5 25 10.2 24.2C13.5 22.8 17.2 22.5 20.8 23.8C18.2 26 15 28.5 12 31C11 31.8 11.5 33 12.8 32.8C16 32.2 19.2 30.5 22 28.2C22.8 30.8 23.5 33.5 24 36.5C24.5 33.5 25.2 30.8 26 28.2C28.8 30.5 32 32.2 35.2 32.8C36.5 33 37 31.8 36 31C33 28.5 29.8 26 27.2 23.8C30.8 22.5 34.5 22.8 37.8 24.2C39.5 25 41.2 25.5 43 25.5C41.5 23.5 39.8 22 37.5 21C33.8 19.5 30 19 26.5 19.5C27.2 17.2 29.2 15 30.8 12.8C31.5 11.8 30.8 10.9 29.5 11C27 11.2 24.5 12.5 23 14L24 16L25 14Z"
        fill="currentColor"
      />
      {/* Gentle branch / spark of hope */}
      <path
        d="M24 10C24.8 8.5 26.5 7.5 28 8C27.5 9.2 26 10 24 10Z"
        fill="#E39264"
        opacity="0.9"
      />
    </svg>
  );
};

export const MountainRidgeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...sizeProps}>
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" strokeOpacity="0.6" />
    </svg>
  );
};

export const SignpostSymbol: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...sizeProps}>
      <path d="M12 2v20" />
      <path d="M4 6h12l3 3-3 3H4V6z" />
      <path d="M20 14H8l-3 3 3 3h12v-6z" strokeOpacity="0.8" />
    </svg>
  );
};

export const AlweryaghlCrest: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...sizeProps}>
      <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      <path d="M16 6L24 11V21L16 26L8 21V11L16 6Z" fill="currentColor" fillOpacity="0.1" />
      <circle cx="16" cy="16" r="4" fill="#E39264" fillOpacity="0.8" />
    </svg>
  );
};
