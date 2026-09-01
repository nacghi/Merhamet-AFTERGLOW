import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  FileEdit,
  Trash2,
  Eye,
  Layers,
  AlertCircle,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { Character } from '../../types';
import { CharacterEditorModal } from './CharacterEditorModal';

export const CharacterManager: React.FC = () => {
  const { characters, deleteCharacter, navigateTo } = useNovel();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState<Character | null>(null);

  const filteredCharacters = characters.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.role && c.role.toLowerCase().includes(q)) ||
      c.shortDescription.toLowerCase().includes(q)
    );
  });

  const confirmDelete = async () => {
    if (!characterToDelete) return;
    await deleteCharacter(characterToDelete.id);
    setCharacterToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#faebd7] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#c49b66]" />
            Character Codex & Cast ({characters.length})
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Create profiles, define backgrounds, map relationships, and connect characters to chapters.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCharacter(null);
            setIsEditorOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b3854d] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 font-bold text-xs shadow-lg shadow-[#c49b66]/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Character</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative bg-[#12141e] p-3 rounded-2xl border border-white/10">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search character names, roles, or traits..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white pl-10 pr-3 py-2 rounded-xl text-xs focus:outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((char) => (
          <div
            key={char.id}
            className="p-5 rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={char.profileImage}
                  alt={char.name}
                  className="w-14 h-14 rounded-xl object-cover border border-[#c49b66]/40 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-[#c49b66] uppercase tracking-wider block">
                    {char.role || 'Character'}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white truncate">{char.name}</h4>
                </div>
              </div>

              <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                {char.shortDescription}
              </p>

              {char.relationships && char.relationships.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#d4a373]">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{char.relationships.length} relationships mapped</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => navigateTo('character-detail', { characterId: char.id })}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Sheet</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingCharacter(char);
                    setIsEditorOpen(true);
                  }}
                  className="p-2 rounded-lg bg-[#c49b66]/20 hover:bg-[#c49b66] text-[#faebd7] hover:text-neutral-950 font-semibold transition-all"
                  title="Edit Character"
                >
                  <FileEdit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCharacterToDelete(char)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                  title="Delete Character"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditorOpen && (
        <CharacterEditorModal
          character={editingCharacter}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingCharacter(null);
          }}
        />
      )}

      {characterToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-[#141622] border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-serif font-bold text-lg text-white">Delete Character</h3>
            </div>
            <p className="text-xs text-neutral-300">
              Are you sure you want to delete <strong>{characterToDelete.name}</strong> from the
              universe?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setCharacterToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white"
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
