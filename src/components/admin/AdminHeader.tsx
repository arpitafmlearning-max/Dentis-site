import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { AdminTab } from '../../types';
import { Menu, ExternalLink, Sparkles, RefreshCw, Database } from 'lucide-react';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onToggleSidebar: () => void;
}

const TAB_TITLES: Record<AdminTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Clinic Executive Dashboard',
    subtitle: 'Real-time overview of appointments, patient leads, and clinic operations'
  },
  appointments: {
    title: 'Appointment Management',
    subtitle: 'Review, confirm, reschedule, and manage clinical consultations'
  },
  enquiries: {
    title: 'Patient Enquiry Inbox',
    subtitle: 'Manage and follow up on patient questions and website inquiries'
  },
  treatments: {
    title: 'Treatments & Services Management',
    subtitle: 'Configure treatments, categories, clinical descriptions, and duration'
  },
  doctor: {
    title: 'Doctor Profile & Credentials',
    subtitle: 'Manage Dr. Rohan Mehta’s credentials, bio, approach, and specializations'
  },
  clinic: {
    title: 'Clinic Information & Timings',
    subtitle: 'Update studio location, telephone, email, WhatsApp, and operating hours'
  },
  testimonials: {
    title: 'Patient Stories & Reviews',
    subtitle: 'Curate, edit, and publish verified and showcase patient reviews'
  },
  gallery: {
    title: 'Smile & Studio Gallery',
    subtitle: 'Upload, categorize, and caption clinic and restorative visuals'
  },
  faqs: {
    title: 'Frequently Asked Questions',
    subtitle: 'Manage patient-facing FAQs, clinical categories, and guidance'
  },
  homepage: {
    title: 'Homepage Copy & Showcase Metrics',
    subtitle: 'Customize hero headlines, supporting text, trust stats, and CTA banners'
  },
  content: {
    title: 'Homepage Copy & Showcase Metrics',
    subtitle: 'Customize hero headlines, supporting text, trust stats, and CTA banners'
  },
  settings: {
    title: 'Supabase Database & System Settings',
    subtitle: 'Configure cloud backend, sync appointments, export data, and generate SQL'
  }
};


export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onToggleSidebar
}) => {
  const { doctorProfile, setCurrentPage, settings, resetToDefaults } = useClinic();
  const meta = TAB_TITLES[activeTab] || {
    title: 'Admin Control Center',
    subtitle: 'Manage PearlCare Dental Studio'
  };

  const handleReset = () => {
    if (window.confirm('Reset all content and demo data back to default state?')) {
      resetToDefaults();
    }
  };

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1A2A44]">
            {meta.title}
          </h1>
          <p className="text-xs text-slate-500 font-light hidden sm:block">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Right User & Utility actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-[#E2E8F0] transition-colors cursor-pointer"
          title="Reset sample data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>

        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#0D9488] text-xs font-semibold transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Preview Live Website</span>
          <span className="sm:hidden">Live</span>
        </button>

        {/* Doctor Avatar Badge */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E2E8F0] bg-slate-100 shrink-0">
            <img
              src={doctorProfile.imageUrl}
              alt={doctorProfile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden xl:block text-left">
            <span className="block text-xs font-bold text-slate-800 leading-tight">
              {doctorProfile.name}
            </span>
            <span className="block text-[10px] text-[#0D9488] font-medium">
              Prosthodontist
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
