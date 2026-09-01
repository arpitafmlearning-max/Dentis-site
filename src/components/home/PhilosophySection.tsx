import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Sparkles, Shield, Heart, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const { homepageContent, setIsBookingModalOpen, setCurrentPage } = useClinic();

  const pillars = [
    {
      title: 'Comfort First, Always',
      description: 'We believe dental anxiety is real and valid. Our quiet studio environment, gentle local anesthesia protocols, and unhurried pacing ensure you remain relaxed at every stage.',
      icon: Heart,
      highlight: 'Zero-pressure environment'
    },
    {
      title: 'Total Transparency & Clarity',
      description: 'No unexpected surprises. We use digital intraoral cameras to show you exactly what we see, explaining every option with estimated timelines before beginning any treatment.',
      icon: Eye,
      highlight: 'Visual digital explanations'
    },
    {
      title: 'Preserving Natural Health',
      description: 'Our clinical philosophy is conservative. As a Prosthodontist, Dr. Rohan Mehta focuses on safeguarding your natural tooth enamel and creating restorations that last for decades.',
      icon: Shield,
      highlight: 'Lifelong structural preservation'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
            <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>{homepageContent.philosophyEyebrow || 'Our Care Philosophy'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2A44] tracking-tight">
            {homepageContent.philosophyTitle}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            {homepageContent.philosophyDescription}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-xs hover:shadow-md transition-shadow border border-[#E2E8F0] flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0F766E] flex items-center justify-center group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0F766E] bg-[#E3F2FD] px-2.5 py-1 rounded-full border border-[#E3F2FD]">
                    {pillar.highlight}
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A2A44]">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#0D9488]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>PearlCare Standard Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassuring Callout Banner */}
        <div className="mt-12 bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1A2A44]">
              Have concerns or feeling nervous about a dental visit?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              You are welcome to schedule a relaxed, no-pressure consultation just to talk through your options.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-6 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-full text-xs font-semibold shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Gentle Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
