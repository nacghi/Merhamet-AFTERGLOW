import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  BookOpen,
  Eye,
  Edit3,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  Minus,
  Sparkles,
  Image as ImageIcon,
  Upload,
  Calendar,
  Clock,
  FileText,
  Users,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { Chapter } from '../../types';

interface ChapterEditorModalProps {
  chapter: Chapter | null;
  onClose: () => void;
}

export const ChapterEditorModal: React.FC<ChapterEditorModalProps> = ({ chapter, onClose }) => {
  const { saveChapter, characters, uploadImageFile, showToast } = useNovel();

  const [title, setTitle] = useState('');
  const [chapterNumber, setChapterNumber] = useState<number>(1);
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isNew, setIsNew] = useState(false);
  const [characterIds, setCharacterIds] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview' | 'split'>('write');

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title);
      setChapterNumber(chapter.chapterNumber);
      setContent(chapter.content);
      setExcerpt(chapter.excerpt || '');
      setCoverImage(chapter.coverImage || '');
      setPublicationDate(chapter.publicationDate || new Date().toISOString().split('T')[0]);
      setStatus(chapter.status);
      setIsNew(!!chapter.isNew);
      setCharacterIds(chapter.characterIds || []);
    } else {
      setTitle('');
      setChapterNumber(1);
      setContent('# Chapter Title\n\nThe evening sky bruised from lavender to obsidian...');
      setExcerpt('');
      setCoverImage('');
      setPublicationDate(new Date().toISOString().split('T')[0]);
      setStatus('draft');
      setIsNew(true);
      setCharacterIds([]);
    }
  }, [chapter]);

  // Word count & Reading time calculation
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 220));

  // Insert markdown snippet into text area
  const insertFormatting = (prefix: string, suffix = '') => {
    const textarea = document.getElementById('chapter-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = prefix + selected + suffix;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 50);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageFile(file);
      setCoverImage(url);
      showToast('Cover image uploaded successfully', 'success');
    } catch (err) {
      showToast('Failed to upload image', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (targetStatus?: 'draft' | 'published') => {
    if (!title.trim()) {
      showToast('Chapter title is required', 'error');
      return;
    }
    if (!content.trim()) {
      showToast('Chapter content is required', 'error');
      return;
    }

    const finalStatus = targetStatus || status;

    const chapterPayload: Partial<Chapter> = {
      id: chapter?.id,
      title: title.trim(),
      chapterNumber: Number(chapterNumber) || 1,
      content: content.trim(),
      excerpt: excerpt.trim() || undefined,
      coverImage: coverImage.trim() || undefined,
      publicationDate: publicationDate || new Date().toISOString().split('T')[0],
      status: finalStatus,
      isNew,
      characterIds,
      wordCount,
      readingTimeMinutes,
    };

    const result = await saveChapter(chapterPayload);
    if (result) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl bg-[#11131c] border border-[#c49b66]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[94vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:px-6 border-b border-white/10 bg-[#151722] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c49b66]/20 border border-[#c49b66]/40 flex items-center justify-center text-[#d4a373]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#faebd7]">
                {chapter ? `Edit Chapter ${chapter.chapterNumber}` : 'Create New Chapter'}
              </h3>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="font-mono">{wordCount} words</span>
                <span>•</span>
                <span>~{readingTimeMinutes} min read</span>
              </div>
            </div>
          </div>

          {/* View Tab Switcher & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-[#0d0e14] p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setActiveTab('write')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'write'
                    ? 'bg-[#c49b66] text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Write</span>
              </button>
              <button
                onClick={() => setActiveTab('split')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'split'
                    ? 'bg-[#c49b66] text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Split View</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-[#c49b66] text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Reader Preview</span>
              </button>
            </div>

            <button
              onClick={() => handleSubmit('draft')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Save Draft
            </button>

            <button
              onClick={() => handleSubmit('published')}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b08044] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 text-xs font-bold shadow-lg shadow-[#c49b66]/20 transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Publish</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Workspace */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Metadata Row: Chapter Number, Title, Date, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-[#161824] p-4 rounded-2xl border border-white/5">
            <div className="sm:col-span-2">
              <label className="block text-xs text-neutral-400 mb-1">Ch. Number</label>
              <input
                type="number"
                min="1"
                value={chapterNumber}
                onChange={(e) => setChapterNumber(parseInt(e.target.value) || 1)}
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-sm font-mono focus:outline-none"
              />
            </div>

            <div className="sm:col-span-6">
              <label className="block text-xs text-neutral-400 mb-1">Chapter Title *</label>
              <input
                type="text"
                placeholder="e.g. The Obsidian Key"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-sm font-serif font-bold focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs text-neutral-400 mb-1">Publish Date</label>
              <input
                type="date"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs font-mono focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs text-neutral-400 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs focus:outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Optional Meta: Cover Image, Summary, Characters */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-[#161824] p-4 rounded-2xl border border-white/5">
            {/* Cover Image */}
            <div className="sm:col-span-6 space-y-2">
              <label className="block text-xs text-neutral-400">Chapter Artwork / Backdrop</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste image URL (https://...)"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="flex-1 bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3 py-2 rounded-xl text-xs focus:outline-none"
                />
                <label className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-300 cursor-pointer flex items-center gap-1 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
              {coverImage && (
                <div className="h-20 rounded-xl overflow-hidden border border-white/10 relative">
                  <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setCoverImage('')}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className="sm:col-span-6 space-y-2">
              <label className="block text-xs text-neutral-400">Teaser / Excerpt</label>
              <textarea
                rows={2}
                placeholder="A brief teaser to entice readers on the chapter list..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white p-2.5 rounded-xl text-xs focus:outline-none"
              />
            </div>

            {/* Character Linking */}
            <div className="sm:col-span-12 space-y-2 pt-2 border-t border-white/5">
              <label className="block text-xs text-neutral-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#c49b66]" />
                Link Characters Appearing in this Chapter:
              </label>
              <div className="flex flex-wrap gap-2">
                {characters.map((char) => {
                  const isSelected = characterIds.includes(char.id);
                  return (
                    <button
                      type="button"
                      key={char.id}
                      onClick={() => {
                        if (isSelected) {
                          setCharacterIds(characterIds.filter((id) => id !== char.id));
                        } else {
                          setCharacterIds([...characterIds, char.id]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all ${
                        isSelected
                          ? 'bg-[#c49b66]/20 border-[#c49b66] text-[#faebd7]'
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <img
                        src={char.profileImage}
                        alt={char.name}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>{char.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#151722] p-2 rounded-2xl border border-white/10">
            <button
              onClick={() => insertFormatting('# ', '')}
              className="p-2 rounded-lg hover:bg-white/10 text-neutral-300 text-xs flex items-center gap-1"
              title="Heading 1 (#)"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('## ', '')}
              className="p-2 rounded-lg hover:bg-white/10 text-neutral-300 text-xs flex items-center gap-1"
              title="Heading 2 (##)"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('### ', '')}
              className="p-2 rounded-lg hover:bg-white/10 text-neutral-300 text-xs flex items-center gap-1"
              title="Heading 3 (###)"
            >
              <Heading3 className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-5 bg-white/10 mx-1" />
            <button
              onClick={() => insertFormatting('**', '**')}
              className="p-2 rounded-lg hover:bg-white/10 text-neutral-300 text-xs"
              title="Bold (**text**)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('*', '*')}
              className="p-2 rounded-lg hover:bg-white/10 text-neutral-300 text-xs"
              title="Italic (*text*)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('> ', '')}
              className="p-2 rounded-lg hover:bg-white/10 text-neutral-300 text-xs"
              title="Blockquote (>)"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('\n\n✦ ✦ ✦\n\n', '')}
              className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-[#c49b66] text-xs font-mono"
              title="Scene Divider (✦ ✦ ✦)"
            >
              ✦ ✦ ✦
            </button>
          </div>

          {/* Editor & Preview Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[400px]">
            {/* Markdown Textarea */}
            {(activeTab === 'write' || activeTab === 'split') && (
              <div className={`${activeTab === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
                <textarea
                  id="chapter-content-textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your chapter manuscript here in markdown..."
                  className="w-full h-[480px] bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-neutral-100 p-5 rounded-2xl font-serif text-base leading-relaxed resize-none focus:outline-none shadow-inner"
                />
              </div>
            )}

            {/* Live Preview Panel */}
            {(activeTab === 'preview' || activeTab === 'split') && (
              <div
                className={`${
                  activeTab === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'
                } h-[480px] overflow-y-auto bg-[#0c0d12] border border-white/10 rounded-2xl p-6 sm:p-8 novel-prose font-serif text-sm sm:text-base leading-relaxed text-[#d1d5db] shadow-inner`}
              >
                <div className="text-center pb-6 mb-6 border-b border-white/10">
                  <span className="text-xs font-mono text-[#c49b66] uppercase tracking-widest block mb-1">
                    Chapter {chapterNumber} Preview
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#faebd7]">
                    {title || 'Untitled Chapter'}
                  </h2>
                </div>

                <div className="space-y-4">
                  {content.split(/\n\n+/).map((block, idx) => {
                    const trimmed = block.trim();
                    if (trimmed.startsWith('# ')) {
                      return (
                        <h1 key={idx} className="font-display text-2xl font-bold text-[#faebd7]">
                          {trimmed.replace(/^#\s+/, '')}
                        </h1>
                      );
                    }
                    if (trimmed.startsWith('## ')) {
                      return (
                        <h2 key={idx} className="font-display text-xl font-semibold text-[#faebd7]">
                          {trimmed.replace(/^##\s+/, '')}
                        </h2>
                      );
                    }
                    if (trimmed.startsWith('>')) {
                      return (
                        <blockquote
                          key={idx}
                          className="border-l-4 border-[#c49b66] pl-4 italic text-[#faebd7] bg-white/5 py-2 rounded-r-lg"
                        >
                          {trimmed.replace(/^>\s*/gm, '')}
                        </blockquote>
                      );
                    }
                    if (trimmed === '✦ ✦ ✦' || trimmed === '---') {
                      return (
                        <div key={idx} className="text-center text-[#c49b66] my-6">
                          ✦ ✦ ✦
                        </div>
                      );
                    }
                    return <p key={idx}>{trimmed}</p>;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
