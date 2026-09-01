import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Sparkles, Star, Quote, CheckCircle, Info } from 'lucide-react';

export const PatientStories: React.FC = () => {
  const { testimonials } = useClinic();

  const visibleTestimonials = testimonials.filter(t => t.isVisible);

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
            <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Patient Experiences</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2A44] tracking-tight">
            Stories of Restored Smiles & Confidence
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Real feedback from patients who entrusted their smiles and comfort to Dr. Rohan Mehta.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow border border-[#E2E8F0] flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-3">
                {/* Rating & Demo Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {t.isDemo && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E3F2FD] text-[#1A2A44]">
                      Demo Review
                    </span>
                  )}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Patient Info */}
              <div className="pt-4 border-t border-slate-100">
                <p className="font-serif text-sm font-bold text-[#1A2A44]">
                  {t.patientName}
                </p>
                <p className="text-[11px] text-[#0D9488] font-medium truncate mt-0.5">
                  {t.treatmentName}
                </p>
                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                  <span>{t.date}</span>
                  {t.isVerified && (
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      Verified Visit
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Note */}
        <div className="mt-8 text-center flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5" />
          <span>Fictional showcase testimonials for demo presentation. Replace with genuine patient reviews in Admin Panel.</span>
        </div>
      </div>
    </section>
  );
};
