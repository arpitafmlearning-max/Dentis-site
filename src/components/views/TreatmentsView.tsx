import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Treatment } from '../../types';
import { TreatmentDetailModal } from '../common/TreatmentDetailModal';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Activity,
  Smile,
  Crown,
  SunMedium
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  Activity,
  Sparkles,
  CheckCircle2,
  Smile,
  Crown,
  SunMedium,
  HeartHandshake
};

export const TreatmentsView: React.FC = () => {
  const { treatments, setSelectedTreatmentForModal, setIsBookingModalOpen } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalTreatment, setActiveModalTreatment] = useState<Treatment | null>(null);

  const categories = ['All', 'Restorative', 'Cosmetic', 'Orthodontics', 'General'];

  const filteredTreatments = treatments
    .filter(t => t.isVisible)
    .filter(t => selectedCategory === 'All' || t.category === selectedCategory);

  const handleBook = (treatment: Treatment) => {
    setSelectedTreatmentForModal(treatment);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-[#FDFCFB]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
          <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>Clinical Excellence & Gentle Protocols</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A2A44] tracking-tight">
          Comprehensive Dental Care Directory
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          Clear, honest, and patient-centered treatment explanations. Explore our range of preventive, cosmetic, and advanced prosthodontic services.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1A2A44] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
              }`}
            >
              {cat} Services
            </button>
          ))}
        </div>
      </div>

      {/* Treatments List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTreatments.map((treatment) => {
            const IconComponent = ICON_MAP[treatment.iconName] || Sparkles;

            return (
              <div
                key={treatment.id}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md border border-[#E2E8F0] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Image + Category Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0F766E] flex items-center justify-center shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] bg-[#E3F2FD] px-2.5 py-0.5 rounded-full border border-[#E3F2FD]">
                          {treatment.category} Dentistry
                        </span>
                        <h2 className="font-serif text-2xl font-bold text-[#1A2A44] mt-1">
                          {treatment.title}
                        </h2>
                      </div>
                    </div>

                    <div className="hidden sm:block text-right shrink-0">
                      <span className="text-[11px] font-semibold text-slate-500 block">Est. Duration</span>
                      <span className="text-xs text-slate-800 font-medium">{treatment.estimatedDuration}</span>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {treatment.fullDescription || treatment.shortDescription}
                  </p>

                  {/* Who it helps snippet */}
                  {treatment.whoItHelps && treatment.whoItHelps.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Recommended For:
                      </h4>
                      <ul className="space-y-1.5">
                        {treatment.whoItHelps.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key benefits badges */}
                  {treatment.keyBenefits && treatment.keyBenefits.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Key Benefits:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {treatment.keyBenefits.slice(0, 2).map((benefit, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 text-[11px] bg-[#F8FAFC] border border-[#E2E8F0] text-slate-700 px-2.5 py-1 rounded-lg"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{benefit}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalTreatment(treatment)}
                    className="text-xs font-bold text-[#0D9488] hover:text-[#0F766E] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Details & Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBook(treatment)}
                    className="px-5 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Medical Disclaimer */}
        <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-2 max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold text-[#1A2A44]">
            Important Patient Notice
          </p>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Treatment suitability, timeline, and exact restorative plan are determined after a clinical examination and diagnostic review by Dr. Rohan Mehta. We never perform procedures without your full informed consent.
          </p>
        </div>
      </div>

      {/* Learn More Modal */}
      <TreatmentDetailModal
        treatment={activeModalTreatment}
        onClose={() => setActiveModalTreatment(null)}
      />
    </div>
  );
};
