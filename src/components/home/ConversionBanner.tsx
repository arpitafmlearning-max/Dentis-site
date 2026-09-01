import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Sparkles, Calendar, Phone, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const ConversionBanner: React.FC = () => {
  const { homepageContent, clinicInfo, setIsBookingModalOpen } = useClinic();

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hello Dr. Rohan Mehta, I would like to schedule an appointment at PearlCare Dental Studio.');
    const cleanPhone = clinicInfo.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 bg-[#1A2A44] text-white relative overflow-hidden border-t border-[#1A2A44]">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0D9488]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Your Smile Journey Starts Today</span>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {homepageContent.ctaBannerHeadline || 'Ready for a Healthier, More Confident Smile?'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {homepageContent.ctaBannerSupportingText || 'Whether you need a routine checkup, relief from discomfort, or a full restorative consultation, our gentle team is here for you.'}
          </p>
        </div>

        {/* Triple Action Conversion Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-xl mx-auto">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-teal-200" />
            <span>Book an Appointment</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>Call Now</span>
          </a>

          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </button>
        </div>

        {/* Assurance footnote */}
        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-light">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Personalized consultations • Transparent treatment plans • No hidden charges</span>
        </div>
      </div>
    </section>
  );
};
