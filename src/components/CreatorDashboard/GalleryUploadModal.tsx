import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Image as ImageIcon,
  Upload,
  Tag,
  BookOpen,
  Users,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { GalleryCategory, GalleryItem } from '../../types';

interface GalleryUploadModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryUploadModal: React.FC<GalleryUploadModalProps> = ({ item, onClose }) => {
  const { characters, chapters, saveGalleryItem, uploadImageFile, showToast } = useNovel();

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('Aesthetic');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [relatedCharacterId, setRelatedCharacterId] = useState('');
  const [relatedChapterId, setRelatedChapterId] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setImageUrl(item.imageUrl);
      setCategory(item.category);
      setDescription(item.description || '');
      setTagsInput(item.tags ? item.tags.join(', ') : '');
      setRelatedCharacterId(item.relatedCharacterId || '');
      setRelatedChapterId(item.relatedChapterId || '');
    } else {
      setTitle('');
      setImageUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop');
      setCategory('Aesthetic');
      setDescription('');
      setTagsInput('afterglow, concept-art');
      setRelatedCharacterId('');
      setRelatedChapterId('');
    }
  }, [item]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImageFile(file);
      setImageUrl(url);
      showToast('Artwork uploaded', 'success');
    } catch {
      showToast('Failed to upload image', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      showToast('Artwork title is required', 'error');
      return;
    }
    if (!imageUrl.trim()) {
      showToast('Image URL is required', 'error');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const payload: Partial<GalleryItem> = {
      id: item?.id,
      title: title.trim(),
      imageUrl: imageUrl.trim(),
      category,
      description: description.trim() || undefined,
      tags,
      relatedCharacterId: relatedCharacterId || undefined,
      relatedChapterId: relatedChapterId || undefined,
    };

    const res = await saveGalleryItem(payload);
    if (res) onClose();
  };

  const categories: GalleryCategory[] = [
    'Characters',
    'Places',
    'Scenes',
    'Outfits',
    'Aesthetic',
    'Moodboard',
    'Other',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#11131c] border border-[#c49b66]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-white/10 bg-[#151722] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c49b66]/20 border border-[#c49b66]/40 flex items-center justify-center text-[#d4a373]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#faebd7]">
              {item ? `Edit Artwork: ${item.title}` : 'Upload New Visual Lore'}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b08044] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 text-xs font-bold shadow-lg shadow-[#c49b66]/20 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Artwork</span>
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
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Image preview & file upload */}
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#161824] p-4 rounded-2xl border border-white/5">
            <div className="w-36 h-36 rounded-2xl overflow-hidden bg-black shrink-0 border border-white/10">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-2 flex-1 w-full">
              <label className="block text-xs text-neutral-400">Image Source (URL or File)</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs"
              />
              <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading...' : 'Upload Image File'}</span>
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

          <div className="space-y-4 bg-[#161824] p-4 rounded-2xl border border-white/5">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Artwork Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Celestial Gate at Twilight"
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-sm font-serif font-bold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="art, twilight, citadel"
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Description / Notes</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details regarding aesthetic inspiration or lore..."
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white p-3 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Related Character</label>
                <select
                  value={relatedCharacterId}
                  onChange={(e) => setRelatedCharacterId(e.target.value)}
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs"
                >
                  <option value="">None</option>
                  {characters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Related Chapter</label>
                <select
                  value={relatedChapterId}
                  onChange={(e) => setRelatedChapterId(e.target.value)}
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs"
                >
                  <option value="">None</option>
                  {chapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Chapter {ch.chapterNumber}: {ch.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
