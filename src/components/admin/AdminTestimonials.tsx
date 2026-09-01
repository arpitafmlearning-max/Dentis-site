import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Testimonial } from '../../types';
import { Star, Plus, Edit2, Trash2, Eye, EyeOff, Save, X, CheckCircle } from 'lucide-react';

export const AdminTestimonials: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useClinic();
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<Testimonial>>({
    patientName: '',
    rating: 5,
    comment: '',
    treatmentName: 'General Consultation',
    date: 'Recent Visit',
    isVerified: true,
    isDemo: true,
    isVisible: true
  });

  const handleEdit = (t: Testimonial) => {
    setEditingItem(t);
    setFormData(t);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      patientName: '',
      rating: 5,
      comment: '',
      treatmentName: 'Dental Crowns & Bridges',
      date: 'Recent Visit',
      isVerified: true,
      isDemo: false,
      isVisible: true
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.comment) return;

    if (isCreating) {
      addTestimonial({
        patientName: formData.patientName || '',
        rating: formData.rating || 5,
        comment: formData.comment || '',
        treatmentName: formData.treatmentName || 'Dental Care',
        date: formData.date || 'Recent Visit',
        isVerified: formData.isVerified ?? true,
        isDemo: formData.isDemo ?? false,
        isVisible: formData.isVisible ?? true
      });
    } else if (editingItem) {
      updateTestimonial({
        ...editingItem,
        ...formData
      } as Testimonial);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete review from ${name}?`)) {
      deleteTestimonial(id);
    }
  };

  const handleToggle = (t: Testimonial) => {
    updateTestimonial({
      ...t,
      isVisible: !t.isVisible
    });
  };

  return (
    <div className="space-y-6">
      {/* Header action */}
      <div className="bg-white p-6 rounded-3xl border border-[#E8E5DF] shadow-2xs flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-lg text-[#0B192C]">
            Patient Stories & Reviews ({testimonials.length})
          </h2>
          <p className="text-xs text-slate-500">
            Curate feedback showcased on the website. Toggle "Demo Review" badge when using fictional showcase reviews.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-[#0D5C63] hover:bg-[#0B4A50] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient Story</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`bg-white rounded-3xl p-6 border ${
              t.isVisible ? 'border-[#E8E5DF]' : 'border-dashed border-slate-300 opacity-60'
            } shadow-2xs space-y-4 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  {t.isDemo && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Demo
                    </span>
                  )}
                  <button
                    onClick={() => handleToggle(t)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                    title={t.isVisible ? 'Visible on site' : 'Hidden from site'}
                  >
                    {t.isVisible ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-light italic">
                "{t.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-slate-900">{t.patientName}</p>
                <p className="text-[10px] text-[#0D5C63] font-medium">{t.treatmentName}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(t)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.patientName)}
                  className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(editingItem || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8E5DF] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#0B192C]">
                {isCreating ? 'Add Patient Review' : 'Edit Review'}
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Star Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Treatment Name</label>
                <input
                  type="text"
                  value={formData.treatmentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, treatmentName: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Comment *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
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
                  <span>Mark as Demo Review</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={(e) => setFormData(prev => ({ ...prev, isVerified: e.target.checked }))}
                    className="rounded text-[#0D5C63]"
                  />
                  <span>Verified Patient Badge</span>
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
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
