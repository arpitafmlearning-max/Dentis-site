import React, { useState, useEffect } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { PageView } from '../../types';
import {
  Phone,
  Clock,
  MapPin,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Lock,
  MessageCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setIsBookingModalOpen,
    clinicInfo,
    isAdminAuthenticated
  } = useClinic();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Treatments', page: 'treatments' },
    { label: 'Smile Gallery', page: 'gallery' },
    { label: 'Contact & Location', page: 'contact' }
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookClick = () => {
    setIsBookingModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement & Quick Contact Bar (hidden on scroll for maximum reading space) */}
      <div className={`bg-[#1A2A44] text-slate-300 text-xs transition-all duration-300 border-b border-white/10 ${
        isScrolled ? 'hidden' : 'block'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-light">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="truncate max-w-[200px] sm:max-w-none">Shop 4, Silver Heights, Kalyan West</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Mon–Sat: 10 AM–8:30 PM | Sun: 10 AM–2 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
              className="hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{clinicInfo.phone}</span>
            </a>

            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-teal-200 transition-colors text-[11px] font-medium"
              title="Open Admin Control Center"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminAuthenticated ? 'Admin Panel (Active)' : 'Clinic Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0] py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-[#E2E8F0]/60 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1A2A44] flex items-center justify-center text-[#D4AF37] shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1A2A44] leading-none">
                PearlCare
              </span>
              <span className="block text-[10px] sm:text-xs font-semibold tracking-widest text-[#0D9488] uppercase mt-0.5">
                Dental Studio • Dr. Rohan Mehta
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-[#0F766E] bg-[#E3F2FD] font-bold border border-[#E3F2FD]'
                      : 'text-slate-600 hover:text-[#1A2A44] hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action: Book Appointment CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Dr. Rohan Mehta, I would like to enquire about an appointment at PearlCare Dental Studio.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={handleBookClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-full text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleBookClick}
              className="sm:hidden px-3.5 py-1.5 bg-[#0D9488] text-white rounded-full text-xs font-semibold"
            >
              Book
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] shadow-xl px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#E3F2FD] text-[#0F766E]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#0D9488]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] space-y-2.5">
            <button
              onClick={handleBookClick}
              className="w-full py-3 bg-[#0D9488] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
                className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>Call Clinic</span>
              </a>
              <a
                href={`https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Dr. Rohan Mehta, I would like to enquire about an appointment.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors border border-emerald-200"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full py-2 text-center text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5 pt-1"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Admin Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
