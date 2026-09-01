import React, { useState } from 'react';
import { NovelProvider, useNovel } from './context/NovelContext';
import { MobileHeader } from './components/MobileHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileHomeView } from './components/MobileHomeView';
import { MobileStoryView } from './components/MobileStoryView';
import { MobileReaderView } from './components/MobileReaderView';
import { MobileWorldView } from './components/MobileWorldView';
import { MobileScenesView } from './components/MobileScenesView';
import { MobileGalleryView } from './components/MobileGalleryView';
import { MobileLibraryView } from './components/MobileLibraryView';
import { OpeningExperience } from './components/OpeningExperience';
import { CreatorDashboardView } from './components/CreatorDashboard/CreatorDashboardView';
import { ToastContainer } from './components/ToastContainer';
import { SearchModal } from './components/SearchModal';
import { CreatorLoginModal } from './components/CreatorLoginModal';
import { EagleIcon, DoveIcon } from './components/Symbols';

const AppContent: React.FC = () => {
  const { currentView, creatorAuth, navigateTo } = useNovel();
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean>(() => {
    return sessionStorage.getItem('afterglow_intro_seen') === 'true';
  });

  // Replay prologue trigger
  const handleReplayPrologue = () => {
    setHasSeenIntro(false);
  };

  const handleCompleteIntro = () => {
    sessionStorage.setItem('afterglow_intro_seen', 'true');
    setHasSeenIntro(true);
  };

  // If opening cinematic prologue
  if (!hasSeenIntro) {
    return <OpeningExperience onComplete={handleCompleteIntro} />;
  }

  // If Creator Dashboard is requested
  if (currentView === 'creator-dashboard') {
    if (!creatorAuth.isAuthenticated) {
      return (
        <div className="min-h-screen bg-[#040713] text-[#e2ebf5] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#080e1e] border border-[#7292bf]/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <EagleIcon className="w-10 h-10 text-[#e39264] mx-auto" />
            <h3 className="font-display text-xl font-bold text-[#eef4fb]">Creator Studio Access</h3>
            <p className="text-xs font-serif italic text-[#8da6c5]">
              Please enter your author passcode to access the universe management dashboard.
            </p>
            <button
              onClick={() => navigateTo('home')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#172a4e] to-[#253e70] text-white font-display text-xs uppercase tracking-wider font-semibold border border-[#7292bf]/40"
            >
              Return to Story
            </button>
          </div>
          <CreatorLoginModal />
        </div>
      );
    }
    return (
      <>
        <CreatorDashboardView />
        <ToastContainer />
      </>
    );
  }

  // If Reader View is requested (focused nocturnal mode)
  if (currentView === 'reader') {
    return (
      <div className="min-h-screen bg-[#040713]">
        <MobileReaderView />
        <ToastContainer />
        <SearchModal />
        <CreatorLoginModal />
      </div>
    );
  }

  // Mobile-First Application Shell
  return (
    <div className="min-h-screen bg-[#02040b] text-[#e2ebf5] selection:bg-[#7292bf]/40 selection:text-white relative">
      {/* Outer ambient sky for wide displays */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(16,28,58,0.5)_0%,rgba(2,4,11,1)_90%)]" />

      {/* Centered Mobile Canvas Frame */}
      <div className="relative z-10 w-full max-w-lg md:max-w-xl mx-auto min-h-screen bg-[#040713] border-x border-white/[0.04] shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col justify-between">
        {/* Top Header */}
        <MobileHeader onReplayPrologue={handleReplayPrologue} />

        {/* Main Dynamic View */}
        <main className="flex-1 animate-in fade-in duration-300">
          {currentView === 'home' && <MobileHomeView />}
          {currentView === 'chapters' && <MobileStoryView />}
          {(currentView === 'characters' || currentView === 'character-detail') && (
            <MobileWorldView />
          )}
          {currentView === 'scenes' && <MobileScenesView />}
          {currentView === 'gallery' && <MobileGalleryView />}
          {currentView === 'videos' && <MobileGalleryView />}
          {currentView === 'favorites' && <MobileLibraryView />}
        </main>

        {/* Bottom Floating Navigation */}
        <MobileBottomNav />
      </div>

      {/* Global Overlays & Modals */}
      <ToastContainer />
      <SearchModal />
      <CreatorLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <NovelProvider>
      <AppContent />
    </NovelProvider>
  );
}
