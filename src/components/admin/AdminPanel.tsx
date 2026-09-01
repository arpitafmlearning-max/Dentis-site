import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { AdminTab } from '../../types';
import { AdminLogin } from './AdminLogin';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminDashboard } from './AdminDashboard';
import { AdminAppointments } from './AdminAppointments';
import { AdminEnquiries } from './AdminEnquiries';
import { AdminTreatments } from './AdminTreatments';
import { AdminDoctorProfile } from './AdminDoctorProfile';
import { AdminClinicInfo } from './AdminClinicInfo';
import { AdminTestimonials } from './AdminTestimonials';
import { AdminGallery } from './AdminGallery';
import { AdminFAQs } from './AdminFAQs';
import { AdminHomepageContent } from './AdminHomepageContent';
import { AdminSettings } from './AdminSettings';

export const AdminPanel: React.FC = () => {
  const { isAdminAuthenticated } = useClinic();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard setActiveTab={setActiveTab} />;
      case 'appointments':
        return <AdminAppointments />;
      case 'enquiries':
        return <AdminEnquiries />;
      case 'treatments':
        return <AdminTreatments />;
      case 'doctor':
        return <AdminDoctorProfile />;
      case 'clinic':
        return <AdminClinicInfo />;
      case 'testimonials':
        return <AdminTestimonials />;
      case 'gallery':
        return <AdminGallery />;
      case 'faqs':
        return <AdminFAQs />;
      case 'homepage':
        return <AdminHomepageContent />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA]/60 flex">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Administrative Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          activeTab={activeTab}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};
