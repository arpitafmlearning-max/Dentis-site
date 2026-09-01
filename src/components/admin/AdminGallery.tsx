import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { GalleryItem, GalleryCategory } from '../../types';
import { Image as ImageIcon, Plus, Edit2, Trash2, Eye, EyeOff, X, Save, AlertCircle } from 'lucide-react';

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useClinic();
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState<GalleryItem | null>(null);

  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    title: '',
    caption: '',
    imageUrl: '',
    category: 'Clinic',
    isDemo: false,
    isVisible: true
  });

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      caption: '',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
      category: 'Clinic',
      isDemo: false,
      isVisible: true
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) return;

    if (isCreating) {
      addGalleryItem({
        title: formData.title || '',
        caption: formData.caption || '',
        imageUrl: formData.imageUrl || '',
        category: (formData.category as any) || 'Clinic',
        isDemo: formData.isDemo ?? false,
        isVisible: formData.isVisible ?? true
      });
    } else if (editingItem) {
      updateGalleryItem({
        ...editingItem,
        ...formData
      } as GalleryItem);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  const handleConfirmDelete = () => {
    if (galleryToDelete) {
      deleteGalleryItem(galleryToDelete.id);
      setGalleryToDelete(null);
    }
  };

  const handleToggle = (item: GalleryItem) => {
    updateGalleryItem({
      ...item,
      isVisible: !item.isVisible
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E8E5DF] shadow-2xs flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-lg text-[#0B192C]">
            Smile & Studio Gallery ({gallery.length})
          </h2>
          <p className="text-xs text-slate-500">
            Manage photos, operatory views, and illustrative case results.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-[#0D5C63] hover:bg-[#0B4A50] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl border ${
              item.isVisible ? 'border-[#E8E5DF]' : 'border-dashed border-slate-300 opacity-60'
            } overflow-hidden shadow-2xs space-y-3 flex flex-col justify-between`}
          >
            <div>
              <div className="relative h-44 bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/90 text-slate-800">
                  {item.category}
                </span>

                {item.isDemo && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                    Illustrative
                  </span>
                )}
              </div>

              <div className="p-4 space-y-1">
                <h3 className="font-serif font-bold text-sm text-[#0B192C]">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 font-light">
                  {item.caption}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                onClick={() => handleToggle(item)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                {item.isVisible ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{item.isVisible ? 'Visible' : 'Hidden'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setGalleryToDelete(item)}
                  className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Delete image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {galleryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1A2A44]">
                  Delete Photo?
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  This photo will be removed from your clinic gallery.
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0] space-y-1 text-xs">
              <p className="font-bold text-slate-800">
                Title: <span className="font-normal text-slate-600">{galleryToDelete.title}</span>
              </p>
              <p className="font-bold text-slate-800">
                Category: <span className="font-normal text-slate-600">{galleryToDelete.category}</span>
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setGalleryToDelete(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Yes, Delete Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {(editingItem || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8E5DF] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#0B192C]">
                {isCreating ? 'Add Photo to Gallery' : 'Edit Photo Details'}
              </h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsCreating(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                >
                  <option value="Clinic">Clinic & Operatory</option>
                  <option value="Dentistry">Dentistry & Workflows</option>
                  <option value="Smile Inspiration">Smile Inspiration</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  value={formData.caption}
                  onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20 resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isDemo}
                    onChange={(e) => setFormData(prev => ({ ...prev, isDemo: e.target.checked }))}
                    className="rounded text-[#0D5C63]"
                  />
                  <span>Show "Illustrative Case" Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                    className="rounded text-[#0D5C63]"
                  />
                  <span>Visible on Gallery</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#E8E5DF] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0D5C63] text-white rounded-xl font-semibold shadow-xs"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
