import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { DoctorProfile } from '../../types';
import { UserCheck, Save, Image as ImageIcon, CheckCircle2, Award, Heart } from 'lucide-react';

export const AdminDoctorProfile: React.FC = () => {
  const { doctorProfile, updateDoctorProfile } = useClinic();
  const [formData, setFormData] = useState<DoctorProfile>(doctorProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctorProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E5DF] shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-[#0B192C]">
              Doctor Profile & Credentials
            </h2>
            <p className="text-xs text-slate-500">
              Update Dr. Rohan Mehta’s credentials, clinical bio, philosophy, and photos across the site.
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
          {/* Top Row: Name & Designation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Doctor Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Designation & Role</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
              />
            </div>
          </div>

          {/* Qualifications & Years */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Degrees & Qualifications</label>
              <input
                type="text"
                value={formData.qualifications}
                onChange={(e) => setFormData(prev => ({ ...prev, qualifications: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Years of Clinical Experience</label>
              <input
                type="text"
                value={formData.experienceYears}
                onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
              />
            </div>
          </div>

          {/* Photo URL & Live Preview */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-700">Doctor Portrait Image URL</label>
            <div className="flex gap-4 items-center">
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="flex-1 p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
              />
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-[#E8E5DF] shrink-0">
                <img
                  src={formData.imageUrl}
                  alt="Doctor Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Doctor Biography</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20 resize-none leading-relaxed"
            />
          </div>

          {/* Clinical Approach / Philosophy quote */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Doctor Approach / Philosophy Statement</label>
            <textarea
              rows={2}
              value={formData.approach}
              onChange={(e) => setFormData(prev => ({ ...prev, approach: e.target.value }))}
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20 resize-none leading-relaxed"
            />
          </div>

          {/* Specializations & Areas of Interest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Specializations (Comma-separated)
              </label>
              <textarea
                rows={3}
                value={formData.specializations.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  specializations: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20 resize-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Areas of Interest (Pills on Homepage, comma-separated)
              </label>
              <textarea
                rows={3}
                value={formData.areasOfInterest.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  areasOfInterest: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                }))}
                className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20 resize-none"
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
              <span>Save Doctor Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
