import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { api } from '../services/api';
import {
  AppView,
  Chapter,
  Character,
  CreatorAuth,
  CreatorTab,
  Favorite,
  FavoriteContentType,
  GalleryItem,
  NovelDatabase,
  NovelSettings,
  ReadingProgress,
  Scene,
  VideoItem,
} from '../types';
import { INITIAL_DATABASE } from '../data/initialData';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'error';
}

export interface ReaderSettings {
  fontSize: number; // in px, default 19
  theme: 'midnight' | 'sepia' | 'paper' | 'nocturne';
  font: 'serif' | 'display' | 'sans';
  lineHeight: number; // default 1.7
}

interface NovelContextValue {
  database: NovelDatabase;
  chapters: Chapter[];
  characters: Character[];
  scenes: Scene[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  favorites: Favorite[];
  readingProgress: Record<string, ReadingProgress>;
  settings: NovelSettings;
  isLoading: boolean;
  error: string | null;

  // Language Preference (Darija / English)
  language: 'darija' | 'en';
  setLanguage: (lang: 'darija' | 'en') => void;
  toggleLanguage: () => void;

  // Navigation
  currentView: AppView;
  selectedChapterId: string | null;
  selectedCharacterId: string | null;
  selectedSceneId: string | null;
  selectedGalleryItem: GalleryItem | null;
  activeVideoItem: VideoItem | null;
  navigateTo: (
    view: AppView,
    params?: {
      chapterId?: string;
      characterId?: string;
      sceneId?: string;
      galleryItem?: GalleryItem;
      videoItem?: VideoItem;
    }
  ) => void;

  // Creator Area
  creatorAuth: CreatorAuth;
  creatorTab: CreatorTab;
  setCreatorTab: (tab: CreatorTab) => void;
  isCreatorLoginOpen: boolean;
  setIsCreatorLoginOpen: (open: boolean) => void;
  loginCreator: (passcode: string) => Promise<boolean>;
  logoutCreator: () => void;

  // Reader Settings
  readerSettings: ReaderSettings;
  updateReaderSettings: (settings: Partial<ReaderSettings>) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // CRUD Operations
  saveChapter: (chapter: Partial<Chapter>) => Promise<Chapter>;
  deleteChapter: (id: string) => Promise<void>;
  saveCharacter: (character: Partial<Character>) => Promise<Character>;
  deleteCharacter: (id: string) => Promise<void>;
  saveScene: (scene: Partial<Scene>) => Promise<Scene>;
  deleteScene: (id: string) => Promise<void>;
  saveGalleryItem: (item: Partial<GalleryItem>) => Promise<GalleryItem>;
  deleteGalleryItem: (id: string) => Promise<void>;
  saveVideo: (video: Partial<VideoItem>) => Promise<VideoItem>;
  deleteVideo: (id: string) => Promise<void>;
  updateNovelSettings: (settings: Partial<NovelSettings>) => Promise<void>;

  // Favorites & Progress
  toggleFavorite: (contentType: FavoriteContentType, contentId: string) => Promise<void>;
  isFavorited: (contentType: FavoriteContentType, contentId: string) => boolean;
  saveProgress: (
    chapterId: string,
    progress: number,
    lastPosition: number,
    scrollOffset?: number
  ) => void;
  getLatestReadingProgress: () => ReadingProgress | null;
  uploadMedia: (dataUrl: string, filename?: string) => Promise<string>;

  // Backup / Lore Reset
  exportDatabase: () => Promise<NovelDatabase>;
  importDatabase: (data: NovelDatabase) => Promise<boolean>;
  resetDatabase: () => Promise<void>;

  // Toasts
  toasts: ToastItem[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const NovelContext = createContext<NovelContextValue | null>(null);

const DEFAULT_USER_ID = 'local-reader';

export const NovelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [database, setDatabase] = useState<NovelDatabase>(INITIAL_DATABASE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>('ch-1');
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [activeVideoItem, setActiveVideoItem] = useState<VideoItem | null>(null);

  // Creator & Auth State
  const [creatorAuth, setCreatorAuth] = useState<CreatorAuth>({
    isAuthenticated: false,
    penName: 'Creator',
    role: 'guest',
  });
  const [creatorTab, setCreatorTab] = useState<CreatorTab>('overview');
  const [isCreatorLoginOpen, setIsCreatorLoginOpen] = useState<boolean>(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Reader Settings
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() => {
    const saved = localStorage.getItem('afterglow_reader_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      fontSize: 19,
      theme: 'midnight',
      font: 'serif',
      lineHeight: 1.7,
    };
  });

  // Language state (Moroccan Darija or English)
  const [language, setLanguageState] = useState<'darija' | 'en'>(() => {
    const saved = localStorage.getItem('afterglow_language');
    return saved === 'en' ? 'en' : 'darija'; // Default to Darija as core identity
  });

  const setLanguage = (lang: 'darija' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('afterglow_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'darija' ? 'en' : 'darija');
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (
    title: string,
    message?: string,
    type: 'success' | 'info' | 'error' = 'info'
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateReaderSettings = (newSettings: Partial<ReaderSettings>) => {
    setReaderSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('afterglow_reader_settings', JSON.stringify(updated));
      return updated;
    });
  };

  // Load database on mount
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        // Check if token exists
        const token = localStorage.getItem('afterglow_creator_token');
        if (token) {
          setCreatorAuth({
            isAuthenticated: true,
            token,
            penName: 'Novel Author',
            role: 'creator',
          });
        }
        const data = await api.getDatabase();
        setDatabase(data);
      } catch (err: any) {
        console.warn('Backend load error, using initial database:', err);
        setDatabase(INITIAL_DATABASE);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const navigateTo = (
    view: AppView,
    params?: {
      chapterId?: string;
      characterId?: string;
      sceneId?: string;
      galleryItem?: GalleryItem;
      videoItem?: VideoItem;
    }
  ) => {
    if (params?.chapterId) setSelectedChapterId(params.chapterId);
    if (params?.characterId) setSelectedCharacterId(params.characterId);
    if (params?.sceneId) setSelectedSceneId(params.sceneId);
    if (params?.galleryItem) setSelectedGalleryItem(params.galleryItem);
    if (params?.videoItem) setActiveVideoItem(params.videoItem);

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth methods
  const loginCreator = async (passcode: string): Promise<boolean> => {
    try {
      const res = await api.login(passcode);
      setCreatorAuth({
        isAuthenticated: true,
        token: res.token,
        penName: res.penName,
        role: 'creator',
      });
      // Refresh DB with draft permissions
      const refreshed = await api.getDatabase();
      setDatabase(refreshed);
      showToast('Creator Studio Unlocked', 'Welcome back to your author workspace.', 'success');
      return true;
    } catch (err: any) {
      showToast('Access Denied', err.message || 'Incorrect passcode', 'error');
      return false;
    }
  };

  const logoutCreator = () => {
    api.logout();
    setCreatorAuth({
      isAuthenticated: false,
      penName: 'Guest',
      role: 'guest',
    });
    if (currentView === 'creator-dashboard') {
      setCurrentView('home');
    }
    showToast('Signed Out', 'Creator session closed.', 'info');
  };

  // Chapter operations
  const saveChapter = async (chapterData: Partial<Chapter>): Promise<Chapter> => {
    try {
      const saved = await api.saveChapter(chapterData);
      setDatabase((prev) => {
        const index = prev.chapters.findIndex((c) => c.id === saved.id);
        const nextChapters =
          index >= 0
            ? prev.chapters.map((c, i) => (i === index ? saved : c))
            : [...prev.chapters, saved];
        return {
          ...prev,
          chapters: nextChapters.sort((a, b) => a.chapterNumber - b.chapterNumber),
        };
      });
      showToast(
        saved.status === 'published' ? 'Chapter Published!' : 'Draft Saved',
        `Chapter ${saved.chapterNumber}: "${saved.title}" is saved in the universe database.`,
        'success'
      );
      return saved;
    } catch (err: any) {
      showToast('Save Failed', err.message || 'Could not save chapter', 'error');
      throw err;
    }
  };

  const deleteChapter = async (id: string) => {
    try {
      await api.deleteChapter(id);
      setDatabase((prev) => ({
        ...prev,
        chapters: prev.chapters.filter((c) => c.id !== id),
      }));
      showToast('Chapter Deleted', 'Chapter removed from the database.', 'info');
    } catch (err: any) {
      showToast('Error', 'Failed to delete chapter', 'error');
    }
  };

  // Character operations
  const saveCharacter = async (charData: Partial<Character>): Promise<Character> => {
    try {
      const saved = await api.saveCharacter(charData);
      setDatabase((prev) => {
        const index = prev.characters.findIndex((c) => c.id === saved.id);
        const next =
          index >= 0
            ? prev.characters.map((c, i) => (i === index ? saved : c))
            : [...prev.characters, saved];
        return { ...prev, characters: next };
      });
      showToast('Character Updated', `Saved profile for ${saved.name}.`, 'success');
      return saved;
    } catch (err: any) {
      showToast('Save Failed', err.message || 'Could not save character', 'error');
      throw err;
    }
  };

  const deleteCharacter = async (id: string) => {
    try {
      await api.deleteCharacter(id);
      setDatabase((prev) => ({
        ...prev,
        characters: prev.characters.filter((c) => c.id !== id),
      }));
      showToast('Character Deleted', 'Character profile removed.', 'info');
    } catch (err: any) {
      showToast('Error', 'Failed to delete character', 'error');
    }
  };

  // Scene operations
  const saveScene = async (sceneData: Partial<Scene>): Promise<Scene> => {
    try {
      const saved = await api.saveScene(sceneData);
      setDatabase((prev) => {
        const index = prev.scenes.findIndex((s) => s.id === saved.id);
        const next =
          index >= 0
            ? prev.scenes.map((s, i) => (i === index ? saved : s))
            : [...prev.scenes, saved];
        return { ...prev, scenes: next };
      });
      showToast('Scene Saved', `"${saved.title}" recorded in the lore.`, 'success');
      return saved;
    } catch (err: any) {
      showToast('Error', 'Could not save scene', 'error');
      throw err;
    }
  };

  const deleteScene = async (id: string) => {
    try {
      await api.deleteScene(id);
      setDatabase((prev) => ({
        ...prev,
        scenes: prev.scenes.filter((s) => s.id !== id),
      }));
      showToast('Scene Removed', 'Scene entry deleted.', 'info');
    } catch (err: any) {
      showToast('Error', 'Failed to delete scene', 'error');
    }
  };

  // Gallery operations
  const saveGalleryItem = async (itemData: Partial<GalleryItem>): Promise<GalleryItem> => {
    try {
      const saved = await api.saveGalleryItem(itemData);
      setDatabase((prev) => {
        const index = prev.gallery.findIndex((g) => g.id === saved.id);
        const next =
          index >= 0
            ? prev.gallery.map((g, i) => (i === index ? saved : g))
            : [saved, ...prev.gallery];
        return { ...prev, gallery: next };
      });
      showToast('Artwork Saved', `"${saved.title}" added to gallery.`, 'success');
      return saved;
    } catch (err: any) {
      showToast('Error', 'Could not save artwork', 'error');
      throw err;
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      await api.deleteGalleryItem(id);
      setDatabase((prev) => ({
        ...prev,
        gallery: prev.gallery.filter((g) => g.id !== id),
      }));
      showToast('Artwork Removed', 'Gallery item deleted.', 'info');
    } catch (err: any) {
      showToast('Error', 'Failed to delete gallery item', 'error');
    }
  };

  // Video operations
  const saveVideo = async (videoData: Partial<VideoItem>): Promise<VideoItem> => {
    try {
      const saved = await api.saveVideo(videoData);
      setDatabase((prev) => {
        const index = prev.videos.findIndex((v) => v.id === saved.id);
        const next =
          index >= 0
            ? prev.videos.map((v, i) => (i === index ? saved : v))
            : [saved, ...prev.videos];
        return { ...prev, videos: next };
      });
      showToast('Video Saved', `"${saved.title}" recorded.`, 'success');
      return saved;
    } catch (err: any) {
      showToast('Error', 'Could not save video', 'error');
      throw err;
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      await api.deleteVideo(id);
      setDatabase((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v.id !== id),
      }));
      showToast('Video Deleted', 'Video removed from collection.', 'info');
    } catch (err: any) {
      showToast('Error', 'Failed to delete video', 'error');
    }
  };

  // Settings
  const updateNovelSettings = async (newSettings: Partial<NovelSettings>) => {
    try {
      const updated = await api.updateSettings(newSettings);
      setDatabase((prev) => ({ ...prev, settings: updated }));
      showToast('Settings Saved', 'Novel metadata updated.', 'success');
    } catch (err: any) {
      showToast('Error', 'Failed to update settings', 'error');
    }
  };

  // Favorites
  const toggleFavorite = async (contentType: FavoriteContentType, contentId: string) => {
    try {
      const res = await api.toggleFavorite(DEFAULT_USER_ID, contentType, contentId);
      setDatabase((prev) => ({
        ...prev,
        favorites: res.favorites,
      }));
      showToast(
        res.action === 'added' ? 'Added to Favorites' : 'Removed from Favorites',
        undefined,
        'info'
      );
    } catch (err: any) {
      showToast('Error', 'Failed to update favorite', 'error');
    }
  };

  const isFavorited = (contentType: FavoriteContentType, contentId: string): boolean => {
    return database.favorites.some(
      (f) =>
        f.userId === DEFAULT_USER_ID &&
        f.contentType === contentType &&
        f.contentId === contentId
    );
  };

  // Reading progress
  const saveProgress = (
    chapterId: string,
    progress: number,
    lastPosition: number,
    scrollOffset: number = 0
  ) => {
    // Save to local memory immediately for zero-latency UI
    const key = `${DEFAULT_USER_ID}_${chapterId}`;
    const ch = database.chapters.find((c) => c.id === chapterId);
    const item: ReadingProgress = {
      userId: DEFAULT_USER_ID,
      chapterId,
      progress,
      lastPosition,
      scrollOffset,
      chapterNumber: ch?.chapterNumber,
      chapterTitle: ch?.title,
      updatedAt: new Date().toISOString(),
    };

    setDatabase((prev) => ({
      ...prev,
      readingProgress: {
        ...(prev.readingProgress || {}),
        [key]: item,
      },
    }));

    // Debounced sync with server
    api.saveProgress(DEFAULT_USER_ID, chapterId, progress, lastPosition, scrollOffset).catch(() => {});
  };

  const getLatestReadingProgress = (): ReadingProgress | null => {
    const all = Object.values(database.readingProgress || {}) as ReadingProgress[];
    if (all.length === 0) return null;
    return all.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0] || null;
  };

  // Upload
  const uploadMedia = async (dataUrl: string, filename?: string): Promise<string> => {
    return api.uploadMedia(dataUrl, filename);
  };

  // Backup & reset
  const exportDatabase = async (): Promise<NovelDatabase> => {
    return api.exportDatabase();
  };

  const importDatabase = async (data: NovelDatabase): Promise<boolean> => {
    const ok = await api.importDatabase(data);
    if (ok) {
      setDatabase(data);
      showToast('Database Restored', 'Novel universe restored from backup file.', 'success');
    }
    return ok;
  };

  const resetDatabase = async () => {
    const resetDb = await api.resetDatabase();
    setDatabase(resetDb);
    showToast('Lore Reset', 'Reinitialized novel database with original content.', 'info');
  };

  // Context value
  const value: NovelContextValue = {
    database,
    chapters: database.chapters,
    characters: database.characters,
    scenes: database.scenes,
    gallery: database.gallery,
    videos: database.videos,
    favorites: database.favorites,
    readingProgress: database.readingProgress || {},
    settings: database.settings,
    isLoading,
    error,

    language,
    setLanguage,
    toggleLanguage,

    currentView,
    selectedChapterId,
    selectedCharacterId,
    selectedSceneId,
    selectedGalleryItem,
    activeVideoItem,
    navigateTo,

    creatorAuth,
    creatorTab,
    setCreatorTab,
    isCreatorLoginOpen,
    setIsCreatorLoginOpen,
    loginCreator,
    logoutCreator,

    readerSettings,
    updateReaderSettings,

    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,

    saveChapter,
    deleteChapter,
    saveCharacter,
    deleteCharacter,
    saveScene,
    deleteScene,
    saveGalleryItem,
    deleteGalleryItem,
    saveVideo,
    deleteVideo,
    updateNovelSettings,

    toggleFavorite,
    isFavorited,
    saveProgress,
    getLatestReadingProgress,
    uploadMedia,

    exportDatabase,
    importDatabase,
    resetDatabase,

    toasts,
    showToast,
    dismissToast,
  };

  return <NovelContext.Provider value={value}>{children}</NovelContext.Provider>;
};

export const useNovel = () => {
  const context = useContext(NovelContext);
  if (!context) {
    throw new Error('useNovel must be used within a NovelProvider');
  }
  return context;
};
