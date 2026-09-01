import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Sparkles,
  BookOpen,
  Heart,
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
  X,
  Share2,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';
import { Character } from '../types';

export const CharactersView: React.FC = () => {
  const {
    characters,
    chapters,
    scenes,
    selectedCharacterId,
    navigateTo,
    toggleFavorite,
    isFavorited,
  } = useNovel();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalChar, setActiveModalChar] = useState<Character | null>(null);

  // If selectedCharacterId was set via navigation, show modal or auto-select
  React.useEffect(() => {
    if (selectedCharacterId) {
      const found = characters.find((c) => c.id === selectedCharacterId);
      if (found) setActiveModalChar(found);
    }
  }, [selectedCharacterId, characters]);

  const filteredCharacters = useMemo(() => {
    if (!searchQuery.trim()) return characters;
    const q = searchQuery.toLowerCase();
    return characters.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.role && c.role.toLowerCase().includes(q)) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.personality.toLowerCase().includes(q)
    );
  }, [characters, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c49b66] uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Dramatis Personae & Lore Codex</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#faebd7]">
            Characters of Afterglow
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Explore the heroes, exiles, scholars, and monarchs shaping the fate of the twilight realm.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search characters or traits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#13151f] border border-white/10 focus:border-[#c49b66] text-white pl-9 pr-3 py-2 rounded-xl text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCharacters.map((char) => {
          const isFav = isFavorited('character', char.id);

          return (
            <div
              key={char.id}
              onClick={() => setActiveModalChar(char)}
              className="group cursor-pointer rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/60 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#c49b66]/10 flex flex-col justify-between"
            >
              {/* Portrait */}
              <div className="relative h-64 w-full overflow-hidden bg-[#090a0f]">
                <img
                  src={char.profileImage}
                  alt={char.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141e] via-[#12141e]/20 to-transparent" />

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('character', char.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/70 hover:text-rose-400 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-300'
                    }`}
                  />
                </button>

                {/* Aesthetic Accent Tag */}
                {char.aestheticColor && (
                  <div
                    className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full shadow-lg"
                    style={{ backgroundColor: char.aestheticColor }}
                    title="Character Aura Color"
                  />
                )}
              </div>

              {/* Character Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-[#c49b66] uppercase tracking-wider block">
                    {char.role || 'Protagonist'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#faebd7] group-hover:text-[#c49b66] transition-colors mt-0.5">
                    {char.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                    {char.shortDescription}
                  </p>
                </div>

                {char.quote && (
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-xs italic text-[#faebd7]/80 font-serif line-clamp-2">
                      "{char.quote}"
                    </p>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between text-xs text-[#d4a373] font-semibold">
                  <span>View Full Lore Sheet</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Character Detail Sheet Modal */}
      {activeModalChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#131520] border border-[#c49b66]/40 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header Bar */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden shrink-0">
              <img
                src={activeModalChar.profileImage}
                alt={activeModalChar.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131520] via-[#131520]/60 to-black/40" />

              <button
                onClick={() => setActiveModalChar(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#c49b66] uppercase tracking-wider">
                    {activeModalChar.role}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#faebd7]">
                    {activeModalChar.name}
                  </h2>
                </div>
                <button
                  onClick={() => toggleFavorite('character', activeModalChar.id)}
                  className="p-2.5 rounded-full bg-black/60 text-white hover:text-rose-400 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorited('character', activeModalChar.id)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-neutral-300'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {activeModalChar.quote && (
                <blockquote className="p-4 rounded-xl bg-[#c49b66]/10 border-l-4 border-[#c49b66] font-serif italic text-base text-[#faebd7]">
                  "{activeModalChar.quote}"
                </blockquote>
              )}

              {/* Personality & Background */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d4a373]">
                  Personality & Traits
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {activeModalChar.personality}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d4a373]">
                  Backstory & Origins
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {activeModalChar.background}
                </p>
              </div>

              {/* Relationships with other characters */}
              {activeModalChar.relationships && activeModalChar.relationships.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d4a373] flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    Key Universe Relationships
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalChar.relationships.map((rel, idx) => {
                      const target = characters.find((c) => c.id === rel.targetCharacterId);
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (target) setActiveModalChar(target);
                          }}
                          className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#c49b66]/40 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {target && (
                              <img
                                src={target.profileImage}
                                alt={target.name}
                                className="w-6 h-6 rounded-full object-cover border border-white/10"
                              />
                            )}
                            <span className="font-serif font-bold text-sm text-[#faebd7]">
                              {target?.name || rel.targetCharacterName || 'Ally'}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c49b66]/20 text-[#d4a373]">
                              {rel.relationshipType}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 leading-relaxed">
                            {rel.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related Chapters & Scenes */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d4a373] mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Chapter Appearances
                  </h4>
                  <div className="space-y-1.5">
                    {chapters
                      .filter(
                        (ch) =>
                          activeModalChar.relatedChapterIds?.includes(ch.id) ||
                          ch.characterIds?.includes(activeModalChar.id)
                      )
                      .map((ch) => (
                        <button
                          key={ch.id}
                          onClick={() => {
                            setActiveModalChar(null);
                            navigateTo('reader', { chapterId: ch.id });
                          }}
                          className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-[#c49b66]/20 text-xs text-white flex items-center justify-between transition-colors"
                        >
                          <span>
                            Ch. {ch.chapterNumber}: {ch.title}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                        </button>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d4a373] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Related Lore Scenes
                  </h4>
                  <div className="space-y-1.5">
                    {scenes
                      .filter(
                        (s) =>
                          activeModalChar.relatedSceneIds?.includes(s.id) ||
                          s.characterIds?.includes(activeModalChar.id)
                      )
                      .map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setActiveModalChar(null);
                            navigateTo('scenes', { sceneId: s.id });
                          }}
                          className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-[#c49b66]/20 text-xs text-white flex items-center justify-between transition-colors"
                        >
                          <span className="truncate">{s.title}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0 ml-1" />
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
