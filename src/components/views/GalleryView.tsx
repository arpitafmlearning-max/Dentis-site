import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { GalleryItem, GalleryCategory } from '../../types';
import { Lightbox } from '../common/Lightbox';
import { Sparkles, Eye, AlertCircle } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const { gallery } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories: GalleryCategory[] = ['All', 'Clinic', 'Dentistry', 'Smile Inspiration'];

  const filteredItems = gallery
    .filter(item => item.isVisible)
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory);

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-[#FDFCFB]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
          <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>Visual Showcase</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A2A44] tracking-tight">
          Smile & Studio Gallery
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          Take a photographic tour of our modern studio in Kalyan West, sterilization protocols, and restorative smile transformations.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1A2A44] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-[#E2E8F0] cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 aspect-[4/3]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A44]/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category pill */}
              <span className="absolute top-3.5 left-3.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-[#1A2A44] shadow-xs">
                {item.category}
              </span>

              {/* Demo Badge */}
              {item.isDemo && (
                <span className="absolute top-3.5 right-3.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/90 text-slate-950 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Illustrative Case
                </span>
              )}

              {/* Caption & Title */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="font-serif text-lg font-bold group-hover:text-teal-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 font-light">
                  {item.caption}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to view in high resolution</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="mt-12 text-center text-xs text-slate-400">
          Any before/after restorative imagery is for illustrative purpose only. All clinic images reflect the sterilization standards and operatory environment of PearlCare Dental Studio.
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
};
