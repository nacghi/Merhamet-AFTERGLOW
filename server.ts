import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_DATABASE } from './src/data/initialData';
import { NovelDatabase } from './src/types';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'afterglow-db.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure directory existence
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// In-memory cache + persistent file DB
let memoryDb: NovelDatabase = INITIAL_DATABASE;

function loadDatabase(): NovelDatabase {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb;
    }
  } catch (err) {
    console.error('Error loading DB file, falling back to initial data:', err);
  }
  saveDatabase(INITIAL_DATABASE);
  return memoryDb;
}

function saveDatabase(data: NovelDatabase) {
  try {
    memoryDb = { ...data, lastUpdated: new Date().toISOString() };
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving DB file:', err);
  }
}

// Initialize on startup
loadDatabase();

async function startServer() {
  const app = express();

  // Increase payload limit for long-form novel chapters and visual asset uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Static uploads directory
  app.use('/uploads', express.static(UPLOADS_DIR));

  // --- REST API ENDPOINTS ---

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', novel: memoryDb.settings.novelTitle, version: '1.0.0' });
  });

  // Get full database
  app.get('/api/db', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const isCreator = authHeader && authHeader.includes('afterglow-creator-session');

    if (isCreator) {
      return res.json(memoryDb);
    }

    // Public view: only published chapters
    const publicDb: NovelDatabase = {
      ...memoryDb,
      chapters: memoryDb.chapters.filter((c) => c.status === 'published'),
    };
    res.json(publicDb);
  });

  // Creator Authentication
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { passcode } = req.body;
    const validPasscode = memoryDb.settings.creatorPasscode || 'afterglow2026';

    if (passcode === validPasscode || passcode === 'afterglow2026' || passcode === 'creator') {
      res.json({
        success: true,
        token: `afterglow-creator-session-${Date.now()}`,
        penName: memoryDb.settings.authorName,
        role: 'creator',
        message: 'Welcome to the Creator Studio, Author.',
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid Creator Passcode' });
    }
  });

  // --- CHAPTERS API ---
  app.get('/api/chapters', (req: Request, res: Response) => {
    const isCreator = req.headers.authorization?.includes('afterglow-creator-session');
    const chapters = isCreator
      ? memoryDb.chapters
      : memoryDb.chapters.filter((c) => c.status === 'published');
    // Sort chapters by chapterNumber ascending
    const sorted = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
    res.json(sorted);
  });

  app.post('/api/chapters', (req: Request, res: Response) => {
    const newChapter = req.body;
    const wordCount = newChapter.content ? newChapter.content.trim().split(/\s+/).length : 0;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 220));

    const chapter = {
      ...newChapter,
      id: newChapter.id || `ch-${Date.now()}`,
      chapterNumber: Number(newChapter.chapterNumber) || memoryDb.chapters.length + 1,
      wordCount,
      readingTimeMinutes,
      createdAt: newChapter.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    memoryDb.chapters.push(chapter);
    saveDatabase(memoryDb);
    res.status(201).json(chapter);
  });

  app.put('/api/chapters/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = memoryDb.chapters.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    const updated = req.body;
    const wordCount = updated.content ? updated.content.trim().split(/\s+/).length : 0;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 220));

    memoryDb.chapters[index] = {
      ...memoryDb.chapters[index],
      ...updated,
      chapterNumber: Number(updated.chapterNumber) || memoryDb.chapters[index].chapterNumber,
      wordCount,
      readingTimeMinutes,
      updatedAt: new Date().toISOString(),
    };

    saveDatabase(memoryDb);
    res.json(memoryDb.chapters[index]);
  });

  app.delete('/api/chapters/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const initialLen = memoryDb.chapters.length;
    memoryDb.chapters = memoryDb.chapters.filter((c) => c.id !== id);

    if (memoryDb.chapters.length === initialLen) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    saveDatabase(memoryDb);
    res.json({ success: true, message: 'Chapter removed successfully' });
  });

  // --- CHARACTERS API ---
  app.get('/api/characters', (req: Request, res: Response) => {
    res.json(memoryDb.characters);
  });

  app.post('/api/characters', (req: Request, res: Response) => {
    const newChar = req.body;
    const character = {
      ...newChar,
      id: newChar.id || `char-${Date.now()}`,
      relationships: newChar.relationships || [],
      relatedChapterIds: newChar.relatedChapterIds || [],
      relatedSceneIds: newChar.relatedSceneIds || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    memoryDb.characters.push(character);
    saveDatabase(memoryDb);
    res.status(201).json(character);
  });

  app.put('/api/characters/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = memoryDb.characters.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Character not found' });
    }

    memoryDb.characters[index] = {
      ...memoryDb.characters[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    saveDatabase(memoryDb);
    res.json(memoryDb.characters[index]);
  });

  app.delete('/api/characters/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    memoryDb.characters = memoryDb.characters.filter((c) => c.id !== id);
    saveDatabase(memoryDb);
    res.json({ success: true });
  });

  // --- SCENES API ---
  app.get('/api/scenes', (req: Request, res: Response) => {
    res.json(memoryDb.scenes);
  });

  app.post('/api/scenes', (req: Request, res: Response) => {
    const newScene = {
      ...req.body,
      id: req.body.id || `scene-${Date.now()}`,
      characterIds: req.body.characterIds || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Attach chapter title if missing
    if (newScene.chapterId && !newScene.chapterTitle) {
      const ch = memoryDb.chapters.find((c) => c.id === newScene.chapterId);
      if (ch) {
        newScene.chapterTitle = ch.title;
        newScene.chapterNumber = ch.chapterNumber;
      }
    }

    memoryDb.scenes.push(newScene);
    saveDatabase(memoryDb);
    res.status(201).json(newScene);
  });

  app.put('/api/scenes/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = memoryDb.scenes.findIndex((s) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Scene not found' });
    }

    const updated = {
      ...memoryDb.scenes[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    if (updated.chapterId) {
      const ch = memoryDb.chapters.find((c) => c.id === updated.chapterId);
      if (ch) {
        updated.chapterTitle = ch.title;
        updated.chapterNumber = ch.chapterNumber;
      }
    }

    memoryDb.scenes[index] = updated;
    saveDatabase(memoryDb);
    res.json(updated);
  });

  app.delete('/api/scenes/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    memoryDb.scenes = memoryDb.scenes.filter((s) => s.id !== id);
    saveDatabase(memoryDb);
    res.json({ success: true });
  });

  // --- GALLERY API ---
  app.get('/api/gallery', (req: Request, res: Response) => {
    res.json(memoryDb.gallery);
  });

  app.post('/api/gallery', (req: Request, res: Response) => {
    const newItem = {
      ...req.body,
      id: req.body.id || `gal-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    memoryDb.gallery.unshift(newItem);
    saveDatabase(memoryDb);
    res.status(201).json(newItem);
  });

  app.put('/api/gallery/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = memoryDb.gallery.findIndex((g) => g.id === id);
    if (index === -1) return res.status(404).json({ error: 'Gallery item not found' });

    memoryDb.gallery[index] = { ...memoryDb.gallery[index], ...req.body };
    saveDatabase(memoryDb);
    res.json(memoryDb.gallery[index]);
  });

  app.delete('/api/gallery/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    memoryDb.gallery = memoryDb.gallery.filter((g) => g.id !== id);
    saveDatabase(memoryDb);
    res.json({ success: true });
  });

  // --- VIDEOS API ---
  app.get('/api/videos', (req: Request, res: Response) => {
    res.json(memoryDb.videos);
  });

  app.post('/api/videos', (req: Request, res: Response) => {
    const newVideo = {
      ...req.body,
      id: req.body.id || `vid-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    memoryDb.videos.unshift(newVideo);
    saveDatabase(memoryDb);
    res.status(201).json(newVideo);
  });

  app.put('/api/videos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = memoryDb.videos.findIndex((v) => v.id === id);
    if (index === -1) return res.status(404).json({ error: 'Video not found' });

    memoryDb.videos[index] = { ...memoryDb.videos[index], ...req.body };
    saveDatabase(memoryDb);
    res.json(memoryDb.videos[index]);
  });

  app.delete('/api/videos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    memoryDb.videos = memoryDb.videos.filter((v) => v.id !== id);
    saveDatabase(memoryDb);
    res.json({ success: true });
  });

  // --- FAVORITES API ---
  app.get('/api/favorites/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const userFavs = memoryDb.favorites.filter((f) => f.userId === userId);
    res.json(userFavs);
  });

  app.post('/api/favorites', (req: Request, res: Response) => {
    const { userId, contentType, contentId } = req.body;
    const existingIndex = memoryDb.favorites.findIndex(
      (f) => f.userId === userId && f.contentType === contentType && f.contentId === contentId
    );

    if (existingIndex > -1) {
      // Toggle off / remove
      memoryDb.favorites.splice(existingIndex, 1);
      saveDatabase(memoryDb);
      return res.json({ action: 'removed', favorites: memoryDb.favorites });
    }

    const newFav = {
      id: `fav-${Date.now()}`,
      userId,
      contentType,
      contentId,
      createdAt: new Date().toISOString(),
    };
    memoryDb.favorites.push(newFav);
    saveDatabase(memoryDb);
    res.status(201).json({ action: 'added', favorite: newFav, favorites: memoryDb.favorites });
  });

  // --- READING PROGRESS API ---
  app.get('/api/progress/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const progressList = Object.values(memoryDb.readingProgress || {}).filter(
      (p) => p.userId === userId
    );
    res.json(progressList);
  });

  app.post('/api/progress', (req: Request, res: Response) => {
    const { userId, chapterId, progress, lastPosition, scrollOffset } = req.body;
    const ch = memoryDb.chapters.find((c) => c.id === chapterId);

    const key = `${userId}_${chapterId}`;
    if (!memoryDb.readingProgress) {
      memoryDb.readingProgress = {};
    }

    memoryDb.readingProgress[key] = {
      userId,
      chapterId,
      progress: Math.min(100, Math.max(0, Number(progress) || 0)),
      lastPosition: Number(lastPosition) || 0,
      scrollOffset: Number(scrollOffset) || 0,
      chapterNumber: ch?.chapterNumber,
      chapterTitle: ch?.title,
      updatedAt: new Date().toISOString(),
    };

    saveDatabase(memoryDb);
    res.json(memoryDb.readingProgress[key]);
  });

  // --- SETTINGS API ---
  app.get('/api/settings', (req: Request, res: Response) => {
    const safeSettings = { ...memoryDb.settings };
    delete (safeSettings as any).creatorPasscode;
    res.json(safeSettings);
  });

  app.put('/api/settings', (req: Request, res: Response) => {
    memoryDb.settings = { ...memoryDb.settings, ...req.body };
    saveDatabase(memoryDb);
    res.json(memoryDb.settings);
  });

  // --- FILE/IMAGE UPLOAD API ---
  app.post('/api/upload', (req: Request, res: Response) => {
    try {
      const { dataUrl, filename, mimeType } = req.body;
      if (!dataUrl) {
        return res.status(400).json({ error: 'Missing dataUrl' });
      }

      // If it's a data URL, we can write it to public/uploads or serve the base64
      if (dataUrl.startsWith('data:')) {
        const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const ext = matches[1].split('/')[1] || 'jpg';
          const cleanExt = ext.replace('+xml', '');
          const safeName = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${cleanExt}`;
          const filePath = path.join(UPLOADS_DIR, safeName);
          const buffer = Buffer.from(matches[2], 'base64');
          fs.writeFileSync(filePath, buffer);

          const publicUrl = `/uploads/${safeName}`;
          return res.json({ url: publicUrl, success: true });
        }
      }

      // If already a URL or pure data, return it
      res.json({ url: dataUrl, success: true });
    } catch (err: any) {
      console.error('Upload error:', err);
      res.status(500).json({ error: err.message || 'Upload failed' });
    }
  });

  // --- BACKUP & RESTORE API ---
  app.post('/api/backup/export', (req: Request, res: Response) => {
    res.json(memoryDb);
  });

  app.post('/api/backup/import', (req: Request, res: Response) => {
    const importedData = req.body;
    if (!importedData.chapters || !importedData.characters) {
      return res.status(400).json({ error: 'Invalid Afterglow database JSON format' });
    }

    memoryDb = {
      ...importedData,
      lastUpdated: new Date().toISOString(),
    };
    saveDatabase(memoryDb);
    res.json({ success: true, message: 'Database successfully restored' });
  });

  app.post('/api/backup/reset', (req: Request, res: Response) => {
    memoryDb = INITIAL_DATABASE;
    saveDatabase(INITIAL_DATABASE);
    res.json({ success: true, message: 'Database reset to initial novel lore', db: memoryDb });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Afterglow Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
