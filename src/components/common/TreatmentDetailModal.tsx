import React, { useEffect } from 'react';
import { Treatment } from '../../types';
import { useClinic } from '../../context/ClinicContext';
import { X, CheckCircle2, Clock, Sparkles, Shield, ArrowRight, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TreatmentDetailModalProps {
  treatment: Treatment | null;
  onClose: () => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({ treatment, onClose }) => {
  const { setSelectedTreatmentForModal, setIsBookingModalOpen } = useClinic();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (treatment) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [treatment, onClose]);

  if (!treatment) return null;

  const handleBookThis = () => {
    setSelectedTreatmentForModal(treatment);
    onClose();
    setIsBookingModalOpen(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#E8E5DF] text-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image Cover */}
          <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-slate-900">
            <img
              src={treatment.imageUrl}
              alt={treatment.title}
              className="w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
              aria-label="Close treatment details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#0D9488]/90 text-teal-100 mb-2">
                {treatment.category} Care
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white">
                {treatment.title}
              </h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Overview */}
            <div>
              <p className="text-base text-slate-700 leading-relaxed font-light">
                {treatment.fullDescription || treatment.shortDescription}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Visits</h4>
                  <p className="text-sm font-medium text-slate-800">{treatment.estimatedDuration}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Comfort Protocol</h4>
                  <p className="text-sm font-medium text-slate-800">Gentle, pain-managed care</p>
                </div>
              </div>
            </div>

            {/* Who It Helps */}
            {treatment.whoItHelps && treatment.whoItHelps.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#0D9488]" />
                  Who This Treatment Is Recommended For
                </h3>
                <ul className="space-y-2">
                  {treatment.whoItHelps.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Benefits */}
            {treatment.keyBenefits && treatment.keyBenefits.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0D9488]" />
                  Key Clinical & Aesthetic Benefits
                </h3>
                <div className="space-y-2">
                  {treatment.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comfort Note */}
            {treatment.careComfortNote && (
              <div className="p-4 rounded-2xl bg-[#E3F2FD]/50 border border-[#E3F2FD] text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-[#1A2A44] block mb-1">Our Comfort Promise:</span>
                {treatment.careComfortNote}
              </div>
            )}

            {/* Disclaimer */}
            <div className="pt-2 border-t border-[#E2E8F0] text-center">
              <p className="text-xs text-slate-400 italic">
                * Treatment suitability and individual duration are determined after a personalized oral consultation by Dr. Rohan Mehta.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleBookThis}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Book Consultation for {treatment.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
