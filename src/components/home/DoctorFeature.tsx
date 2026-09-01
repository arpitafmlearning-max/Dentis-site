import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Sparkles, Award, GraduationCap, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const DoctorFeature: React.FC = () => {
  const { doctorProfile, homepageContent, setCurrentPage, setIsBookingModalOpen } = useClinic();

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Doctor Portrait Composition (5 cols) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-slate-900">
                <img
                  src={doctorProfile.imageUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80'}
                  alt={doctorProfile.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A44]/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
                    Prosthodontist & Implantologist
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {doctorProfile.name}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {doctorProfile.qualifications}
                  </p>
                </div>
              </div>

              {/* Float Experience Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 p-4 rounded-2xl bg-white shadow-xl border border-[#E2E8F0] text-slate-800 space-y-1">
                <div className="flex items-center gap-1 text-[#0D9488]">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Clinical Focus</span>
                </div>
                <p className="text-sm font-bold text-[#1A2A44]">Postgraduate MDS</p>
                <p className="text-[11px] text-slate-500">Crowns, Bridges & Implants</p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Areas of Interest (7 cols) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
              <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Meet Your Doctor</span>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2A44] tracking-tight leading-tight">
                {homepageContent.doctorIntroHeadline || 'Expertise You Can Feel Confident In.'}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
                {doctorProfile.bio}
              </p>
            </div>

            {/* Approach quote */}
            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "{doctorProfile.approach}"
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488]">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Dr. Rohan Mehta • Personalized Treatment Commitment</span>
              </div>
            </div>

            {/* Areas of Interest Pills */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Specialized Areas of Interest:
              </h4>
              <div className="flex flex-wrap gap-2">
                {doctorProfile.areasOfInterest.map((area, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-slate-800 border border-[#E2E8F0] shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span>{area}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#1A2A44] hover:bg-[#243B5A] text-white rounded-full text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Read Full Doctor Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0D9488] border border-[#0D9488]/30 rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
