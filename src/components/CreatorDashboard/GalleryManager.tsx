import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Search,
  FileEdit,
  Trash2,
  Eye,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { useNovel } from '../../context/NovelContext';
import { GalleryCategory, GalleryItem } from '../../types';
import { GalleryUploadModal } from './GalleryUploadModal';

export const GalleryManager: React.FC = () => {
  const { gallery, deleteGalleryItem, navigateTo } = useNovel();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  const categories: GalleryCategory[] = [
    'All',
    'Characters',
    'Places',
    'Scenes',
    'Outfits',
    'Aesthetic',
    'Moodboard',
    'Other',
  ];

  const filteredItems = gallery.filter((item) => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    await deleteGalleryItem(itemToDelete.id);
    setItemToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#faebd7] flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#c49b66]" />
            Visual Art & Moodboard Manager ({gallery.length})
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Organize world artwork, landscapes, outfits, and aesthetic moodboards.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c49b66] to-[#b3854d] hover:from-[#d4a373] hover:to-[#c49b66] text-neutral-950 font-bold text-xs shadow-lg shadow-[#c49b66]/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload Artwork</span>
        </button>
      </div>

      {/* Filter / Search */}
      <div className="flex flex-col md:flex-row gap-3 bg-[#12141e] p-3 rounded-2xl border border-white/10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search artwork by title, tags, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d0e14] border border-white/10 focus:border-[#c49b66] text-white pl-9 pr-3 py-2 rounded-xl text-xs focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#c49b66] text-neutral-950 font-bold'
                  : 'bg-[#0d0e14] text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#12141e] border border-white/10 hover:border-[#c49b66]/40 transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-black">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] uppercase font-bold text-[#faebd7] border border-white/10">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="font-serif font-bold text-sm text-white truncate">{item.title}</h4>
              {item.tags && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-neutral-400 font-mono"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => navigateTo('gallery', { galleryItem: item })}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg bg-[#c49b66]/20 hover:bg-[#c49b66] text-[#faebd7] hover:text-neutral-950 font-semibold"
                >
                  <FileEdit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setItemToDelete(item)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <GalleryUploadModal
          item={editingItem}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
        />
      )}

      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-[#141622] border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-serif font-bold text-lg text-white">Delete Artwork</h3>
            </div>
            <p className="text-xs text-neutral-300">
              Are you sure you want to remove <strong>{itemToDelete.title}</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
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
