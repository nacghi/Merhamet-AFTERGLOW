import React, { useState } from 'react';
import {
  Film,
  Play,
  Clock,
  Heart,
  BookOpen,
  Users,
  Sparkles,
  X,
} from 'lucide-react';
import { useNovel } from '../context/NovelContext';
import { VideoItem } from '../types';

export const VideosView: React.FC = () => {
  const {
    videos,
    chapters,
    characters,
    activeVideoItem,
    navigateTo,
    toggleFavorite,
    isFavorited,
  } = useNovel();

  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);

  React.useEffect(() => {
    if (activeVideoItem) {
      setActiveModalVideo(activeVideoItem);
    }
  }, [activeVideoItem]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c49b66] uppercase tracking-wider mb-2">
            <Film className="w-4 h-4" />
            <span>Cinematic Trailers & Atmosphere Lounge</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#faebd7]">
            Cinema & Audio-Visuals
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Immerse yourself in animated novel trailers, lore vignettes, and ambient soundscapes.
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((vid) => {
          const isFav = isFavorited('video', vid.id);
          const ch = chapters.find((c) => c.id === vid.relatedChapterId);
          const char = characters.find((c) => c.id === vid.relatedCharacterId);

          return (
            <div
              key={vid.id}
              onClick={() => setActiveModalVideo(vid)}
              className="group cursor-pointer rounded-3xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/60 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Thumbnail with Play Trigger */}
              <div className="relative aspect-16/9 w-full overflow-hidden bg-black">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141e] via-transparent to-black/40" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#c49b66] text-neutral-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-neutral-950 ml-1" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] uppercase font-bold text-[#faebd7] border border-white/10">
                    {vid.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite('video', vid.id);
                    }}
                    className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-rose-400 transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-300'
                      }`}
                    />
                  </button>
                </div>

                {vid.duration && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-neutral-300">
                    {vid.duration}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#faebd7] group-hover:text-[#c49b66] transition-colors leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>

                {/* Linked Lore */}
                {(ch || char) && (
                  <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-neutral-400">
                    {ch && (
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#c49b66]" />
                        Ch. {ch.chapterNumber}
                      </span>
                    )}
                    {char && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#c49b66]" />
                        {char.name}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Cinema Player Modal */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#131520] border border-[#c49b66]/40 rounded-3xl overflow-hidden shadow-2xl space-y-4">
            <div className="flex items-center justify-between p-4 px-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#c49b66]/20 text-[#d4a373] uppercase">
                  {activeModalVideo.category}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#faebd7] truncate max-w-md">
                  {activeModalVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 pb-6 space-y-4">
              {/* Responsive Video Frame / Player */}
              <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-black border border-white/10">
                {activeModalVideo.videoUrl.includes('youtube.com') ||
                activeModalVideo.videoUrl.includes('youtu.be') ||
                activeModalVideo.videoUrl.includes('vimeo.com') ? (
                  <iframe
                    src={activeModalVideo.videoUrl}
                    title={activeModalVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <video
                    src={activeModalVideo.videoUrl}
                    controls
                    poster={activeModalVideo.thumbnailUrl}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                  {activeModalVideo.description}
                </p>
                <button
                  onClick={() => toggleFavorite('video', activeModalVideo.id)}
                  className="px-4 py-2 rounded-xl bg-[#c49b66]/20 hover:bg-[#c49b66] text-[#faebd7] hover:text-neutral-950 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 border border-[#c49b66]/40"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorited('video', activeModalVideo.id)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-neutral-300'
                    }`}
                  />
                  <span>Favorite</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
