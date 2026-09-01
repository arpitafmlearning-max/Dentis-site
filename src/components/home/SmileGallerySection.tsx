import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { GalleryItem, GalleryCategory } from '../../types';
import { Lightbox } from '../common/Lightbox';
import { Sparkles, Eye, AlertCircle, ArrowRight } from 'lucide-react';

export const SmileGallerySection: React.FC = () => {
  const { gallery, setCurrentPage } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories: GalleryCategory[] = ['All', 'Clinic', 'Dentistry', 'Smile Inspiration'];

  const filteredItems = gallery
    .filter(item => item.isVisible)
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory);

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
              <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Studio & Smile Visuals</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2A44] tracking-tight">
              A Glimpse Inside PearlCare Dental Studio
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Explore our serene treatment operatory, high-precision prosthodontic workflows, and smile restoration inspirations.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0D9488] hover:text-[#0F766E] group shrink-0 cursor-pointer"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1A2A44] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-slate-600 hover:bg-slate-100 border border-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-[#E2E8F0] cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 aspect-[4/3] sm:aspect-[1/1]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A44]/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category tag */}
              <span className="absolute top-3.5 left-3.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-[#1A2A44] shadow-xs">
                {item.category}
              </span>

              {/* Demo Badge if applicable */}
              {item.isDemo && (
                <span className="absolute top-3.5 right-3.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/90 text-slate-950 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Illustrative Case
                </span>
              )}

              {/* Bottom Caption & View Trigger */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="font-serif text-lg font-bold group-hover:text-teal-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 font-light">
                  {item.caption}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to expand image</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </section>
  );
};
