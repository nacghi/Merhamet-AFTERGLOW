import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Film,
  Upload,
  BookOpen,
  Users,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { VideoCategory, VideoItem } from '../../types';

interface VideoEditorModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoEditorModal: React.FC<VideoEditorModalProps> = ({ video, onClose }) => {
  const { characters, chapters, saveVideo, uploadImageFile, showToast } = useNovel();

  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [category, setCategory] = useState<VideoCategory>('Teaser');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [relatedCharacterId, setRelatedCharacterId] = useState('');
  const [relatedChapterId, setRelatedChapterId] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setVideoUrl(video.videoUrl);
      setThumbnailUrl(video.thumbnailUrl);
      setCategory(video.category);
      setDescription(video.description || '');
      setDuration(video.duration || '');
      setRelatedCharacterId(video.relatedCharacterId || '');
      setRelatedChapterId(video.relatedChapterId || '');
    } else {
      setTitle('');
      setVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ');
      setThumbnailUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop');
      setCategory('Teaser');
      setDescription('');
      setDuration('1:45');
      setRelatedCharacterId('');
      setRelatedChapterId('');
    }
  }, [video]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImageFile(file);
      setThumbnailUrl(url);
      showToast('Thumbnail uploaded', 'success');
    } catch {
      showToast('Failed to upload thumbnail', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      showToast('Video title is required', 'error');
      return;
    }
    if (!videoUrl.trim()) {
      showToast('Video URL / embed is required', 'error');
      return;
    }

    const payload: Partial<VideoItem> = {
      id: video?.id,
      title: title.trim(),
      videoUrl: videoUrl.trim(),
      thumbnailUrl: thumbnailUrl.trim(),
      category,
      description: description.trim() || undefined,
      duration: duration.trim() || undefined,
      relatedCharacterId: relatedCharacterId || undefined,
      relatedChapterId: relatedChapterId || undefined,
    };

    const res = await saveVideo(payload);
    if (res) onClose();
  };

  const categories: VideoCategory[] = [
    'Trailer',
    'Teaser',
    'Character Spotlight',
    'Lore Video',
    'Atmosphere',
    'Soundtrack',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#11131c] border border-[#c49b66]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 sm:px-6 border-b border-white/10 bg-[#151722] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c49b66]/20 border border-[#c49b66]/40 flex items-center justify-center text-[#d4a373]">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#faebd7]">
              {video ? `Edit Video: ${video.title}` : 'Add Cinema Video'}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b08044] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 text-xs font-bold shadow-lg shadow-[#c49b66]/20 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Video</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div className="space-y-4 bg-[#161824] p-4 rounded-2xl border border-white/5">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Video Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Afterglow Official Teaser"
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
                <label className="block text-xs text-neutral-400 mb-1">Duration (e.g. 2:15)</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="2:15"
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Video Stream / Embed URL *</label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/... or .mp4 link"
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Thumbnail Poster</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="flex-1 bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs"
                />
                <label className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white cursor-pointer flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? '...' : 'Upload'}</span>
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
              <label className="block text-xs text-neutral-400 mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Atmospheric narrative and soundtrack credits..."
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white p-3 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
