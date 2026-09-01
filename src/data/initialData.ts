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
  AdminSettings
} from '../types';

export const initialClinicInfo: ClinicInfo = {
  name: 'PearlCare Dental Studio',
  tagline: 'Modern Dentistry. Gentle Care. Confident Smiles.',
  doctorName: 'Dr. Rohan Mehta',
  doctorTitle: 'BDS, MDS – Prosthodontics & Crown and Bridge',
  experience: '12+ Years Clinical Experience',
  addressLine1: 'Shop 4, Silver Heights, Murbad Road',
  addressLine2: 'Opposite Syndicate Bank, Kalyan West',
  city: 'Kalyan West',
  state: 'Maharashtra',
  pincode: '421301',
  phone: '+91 98765 43210',
  email: 'hello@pearlcaredental.in',
  whatsapp: '+919876543210',
  weekdayHours: 'Monday – Saturday: 10:00 AM – 8:30 PM',
  weekendHours: 'Sunday: 10:00 AM – 2:00 PM',
  emergencyPhone: '+91 98765 43210',
  googleMapsQuery: 'Shop 4 Silver Heights Murbad Road Kalyan West Maharashtra 421301'
};

export const initialDoctorProfile: DoctorProfile = {
  name: 'Dr. Rohan Mehta',
  designation: 'Founder & Principal Prosthodontist',
  qualifications: 'BDS, MDS – Prosthodontics & Crown and Bridge',
  experienceYears: 12,
  bio: 'Dr. Rohan Mehta believes that quality dentistry should seamlessly combine clinical precision, modern digital technology, and a profoundly comfortable patient experience. With over twelve years in private practice and advanced training in Prosthodontics, his approach focuses on listening carefully to each patient’s concerns, demystifying treatments, and designing restorative plans that protect long-term oral wellness.',
  approach: 'Every smile is unique. We take time to explain each step with digital imaging before any procedure begins, ensuring you feel completely at ease and in control of your dental health.',
  philosophy: 'Gentle, conservative dentistry with an emphasis on preserving natural tooth structure and delivering lasting functional aesthetics.',
  specializations: [
    'Prosthodontics & Full Mouth Rehabilitation',
    'Cosmetic Dentistry & Smile Makeovers',
    'Dental Implants & Fixed Prosthetics',
    'Precision Restorative Dentistry'
  ],
  areasOfInterest: [
    'Dental Implants',
    'Cosmetic Dentistry',
    'Smile Makeovers',
    'Crowns & Bridges',
    'Restorative Dentistry'
  ],
  imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80'
};

export const initialTreatments: Treatment[] = [
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    slug: 'dental-implants',
    shortDescription: 'Permanent, natural-looking tooth replacements engineered for structural stability and lifelong bite function.',
    fullDescription: 'A modern, biocompatible titanium root integrated into the jawbone to securely support crowns, bridges, or full-arch prosthetics. Ideal for restoring missing teeth without affecting adjacent teeth.',
    whoItHelps: [
      'Individuals with one or multiple missing teeth',
      'Patients struggling with loose removable dentures',
      'Anyone seeking a permanent, natural-feeling chewing restoration'
    ],
    keyBenefits: [
      'Preserves facial structure and prevents jawbone resorption',
      'Functions and feels like your natural teeth',
      'Lifelong durability with routine oral hygiene care'
    ],
    estimatedDuration: '2–3 sessions with planned healing phases',
    careComfortNote: 'Performed with localized comfort protocols and optional digital guide planning for minimal recovery downtime.',
    iconName: 'ShieldCheck',
    category: 'Restorative',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    isVisible: true,
    order: 1
  },
  {
    id: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    slug: 'root-canal-treatment',
    shortDescription: 'Gentle, modern endodontic therapy designed to relieve toothache and preserve your natural tooth structure.',
    fullDescription: 'Advanced rotary endodontics that thoroughly cleans infected nerve pulp, sterilizes the inner canal, and seals it permanently to prevent reinfection while preserving your natural tooth.',
    whoItHelps: [
      'Patients experiencing severe toothache, throbbing, or swelling',
      'Teeth sensitive to prolonged hot or cold temperatures',
      'Deep decay reaching the inner tooth nerve'
    ],
    keyBenefits: [
      'Immediate relief from acute dental discomfort',
      'Avoids the need for tooth extraction and artificial replacements',
      'Single-sitting options available for select cases'
    ],
    estimatedDuration: '45–60 minutes per sitting (often 1–2 visits)',
    careComfortNote: 'Modern localized anesthesia ensures treatment is as calm and comfortable as receiving a standard filling.',
    iconName: 'Activity',
    category: 'General',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    isVisible: true,
    order: 2
  },
  {
    id: 'braces-clear-aligners',
    title: 'Braces & Clear Aligners',
    slug: 'braces-clear-aligners',
    shortDescription: 'Discreet alignment and orthodontic therapies to gently straighten teeth and optimize bite alignment.',
    fullDescription: 'Custom-crafted clear aligners and modern ceramic braces that incrementally guide teeth into their ideal alignment with minimal aesthetic disruption to your daily routine.',
    whoItHelps: [
      'Crowded, overlapping, or spaced teeth',
      'Overbite, underbite, or crossbite concerns',
      'Adults and teens seeking nearly invisible teeth straightening'
    ],
    keyBenefits: [
      'Virtually invisible clear aligners that can be removed for meals',
      'Easier oral hygiene maintenance compared to traditional metal braces',
      'Custom 3D digital simulation preview of your alignment journey'
    ],
    estimatedDuration: '6–18 months depending on case complexity',
    careComfortNote: 'Smooth biocompatible medical-grade thermoplastic trays designed without sharp brackets or wires.',
    iconName: 'Sparkles',
    category: 'Orthodontics',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    isVisible: true,
    order: 3
  },
  {
    id: 'teeth-cleaning-polishing',
    title: 'Teeth Cleaning & Polishing',
    slug: 'teeth-cleaning-polishing',
    shortDescription: 'Ultrasonic scaling and gentle stain removal to protect gums and maintain everyday breath freshness.',
    fullDescription: 'Thorough preventive dental prophylaxis removing hardened calculus (tartar), surface tea/coffee stains, and bacterial plaque that daily brushing cannot reach.',
    whoItHelps: [
      'Everyone recommended for routine 6-month preventive care',
      'Mild gum bleeding during flossing or brushing',
      'Extrinsic tea, coffee, or smoking stains'
    ],
    keyBenefits: [
      'Prevents gum disease (gingivitis & periodontitis)',
      'Leaves teeth smooth, naturally bright, and refreshed',
      'Includes complimentary personalized oral hygiene coaching'
    ],
    estimatedDuration: '30–45 minutes',
    careComfortNote: 'Piezoelectric ultrasonic technology with water cooling ensures gentle removal without damaging enamel.',
    iconName: 'CheckCircle2',
    category: 'General',
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
    isVisible: true,
    order: 4
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    slug: 'cosmetic-dentistry',
    shortDescription: 'Porcelain veneers, composite bonding, and personalized smile contouring tailored to your facial harmony.',
    fullDescription: 'Artistic smile architecture focusing on correcting chipped enamel, minor gaps, irregular contours, and uneven tooth proportions with minimal intervention.',
    whoItHelps: [
      'Chipped, worn, or unevenly sized teeth',
      'Intrinsically discolored enamel resistant to whitening',
      'Patients desiring a natural, harmonious smile transformation'
    ],
    keyBenefits: [
      'Ultra-thin custom porcelain veneers with lifelike translucency',
      'Conservative preparation preserving natural tooth enamel',
      'Tailored shade matching to complement your skin tone'
    ],
    estimatedDuration: '2 visits for custom veneers, single visit for bonding',
    careComfortNote: 'Comprehensive diagnostic wax-up and mock-up trial so you can preview the contour before final bonding.',
    iconName: 'Smile',
    category: 'Cosmetic',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    isVisible: true,
    order: 5
  },
  {
    id: 'crowns-and-bridges',
    title: 'Dental Crowns & Bridges',
    slug: 'crowns-and-bridges',
    shortDescription: 'High-strength ceramic and zirconia restorations to protect fractured teeth or bridge missing gaps.',
    fullDescription: 'Custom milled zirconia and E-Max ceramic crowns engineered by our prosthodontist to cap weakened teeth, restore vertical bite height, or bridge dental gaps seamlessly.',
    whoItHelps: [
      'Teeth treated with root canal therapy needing structural reinforcement',
      'Severely cracked, fractured, or heavily filled teeth',
      'Replacing 1–2 missing teeth with a fixed bridge'
    ],
    keyBenefits: [
      'Metal-free bio-zirconia with zero black gum lines',
      'Exceptional bite resistance matching natural enamel hardness',
      'Digitally scanned for precision sub-millimeter marginal fit'
    ],
    estimatedDuration: '2 visits (preparation & final cementation)',
    careComfortNote: 'Custom temporary crown placed during the short fabrication period so you eat and smile normally.',
    iconName: 'Crown',
    category: 'Restorative',
    imageUrl: 'https://images.unsplash.com/photo-1590424744299-166f2c3d97d0?auto=format&fit=crop&w=800&q=80',
    isVisible: true,
    order: 6
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    slug: 'teeth-whitening',
    shortDescription: 'Professional in-clinic brightening and customized take-home systems safe for delicate enamel.',
    fullDescription: 'Controlled enamel-safe whitening formulations applied under clinical supervision to lift deep dietary staining and restore your smile’s youthful brightness.',
    whoItHelps: [
      'Yellowed or aged tooth enamel',
      'Stains from tea, coffee, wine, or turmeric',
      'Pre-event smile brightening for weddings or celebrations'
    ],
    keyBenefits: [
      'Up to 4–6 shades visibly brighter in one clinical session',
      'Formulated with desensitizing agents for minimal sensitivity',
      'Includes custom maintenance trays for long-lasting results'
    ],
    estimatedDuration: '45–60 minutes',
    careComfortNote: 'Gums and soft tissues are safely isolated with protective barrier resin before application.',
    iconName: 'SunMedium',
    category: 'Cosmetic',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    isVisible: true,
    order: 7
  },
  {
    id: 'kids-dentistry',
    title: 'Kids Dentistry',
    slug: 'kids-dentistry',
    shortDescription: 'Gentle, positive pediatric dental checkups and preventive sealants designed to build dental confidence.',
    fullDescription: 'Child-friendly dental visits designed to create joyful, anxiety-free experiences. Focused on preventive fluoride treatments, pit & fissure sealants, and early habit guidance.',
    whoItHelps: [
      'Children aged 2+ for their initial comforting dental milestone visits',
      'Early childhood cavities or milk tooth pain',
      'Preventive pit and fissure sealants for erupting permanent molars'
    ],
    keyBenefits: [
      'Calm, friendly atmosphere that eliminates dental phobia from an early age',
      'Protective sealant coatings reducing cavity risk up to 80%',
      'Gentle coaching on brushing techniques for children and parents'
    ],
    estimatedDuration: '30 minutes in a welcoming environment',
    careComfortNote: 'Tell-Show-Do approach with friendly terminology so little ones feel secure and celebrated.',
    iconName: 'HeartHandshake',
    category: 'General',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    isVisible: true,
    order: 8
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Pooja R. Kulkarni',
    treatmentName: 'Dental Crown & Smile Restoration',
    rating: 5,
    comment: 'I used to get very anxious before dental appointments. Dr. Rohan Mehta was so patient—he explained every step on the screen before starting. The ceramic crown looks completely natural. Truly a calming, premium clinic experience in Kalyan!',
    date: 'February 2026',
    isVerified: true,
    isDemo: true,
    isVisible: true
  },
  {
    id: 'test-2',
    patientName: 'Aniket Sharma',
    treatmentName: 'Root Canal Treatment & Crown',
    rating: 5,
    comment: 'I came in with terrible tooth pain on a Saturday afternoon. Dr. Mehta handled the root canal with incredible gentleness—I did not feel any discomfort at all. The clinic is spotless and feels like a modern wellness lounge.',
    date: 'January 2026',
    isVerified: true,
    isDemo: true,
    isVisible: true
  },
  {
    id: 'test-3',
    patientName: 'Meera Deshmukh',
    treatmentName: 'Clear Aligners & Whitening',
    rating: 5,
    comment: 'Completed my aligner treatment for front tooth spacing. The progress was smooth, transparent, and comfortable. Dr. Rohan’s prosthodontic background shows in his attention to minute bite details. Highly recommended.',
    date: 'December 2025',
    isVerified: true,
    isDemo: true,
    isVisible: true
  },
  {
    id: 'test-4',
    patientName: 'Vikas N. Patil',
    treatmentName: 'Dental Implants',
    rating: 5,
    comment: 'Had two missing molars replaced with dental implants. From the 3D planning to final crown placement, everything was executed with clinical excellence. Chewing feels completely normal again.',
    date: 'November 2025',
    isVerified: true,
    isDemo: true,
    isVisible: true
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Consultation & Treatment Suite',
    category: 'Clinic',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    caption: 'Serene, ergonomic dental operatory featuring digital intraoral imaging and sterilized instruments.',
    isDemo: false,
    isVisible: true,
    order: 1
  },
  {
    id: 'gal-2',
    title: 'Precision Prosthodontic Planning',
    category: 'Dentistry',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    caption: 'Dr. Rohan Mehta inspecting digital crown margins and customized shade matching for anterior restorations.',
    isDemo: false,
    isVisible: true,
    order: 2
  },
  {
    id: 'gal-3',
    title: 'Porcelain Veneer Smile Transformation',
    category: 'Smile Inspiration',
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Natural translucency and shade harmony achieved through conservative porcelain veneers.',
    isDemo: true,
    isVisible: true,
    order: 3
  },
  {
    id: 'gal-4',
    title: 'Relaxing Patient Lounge',
    category: 'Clinic',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    caption: 'Warm neutral reception area designed to reduce clinical anxiety and ensure peaceful waiting.',
    isDemo: false,
    isVisible: true,
    order: 4
  },
  {
    id: 'gal-5',
    title: 'Modern Sterilization Suite',
    category: 'Clinic',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    caption: 'Class-B hospital-grade autoclave sterilization protocols ensuring total patient safety.',
    isDemo: false,
    isVisible: true,
    order: 5
  },
  {
    id: 'gal-6',
    title: 'Clear Aligner Alignment Case',
    category: 'Smile Inspiration',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80',
    caption: 'Completed midline and arch alignment over a 10-month clear aligner therapy.',
    isDemo: true,
    isVisible: true,
    order: 6
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How often should I visit PearlCare for a dental checkup and cleaning?',
    answer: 'For most adults and children, we recommend a routine preventive checkup and professional scaling every 6 months. Regular visits allow us to detect minor enamel demineralization or gum inflammation before they progress into painful concerns, saving you time and cost.',
    category: 'General Care',
    isVisible: true,
    order: 1
  },
  {
    id: 'faq-2',
    question: 'Are modern root canal treatments painful?',
    answer: 'With contemporary localized anesthesia protocols and rotary endodontic instruments, a root canal at PearlCare feels very similar to having a routine filling placed. Our primary goal is to immediately eliminate the pain caused by the infected tooth nerve in a gentle, reassuring manner.',
    category: 'Root Canal & Pain',
    isVisible: true,
    order: 2
  },
  {
    id: 'faq-3',
    question: 'Am I a candidate for clear aligners instead of traditional braces?',
    answer: 'Clear aligners are highly effective for correcting mild to moderate crowding, gaps, rotations, and overbites in adults and teenagers. During your initial consultation, Dr. Rohan Mehta will evaluate your bite, take digital impressions, and determine if aligners are the best orthodontic route for your goals.',
    category: 'Orthodontics',
    isVisible: true,
    order: 3
  },
  {
    id: 'faq-4',
    question: 'How do I know if I need a dental implant or a dental bridge?',
    answer: 'Both replace missing teeth, but they work differently. A dental implant replaces both the tooth root and crown without modifying neighboring healthy teeth, helping preserve jawbone volume. A bridge relies on adjacent teeth for support. Dr. Mehta will review your 3D X-rays and bone density to recommend the ideal solution.',
    category: 'Restorative',
    isVisible: true,
    order: 4
  },
  {
    id: 'faq-5',
    question: 'At what age should my child have their first dental visit?',
    answer: 'We encourage parents to bring their child when their first baby tooth erupts or around their first birthday. Early visits are fun, relaxed milestone introductions that help children become familiar with the dental chair and establish positive lifelong oral hygiene habits.',
    category: 'Kids Dentistry',
    isVisible: true,
    order: 5
  },
  {
    id: 'faq-6',
    question: 'How does appointment booking and consultation work?',
    answer: 'You can easily request your preferred appointment date and time through our website booking form, phone call, or WhatsApp. Our clinic coordinator will contact you promptly to confirm your slot. During your first visit, Dr. Mehta conducts a thorough oral examination and clearly outlines all options before any treatment begins.',
    category: 'Appointments',
    isVisible: true,
    order: 6
  }
];

export const initialHomepageContent: HomepageContent = {
  heroEyebrow: 'Dr. Rohan Mehta • Kalyan West, Maharashtra',
  heroHeadline: 'A Healthier Smile Starts Here.',
  heroSupportingText: 'Comprehensive dental care designed around your comfort, confidence and long-term oral health.',
  heroPrimaryCtaText: 'Book an Appointment',
  heroSecondaryCtaText: 'Explore Treatments',
  stats: {
    yearsExp: '12+',
    yearsLabel: 'Years Clinical Experience',
    patientsServed: '5,000+',
    patientsLabel: 'Smiles Cared For',
    servicesCount: '8+',
    servicesLabel: 'Specialized Treatments',
    patientRating: '4.9/5',
    ratingLabel: 'Patient Satisfaction Rating'
  },
  philosophyEyebrow: 'Our Care Philosophy',
  philosophyTitle: 'Dentistry That Puts You at Ease.',
  philosophyDescription: 'We believe dental visits should be calm, transparent, and unhurried. From our soothing clinic environment to detailed digital explanations, every detail is engineered to alleviate anxiety and protect your natural teeth.',
  doctorIntroHeadline: 'Expertise You Can Feel Confident In.',
  ctaBannerHeadline: 'Ready for a Healthier, More Confident Smile?',
  ctaBannerSupportingText: 'Whether you need a routine checkup, relief from discomfort, or a full restorative consultation, our gentle team is here for you.'
};

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-101',
    patientName: 'Kavita Joshi',
    phone: '+91 98201 54321',
    email: 'kavita.joshi@example.com',
    preferredDate: '2026-09-03',
    preferredTime: '11:30 AM',
    treatment: 'Teeth Cleaning & Polishing',
    message: 'Routine checkup and scaling. First time visiting PearlCare.',
    status: 'New',
    notes: 'Called patient to confirm location landmark; WhatsApp appointment details sent.',
    submittedAt: '2026-09-01T08:15:00Z'
  },
  {
    id: 'apt-102',
    patientName: 'Rahul Verma',
    phone: '+91 98190 67890',
    email: 'rahul.v@example.com',
    preferredDate: '2026-09-04',
    preferredTime: '05:30 PM',
    treatment: 'Dental Implants',
    message: 'Missing lower molar on left side. Looking for consultation with Dr. Mehta.',
    status: 'Confirmed',
    notes: 'Confirmed 5:30 PM slot. Advised to bring previous OPG X-ray if available.',
    submittedAt: '2026-08-31T14:20:00Z'
  },
  {
    id: 'apt-103',
    patientName: 'Sneha Chawla',
    phone: '+91 97654 32109',
    email: 'sneha.c@example.com',
    preferredDate: '2026-09-02',
    preferredTime: '04:00 PM',
    treatment: 'Braces & Clear Aligners',
    message: 'Interested in invisible aligners for front teeth alignment.',
    status: 'Contacted',
    notes: 'Spoke on WhatsApp. Sent preliminary aligner information brochure.',
    submittedAt: '2026-08-30T10:10:00Z'
  },
  {
    id: 'apt-104',
    patientName: 'Amit G. Shinde',
    phone: '+91 98334 11223',
    email: 'amit.shinde@example.com',
    preferredDate: '2026-08-28',
    preferredTime: '06:00 PM',
    treatment: 'Root Canal Treatment',
    message: 'Severe sensitivity on upper right molar when drinking cold water.',
    status: 'Completed',
    notes: 'RCT completed successfully. Permanent zirconia crown cementation scheduled next week.',
    submittedAt: '2026-08-27T09:45:00Z'
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-201',
    name: 'Sunil Rao',
    phone: '+91 98210 98765',
    email: 'sunil.rao@example.com',
    subject: 'Consultation fee & Sunday availability',
    message: 'Hi, do you take appointments on Sunday mornings for elderly patients? Need consultation for full mouth denture.',
    status: 'New',
    notes: 'Sunday 10 AM - 2 PM is open. Need to call back.',
    submittedAt: '2026-09-01T07:40:00Z'
  },
  {
    id: 'enq-202',
    name: 'Priyanka Patil',
    phone: '+91 98920 44556',
    email: 'priyanka.p@example.com',
    subject: 'Teeth whitening for upcoming wedding',
    message: 'Looking for in-clinic teeth whitening next week. How many days before an event is recommended?',
    status: 'Contacted',
    notes: 'Informed that 3–5 days prior to event is ideal. Offered slot for Friday.',
    submittedAt: '2026-08-31T16:00:00Z'
  },
  {
    id: 'enq-203',
    name: 'Gaurav K.',
    phone: '+91 97022 33445',
    email: 'gaurav.k@example.com',
    subject: 'Child tooth filling enquiry',
    message: 'My 6-year-old has a cavity in a milk molar. Do you do gentle pediatric restorations?',
    status: 'Resolved',
    notes: 'Reassured parent about our Tell-Show-Do approach. Booked consultation.',
    submittedAt: '2026-08-29T11:30:00Z'
  }
];

export const initialAdminSettings: AdminSettings = {
  enableOnlineBooking: true,
  whatsappPrefillMessage: 'Hello Dr. Rohan Mehta, I would like to enquire about an appointment at PearlCare Dental Studio.',
  seoTitle: 'PearlCare Dental Studio | Dr. Rohan Mehta | Kalyan West',
  seoDescription: 'Modern dentistry, gentle care, and confident smiles by Dr. Rohan Mehta at PearlCare Dental Studio, Kalyan West. Dental Implants, Cosmetic Dentistry & Prosthodontics.',
  notificationEmail: 'hello@pearlcaredental.in',
  supabaseUrl: 'https://cnokwvxaewrpfkhkhcto.supabase.co',
  supabaseAnonKey: 'sb_publishable__B2PQ0opN1D1NYNACBMfwA_DvNLzBvr',
  isSupabaseEnabled: true
};
