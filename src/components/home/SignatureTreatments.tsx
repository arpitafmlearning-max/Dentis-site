import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Treatment } from '../../types';
import { TreatmentDetailModal } from '../common/TreatmentDetailModal';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Smile,
  Crown,
  SunMedium,
  HeartHandshake,
  CheckCircle2
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

export const SignatureTreatments: React.FC = () => {
  const {
    treatments,
    setCurrentPage,
    setSelectedTreatmentForModal,
    setIsBookingModalOpen
  } = useClinic();

  const [activeModalTreatment, setActiveModalTreatment] = useState<Treatment | null>(null);

  const visibleTreatments = treatments.filter(t => t.isVisible);

  const handleLearnMore = (treatment: Treatment) => {
    setActiveModalTreatment(treatment);
  };

  const handleBookDirect = (treatment: Treatment) => {
    setSelectedTreatmentForModal(treatment);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-white relative border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
              <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Comprehensive Dental Services</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2A44] tracking-tight">
              Signature Treatments Tailored to Your Smile
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              From routine preventive hygiene to advanced prosthodontics and implantology, every treatment is delivered with delicate touch and clinical excellence.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('treatments');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0D9488] hover:text-[#0F766E] group shrink-0 cursor-pointer"
          >
            <span>View Complete Directory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 8 Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleTreatments.map((treatment) => {
            const IconComponent = ICON_MAP[treatment.iconName] || Sparkles;

            return (
              <div
                key={treatment.id}
                className="group relative bg-[#F8FAFC] rounded-3xl overflow-hidden border border-[#E2E8F0] hover:border-[#0D9488]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Category Pill */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={treatment.imageUrl}
                    alt={treatment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 backdrop-blur-md text-[#1A2A44] shadow-xs">
                    {treatment.category}
                  </span>

                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md text-[#0D9488] flex items-center justify-center shadow-sm">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-[#1A2A44] group-hover:text-[#0D9488] transition-colors">
                      {treatment.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-light">
                      {treatment.shortDescription}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleLearnMore(treatment)}
                      className="text-xs font-bold text-[#0D9488] hover:text-[#0F766E] transition-colors py-1 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBookDirect(treatment)}
                      className="px-3 py-1.5 rounded-full bg-white hover:bg-[#0D9488] text-slate-700 hover:text-white border border-[#E2E8F0] text-[11px] font-semibold transition-all shadow-2xs cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Treatment Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 italic">
            Treatment suitability is determined after a professional dental consultation with Dr. Rohan Mehta.
          </p>
        </div>
      </div>

      {/* Learn More Modal */}
      <TreatmentDetailModal
        treatment={activeModalTreatment}
        onClose={() => setActiveModalTreatment(null)}
      />
    </section>
  );
};
