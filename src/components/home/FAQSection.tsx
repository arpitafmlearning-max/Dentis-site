import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Sparkles, ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FAQSection: React.FC = () => {
  const { faqs, clinicInfo, setIsBookingModalOpen } = useClinic();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const visibleFaqs = faqs.filter(f => f.isVisible);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hello Dr. Rohan Mehta, I have a question regarding dental treatments at PearlCare.');
    const cleanPhone = clinicInfo.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
            <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Common Patient Questions</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2A44] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            Clear, honest answers to help you feel informed, confident, and prepared for your visit to PearlCare Dental Studio.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {visibleFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0D9488] shrink-0" />
                    <span className="font-serif text-base sm:text-lg font-bold text-[#1A2A44] group-hover:text-[#0D9488] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-full bg-[#F8FAFC] text-slate-500 group-hover:text-[#0D9488] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#E3F2FD] text-[#0D9488]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-slate-600 font-light leading-relaxed border-t border-slate-100">
                        <p>{faq.answer}</p>
                        <div className="mt-3 text-[11px] text-slate-400 italic">
                          Category: {faq.category}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions block */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#0D9488] flex items-center justify-center mx-auto shadow-xs border border-[#E2E8F0]">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-[#1A2A44]">
              Have a question not listed here?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light max-w-md mx-auto">
              Our clinical coordinator and Dr. Rohan Mehta are happy to discuss your specific concerns anytime.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
            >
              Ask During Consultation
            </button>
            <button
              onClick={handleWhatsApp}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
