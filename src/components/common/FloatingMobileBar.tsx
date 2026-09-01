import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export const FloatingMobileBar: React.FC = () => {
  const { clinicInfo, setIsBookingModalOpen } = useClinic();

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hello Dr. Rohan Mehta, I would like to book an appointment at PearlCare Dental Studio.');
    const cleanPhone = clinicInfo.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E8E5DF] px-4 py-2.5 shadow-2xl flex items-center justify-between gap-2.5">
      {/* Call Button */}
      <a
        href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-[#0D5C63]" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
      >
        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span>WhatsApp</span>
      </button>

      {/* Book Appointment CTA */}
      <button
        onClick={() => setIsBookingModalOpen(true)}
        className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0D5C63] text-white text-xs font-semibold shadow-sm hover:bg-[#0B4A50] transition-colors"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Slot</span>
      </button>
    </div>
  );
};
