import React, { useEffect } from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingMobileBar } from './components/common/FloatingMobileBar';
import { AppointmentModal } from './components/booking/AppointmentModal';
import { ToastContainer } from './components/common/ToastContainer';

import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { TreatmentsView } from './components/views/TreatmentsView';
import { GalleryView } from './components/views/GalleryView';
import { ContactView } from './components/views/ContactView';
import { AdminPanel } from './components/admin/AdminPanel';

const AppContent: React.FC = () => {
  const { currentPage } = useClinic();

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen font-sans bg-[#F4F1EA]/60 text-slate-800 antialiased selection:bg-[#0D5C63]/20 selection:text-[#0D5C63]">
        <AdminPanel />
        <ToastContainer />
        <AppointmentModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-[#FAF9F6] text-slate-800 antialiased selection:bg-[#0D5C63]/20 selection:text-[#0D5C63] flex flex-col justify-between">
      {/* Top Sticky Nav */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-grow">
        {currentPage === 'home' && <HomeView />}
        {currentPage === 'about' && <AboutView />}
        {currentPage === 'treatments' && <TreatmentsView />}
        {currentPage === 'gallery' && <GalleryView />}
        {currentPage === 'contact' && <ContactView />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Persistent Mobile Bottom Action Bar */}
      <FloatingMobileBar />

      {/* Global Booking Consultation Modal */}
      <AppointmentModal />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ClinicProvider>
      <AppContent />
    </ClinicProvider>
  );
}

