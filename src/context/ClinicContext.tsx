import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClinicInfo,
  DoctorProfile,
  Treatment,
  Testimonial,
  GalleryItem,
  FAQItem,
  HomepageContent,
  Appointment,
  Enquiry,
  AdminSettings,
  PageView,
  AppointmentStatus,
  EnquiryStatus,
  ToastMessage
} from '../types';
import {
  initialClinicInfo,
  initialDoctorProfile,
  initialTreatments,
  initialTestimonials,
  initialGallery,
  initialFAQs,
  initialHomepageContent,
  initialAppointments,
  initialEnquiries,
  initialAdminSettings
} from '../data/initialData';
import { getSupabaseClient } from '../lib/supabaseClient';

const STORAGE_KEYS = {
  CLINIC: 'pearlcare_clinic_info_v1',
  DOCTOR: 'pearlcare_doctor_profile_v1',
  TREATMENTS: 'pearlcare_treatments_v1',
  TESTIMONIALS: 'pearlcare_testimonials_v1',
  GALLERY: 'pearlcare_gallery_v1',
  FAQS: 'pearlcare_faqs_v1',
  HOMEPAGE: 'pearlcare_homepage_v1',
  APPOINTMENTS: 'pearlcare_appointments_v1',
  ENQUIRIES: 'pearlcare_enquiries_v1',
  SETTINGS: 'pearlcare_settings_v1',
  AUTH: 'pearlcare_admin_auth_v1'
};

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error loading localStorage key ${key}:`, e);
    return fallback;
  }
}

function saveStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error saving localStorage key ${key}:`, e);
  }
}

interface ClinicContextType {
  // Navigation & UI State
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  selectedTreatmentForModal: Treatment | null;
  setSelectedTreatmentForModal: (treatment: Treatment | null) => void;
  activeTreatmentDrawer: Treatment | null;
  setActiveTreatmentDrawer: (treatment: Treatment | null) => void;

  // Data & Mutators
  clinicInfo: ClinicInfo;
  updateClinicInfo: (info: Partial<ClinicInfo>) => void;

  doctorProfile: DoctorProfile;
  updateDoctorProfile: (profile: Partial<DoctorProfile>) => void;

  treatments: Treatment[];
  addTreatment: (treatment: Omit<Treatment, 'id'>) => void;
  updateTreatment: (id: string, updates: Partial<Treatment>) => void;
  deleteTreatment: (id: string) => void;

  testimonials: Testimonial[];
  addTestimonial: (item: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  faqs: FAQItem[];
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, updates: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  homepageContent: HomepageContent;
  updateHomepageContent: (content: Partial<HomepageContent>) => void;

  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'submittedAt'>) => Promise<boolean>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  updateAppointmentNotes: (id: string, notes: string) => void;
  deleteAppointment: (id: string) => void;

  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'status' | 'submittedAt'>) => Promise<boolean>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  updateEnquiryNotes: (id: string, notes: string) => void;
  deleteEnquiry: (id: string) => void;

  settings: AdminSettings;
  updateSettings: (settings: Partial<AdminSettings>) => void;

  // Auth
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Notifications
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // System
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTreatmentForModal, setSelectedTreatmentForModal] = useState<Treatment | null>(null);
  const [activeTreatmentDrawer, setActiveTreatmentDrawer] = useState<Treatment | null>(null);

  // Clinic state
  const [clinicInfo, setClinicInfoState] = useState<ClinicInfo>(() => loadStorage(STORAGE_KEYS.CLINIC, initialClinicInfo));
  const [doctorProfile, setDoctorProfileState] = useState<DoctorProfile>(() => loadStorage(STORAGE_KEYS.DOCTOR, initialDoctorProfile));
  const [treatments, setTreatmentsState] = useState<Treatment[]>(() => loadStorage(STORAGE_KEYS.TREATMENTS, initialTreatments));
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(() => loadStorage(STORAGE_KEYS.TESTIMONIALS, initialTestimonials));
  const [gallery, setGalleryState] = useState<GalleryItem[]>(() => loadStorage(STORAGE_KEYS.GALLERY, initialGallery));
  const [faqs, setFaqsState] = useState<FAQItem[]>(() => loadStorage(STORAGE_KEYS.FAQS, initialFAQs));
  const [homepageContent, setHomepageContentState] = useState<HomepageContent>(() => loadStorage(STORAGE_KEYS.HOMEPAGE, initialHomepageContent));
  const [appointments, setAppointmentsState] = useState<Appointment[]>(() => loadStorage(STORAGE_KEYS.APPOINTMENTS, initialAppointments));
  const [enquiries, setEnquiriesState] = useState<Enquiry[]>(() => loadStorage(STORAGE_KEYS.ENQUIRIES, initialEnquiries));
  const [settings, setSettingsState] = useState<AdminSettings>(() => loadStorage(STORAGE_KEYS.SETTINGS, initialAdminSettings));

  // Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return loadStorage(STORAGE_KEYS.AUTH, false);
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to local storage
  useEffect(() => saveStorage(STORAGE_KEYS.CLINIC, clinicInfo), [clinicInfo]);
  useEffect(() => saveStorage(STORAGE_KEYS.DOCTOR, doctorProfile), [doctorProfile]);
  useEffect(() => saveStorage(STORAGE_KEYS.TREATMENTS, treatments), [treatments]);
  useEffect(() => saveStorage(STORAGE_KEYS.TESTIMONIALS, testimonials), [testimonials]);
  useEffect(() => saveStorage(STORAGE_KEYS.GALLERY, gallery), [gallery]);
  useEffect(() => saveStorage(STORAGE_KEYS.FAQS, faqs), [faqs]);
  useEffect(() => saveStorage(STORAGE_KEYS.HOMEPAGE, homepageContent), [homepageContent]);
  useEffect(() => saveStorage(STORAGE_KEYS.APPOINTMENTS, appointments), [appointments]);
  useEffect(() => saveStorage(STORAGE_KEYS.ENQUIRIES, enquiries), [enquiries]);
  useEffect(() => saveStorage(STORAGE_KEYS.SETTINGS, settings), [settings]);
  useEffect(() => saveStorage(STORAGE_KEYS.AUTH, isAdminAuthenticated), [isAdminAuthenticated]);

  // Public & Admin mutators
  const updateClinicInfo = (info: Partial<ClinicInfo>) => {
    setClinicInfoState(prev => ({ ...prev, ...info }));
    addToast({ type: 'success', title: 'Clinic Info Updated', message: 'Website header, footer and contact info updated.' });
  };

  const updateDoctorProfile = (profile: Partial<DoctorProfile>) => {
    setDoctorProfileState(prev => ({ ...prev, ...profile }));
    addToast({ type: 'success', title: 'Doctor Profile Saved', message: 'Dr. Mehta’s profile updated across the website.' });
  };

  const addTreatment = (item: Omit<Treatment, 'id'>) => {
    const id = 'treat_' + Math.random().toString(36).substring(2, 9);
    const newTreatment: Treatment = { ...item, id };
    setTreatmentsState(prev => [...prev, newTreatment]);
    addToast({ type: 'success', title: 'Treatment Added', message: `${newTreatment.title} is now in your catalog.` });
  };

  const updateTreatment = (id: string, updates: Partial<Treatment>) => {
    setTreatmentsState(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    addToast({ type: 'success', title: 'Treatment Updated', message: 'Changes saved successfully.' });
  };

  const deleteTreatment = (id: string) => {
    setTreatmentsState(prev => prev.filter(t => t.id !== id));
    addToast({ type: 'info', title: 'Treatment Removed', message: 'Treatment deleted from directory.' });
  };

  const addTestimonial = (item: Omit<Testimonial, 'id'>) => {
    const id = 'test_' + Math.random().toString(36).substring(2, 9);
    const newTestimonial: Testimonial = { ...item, id };
    setTestimonialsState(prev => [newTestimonial, ...prev]);
    addToast({ type: 'success', title: 'Review Added', message: 'Patient review saved.' });
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonialsState(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    addToast({ type: 'success', title: 'Review Updated', message: 'Review changes saved.' });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonialsState(prev => prev.filter(t => t.id !== id));
    addToast({ type: 'info', title: 'Review Deleted', message: 'Testimonial removed.' });
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const id = 'gal_' + Math.random().toString(36).substring(2, 9);
    const newItem: GalleryItem = { ...item, id };
    setGalleryState(prev => [...prev, newItem]);
    addToast({ type: 'success', title: 'Image Added', message: 'Gallery image uploaded.' });
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setGalleryState(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
    addToast({ type: 'success', title: 'Gallery Item Updated', message: 'Gallery details updated.' });
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryState(prev => prev.filter(g => g.id !== id));
    addToast({ type: 'info', title: 'Gallery Item Removed', message: 'Image deleted from gallery.' });
  };

  const addFAQ = (item: Omit<FAQItem, 'id'>) => {
    const id = 'faq_' + Math.random().toString(36).substring(2, 9);
    const newFAQ: FAQItem = { ...item, id };
    setFaqsState(prev => [...prev, newFAQ]);
    addToast({ type: 'success', title: 'FAQ Added', message: 'New patient question created.' });
  };

  const updateFAQ = (id: string, updates: Partial<FAQItem>) => {
    setFaqsState(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    addToast({ type: 'success', title: 'FAQ Updated', message: 'FAQ updated successfully.' });
  };

  const deleteFAQ = (id: string) => {
    setFaqsState(prev => prev.filter(f => f.id !== id));
    addToast({ type: 'info', title: 'FAQ Deleted', message: 'Question removed.' });
  };

  const updateHomepageContent = (content: Partial<HomepageContent>) => {
    setHomepageContentState(prev => ({ ...prev, ...content }));
    addToast({ type: 'success', title: 'Homepage Copy Saved', message: 'Headlines, statistics and copy updated.' });
  };

  const addAppointment = async (appointmentData: Omit<Appointment, 'id' | 'status' | 'submittedAt'>): Promise<boolean> => {
    const id = 'apt-' + Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      ...appointmentData,
      id,
      status: 'New',
      submittedAt: new Date().toISOString()
    };

    setAppointmentsState(prev => [newAppointment, ...prev]);

    // Push to Supabase if configured
    if (settings.isSupabaseEnabled && settings.supabaseUrl && settings.supabaseAnonKey) {
      try {
        const client = getSupabaseClient(settings.supabaseUrl, settings.supabaseAnonKey);
        if (client) {
          await client.from('appointments').insert([{
            id: newAppointment.id,
            patient_name: newAppointment.patientName,
            phone: newAppointment.phone,
            email: newAppointment.email,
            preferred_date: newAppointment.preferredDate,
            preferred_time: newAppointment.preferredTime,
            treatment: newAppointment.treatment,
            message: newAppointment.message || '',
            status: newAppointment.status,
            notes: ''
          }]);
        }
      } catch (err) {
        console.warn('Supabase sync error for appointment:', err);
      }
    }

    addToast({
      type: 'success',
      title: 'Appointment Request Received',
      message: `Thank you, ${appointmentData.patientName}! We will contact you at ${appointmentData.phone} to confirm.`
    });

    return true;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointmentsState(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    addToast({ type: 'success', title: 'Status Updated', message: `Appointment status set to ${status}.` });
  };

  const updateAppointmentNotes = (id: string, notes: string) => {
    setAppointmentsState(prev => prev.map(a => a.id === id ? { ...a, notes } : a));
    addToast({ type: 'success', title: 'Notes Saved', message: 'Internal patient note recorded.' });
  };

  const deleteAppointment = (id: string) => {
    setAppointmentsState(prev => prev.filter(a => a.id !== id));
    addToast({ type: 'info', title: 'Appointment Removed', message: 'Appointment record deleted.' });
  };

  const addEnquiry = async (enquiryData: Omit<Enquiry, 'id' | 'status' | 'submittedAt'>): Promise<boolean> => {
    const id = 'enq-' + Math.floor(1000 + Math.random() * 9000);
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id,
      status: 'New',
      submittedAt: new Date().toISOString()
    };

    setEnquiriesState(prev => [newEnquiry, ...prev]);

    // Push to Supabase if configured
    if (settings.isSupabaseEnabled && settings.supabaseUrl && settings.supabaseAnonKey) {
      try {
        const client = getSupabaseClient(settings.supabaseUrl, settings.supabaseAnonKey);
        if (client) {
          await client.from('enquiries').insert([{
            id: newEnquiry.id,
            name: newEnquiry.name,
            phone: newEnquiry.phone,
            email: newEnquiry.email,
            subject: newEnquiry.subject || '',
            message: newEnquiry.message,
            status: newEnquiry.status,
            notes: ''
          }]);
        }
      } catch (err) {
        console.warn('Supabase sync error for enquiry:', err);
      }
    }

    addToast({
      type: 'success',
      title: 'Message Sent Successfully',
      message: 'Thank you for reaching out! Our team will get back to you shortly.'
    });

    return true;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    setEnquiriesState(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    addToast({ type: 'success', title: 'Enquiry Updated', message: `Lead status marked as ${status}.` });
  };

  const updateEnquiryNotes = (id: string, notes: string) => {
    setEnquiriesState(prev => prev.map(e => e.id === id ? { ...e, notes } : e));
    addToast({ type: 'success', title: 'Note Saved', message: 'Enquiry internal note recorded.' });
  };

  const deleteEnquiry = (id: string) => {
    setEnquiriesState(prev => prev.filter(e => e.id !== id));
    addToast({ type: 'info', title: 'Enquiry Removed', message: 'Lead record deleted.' });
  };

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettingsState(prev => ({ ...prev, ...newSettings }));
    addToast({ type: 'success', title: 'Settings Saved', message: 'Clinic configuration has been updated.' });
  };

  const loginAdmin = (password: string): boolean => {
    // For demo convenience, password is 'pearlcare123' or 'admin'
    if (password.trim() === 'pearlcare123' || password.trim() === 'admin' || password.trim() === 'pearlcare') {
      setIsAdminAuthenticated(true);
      addToast({ type: 'success', title: 'Welcome, Dr. Mehta', message: 'Logged in to PearlCare Clinic Control Center.' });
      return true;
    }
    addToast({ type: 'error', title: 'Invalid Credentials', message: 'Please check your password (demo: pearlcare123)' });
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
    addToast({ type: 'info', title: 'Logged Out', message: 'You have exited the Admin Control Center.' });
  };

  const resetToDefaults = () => {
    setClinicInfoState(initialClinicInfo);
    setDoctorProfileState(initialDoctorProfile);
    setTreatmentsState(initialTreatments);
    setTestimonialsState(initialTestimonials);
    setGalleryState(initialGallery);
    setFaqsState(initialFAQs);
    setHomepageContentState(initialHomepageContent);
    setAppointmentsState(initialAppointments);
    setEnquiriesState(initialEnquiries);
    setSettingsState(initialAdminSettings);
    addToast({ type: 'info', title: 'Reset Complete', message: 'All demo data has been restored to default.' });
  };

  const exportDataJSON = () => {
    const data = {
      clinicInfo,
      doctorProfile,
      treatments,
      testimonials,
      gallery,
      faqs,
      homepageContent,
      appointments,
      enquiries,
      settings,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.clinicInfo) setClinicInfoState(data.clinicInfo);
      if (data.doctorProfile) setDoctorProfileState(data.doctorProfile);
      if (data.treatments) setTreatmentsState(data.treatments);
      if (data.testimonials) setTestimonialsState(data.testimonials);
      if (data.gallery) setGalleryState(data.gallery);
      if (data.faqs) setFaqsState(data.faqs);
      if (data.homepageContent) setHomepageContentState(data.homepageContent);
      if (data.appointments) setAppointmentsState(data.appointments);
      if (data.enquiries) setEnquiriesState(data.enquiries);
      if (data.settings) setSettingsState(data.settings);
      addToast({ type: 'success', title: 'Backup Restored', message: 'All website and clinic data imported successfully.' });
      return true;
    } catch (e) {
      addToast({ type: 'error', title: 'Import Failed', message: 'Invalid JSON backup file.' });
      return false;
    }
  };

  return (
    <ClinicContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isBookingModalOpen,
        setIsBookingModalOpen,
        selectedTreatmentForModal,
        setSelectedTreatmentForModal,
        activeTreatmentDrawer,
        setActiveTreatmentDrawer,
        clinicInfo,
        updateClinicInfo,
        doctorProfile,
        updateDoctorProfile,
        treatments,
        addTreatment,
        updateTreatment,
        deleteTreatment,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        homepageContent,
        updateHomepageContent,
        appointments,
        addAppointment,
        updateAppointmentStatus,
        updateAppointmentNotes,
        deleteAppointment,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        updateEnquiryNotes,
        deleteEnquiry,
        settings,
        updateSettings,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        toasts,
        addToast,
        removeToast,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
