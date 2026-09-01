import {
  Chapter,
  Character,
  Favorite,
  FavoriteContentType,
  GalleryItem,
  NovelDatabase,
  NovelSettings,
  ReadingProgress,
  Scene,
  VideoItem,
} from '../types';

const STORAGE_KEY = 'afterglow_local_novel_db_v1';
const CREATOR_TOKEN_KEY = 'afterglow_creator_token';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem(CREATOR_TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const api = {
  async getDatabase(): Promise<NovelDatabase> {
    try {
      const res = await fetch('/api/db', { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        // Backup to local storage for offline resilience
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Backend /api/db fetch failed, using local storage fallback:', e);
    }

    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
    throw new Error('Could not load database');
  },

  async login(passcode: string): Promise<{ token: string; role: string; penName: string }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Invalid Passcode');
    }
    const data = await res.json();
    localStorage.setItem(CREATOR_TOKEN_KEY, data.token);
    return data;
  },

  logout() {
    localStorage.removeItem(CREATOR_TOKEN_KEY);
  },

  // Chapters
  async getChapters(): Promise<Chapter[]> {
    const res = await fetch('/api/chapters', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch chapters');
    return res.json();
  },

  async saveChapter(chapter: Partial<Chapter>): Promise<Chapter> {
    const isEdit = !!chapter.id;
    const url = isEdit ? `/api/chapters/${chapter.id}` : '/api/chapters';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(chapter),
    });
    if (!res.ok) throw new Error('Failed to save chapter');
    return res.json();
  },

  async deleteChapter(id: string): Promise<boolean> {
    const res = await fetch(`/api/chapters/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.ok;
  },

  // Characters
  async saveCharacter(char: Partial<Character>): Promise<Character> {
    const isEdit = !!char.id;
    const url = isEdit ? `/api/characters/${char.id}` : '/api/characters';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(char),
    });
    if (!res.ok) throw new Error('Failed to save character');
    return res.json();
  },

  async deleteCharacter(id: string): Promise<boolean> {
    const res = await fetch(`/api/characters/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.ok;
  },

  // Scenes
  async saveScene(scene: Partial<Scene>): Promise<Scene> {
    const isEdit = !!scene.id;
    const url = isEdit ? `/api/scenes/${scene.id}` : '/api/scenes';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(scene),
    });
    if (!res.ok) throw new Error('Failed to save scene');
    return res.json();
  },

  async deleteScene(id: string): Promise<boolean> {
    const res = await fetch(`/api/scenes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.ok;
  },

  // Gallery
  async saveGalleryItem(item: Partial<GalleryItem>): Promise<GalleryItem> {
    const isEdit = !!item.id;
    const url = isEdit ? `/api/gallery/${item.id}` : '/api/gallery';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to save gallery item');
    return res.json();
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.ok;
  },

  // Videos
  async saveVideo(video: Partial<VideoItem>): Promise<VideoItem> {
    const isEdit = !!video.id;
    const url = isEdit ? `/api/videos/${video.id}` : '/api/videos';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(video),
    });
    if (!res.ok) throw new Error('Failed to save video');
    return res.json();
  },

  async deleteVideo(id: string): Promise<boolean> {
    const res = await fetch(`/api/videos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.ok;
  },

  // Favorites
  async toggleFavorite(
    userId: string,
    contentType: FavoriteContentType,
    contentId: string
  ): Promise<{ action: string; favorites: Favorite[] }> {
    const res = await fetch('/api/favorites', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userId, contentType, contentId }),
    });
    if (!res.ok) throw new Error('Failed to toggle favorite');
    return res.json();
  },

  // Reading progress
  async saveProgress(
    userId: string,
    chapterId: string,
    progress: number,
    lastPosition: number,
    scrollOffset?: number
  ): Promise<ReadingProgress> {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userId, chapterId, progress, lastPosition, scrollOffset }),
    });
    if (!res.ok) throw new Error('Failed to save reading progress');
    return res.json();
  },

  // Settings
  async updateSettings(settings: Partial<NovelSettings>): Promise<NovelSettings> {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  // Upload
  async uploadMedia(dataUrl: string, filename?: string): Promise<string> {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ dataUrl, filename }),
    });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.url;
  },

  // Database Backup/Restore
  async exportDatabase(): Promise<NovelDatabase> {
    const res = await fetch('/api/backup/export', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Export failed');
    return res.json();
  },

  async importDatabase(data: NovelDatabase): Promise<boolean> {
    const res = await fetch('/api/backup/import', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.ok;
  },

  async resetDatabase(): Promise<NovelDatabase> {
    const res = await fetch('/api/backup/reset', {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Reset failed');
    const data = await res.json();
    return data.db;
  },
};
