import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { PageView } from '../../types';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ShieldCheck,
  Lock,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    clinicInfo,
    treatments,
    setCurrentPage,
    setIsBookingModalOpen,
    setSelectedTreatmentForModal
  } = useClinic();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTreatmentClick = (treatmentSlug: string) => {
    const found = treatments.find(t => t.slug === treatmentSlug);
    if (found) {
      setSelectedTreatmentForModal(found);
    }
    setCurrentPage('treatments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A2A44] text-slate-300 pt-16 pb-24 sm:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold tracking-tight text-white">
                  {clinicInfo.name}
                </span>
                <span className="block text-[11px] font-semibold tracking-wider text-teal-300 uppercase">
                  {clinicInfo.doctorName} • MDS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed font-light">
              Modern, gentle dentistry designed around your comfort, confidence and long-term oral health. Specialist care in Prosthodontics, Dental Implants and Smile Restorations.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  setIsBookingModalOpen(true);
                }}
                className="px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold rounded-full shadow-sm transition-colors cursor-pointer"
              >
                Book Appointment
              </button>
              <a
                href={`https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Dr. Mehta, I would like to schedule an appointment.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-700/40 hover:bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Signature Treatments */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Specialized Treatments
            </h4>
            <ul className="space-y-2 text-xs text-slate-300/80">
              {treatments.slice(0, 6).map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => handleTreatmentClick(t.slug)}
                    className="hover:text-teal-200 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <span>{t.title}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('treatments')}
                  className="text-teal-300 font-semibold hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                >
                  <span>View All 8 Treatments &rarr;</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Clinic Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300/80">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home Studio
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Dr. Rohan Mehta
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('treatments')} className="hover:text-white transition-colors cursor-pointer">
                  Treatments & Care Protocols
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Smile & Studio Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Location Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="text-teal-300 hover:text-teal-200 transition-colors flex items-center gap-1 pt-1 cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Clinic Control Center (Admin)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Visit & Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Location & Hours
            </h4>

            <div className="space-y-3 text-xs text-slate-300/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{clinicInfo.addressLine1}, {clinicInfo.addressLine2}, {clinicInfo.city}, {clinicInfo.state} – {clinicInfo.pincode}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {clinicInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${clinicInfo.email}`} className="hover:text-white transition-colors">
                  {clinicInfo.email}
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <Clock className="w-3.5 h-3.5 text-teal-300" />
                  <span>Studio Timings:</span>
                </div>
                <p className="text-[11px] text-slate-400">{clinicInfo.weekdayHours}</p>
                <p className="text-[11px] text-slate-400">{clinicInfo.weekendHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <p>
              &copy; {new Date().getFullYear()} {clinicInfo.name}. Dr. Rohan Mehta (BDS, MDS). All rights reserved.
            </p>
          </div>

          <p className="text-[11px] text-slate-400 max-w-lg text-center md:text-right font-light">
            Medical Disclaimer: All clinical information and images are for patient education. Treatment suitability is finalized only during in-person consultation with Dr. Rohan Mehta.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
