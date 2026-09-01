import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Heart,
  MapPin,
  Flame,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';
import { Scene } from '../types';

export const ScenesView: React.FC = () => {
  const { scenes, chapters, characters, navigateTo, toggleFavorite, isFavorited } = useNovel();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScenes = scenes.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.quote && s.quote.toLowerCase().includes(q)) ||
      (s.location && s.location.toLowerCase().includes(q)) ||
      (s.mood && s.mood.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c49b66] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Cinematic Moments & Key Clashes</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#faebd7]">
            Iconic Scenes
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Revisit the defining battles, revelations, and celestial encounters of Afterglow.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search scenes, quotes, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#13151f] border border-white/10 focus:border-[#c49b66] text-white pl-9 pr-3 py-2 rounded-xl text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Scenes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredScenes.map((scene) => {
          const isFav = isFavorited('scene', scene.id);
          const ch = chapters.find((c) => c.id === scene.chapterId);
          const connectedCharacters = characters.filter((c) =>
            scene.characterIds?.includes(c.id)
          );

          return (
            <div
              key={scene.id}
              className="group rounded-3xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/60 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              {/* Scene Backdrop Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0a0b10]">
                {scene.image ? (
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1b1e2e] to-[#0c0d14]">
                    <Sparkles className="w-12 h-12 text-[#c49b66]/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141e] via-transparent to-black/40" />

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {scene.location && (
                      <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-neutral-200 text-xs flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-[#c49b66]" />
                        {scene.location}
                      </span>
                    )}
                    {scene.mood && (
                      <span className="px-2.5 py-1 rounded-lg bg-[#c49b66]/20 border border-[#c49b66]/30 text-[#faebd7] text-xs font-medium">
                        {scene.mood}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleFavorite('scene', scene.id)}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-rose-400 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-300'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Scene Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-[#faebd7] group-hover:text-[#c49b66] transition-colors leading-snug">
                    {scene.title}
                  </h3>

                  {scene.quote && (
                    <div className="p-3.5 rounded-xl bg-[#c49b66]/10 border-l-3 border-[#c49b66] flex items-start gap-2.5">
                      <Quote className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                      <p className="font-serif italic text-sm text-[#faebd7] leading-relaxed">
                        "{scene.quote}"
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {scene.description}
                  </p>
                </div>

                {/* Characters and Read Link */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  {connectedCharacters.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-neutral-400">Featured Characters:</span>
                      <div className="flex items-center gap-1.5">
                        {connectedCharacters.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => navigateTo('character-detail', { characterId: c.id })}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[11px] text-neutral-300 border border-white/10 transition-colors"
                          >
                            <img
                              src={c.profileImage}
                              alt={c.name}
                              className="w-4 h-4 rounded-full object-cover"
                            />
                            <span>{c.name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {scene.chapterId && (
                    <button
                      onClick={() => navigateTo('reader', { chapterId: scene.chapterId })}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#c49b66] text-[#faebd7] hover:text-neutral-950 font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-[#c49b66]"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>
                        Read this moment in Chapter {scene.chapterNumber || ch?.chapterNumber || ''}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
