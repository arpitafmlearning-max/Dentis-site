export type PageView = 'home' | 'about' | 'treatments' | 'gallery' | 'contact' | 'admin';

export type AdminTab = 
  | 'dashboard'
  | 'appointments'
  | 'enquiries'
  | 'treatments'
  | 'doctor'
  | 'clinic'
  | 'testimonials'
  | 'gallery'
  | 'faqs'
  | 'homepage'
  | 'content'
  | 'settings';


export type AppointmentStatus = 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';
export type EnquiryStatus = 'New' | 'Contacted' | 'Resolved';
export type GalleryCategory = 'All' | 'Clinic' | 'Dentistry' | 'Smile Inspiration';

export interface ClinicInfo {
  name: string;
  tagline: string;
  doctorName: string;
  doctorTitle: string;
  experience: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  whatsapp: string;
  weekdayHours: string;
  weekendHours: string;
  emergencyPhone?: string;
  googleMapsQuery: string;
}

export interface DoctorProfile {
  name: string;
  designation: string;
  qualifications: string;
  experienceYears: number;
  bio: string;
  approach: string;
  philosophy: string;
  specializations: string[];
  areasOfInterest: string[];
  imageUrl: string;
}

export interface Treatment {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  whoItHelps: string[];
  keyBenefits: string[];
  estimatedDuration: string;
  careComfortNote: string;
  iconName: string;
  category: 'General' | 'Cosmetic' | 'Restorative' | 'Orthodontics' | 'Surgical';
  imageUrl: string;
  isVisible: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatmentName: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
  isDemo: boolean;
  isVisible: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Clinic' | 'Dentistry' | 'Smile Inspiration';
  imageUrl: string;
  caption: string;
  isDemo: boolean;
  isVisible: boolean;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isVisible: boolean;
  order: number;
}

export interface HomepageContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroSupportingText: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  stats: {
    yearsExp: string;
    yearsLabel: string;
    patientsServed: string;
    patientsLabel: string;
    servicesCount: string;
    servicesLabel: string;
    patientRating: string;
    ratingLabel: string;
  };
  philosophyEyebrow: string;
  philosophyTitle: string;
  philosophyDescription: string;
  doctorIntroHeadline: string;
  ctaBannerHeadline: string;
  ctaBannerSupportingText: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  treatment: string;
  message?: string;
  status: AppointmentStatus;
  notes?: string;
  submittedAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  status: EnquiryStatus;
  notes?: string;
  submittedAt: string;
}

export interface AdminSettings {
  enableOnlineBooking: boolean;
  whatsappPrefillMessage: string;
  seoTitle: string;
  seoDescription: string;
  notificationEmail: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  isSupabaseEnabled?: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}
