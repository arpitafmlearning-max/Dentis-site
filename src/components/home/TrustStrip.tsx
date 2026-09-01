import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Award, Users, Stethoscope, Star, Info } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const { homepageContent } = useClinic();
  const stats = homepageContent.stats;

  const statItems = [
    {
      value: stats.yearsExp || '12+',
      label: stats.yearsLabel || 'Years Clinical Experience',
      subtext: 'Postgraduate Prosthodontic Focus',
      icon: Award
    },
    {
      value: stats.patientsServed || '5,000+',
      label: stats.patientsLabel || 'Smiles Cared For',
      subtext: 'In Kalyan West & Beyond',
      icon: Users
    },
    {
      value: stats.servicesCount || '8+',
      label: stats.servicesLabel || 'Specialized Treatments',
      subtext: 'From Preventive to Implants',
      icon: Stethoscope
    },
    {
      value: stats.patientRating || '4.9 / 5',
      label: stats.ratingLabel || 'Patient Satisfaction',
      subtext: 'Based on Verified Patient Reviews',
      icon: Star
    }
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E2E8F0]">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-2 ${
                  idx > 0 ? 'pt-4 sm:pt-2' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#E3F2FD] text-[#0F766E] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A2A44] tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-500 font-light mt-0.5">
                  {item.subtext}
                </span>
              </div>
            );
          })}
        </div>

        {/* Demo / Showcase Label as requested */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Showcase metrics • Fully customizable via the Admin Control Center</span>
        </div>
      </div>
    </section>
  );
};
