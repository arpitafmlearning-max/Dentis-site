import React, { useEffect } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { BookingForm } from './BookingForm';
import { X, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AppointmentModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    selectedTreatmentForModal,
    setSelectedTreatmentForModal,
    clinicInfo
  } = useClinic();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isBookingModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBookingModalOpen]);

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setSelectedTreatmentForModal(null);
  };

  const handleWhatsAppQuick = () => {
    const text = encodeURIComponent(
      `Hello Dr. Rohan Mehta, I would like to schedule an appointment at PearlCare Dental Studio.`
    );
    const cleanPhone = clinicInfo.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isBookingModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative max-w-xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#E8E5DF] text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#1A2A44] text-white p-6 sm:p-7 relative rounded-t-3xl">
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>PearlCare Dental Studio • Kalyan West</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white">
                Book Your Consultation
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-light">
                Take the first step toward a healthier, more confident smile with Dr. Rohan Mehta.
              </p>

              {/* Quick Contact buttons in header */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs">
                <a
                  href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-300" />
                  <span>Call {clinicInfo.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={handleWhatsAppQuick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Booking</span>
                </button>
              </div>
            </div>

            {/* Modal Form Body */}
            <div className="p-6 sm:p-7">
              <BookingForm
                onSuccess={() => {
                  setTimeout(() => {
                    handleClose();
                  }, 4000);
                }}
                defaultTreatment={selectedTreatmentForModal?.title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
