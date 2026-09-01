import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  Lock,
  Download,
  Upload,
  RotateCcw,
  Key,
  Feather,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { NovelSettings } from '../../types';

export const SettingsManager: React.FC = () => {
  const { settings, saveSettings, uploadImageFile, resetDatabase, showToast, chapters, characters, scenes, gallery, videos } = useNovel();

  const [novelTitle, setNovelTitle] = useState(settings.novelTitle);
  const [novelSubtitle, setNovelSubtitle] = useState(settings.novelSubtitle);
  const [synopsis, setSynopsis] = useState(settings.synopsis);
  const [authorName, setAuthorName] = useState(settings.authorName);
  const [authorBio, setAuthorBio] = useState(settings.authorBio || '');
  const [coverImage, setCoverImage] = useState(settings.coverImage || '');
  const [releaseSchedule, setReleaseSchedule] = useState(settings.releaseSchedule || 'Weekly Releases');
  const [creatorPasscode, setCreatorPasscode] = useState(settings.creatorPasscode || 'afterglow2026');
  const [isUploading, setIsUploading] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImageFile(file);
      setCoverImage(url);
      showToast('Universe backdrop updated', 'success');
    } catch {
      showToast('Failed to upload image', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!novelTitle.trim()) {
      showToast('Novel title cannot be empty', 'error');
      return;
    }

    const payload: Partial<NovelSettings> = {
      novelTitle: novelTitle.trim(),
      novelSubtitle: novelSubtitle.trim(),
      synopsis: synopsis.trim(),
      authorName: authorName.trim(),
      authorBio: authorBio.trim() || undefined,
      coverImage: coverImage.trim() || undefined,
      releaseSchedule: releaseSchedule.trim() || undefined,
      creatorPasscode: creatorPasscode.trim() || 'afterglow2026',
    };

    const res = await saveSettings(payload);
    if (res) {
      showToast('Novel settings saved', 'success');
    }
  };

  // Export full JSON database
  const handleExportBackup = () => {
    const exportData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      settings: {
        ...settings,
        novelTitle,
        novelSubtitle,
        synopsis,
        authorName,
        coverImage,
      },
      chapters,
      characters,
      scenes,
      gallery,
      videos,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `afterglow-universe-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Universe database backup downloaded', 'success');
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#faebd7] flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-[#c49b66]" />
            Novel Settings & Archival Studio
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure global lore metadata, author credentials, backup files, and system parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b3854d] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 font-bold text-xs shadow-lg shadow-[#c49b66]/20 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-[#12141e] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
        <h4 className="font-serif text-lg font-bold text-[#faebd7] border-b border-white/5 pb-3">
          Universe Identity & Metadata
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Novel Title</label>
            <input
              type="text"
              value={novelTitle}
              onChange={(e) => setNovelTitle(e.target.value)}
              className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3.5 py-2.5 rounded-xl text-sm font-serif font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Subtitle / Tagline</label>
            <input
              type="text"
              value={novelSubtitle}
              onChange={(e) => setNovelSubtitle(e.target.value)}
              className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3.5 py-2.5 rounded-xl text-sm italic font-serif focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs text-neutral-400 mb-1">Universe Synopsis</label>
            <textarea
              rows={3}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white p-3.5 rounded-xl text-xs leading-relaxed focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Author Pen Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Release Schedule Note</label>
            <input
              type="text"
              value={releaseSchedule}
              onChange={(e) => setReleaseSchedule(e.target.value)}
              className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs text-neutral-400 mb-1">Cover Artwork</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="flex-1 bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white px-3.5 py-2.5 rounded-xl text-xs"
              />
              <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white cursor-pointer flex items-center gap-1">
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
          </div>
        </div>
      </div>

      {/* Security: Passcode Setting */}
      <div className="bg-[#12141e] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
        <h4 className="font-serif text-lg font-bold text-[#faebd7] border-b border-white/5 pb-3 flex items-center gap-2">
          <Key className="w-4 h-4 text-[#c49b66]" />
          Creator Studio Security & Access
        </h4>

        <div>
          <label className="block text-xs text-neutral-400 mb-1">
            Author Passcode (Used to unlock the Creator Studio)
          </label>
          <div className="relative max-w-sm">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={creatorPasscode}
              onChange={(e) => setCreatorPasscode(e.target.value)}
              className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white pl-10 pr-3 py-2.5 rounded-xl text-sm font-mono focus:outline-none"
            />
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Default: <code className="text-[#c49b66]">afterglow2026</code>. Change this to any secret password you prefer.
          </p>
        </div>
      </div>

      {/* Data Management & Backup */}
      <div className="bg-[#12141e] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
        <h4 className="font-serif text-lg font-bold text-[#faebd7] border-b border-white/5 pb-3">
          Universe Data Persistence & Archival
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#0d0e14] border border-white/5 space-y-3">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-[#c49b66]" />
              Export Full Database Backup
            </h5>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Export all chapters, character profiles, scenes, gallery images, and videos into a single standalone JSON file.
            </p>
            <button
              onClick={handleExportBackup}
              className="w-full py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white rounded-xl transition-colors"
            >
              Download JSON Backup
            </button>
          </div>

          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-3">
            <h5 className="text-sm font-bold text-red-300 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-red-400" />
              Reset Database to Initial Lore
            </h5>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Restore default seed data for chapters, characters, and scenes. Any custom edits will be reverted.
            </p>
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="w-full py-2 bg-red-500/20 hover:bg-red-500 text-xs font-semibold text-red-300 hover:text-white rounded-xl transition-colors"
            >
              Reset Database
            </button>
          </div>
        </div>
      </div>

      {/* Reset confirmation modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-[#141622] border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-serif font-bold text-lg text-white">Confirm Lore Reset</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to reset the Afterglow database? This will revert all chapters, characters, scenes, and media back to the original initial seed data.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-xs text-white"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await resetDatabase();
                  setIsResetConfirmOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-lg shadow-red-600/30"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
