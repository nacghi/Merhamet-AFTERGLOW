import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  FileEdit,
  Trash2,
  Eye,
  MapPin,
  Quote,
  AlertCircle,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { Scene } from '../../types';
import { SceneEditorModal } from './SceneEditorModal';

export const SceneManager: React.FC = () => {
  const { scenes, deleteScene, chapters, navigateTo } = useNovel();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingScene, setEditingScene] = useState<Scene | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [sceneToDelete, setSceneToDelete] = useState<Scene | null>(null);

  const filteredScenes = scenes.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.quote && s.quote.toLowerCase().includes(q)) ||
      (s.location && s.location.toLowerCase().includes(q))
    );
  });

  const confirmDelete = async () => {
    if (!sceneToDelete) return;
    await deleteScene(sceneToDelete.id);
    setSceneToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#faebd7] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#c49b66]" />
            Scene & Key Moments Studio ({scenes.length})
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Capture pivotal story turns, quotes, battle grounds, and link them directly to chapters.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingScene(null);
            setIsEditorOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b3854d] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 font-bold text-xs shadow-lg shadow-[#c49b66]/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Scene</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative bg-[#12141e] p-3 rounded-2xl border border-white/10">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search scene titles, quotes, locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white pl-10 pr-3 py-2 rounded-xl text-xs focus:outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScenes.map((sc) => {
          const ch = chapters.find((c) => c.id === sc.chapterId);

          return (
            <div
              key={sc.id}
              className="p-5 rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="relative h-36 rounded-xl overflow-hidden bg-black">
                  <img src={sc.image} alt={sc.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    {ch && (
                      <span className="px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-[#faebd7] border border-white/10">
                        Ch. {ch.chapterNumber}
                      </span>
                    )}
                    {sc.location && (
                      <span className="px-2 py-0.5 rounded bg-black/70 text-[10px] text-neutral-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#c49b66]" />
                        {sc.location}
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="font-serif font-bold text-lg text-white">{sc.title}</h4>

                {sc.quote && (
                  <p className="text-xs italic text-[#c49b66] font-serif border-l-2 border-[#c49b66] pl-2.5">
                    "{sc.quote}"
                  </p>
                )}

                <p className="text-xs text-neutral-300 line-clamp-2">{sc.description}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => navigateTo('scenes', { sceneId: sc.id })}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Scene</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingScene(sc);
                      setIsEditorOpen(true);
                    }}
                    className="p-2 rounded-lg bg-[#c49b66]/20 hover:bg-[#c49b66] text-[#faebd7] hover:text-neutral-950 font-semibold transition-all"
                  >
                    <FileEdit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSceneToDelete(sc)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isEditorOpen && (
        <SceneEditorModal
          scene={editingScene}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingScene(null);
          }}
        />
      )}

      {sceneToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-[#141622] border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-serif font-bold text-lg text-white">Delete Scene</h3>
            </div>
            <p className="text-xs text-neutral-300">
              Are you sure you want to delete <strong>{sceneToDelete.title}</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSceneToDelete(null)}
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
