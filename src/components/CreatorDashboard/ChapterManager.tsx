import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  FileEdit,
  Trash2,
  Eye,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { Chapter } from '../../types';
import { ChapterEditorModal } from './ChapterEditorModal';

interface ChapterManagerProps {
  initialEditChapter?: Chapter | null;
}

export const ChapterManager: React.FC<ChapterManagerProps> = ({ initialEditChapter }) => {
  const { chapters, deleteChapter, saveChapter, navigateTo, showToast } = useNovel();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(initialEditChapter || null);
  const [isEditorOpen, setIsEditorOpen] = useState(!!initialEditChapter);
  const [chapterToDelete, setChapterToDelete] = useState<Chapter | null>(null);

  const filteredChapters = chapters
    .filter((ch) => {
      if (filterStatus !== 'all' && ch.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          ch.title.toLowerCase().includes(q) ||
          `chapter ${ch.chapterNumber}`.includes(q) ||
          (ch.excerpt && ch.excerpt.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => a.chapterNumber - b.chapterNumber);

  const handleToggleStatus = async (ch: Chapter) => {
    const nextStatus = ch.status === 'published' ? 'draft' : 'published';
    await saveChapter({
      ...ch,
      status: nextStatus,
    });
    showToast(`Chapter ${ch.chapterNumber} is now ${nextStatus}`, 'info');
  };

  const confirmDelete = async () => {
    if (!chapterToDelete) return;
    await deleteChapter(chapterToDelete.id);
    setChapterToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#faebd7] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#c49b66]" />
            Chapter Management ({chapters.length})
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Write, edit, organize, and publish manuscript chapters for your readers.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingChapter(null);
            setIsEditorOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b3854d] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 font-bold text-xs shadow-lg shadow-[#c49b66]/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Chapter</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#12141e] p-3 rounded-2xl border border-white/10">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search chapters by title, number, content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white pl-9 pr-3 py-2 rounded-xl text-xs focus:outline-none"
          />
        </div>

        <div className="flex items-center bg-[#0d0e14] p-0.5 rounded-xl border border-white/10 text-xs">
          {(['all', 'published', 'draft'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                filterStatus === st
                  ? 'bg-[#c49b66] text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters List Table */}
      <div className="rounded-2xl bg-[#12141e] border border-white/10 overflow-hidden shadow-xl">
        {filteredChapters.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 space-y-3">
            <BookOpen className="w-10 h-10 text-neutral-600 mx-auto" />
            <p className="text-sm font-medium text-neutral-300">No chapters found</p>
            <p className="text-xs text-neutral-500">
              Click "+ Create Chapter" above to start authoring your next chapter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredChapters.map((ch) => (
              <div
                key={ch.id}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/5 transition-colors"
              >
                {/* Chapter basic info */}
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-[#0d0e14] border border-[#c49b66]/30 flex items-center justify-center shrink-0 font-display font-extrabold text-base text-[#faebd7] shadow-inner">
                    {ch.chapterNumber}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-base text-white truncate">
                        {ch.title}
                      </h4>
                      {ch.isNew && (
                        <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-wider">
                          New
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#c49b66]" />
                        {ch.readingTimeMinutes || 8} min read ({ch.wordCount || 0} words)
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {ch.publicationDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Toggle & Action Buttons */}
                <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => handleToggleStatus(ch)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize border transition-all ${
                      ch.status === 'published'
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
                        : 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
                    }`}
                    title="Click to toggle Draft / Published"
                  >
                    {ch.status}
                  </button>

                  <button
                    onClick={() => navigateTo('reader', { chapterId: ch.id })}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                    title="View in Reader"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setEditingChapter(ch);
                      setIsEditorOpen(true);
                    }}
                    className="p-2 rounded-xl bg-[#c49b66]/20 hover:bg-[#c49b66] text-[#faebd7] hover:text-neutral-950 transition-all font-semibold"
                    title="Edit Chapter Manuscript"
                  >
                    <FileEdit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setChapterToDelete(ch)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                    title="Delete Chapter"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chapter Editor Modal */}
      {isEditorOpen && (
        <ChapterEditorModal
          chapter={editingChapter}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingChapter(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {chapterToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-[#141622] border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-serif font-bold text-lg text-white">Delete Chapter</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong>
                Chapter {chapterToDelete.chapterNumber}: {chapterToDelete.title}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setChapterToDelete(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-lg shadow-red-600/30"
              >
                Delete Chapter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
