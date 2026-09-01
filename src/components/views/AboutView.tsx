import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Sparkles,
  Award,
  GraduationCap,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Clock,
  MapPin,
  ArrowRight
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { doctorProfile, clinicInfo, setIsBookingModalOpen } = useClinic();

  const technologies = [
    {
      title: 'Digital Intraoral Imaging',
      description: 'High-definition cameras allowing you to clearly see your teeth and understand every treatment recommendation on screen.',
      icon: Cpu
    },
    {
      title: 'Rotary Endodontics',
      description: 'Precision motorized instruments for faster, more comfortable, and highly predictable root canal treatments.',
      icon: Sparkles
    },
    {
      title: 'Class-B Autoclave Sterilization',
      description: 'Strict European-standard multi-stage vacuum sterilization guaranteeing 100% patient safety and hygienic peace of mind.',
      icon: ShieldCheck
    },
    {
      title: 'Ultrasonic Piezo Prophylaxis',
      description: 'Gentle water-cooled scaling technology removing plaque and stain deposits without harming natural tooth enamel.',
      icon: Award
    }
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-[#FDFCFB]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
          <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>About PearlCare & Dr. Mehta</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A2A44] tracking-tight">
          Modern Dentistry Rooted in Empathy
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
          Discover how Dr. Rohan Mehta combines advanced prosthodontic mastery with a gentle, patient-first philosophy in Kalyan West.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Main Doctor Bio Block */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xs border border-[#E2E8F0]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] bg-slate-900 border-4 border-slate-50">
                <img
                  src={doctorProfile.imageUrl}
                  alt={doctorProfile.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A44]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {doctorProfile.name}
                  </h3>
                  <p className="text-xs text-teal-300 font-medium">
                    {doctorProfile.qualifications}
                  </p>
                </div>
              </div>

              {/* Floating Exp Pill */}
              <div className="absolute -bottom-4 -right-4 p-3.5 bg-[#1A2A44] text-white rounded-2xl shadow-lg border border-white/10 flex items-center gap-2.5 text-xs">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <p className="font-bold">12+ Years Clinical Practice</p>
                  <p className="text-[10px] text-slate-300">Kalyan West, Maharashtra</p>
                </div>
              </div>
            </div>

            {/* Biography & Philosophy Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                  Founder & Principal Specialist
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2A44]">
                  A Commitment to Thoughtful, Conservative Dentistry
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
                {doctorProfile.bio}
              </p>

              {/* Prosthodontics explanation */}
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A2A44]">
                  <GraduationCap className="w-4 h-4 text-[#0D9488]" />
                  <span>What Is a Prosthodontist?</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                  Prosthodontics is the specialized branch of dentistry focused on the restoration and replacement of teeth, including dental crowns, bridges, porcelain veneers, dental implants, and full-mouth bite rehabilitation. An MDS in Prosthodontics represents 3 years of rigorous post-graduate surgical and restorative residency.
                </p>
              </div>

              {/* Clinical Focus Areas */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Specialized Areas of Focus:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {doctorProfile.specializations.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                      <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-2">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-full text-xs font-semibold shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Consultation with Dr. Mehta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Environment & Comfort Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Studio Atmosphere</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2A44]">
              A Calming Space Built to Eliminate Dental Phobia
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              From the moment you step into Shop 4 at Silver Heights, we want you to feel the difference. We replaced stark clinical lighting with warm ambient tones, comfortable seating, and an unhurried reception flow where your time is respected.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Private operatory rooms ensuring complete patient privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Gentle pacing with pauses whenever you need one</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Comprehensive sterilization transparency on every instrument</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E2E8F0] aspect-[4/3] bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
              alt="PearlCare Dental Studio operatory"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Technology & Modern Care */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2A44]">
              Modern Technology in Service of Patient Comfort
            </h2>
            <p className="text-sm text-slate-600 font-light">
              We leverage contemporary diagnostic and clinical tools not for show, but to make your procedures faster, gentler, and more accurate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#E3F2FD] text-[#0F766E] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1A2A44]">
                      {tech.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {tech.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
