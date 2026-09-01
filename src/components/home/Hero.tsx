import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Heart,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const {
    homepageContent,
    clinicInfo,
    doctorProfile,
    setIsBookingModalOpen,
    setCurrentPage
  } = useClinic();

  const handleBook = () => {
    setIsBookingModalOpen(true);
  };

  const handleExplore = () => {
    setCurrentPage('treatments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-44 pb-16 lg:pb-24 bg-gradient-to-b from-[#FDFCFB] via-[#F0F7FF]/50 to-[#FDFCFB] overflow-hidden">
      {/* Subtle architectural background curves */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-[#0D9488]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-[#E3F2FD] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] border border-[#E3F2FD] shadow-2xs text-xs font-semibold text-[#1A2A44]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{homepageContent.heroEyebrow || `${doctorProfile.name} • Kalyan West`}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A2A44] leading-[1.12]">
                {homepageContent.heroHeadline}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {homepageContent.heroSupportingText}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4"
            >
              <button
                onClick={handleBook}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{homepageContent.heroPrimaryCtaText || 'Book an Appointment'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleExplore}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-[#E2E8F0] rounded-full text-sm font-semibold transition-all hover:border-slate-300 shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{homepageContent.heroSecondaryCtaText || 'Explore Treatments'}</span>
              </button>
            </motion.div>

            {/* Restrained Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-600 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#0D9488]" />
                <span>12+ Years Experience</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#0D9488]" />
                <span>Patient-Centred Care</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                <span>Modern Dentistry</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Visual Composition (5 cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Main Image Frame with rounded luxury corners */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src={doctorProfile.imageUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80'}
                  alt={`${doctorProfile.name}, Prosthodontist at PearlCare Dental Studio`}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A44]/80 via-transparent to-black/10" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40 text-slate-900 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-base text-[#1A2A44]">
                      {doctorProfile.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E3F2FD] text-[#0F766E]">
                      MDS Specialist
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 truncate">
                    {doctorProfile.qualifications}
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] text-[#0D9488] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Specializing in Implants & Prosthodontics</span>
                  </div>
                </div>
              </div>

              {/* Floating Mini Experience Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 p-3.5 rounded-2xl bg-white shadow-xl border border-[#E2E8F0] flex items-center gap-3 animate-fade-in">
                <div className="w-10 h-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-sm">
                  12+
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">Years Clinical</p>
                  <p className="text-[10px] text-slate-500">Excellence & Care</p>
                </div>
              </div>

              {/* Floating Location Badge */}
              <div className="hidden sm:flex absolute -bottom-3 -right-4 p-3 rounded-2xl bg-[#1A2A44] text-white shadow-xl border border-white/10 items-center gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <p className="font-semibold text-white">Kalyan West</p>
                  <p className="text-[10px] text-slate-300">Maharashtra, India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
