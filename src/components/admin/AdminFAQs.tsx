import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { FAQItem } from '../../types';
import { HelpCircle, Plus, Edit2, Trash2, Eye, EyeOff, X, Save } from 'lucide-react';

export const AdminFAQs: React.FC = () => {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useClinic();
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<FAQItem>>({
    question: '',
    answer: '',
    category: 'General',
    isVisible: true
  });

  const handleEdit = (faq: FAQItem) => {
    setEditingItem(faq);
    setFormData(faq);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      isVisible: true
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;

    if (isCreating) {
      addFAQ({
        question: formData.question || '',
        answer: formData.answer || '',
        category: formData.category || 'General',
        isVisible: formData.isVisible ?? true
      });
    } else if (editingItem) {
      updateFAQ({
        ...editingItem,
        ...formData
      } as FAQItem);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string, question: string) => {
    if (window.confirm(`Delete FAQ: "${question}"?`)) {
      deleteFAQ(id);
    }
  };

  const handleToggle = (faq: FAQItem) => {
    updateFAQ({
      ...faq,
      isVisible: !faq.isVisible
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E8E5DF] shadow-2xs flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-lg text-[#0B192C]">
            Frequently Asked Questions ({faqs.length})
          </h2>
          <p className="text-xs text-slate-500">
            Address patient concerns regarding treatments, pain relief, cleaning frequency, and costs.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-[#0D5C63] hover:bg-[#0B4A50] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`bg-white rounded-3xl p-6 border ${
              faq.isVisible ? 'border-[#E8E5DF]' : 'border-dashed border-slate-300 opacity-60'
            } shadow-2xs space-y-3`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D5C63] bg-[#0D5C63]/10 px-2 py-0.5 rounded-full">
                  {faq.category}
                </span>
                <h3 className="font-serif font-bold text-base text-[#0B192C] mt-1.5">
                  {faq.question}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggle(faq)}
                  className="p-1.5 text-slate-400 hover:text-slate-700"
                  title={faq.isVisible ? 'Visible' : 'Hidden'}
                >
                  {faq.isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleEdit(faq)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id, faq.question)}
                  className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(editingItem || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8E5DF] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#0B192C]">
                {isCreating ? 'Add New FAQ' : 'Edit FAQ'}
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
                <label className="block font-bold text-slate-700 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                  placeholder="e.g. Endodontics, Preventive, Aligners"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20 resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="faqVisible"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                  className="rounded text-[#0D5C63]"
                />
                <label htmlFor="faqVisible" className="font-semibold text-slate-700">
                  Visible on website
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
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
