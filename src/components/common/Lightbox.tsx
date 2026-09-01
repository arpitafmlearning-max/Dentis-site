import React, { useEffect } from 'react';
import { GalleryItem } from '../../types';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1A2A44] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0D9488]/40 border border-[#0D9488] text-teal-200">
                  {item.category}
                </span>
                <h3 className="text-base sm:text-lg font-medium text-white/90 truncate">
                  {item.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close image viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image display */}
            <div className="relative bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto max-h-[70vh] object-contain"
                referrerPolicy="no-referrer"
              />

              {item.isDemo && (
                <div className="absolute top-4 left-4 bg-amber-500/90 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-sm">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Illustrative / Demo Case
                </div>
              )}
            </div>

            {/* Caption & Disclaimer */}
            <div className="p-6 bg-[#1A2A44] space-y-2">
              <p className="text-sm text-slate-300 leading-relaxed font-light">{item.caption}</p>
              {item.isDemo && (
                <p className="text-xs text-amber-300/80 italic font-light">
                  Note: This is a demonstration case. Individual dental outcomes vary and require customized prosthodontic evaluation.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
