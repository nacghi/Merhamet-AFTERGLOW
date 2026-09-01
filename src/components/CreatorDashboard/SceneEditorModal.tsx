import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Sparkles,
  Upload,
  BookOpen,
  MapPin,
  Quote,
  Users,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { Scene } from '../../types';

interface SceneEditorModalProps {
  scene: Scene | null;
  onClose: () => void;
}

export const SceneEditorModal: React.FC<SceneEditorModalProps> = ({ scene, onClose }) => {
  const { chapters, characters, saveScene, uploadImageFile, showToast } = useNovel();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quote, setQuote] = useState('');
  const [image, setImage] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [characterIds, setCharacterIds] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [mood, setMood] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (scene) {
      setTitle(scene.title);
      setDescription(scene.description);
      setQuote(scene.quote || '');
      setImage(scene.image || '');
      setChapterId(scene.chapterId || '');
      setCharacterIds(scene.characterIds || []);
      setLocation(scene.location || '');
      setMood(scene.mood || '');
    } else {
      setTitle('');
      setDescription('');
      setQuote('');
      setImage('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop');
      setChapterId(chapters[0]?.id || '');
      setCharacterIds([]);
      setLocation('');
      setMood('');
    }
  }, [scene, chapters]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImageFile(file);
      setImage(url);
      showToast('Scene art uploaded', 'success');
    } catch {
      showToast('Failed to upload image', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      showToast('Scene title is required', 'error');
      return;
    }

    const selectedCh = chapters.find((c) => c.id === chapterId);

    const payload: Partial<Scene> = {
      id: scene?.id,
      title: title.trim(),
      description: description.trim(),
      quote: quote.trim() || undefined,
      image: image.trim() || undefined,
      chapterId: chapterId || undefined,
      chapterNumber: selectedCh ? selectedCh.chapterNumber : undefined,
      characterIds,
      location: location.trim() || undefined,
      mood: mood.trim() || undefined,
    };

    const res = await saveScene(payload);
    if (res) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#11131c] border border-[#c49b66]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-white/10 bg-[#151722] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c49b66]/20 border border-[#c49b66]/40 flex items-center justify-center text-[#d4a373]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#faebd7]">
              {scene ? `Edit Scene: ${scene.title}` : 'New Scene Moment'}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b08044] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 text-xs font-bold shadow-lg shadow-[#c49b66]/20 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Scene</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="space-y-4 bg-[#161824] p-4 rounded-2xl border border-white/5">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Scene Title *</label>
              <input
                type="text"
                placeholder="e.g. The Fracture of the Aether Gate"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-sm font-serif font-bold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Linked Chapter</label>
                <select
                  value={chapterId}
                  onChange={(e) => setChapterId(e.target.value)}
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs"
                >
                  <option value="">None / Standalone Lore</option>
                  {chapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Chapter {ch.chapterNumber}: {ch.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Obsidian Citadel"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Mood / Atmosphere</label>
                <input
                  type="text"
                  placeholder="e.g. Ominous, Celestial"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* Quote & Backdrop */}
          <div className="space-y-4 bg-[#161824] p-4 rounded-2xl border border-white/5">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Iconic Novel Quote</label>
              <input
                type="text"
                placeholder="e.g. The sky cracked like tempered glass..."
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs font-serif italic"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Backdrop Image</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1 bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs"
                />
                <label className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white cursor-pointer flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Description / Narrative</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Narrative breakdown of the moment..."
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white p-3 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Character selection */}
          <div className="bg-[#161824] p-4 rounded-2xl border border-white/5 space-y-2">
            <label className="block text-xs text-neutral-400">Featured Characters in Scene:</label>
            <div className="flex flex-wrap gap-2">
              {characters.map((char) => {
                const isSelected = characterIds.includes(char.id);
                return (
                  <button
                    type="button"
                    key={char.id}
                    onClick={() => {
                      if (isSelected) {
                        setCharacterIds(characterIds.filter((id) => id !== char.id));
                      } else {
                        setCharacterIds([...characterIds, char.id]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all ${
                      isSelected
                        ? 'bg-[#c49b66]/20 border-[#c49b66] text-[#faebd7]'
                        : 'bg-white/5 border-white/10 text-neutral-400'
                    }`}
                  >
                    <img
                      src={char.profileImage}
                      alt={char.name}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span>{char.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
