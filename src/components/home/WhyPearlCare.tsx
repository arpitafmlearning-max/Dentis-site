import React from 'react';
import { Sparkles, Heart, Eye, Cpu, UserCheck, Coffee, ShieldCheck } from 'lucide-react';

export const WhyPearlCare: React.FC = () => {
  const reasons = [
    {
      title: 'Patient-First Approach',
      description: 'Your comfort and peace of mind guide every appointment. We schedule dedicated, unhurried time for questions and never push unnecessary procedures.',
      icon: Heart
    },
    {
      title: 'Clear Treatment Explanations',
      description: 'We demystify dentistry. Using high-resolution intraoral imaging, you see what we see with step-by-step clarity and transparent guidance.',
      icon: Eye
    },
    {
      title: 'Modern Dental Care',
      description: 'Equipped with digital radiography, rotary endodontics, and ultrasonic scaling technologies to ensure swift, precise, and gentle visits.',
      icon: Cpu
    },
    {
      title: 'Personalized Treatment Planning',
      description: 'No one-size-fits-all treatments. Every restorative plan is custom designed by a Prosthodontist to harmonize with your unique facial anatomy.',
      icon: UserCheck
    },
    {
      title: 'Calming Studio Environment',
      description: 'Designed like a warm wellness lounge rather than a cold hospital. Soothing lighting, gentle music, and spotless sterilization standards.',
      icon: Coffee
    },
    {
      title: 'Focus on Lasting Oral Health',
      description: 'We believe conservative dentistry is the best dentistry. Our priority is always to preserve your natural tooth structure and ensure lasting function.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
            <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>The PearlCare Difference</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2A44] tracking-tight">
            Why Patients Choose PearlCare Dental Studio
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            We are dedicated to redefining how people experience dentistry in Kalyan West through clinical excellence, transparency, and genuine empathy.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0D9488]/30 hover:shadow-md transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0F766E] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1A2A44] pt-1">
                  {reason.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
