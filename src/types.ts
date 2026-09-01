export type ChapterStatus = 'draft' | 'published';

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  titleDarija?: string;
  content: string; // Markdown / formatted text with paragraphs, quotes, headings
  contentDarija?: string;
  coverImage?: string;
  publicationDate: string;
  status: ChapterStatus;
  isNew?: boolean;
  wordCount?: number;
  readingTimeMinutes?: number;
  excerpt?: string;
  excerptDarija?: string;
  characterIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CharacterRelationship {
  targetCharacterId: string;
  targetCharacterName?: string;
  relationshipType: string; // e.g. "Bound Protector & Reluctant Confidant", "Childhood Mentor"
  relationshipTypeDarija?: string;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  nameDarija?: string;
  role?: string;
  roleDarija?: string;
  profileImage: string;
  shortDescription: string;
  shortDescriptionDarija?: string;
  personality: string;
  background: string;
  relationships: CharacterRelationship[];
  relatedChapterIds: string[];
  relatedSceneIds: string[];
  quote?: string;
  quoteDarija?: string;
  aestheticColor?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  chapterId: string;
  chapterNumber?: number;
  chapterTitle?: string;
  quote?: string;
  image?: string;
  video?: string;
  characterIds: string[];
  location?: string;
  mood?: string;
  createdAt: string;
  updatedAt: string;
}

export type GalleryCategory =
  | 'All'
  | 'Characters'
  | 'Places'
  | 'Scenes'
  | 'Outfits'
  | 'Aesthetic'
  | 'Moodboard'
  | 'Other';

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  category: GalleryCategory;
  relatedCharacterId?: string;
  relatedChapterId?: string;
  tags?: string[];
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  createdAt: string;
  updatedAt?: string;
}

export type VideoCategory =
  | 'Trailer'
  | 'Teaser'
  | 'Character Spotlight'
  | 'Lore Video'
  | 'Atmosphere'
  | 'Soundtrack'
  | string;

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: VideoCategory;
  duration?: string;
  relatedChapterId?: string;
  relatedCharacterId?: string;
  createdAt: string;
  updatedAt?: string;
}

export type FavoriteContentType = 'chapter' | 'character' | 'scene' | 'gallery' | 'video';

export interface Favorite {
  id: string;
  userId: string;
  contentType: FavoriteContentType;
  contentId: string;
  createdAt: string;
}

export interface ReadingProgress {
  userId: string;
  chapterId: string;
  progress: number; // 0 to 100 percentage
  lastPosition: number; // paragraph index or scroll position
  scrollOffset?: number;
  chapterNumber?: number;
  chapterTitle?: string;
  updatedAt: string;
}

export interface CreatorAuth {
  isAuthenticated: boolean;
  token?: string;
  penName: string;
  role: 'creator' | 'admin' | 'guest';
  lastLogin?: string;
}

export interface NovelSettings {
  novelTitle: string;
  novelSubtitle: string;
  synopsis: string;
  authorName: string;
  authorBio: string;
  coverImage: string;
  creatorPasscode: string;
  releaseSchedule?: string;
  themeAccent?: string;
}

export interface NovelDatabase {
  settings: NovelSettings;
  chapters: Chapter[];
  characters: Character[];
  scenes: Scene[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  favorites: Favorite[];
  readingProgress: Record<string, ReadingProgress>; // key: `${userId}_${chapterId}`
  lastUpdated: string;
}

export type AppView =
  | 'home'
  | 'chapters'
  | 'reader'
  | 'characters'
  | 'character-detail'
  | 'scenes'
  | 'gallery'
  | 'videos'
  | 'favorites'
  | 'creator-dashboard';

export type CreatorTab =
  | 'overview'
  | 'dashboard'
  | 'chapters'
  | 'characters'
  | 'scenes'
  | 'gallery'
  | 'videos'
  | 'settings';
