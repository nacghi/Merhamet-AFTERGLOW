import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Sparkles,
  Image as ImageIcon,
  Film,
  Settings as SettingsIcon,
  LogOut,
  ArrowLeft,
  Plus,
  Compass,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { CreatorTab } from '../../types';
import { DashboardOverview } from './DashboardOverview';
import { ChapterManager } from './ChapterManager';
import { CharacterManager } from './CharacterManager';
import { SceneManager } from './SceneManager';
import { GalleryManager } from './GalleryManager';
import { VideoManager } from './VideoManager';
import { SettingsManager } from './SettingsManager';
import { ChapterEditorModal } from './ChapterEditorModal';
import { CharacterEditorModal } from './CharacterEditorModal';
import { SceneEditorModal } from './SceneEditorModal';
import { GalleryUploadModal } from './GalleryUploadModal';

export const CreatorDashboardView: React.FC = () => {
  const {
    creatorTab,
    setCreatorTab,
    logoutCreator,
    navigateTo,
    settings,
    chapters,
    characters,
    scenes,
    gallery,
    videos,
  } = useNovel();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [isSceneModalOpen, setIsSceneModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  const menuItems: { id: CreatorTab; label: string; icon: React.FC<{ className?: string }>; count?: number }[] = [
    { id: 'dashboard', label: 'Studio Overview', icon: LayoutDashboard },
    { id: 'chapters', label: 'Chapter Manuscript', icon: BookOpen, count: chapters.length },
    { id: 'characters', label: 'Character Codex', icon: Users, count: characters.length },
    { id: 'scenes', label: 'Moments & Scenes', icon: Sparkles, count: scenes.length },
    { id: 'gallery', label: 'Visual Art & Moods', icon: ImageIcon, count: gallery.length },
    { id: 'videos', label: 'Cinema & Audio', icon: Film, count: videos.length },
    { id: 'settings', label: 'Novel Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#0a0b10] text-[#faebd7] flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-[#0e1017] border-r border-[#c49b66]/20 flex-col justify-between shrink-0 p-4 sticky top-0 h-screen">
        <div className="space-y-6">
          {/* Studio Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c49b66] to-[#785428] p-[1px]">
                <div className="w-full h-full bg-[#0c0d14] rounded-[7px] flex items-center justify-center font-display font-bold text-xs text-[#faebd7]">
                  A
                </div>
              </div>
              <div>
                <h2 className="font-display font-bold text-sm tracking-wider text-[#faebd7] truncate max-w-[140px]">
                  {settings.novelTitle}
                </h2>
                <span className="text-[10px] text-[#c49b66] uppercase font-mono block">
                  Author Studio
                </span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('home')}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Return to Public Novel"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = creatorTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCreatorTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#c49b66] text-neutral-950 shadow-md shadow-[#c49b66]/20'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-black/20 text-neutral-950' : 'bg-white/10 text-neutral-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-neutral-300 flex items-center justify-center gap-2 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#c49b66]" />
            <span>View Public Novel</span>
          </button>

          <button
            onClick={() => logoutCreator()}
            className="w-full py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Studio</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0e1017] border-b border-[#c49b66]/20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#c49b66] text-black font-display font-bold text-xs flex items-center justify-center">
            A
          </div>
          <span className="font-display font-bold text-sm text-[#faebd7]">
            {settings.novelTitle} Studio
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('home')}
            className="p-2 rounded-lg bg-white/5 text-xs text-neutral-300"
          >
            Public Site
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-white/5 text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-[#0e1017] border-b border-white/10 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = creatorTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCreatorTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium ${
                  isActive ? 'bg-[#c49b66] text-black font-bold' : 'text-neutral-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && <span>{item.count}</span>}
              </button>
            );
          })}
          <button
            onClick={() => logoutCreator()}
            className="w-full mt-3 py-2 bg-red-500/20 text-red-300 rounded-xl text-xs"
          >
            Exit Studio
          </button>
        </div>
      )}

      {/* Main Studio Content Body */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-screen">
        {creatorTab === 'dashboard' && (
          <DashboardOverview
            onSelectTab={(tab) => setCreatorTab(tab)}
            onOpenNewChapter={() => setIsChapterModalOpen(true)}
            onOpenNewCharacter={() => setIsCharacterModalOpen(true)}
            onOpenNewScene={() => setIsSceneModalOpen(true)}
            onOpenNewGallery={() => setIsGalleryModalOpen(true)}
          />
        )}

        {creatorTab === 'chapters' && <ChapterManager />}
        {creatorTab === 'characters' && <CharacterManager />}
        {creatorTab === 'scenes' && <SceneManager />}
        {creatorTab === 'gallery' && <GalleryManager />}
        {creatorTab === 'videos' && <VideoManager />}
        {creatorTab === 'settings' && <SettingsManager />}
      </main>

      {/* Global Quick Creation Modals */}
      {isChapterModalOpen && (
        <ChapterEditorModal chapter={null} onClose={() => setIsChapterModalOpen(false)} />
      )}
      {isCharacterModalOpen && (
        <CharacterEditorModal character={null} onClose={() => setIsCharacterModalOpen(false)} />
      )}
      {isSceneModalOpen && (
        <SceneEditorModal scene={null} onClose={() => setIsSceneModalOpen(false)} />
      )}
      {isGalleryModalOpen && (
        <GalleryUploadModal item={null} onClose={() => setIsGalleryModalOpen(false)} />
      )}
    </div>
  );
};
