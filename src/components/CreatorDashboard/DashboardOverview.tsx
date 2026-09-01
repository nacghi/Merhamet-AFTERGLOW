import React from 'react';
import {
  BookOpen,
  Users,
  Sparkles,
  Image as ImageIcon,
  Film,
  FileEdit,
  Plus,
  CheckCircle2,
  Clock,
  Flame,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { CreatorTab } from '../../types';

interface DashboardOverviewProps {
  onSelectTab: (tab: CreatorTab) => void;
  onOpenNewChapter: () => void;
  onOpenNewCharacter: () => void;
  onOpenNewScene: () => void;
  onOpenNewGallery: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onSelectTab,
  onOpenNewChapter,
  onOpenNewCharacter,
  onOpenNewScene,
  onOpenNewGallery,
}) => {
  const { chapters, characters, scenes, gallery, videos, settings, navigateTo } = useNovel();

  const publishedChapters = chapters.filter((c) => c.status === 'published');
  const draftChapters = chapters.filter((c) => c.status === 'draft');
  const totalWords = chapters.reduce((acc, c) => acc + (c.wordCount || 0), 0);
  const totalReadingTime = Math.ceil(totalWords / 220);

  const stats = [
    {
      label: 'Total Chapters',
      value: chapters.length,
      sub: `${publishedChapters.length} published • ${draftChapters.length} drafts`,
      icon: BookOpen,
      color: 'from-amber-500/20 to-amber-600/10 text-[#d4a373]',
      tab: 'chapters' as CreatorTab,
    },
    {
      label: 'Characters & Codex',
      value: characters.length,
      sub: 'Heroes, exiles & rulers',
      icon: Users,
      color: 'from-blue-500/20 to-blue-600/10 text-blue-400',
      tab: 'characters' as CreatorTab,
    },
    {
      label: 'Scenes & Moments',
      value: scenes.length,
      sub: 'Climactic lore events',
      icon: Sparkles,
      color: 'from-purple-500/20 to-purple-600/10 text-purple-400',
      tab: 'scenes' as CreatorTab,
    },
    {
      label: 'Visual Artworks',
      value: gallery.length,
      sub: 'Portraits & aesthetics',
      icon: ImageIcon,
      color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400',
      tab: 'gallery' as CreatorTab,
    },
    {
      label: 'Cinema & Videos',
      value: videos.length,
      sub: 'Trailers & soundscapes',
      icon: Film,
      color: 'from-rose-500/20 to-rose-600/10 text-rose-400',
      tab: 'videos' as CreatorTab,
    },
    {
      label: 'Total Word Count',
      value: totalWords.toLocaleString(),
      sub: `~${totalReadingTime} mins reading time`,
      icon: TrendingUp,
      color: 'from-amber-600/20 to-yellow-600/10 text-[#faebd7]',
      tab: 'chapters' as CreatorTab,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#1c1815] via-[#161722] to-[#12141f] border border-[#c49b66]/30 p-6 md:p-8 shadow-2xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4a373]">
              <Award className="w-4 h-4" />
              <span>Novel Author Studio</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#faebd7]">
              {settings.novelTitle} Creator Suite
            </h2>
            <p className="text-sm text-neutral-300 max-w-xl leading-relaxed">
              Manage your serial novel chapters, develop rich characters, choreograph scenes, and expand the universe archive.
            </p>
          </div>

          {/* Quick Create Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewChapter}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b3854d] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 font-bold text-xs shadow-lg shadow-[#c49b66]/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Chapter</span>
            </button>
            <button
              onClick={onOpenNewCharacter}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              <span>+ Character</span>
            </button>
            <button
              onClick={onOpenNewGallery}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <ImageIcon className="w-4 h-4" />
              <span>+ Artwork</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectTab(stat.tab)}
              className="p-6 rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/40 transition-all cursor-pointer group shadow-xl flex items-start justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-neutral-400">{stat.label}</span>
                <div className="font-display text-3xl font-extrabold text-[#faebd7] group-hover:text-[#c49b66] transition-colors">
                  {stat.value}
                </div>
                <p className="text-xs text-neutral-400">{stat.sub}</p>
              </div>

              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} border border-white/10`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Chapters & Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chapters table snapshot */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#faebd7] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#c49b66]" />
              Latest Chapters
            </h3>
            <button
              onClick={() => onSelectTab('chapters')}
              className="text-xs text-[#d4a373] hover:underline flex items-center gap-1"
            >
              <span>Manage All Chapters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="rounded-2xl bg-[#12141e] border border-white/10 overflow-hidden">
            <div className="divide-y divide-white/5">
              {chapters.slice(0, 5).map((ch) => (
                <div
                  key={ch.id}
                  className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#0d0e14] border border-white/10 flex items-center justify-center shrink-0 font-display font-bold text-sm text-[#faebd7]">
                      {ch.chapterNumber}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-sm text-white truncate">
                        {ch.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                        <span>{ch.wordCount || 0} words</span>
                        <span>•</span>
                        <span>{ch.publicationDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                        ch.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {ch.status}
                    </span>

                    <button
                      onClick={() => {
                        onSelectTab('chapters');
                      }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-[#c49b66]/20 text-neutral-300 hover:text-white transition-colors"
                      title="Edit Chapter"
                    >
                      <FileEdit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick lore snapshot */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#faebd7] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#c49b66]" />
            Universe Cast
          </h3>

          <div className="rounded-2xl bg-[#12141e] border border-white/10 p-4 space-y-3">
            {characters.slice(0, 4).map((char) => (
              <div
                key={char.id}
                onClick={() => onSelectTab('characters')}
                className="p-2 rounded-xl hover:bg-white/5 flex items-center gap-3 cursor-pointer transition-colors"
              >
                <img
                  src={char.profileImage}
                  alt={char.name}
                  className="w-10 h-10 rounded-lg object-cover border border-white/10"
                />
                <div className="min-w-0 flex-1">
                  <h5 className="font-serif font-bold text-xs text-white truncate">{char.name}</h5>
                  <p className="text-[11px] text-neutral-400 truncate">{char.role}</p>
                </div>
              </div>
            ))}

            <button
              onClick={() => onSelectTab('characters')}
              className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-neutral-300 font-medium transition-colors"
            >
              Open Character Codex ({characters.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
