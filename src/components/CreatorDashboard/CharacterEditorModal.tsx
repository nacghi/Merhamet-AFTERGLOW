import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Users,
  Upload,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { Character, CharacterRelationship } from '../../types';

interface CharacterEditorModalProps {
  character: Character | null;
  onClose: () => void;
}

export const CharacterEditorModal: React.FC<CharacterEditorModalProps> = ({ character, onClose }) => {
  const { characters, chapters, saveCharacter, uploadImageFile, showToast } = useNovel();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [personality, setPersonality] = useState('');
  const [background, setBackground] = useState('');
  const [quote, setQuote] = useState('');
  const [aestheticColor, setAestheticColor] = useState('#c49b66');
  const [relationships, setRelationships] = useState<CharacterRelationship[]>([]);
  const [relatedChapterIds, setRelatedChapterIds] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (character) {
      setName(character.name);
      setRole(character.role || '');
      setProfileImage(character.profileImage || '');
      setShortDescription(character.shortDescription || '');
      setPersonality(character.personality || '');
      setBackground(character.background || '');
      setQuote(character.quote || '');
      setAestheticColor(character.aestheticColor || '#c49b66');
      setRelationships(character.relationships || []);
      setRelatedChapterIds(character.relatedChapterIds || []);
    } else {
      setName('');
      setRole('');
      setProfileImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop');
      setShortDescription('');
      setPersonality('');
      setBackground('');
      setQuote('');
      setAestheticColor('#c49b66');
      setRelationships([]);
      setRelatedChapterIds([]);
    }
  }, [character]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImageFile(file);
      setProfileImage(url);
      showToast('Portrait image uploaded', 'success');
    } catch {
      showToast('Failed to upload image', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddRelationship = () => {
    const availableTargets = characters.filter((c) => c.id !== character?.id);
    if (availableTargets.length === 0) {
      showToast('Need at least one other character to establish a relationship', 'info');
      return;
    }
    const defaultTarget = availableTargets[0];
    setRelationships([
      ...relationships,
      {
        targetCharacterId: defaultTarget.id,
        targetCharacterName: defaultTarget.name,
        relationshipType: 'Ally',
        description: 'Bound by mutual survival.',
      },
    ]);
  };

  const handleRemoveRelationship = (index: number) => {
    setRelationships(relationships.filter((_, i) => i !== index));
  };

  const handleUpdateRelationship = (
    index: number,
    field: keyof CharacterRelationship,
    value: string
  ) => {
    const updated = [...relationships];
    if (field === 'targetCharacterId') {
      const target = characters.find((c) => c.id === value);
      updated[index] = {
        ...updated[index],
        targetCharacterId: value,
        targetCharacterName: target?.name || '',
      };
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
    }
    setRelationships(updated);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      showToast('Character name is required', 'error');
      return;
    }

    const payload: Partial<Character> = {
      id: character?.id,
      name: name.trim(),
      role: role.trim() || undefined,
      profileImage: profileImage.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      shortDescription: shortDescription.trim(),
      personality: personality.trim(),
      background: background.trim(),
      quote: quote.trim() || undefined,
      aestheticColor,
      relationships,
      relatedChapterIds,
    };

    const res = await saveCharacter(payload);
    if (res) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#11131c] border border-[#c49b66]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-white/10 bg-[#151722] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c49b66]/20 border border-[#c49b66]/40 flex items-center justify-center text-[#d4a373]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#faebd7]">
              {character ? `Edit Character: ${character.name}` : 'New Character Profile'}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b08044] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 text-xs font-bold shadow-lg shadow-[#c49b66]/20 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Character</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content form */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Identity row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-[#161824] p-4 rounded-2xl border border-white/5">
            <div className="sm:col-span-3 flex flex-col items-center gap-2">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#c49b66]/40 relative bg-black">
                <img src={profileImage} alt="Portrait" className="w-full h-full object-cover" />
              </div>
              <label className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white cursor-pointer flex items-center gap-1">
                <Upload className="w-3 h-3" />
                <span>{isUploading ? 'Uploading...' : 'Change Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="sm:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Character Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Lina Solis"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-sm font-serif font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Role / Epithet</label>
                <input
                  type="text"
                  placeholder="e.g. The Radiant Exile"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-neutral-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Quote & Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#161824] p-4 rounded-2xl border border-white/5">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Defining Quote</label>
              <input
                type="text"
                placeholder="e.g. You cannot cage the light without creating shadows..."
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs italic font-serif focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Short Description / Teaser</label>
              <input
                type="text"
                placeholder="A brief one-sentence synopsis of who they are..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Personality & Background Detailed Prose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs text-neutral-400">Personality & Traits</label>
              <textarea
                rows={4}
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="Describe their temper, motivations, fears, and virtues..."
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white p-3 rounded-xl text-xs focus:outline-none leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs text-neutral-400">Backstory & Origins</label>
              <textarea
                rows={4}
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="Their history before the events of the novel, bloodlines, alliances..."
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white p-3 rounded-xl text-xs focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Dynamic Universe Relationships */}
          <div className="bg-[#161824] p-4 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
                  Relationships with Other Characters
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Connect this character with allies, enemies, mentors, or lovers in the novel.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddRelationship}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Link</span>
              </button>
            </div>

            {relationships.length === 0 ? (
              <p className="text-xs text-neutral-500 italic">No relationships mapped yet.</p>
            ) : (
              <div className="space-y-3">
                {relationships.map((rel, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0d0e14] rounded-xl border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                  >
                    <div className="sm:col-span-4">
                      <select
                        value={rel.targetCharacterId}
                        onChange={(e) =>
                          handleUpdateRelationship(idx, 'targetCharacterId', e.target.value)
                        }
                        className="w-full bg-[#161824] border border-white/10 text-white px-2.5 py-1.5 rounded-lg text-xs"
                      >
                        {characters
                          .filter((c) => c.id !== character?.id)
                          .map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        placeholder="Type (e.g. Reluctant Ally)"
                        value={rel.relationshipType}
                        onChange={(e) =>
                          handleUpdateRelationship(idx, 'relationshipType', e.target.value)
                        }
                        className="w-full bg-[#161824] border border-white/10 text-white px-2.5 py-1.5 rounded-lg text-xs"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        placeholder="Dynamic description..."
                        value={rel.description}
                        onChange={(e) =>
                          handleUpdateRelationship(idx, 'description', e.target.value)
                        }
                        className="w-full bg-[#161824] border border-white/10 text-white px-2.5 py-1.5 rounded-lg text-xs"
                      />
                    </div>

                    <div className="sm:col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveRelationship(idx)}
                        className="p-1.5 text-red-400 hover:bg-white/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
