import React, { useState } from 'react';
import {
  Film,
  Plus,
  Search,
  FileEdit,
  Trash2,
  Play,
  AlertCircle,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { VideoItem } from '../../types';
import { VideoEditorModal } from './VideoEditorModal';

export const VideoManager: React.FC = () => {
  const { videos, deleteVideo, navigateTo } = useNovel();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<VideoItem | null>(null);

  const filteredVideos = videos.filter((v) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      (v.description && v.description.toLowerCase().includes(q)) ||
      v.category.toLowerCase().includes(q)
    );
  });

  const confirmDelete = async () => {
    if (!videoToDelete) return;
    await deleteVideo(videoToDelete.id);
    setVideoToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#faebd7] flex items-center gap-2">
            <Film className="w-5 h-5 text-[#c49b66]" />
            Cinema & Visualizer Lounge ({videos.length})
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Embed novel trailers, atmospheric soundscapes, and visual lore reels.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingVideo(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b3854d] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 font-bold text-xs shadow-lg shadow-[#c49b66]/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Video</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative bg-[#12141e] p-3 rounded-2xl border border-white/10">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search videos by title, category, or lore description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white pl-10 pr-3 py-2 rounded-xl text-xs focus:outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            className="rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/40 transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
          >
            <div className="relative aspect-16/9 overflow-hidden bg-black">
              <img
                src={vid.thumbnailUrl}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] uppercase font-bold text-[#faebd7] border border-white/10">
                {vid.category}
              </span>
              {vid.duration && (
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-neutral-300">
                  {vid.duration}
                </span>
              )}
            </div>

            <div className="p-4 space-y-2">
              <h4 className="font-serif font-bold text-base text-white truncate">{vid.title}</h4>
              <p className="text-xs text-neutral-400 line-clamp-2">{vid.description}</p>
            </div>

            <div className="p-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => navigateTo('videos', { videoItem: vid })}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <Play className="w-3.5 h-3.5 text-[#c49b66]" />
                <span>Play in Lounge</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingVideo(vid);
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg bg-[#c49b66]/20 hover:bg-[#c49b66] text-[#faebd7] hover:text-neutral-950 font-semibold"
                >
                  <FileEdit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setVideoToDelete(vid)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <VideoEditorModal
          video={editingVideo}
          onClose={() => {
            setIsModalOpen(false);
            setEditingVideo(null);
          }}
        />
      )}

      {videoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-[#141622] border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-serif font-bold text-lg text-white">Delete Video</h3>
            </div>
            <p className="text-xs text-neutral-300">
              Are you sure you want to delete <strong>{videoToDelete.title}</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setVideoToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-xs text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-xs font-bold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
