import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { HomepageContent } from '../../types';
import { FileText, Save, CheckCircle2, Sparkles, Award } from 'lucide-react';

export const AdminHomepageContent: React.FC = () => {
  const { homepageContent, updateHomepageContent } = useClinic();
  const [formData, setFormData] = useState<HomepageContent>(homepageContent);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageContent(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E5DF] shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-[#0B192C]">
              Homepage Copy & Showcase Metrics
            </h2>
            <p className="text-xs text-slate-500">
              Customize hero copy, conversion callouts, and trust badge metrics across the front page.
            </p>
          </div>

          {savedSuccess && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Saved Successfully</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* Hero Section Copy */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0D5C63]" />
              <span>Hero Section</span>
            </h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hero Eyebrow Badge</label>
              <input
                type="text"
                value={formData.heroEyebrow}
                onChange={(e) => setFormData(prev => ({ ...prev, heroEyebrow: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hero Main Headline *</label>
              <input
                type="text"
                required
                value={formData.heroHeadline}
                onChange={(e) => setFormData(prev => ({ ...prev, heroHeadline: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hero Supporting Text *</label>
              <textarea
                rows={3}
                required
                value={formData.heroSupportingText}
                onChange={(e) => setFormData(prev => ({ ...prev, heroSupportingText: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Primary CTA Button Text</label>
                <input
                  type="text"
                  value={formData.heroPrimaryCtaText}
                  onChange={(e) => setFormData(prev => ({ ...prev, heroPrimaryCtaText: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Secondary CTA Button Text</label>
                <input
                  type="text"
                  value={formData.heroSecondaryCtaText}
                  onChange={(e) => setFormData(prev => ({ ...prev, heroSecondaryCtaText: e.target.value }))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
                />
              </div>
            </div>
          </div>

          {/* Trust Strip Metrics */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0D5C63]" />
              <span>Trust Strip Metrics (Customizable Demo Figures)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Years Exp Value</label>
                <input
                  type="text"
                  value={formData.stats.yearsExp}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    stats: { ...prev.stats, yearsExp: e.target.value }
                  }))}
                  className="w-full p-2 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Patients Served Value</label>
                <input
                  type="text"
                  value={formData.stats.patientsServed}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    stats: { ...prev.stats, patientsServed: e.target.value }
                  }))}
                  className="w-full p-2 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Services Count</label>
                <input
                  type="text"
                  value={formData.stats.servicesCount}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    stats: { ...prev.stats, servicesCount: e.target.value }
                  }))}
                  className="w-full p-2 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rating Value</label>
                <input
                  type="text"
                  value={formData.stats.patientRating}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    stats: { ...prev.stats, patientRating: e.target.value }
                  }))}
                  className="w-full p-2 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
              Philosophy Section
            </h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Section Title</label>
              <input
                type="text"
                value={formData.philosophyTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, philosophyTitle: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Section Description</label>
              <textarea
                rows={3}
                value={formData.philosophyDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, philosophyDescription: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl resize-none"
              />
            </div>
          </div>

          {/* CTA Banner */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
              Bottom CTA Banner
            </h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Banner Headline</label>
              <input
                type="text"
                value={formData.ctaBannerHeadline}
                onChange={(e) => setFormData(prev => ({ ...prev, ctaBannerHeadline: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Banner Supporting Text</label>
              <textarea
                rows={2}
                value={formData.ctaBannerSupportingText}
                onChange={(e) => setFormData(prev => ({ ...prev, ctaBannerSupportingText: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#E8E5DF] flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0D5C63] hover:bg-[#0B4A50] text-white font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Homepage Copy</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
