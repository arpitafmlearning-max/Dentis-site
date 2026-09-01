import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Treatment } from '../../types';
import {
  Stethoscope,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  Sparkles,
  Save,
  Image as ImageIcon
} from 'lucide-react';

export const AdminTreatments: React.FC = () => {
  const {
    treatments,
    updateTreatment,
    addTreatment,
    deleteTreatment
  } = useClinic();

  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const [formData, setFormData] = useState<Partial<Treatment>>({
    title: '',
    slug: '',
    category: 'Restorative',
    shortDescription: '',
    fullDescription: '',
    iconName: 'Sparkles',
    imageUrl: '',
    estimatedDuration: '45 - 60 mins',
    whoItHelps: ['Patients seeking gentle dental restoration'],
    keyBenefits: ['Natural appearance', 'Long lasting function'],
    clinicalNotes: '',
    isVisible: true
  });

  const handleEdit = (t: Treatment) => {
    setEditingTreatment(t);
    setFormData(t);
    setIsCreatingNew(false);
  };

  const handleCreateNew = () => {
    setEditingTreatment(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Restorative',
      shortDescription: '',
      fullDescription: '',
      iconName: 'Sparkles',
      imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      estimatedDuration: '45 - 60 mins',
      whoItHelps: ['Patients experiencing discomfort or requiring restorative care'],
      keyBenefits: ['Preserves natural tooth structure', 'Gentle local anesthesia'],
      clinicalNotes: '',
      isVisible: true
    });
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (isCreatingNew) {
      addTreatment({
        title: formData.title || '',
        slug,
        category: formData.category || 'General',
        shortDescription: formData.shortDescription || '',
        fullDescription: formData.fullDescription || '',
        iconName: formData.iconName || 'Sparkles',
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
        estimatedDuration: formData.estimatedDuration || '45 mins',
        whoItHelps: formData.whoItHelps || [],
        keyBenefits: formData.keyBenefits || [],
        clinicalNotes: formData.clinicalNotes || '',
        isVisible: formData.isVisible ?? true
      });
    } else if (editingTreatment) {
      updateTreatment({
        ...editingTreatment,
        ...formData,
        slug
      } as Treatment);
    }

    setEditingTreatment(null);
    setIsCreatingNew(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the treatment "${title}"?`)) {
      deleteTreatment(id);
    }
  };

  const handleToggleVisibility = (t: Treatment) => {
    updateTreatment({
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
            Treatments & Clinical Protocols ({treatments.length})
          </h2>
          <p className="text-xs text-slate-500">
            Control the treatment directory displayed on the public website and booking forms.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-[#0D5C63] hover:bg-[#0B4A50] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Treatment</span>
        </button>
      </div>

      {/* Treatments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((t) => (
          <div
            key={t.id}
            className={`bg-white rounded-3xl border ${
              t.isVisible ? 'border-[#E8E5DF]' : 'border-dashed border-slate-300 opacity-60'
            } p-6 shadow-2xs hover:shadow-sm transition-all space-y-4 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              {/* Image preview & Category */}
              <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={t.imageUrl}
                  alt={t.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800">
                  {t.category}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleVisibility(t)}
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-full text-xs font-semibold shadow-xs ${
                    t.isVisible
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                  title={t.isVisible ? 'Visible on site' : 'Hidden from site'}
                >
                  {t.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div>
                <h3 className="font-serif font-bold text-base text-[#0B192C]">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-light">
                  {t.shortDescription}
                </p>
                <div className="mt-2 text-[11px] text-[#0D5C63] font-medium">
                  Duration: {t.estimatedDuration}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Slug: /{t.slug}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(t.id, t.title)}
                  className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete treatment"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {(editingTreatment || isCreatingNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8E5DF] space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#0B192C]">
                  {isCreatingNew ? 'Add New Clinical Treatment' : `Edit: ${editingTreatment?.title}`}
                </h3>
                <p className="text-xs text-slate-500">
                  Update clinical information and patient guidance
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingTreatment(null);
                  setIsCreatingNew(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Treatment Title *</label>
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
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                  >
                    <option value="Restorative">Restorative</option>
                    <option value="Cosmetic">Cosmetic</option>
                    <option value="Orthodontics">Orthodontics</option>
                    <option value="General">General</option>
                    <option value="Specialized">Specialized</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description (Card summary) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Clinical Description</label>
                <textarea
                  rows={4}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Appointment Duration</label>
                  <input
                    type="text"
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                    placeholder="e.g. 45 - 60 mins"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Icon Identifier</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData(prev => ({ ...prev, iconName: e.target.value }))}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                  >
                    <option value="ShieldCheck">ShieldCheck (Preventive)</option>
                    <option value="Activity">Activity (Endodontics/Care)</option>
                    <option value="Sparkles">Sparkles (Cosmetic/Implants)</option>
                    <option value="Smile">Smile (Aligners)</option>
                    <option value="Crown">Crown (Prosthodontics)</option>
                    <option value="SunMedium">SunMedium (Whitening)</option>
                    <option value="HeartHandshake">HeartHandshake (Consultation)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Who It Helps (Comma-separated)
                </label>
                <input
                  type="text"
                  value={(formData.whoItHelps || []).join(', ')}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    whoItHelps: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Key Patient Benefits (Comma-separated)
                </label>
                <input
                  type="text"
                  value={(formData.keyBenefits || []).join(', ')}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    keyBenefits: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="treatmentVisible"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                  className="rounded text-[#0D5C63] focus:ring-[#0D5C63]"
                />
                <label htmlFor="treatmentVisible" className="font-semibold text-slate-700">
                  Visible on public website and booking forms
                </label>
              </div>

              <div className="pt-4 border-t border-[#E8E5DF] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTreatment(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[#E8E5DF] text-slate-700 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0D5C63] hover:bg-[#0B4A50] text-white font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Treatment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
