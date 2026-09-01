import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { AdminTab } from '../../types';
import {
  LayoutDashboard,
  Calendar,
  Inbox,
  Stethoscope,
  UserCheck,
  Building2,
  Star,
  Image as ImageIcon,
  HelpCircle,
  FileText,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  Sparkles,
  Database
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose
}) => {
  const {
    appointments,
    enquiries,
    logoutAdmin,
    setCurrentPage,
    clinicInfo,
    settings
  } = useClinic();

  const pendingAppointments = appointments.filter(a => a.status === 'New').length;
  const newEnquiries = enquiries.filter(e => e.status === 'New').length;

  const menuSections: {
    sectionTitle: string;
    items: {
      id: AdminTab;
      label: string;
      icon: React.ElementType;
      badge?: number;
      badgeColor?: string;
    }[];
  }[] = [
    {
      sectionTitle: 'Overview & Leads',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
        {
          id: 'appointments',
          label: 'Appointments',
          icon: Calendar,
          badge: pendingAppointments,
          badgeColor: 'bg-teal-500'
        },
        {
          id: 'enquiries',
          label: 'Enquiry Inbox',
          icon: Inbox,
          badge: newEnquiries,
          badgeColor: 'bg-amber-500'
        }
      ]
    },
    {
      sectionTitle: 'Clinical Content',
      items: [
        { id: 'treatments', label: 'Treatments & Services', icon: Stethoscope },
        { id: 'doctor', label: 'Doctor Profile', icon: UserCheck },
        { id: 'clinic', label: 'Clinic Information', icon: Building2 },
        { id: 'testimonials', label: 'Patient Reviews', icon: Star },
        { id: 'gallery', label: 'Smile Gallery', icon: ImageIcon },
        { id: 'faqs', label: 'FAQ Manager', icon: HelpCircle }
      ]
    },
    {
      sectionTitle: 'Site Architecture',
      items: [
        { id: 'homepage', label: 'Homepage & Copy', icon: FileText },
        { id: 'settings', label: 'Supabase & Settings', icon: SettingsIcon }
      ]
    }
  ];

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    onClose();
  };

  const handlePublicSite = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#1A2A44] text-slate-300 flex flex-col justify-between border-r border-white/10 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Top Brand Block */}
      <div>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-white text-base leading-tight">
                PearlCare
              </h2>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-teal-300">
                Clinic Control Center
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Supabase Status Pill */}
        <div className="px-6 py-2.5 bg-white/5 border-b border-white/5 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Database className="w-3.5 h-3.5 text-teal-300" />
            <span>Database:</span>
          </div>
          <span className={`font-semibold px-2 py-0.5 rounded-full ${
            settings.isSupabaseEnabled
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-slate-700/60 text-slate-300'
          }`}>
            {settings.isSupabaseEnabled ? 'Supabase Cloud' : 'Browser Storage'}
          </span>
        </div>

        {/* Navigation Section Items */}
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-220px)]">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {section.sectionTitle}
              </span>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#0D9488] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={`text-[10px] text-white px-2 py-0.5 rounded-full font-bold ${item.badgeColor || 'bg-teal-500'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button
          onClick={handlePublicSite}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
            <span>View Public Site</span>
          </div>
          <span className="text-[10px] text-slate-400">Live</span>
        </button>

        <button
          onClick={logoutAdmin}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
