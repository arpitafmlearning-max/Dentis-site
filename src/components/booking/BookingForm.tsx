import React, { useState, useEffect } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingFormProps {
  onSuccess?: () => void;
  defaultTreatment?: string;
  isCompact?: boolean;
}

const TIME_SLOTS = [
  '10:30 AM', '11:30 AM', '12:30 PM',
  '02:30 PM', '03:30 PM', '04:30 PM',
  '05:30 PM', '06:30 PM', '07:30 PM'
];

export const BookingForm: React.FC<BookingFormProps> = ({
  onSuccess,
  defaultTreatment,
  isCompact = false
}) => {
  const { treatments, addAppointment, clinicInfo, settings } = useClinic();

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '11:30 AM',
    treatment: defaultTreatment || 'General Consultation & Checkup',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Set minimum date to today
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (defaultTreatment) {
      setFormData(prev => ({ ...prev, treatment: defaultTreatment }));
    }
  }, [defaultTreatment]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.patientName.trim()) {
      errs.patientName = 'Please provide your full name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your phone number.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred date.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await addAppointment({
        patientName: formData.patientName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        treatment: formData.treatment,
        message: formData.message.trim()
      });

      // Generate reference ID
      const ref = 'PC-' + Math.floor(10000 + Math.random() * 90000);
      setBookingRef(ref);
      setIsSuccess(true);

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 3500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Dr. Rohan Mehta, I would like to confirm my appointment request at PearlCare Dental Studio:\n\n• Name: ${formData.patientName || 'Patient'}\n• Treatment: ${formData.treatment}\n• Preferred Date: ${formData.preferredDate || 'Upcoming'}\n• Preferred Time: ${formData.preferredTime}\n• Phone: ${formData.phone}`
    );
    const cleanPhone = clinicInfo.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 px-4 sm:px-6 space-y-5">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-100 animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#0D9488] uppercase bg-[#E3F2FD] px-3 py-1 rounded-full border border-[#E3F2FD]">
            Request Received • Ref #{bookingRef}
          </span>
          <h3 className="text-2xl font-serif font-semibold text-[#1A2A44]">
            We Look Forward to Welcoming You
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-light">
            Thank you, <strong className="text-slate-800 font-semibold">{formData.patientName}</strong>. Our clinic coordinator will call you at <strong className="text-slate-800 font-semibold">{formData.phone}</strong> shortly to confirm your {formData.preferredDate} ({formData.preferredTime}) slot.
          </p>
        </div>

        <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl max-w-md mx-auto text-left text-xs text-slate-600 space-y-2">
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-500">Clinic:</span>
            <span className="font-semibold text-slate-800">{clinicInfo.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-500">Doctor:</span>
            <span className="font-semibold text-slate-800">{clinicInfo.doctorName} (MDS)</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-500">Service:</span>
            <span className="font-semibold text-slate-800">{formData.treatment}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Location:</span>
            <span className="font-medium text-slate-700">Shop 4, Silver Heights, Kalyan West</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={handleWhatsAppDirect}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <span>Message on WhatsApp for Instant Confirmation</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Pooja Kulkarni"
              value={formData.patientName}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, patientName: e.target.value }));
                if (errors.patientName) setErrors(prev => ({ ...prev, patientName: '' }));
              }}
              className={`w-full pl-10 pr-3 py-2.5 bg-[#F8FAFC] text-sm text-slate-800 rounded-xl border focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 transition-all ${
                errors.patientName ? 'border-rose-400 ring-1 ring-rose-300' : 'border-[#E2E8F0] focus:border-[#0D9488]'
              }`}
            />
          </div>
          {errors.patientName && <p className="text-xs text-rose-500 mt-1">{errors.patientName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="e.g. 98765 43210"
              value={formData.phone}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, phone: e.target.value }));
                if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
              }}
              className={`w-full pl-10 pr-3 py-2.5 bg-[#F8FAFC] text-sm text-slate-800 rounded-xl border focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 transition-all ${
                errors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-[#E2E8F0] focus:border-[#0D9488]'
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Email & Treatment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="e.g. pooja@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
              }}
              className={`w-full pl-10 pr-3 py-2.5 bg-[#F8FAFC] text-sm text-slate-800 rounded-xl border focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 transition-all ${
                errors.email ? 'border-rose-400 ring-1 ring-rose-300' : 'border-[#E2E8F0] focus:border-[#0D9488]'
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Treatment / Concern
          </label>
          <select
            value={formData.treatment}
            onChange={(e) => setFormData(prev => ({ ...prev, treatment: e.target.value }))}
            className="w-full px-3.5 py-2.5 bg-[#F8FAFC] text-sm text-slate-800 rounded-xl border border-[#E2E8F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
          >
            <option value="General Consultation & Checkup">General Consultation & Checkup</option>
            {treatments.filter(t => t.isVisible).map(t => (
              <option key={t.id} value={t.title}>{t.title}</option>
            ))}
            <option value="Emergency Toothache / Pain Relief">Emergency Toothache / Pain Relief</option>
            <option value="Second Opinion / Restorative Plan">Second Opinion / Restorative Plan</option>
          </select>
        </div>
      </div>

      {/* Preferred Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              min={todayStr}
              value={formData.preferredDate}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, preferredDate: e.target.value }));
                if (errors.preferredDate) setErrors(prev => ({ ...prev, preferredDate: '' }));
              }}
              className={`w-full pl-10 pr-3 py-2.5 bg-[#F8FAFC] text-sm text-slate-800 rounded-xl border focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 transition-all ${
                errors.preferredDate ? 'border-rose-400 ring-1 ring-rose-300' : 'border-[#E2E8F0] focus:border-[#0D9488]'
              }`}
            />
          </div>
          {errors.preferredDate && <p className="text-xs text-rose-500 mt-1">{errors.preferredDate}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Time Slot
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8FAFC] text-sm text-slate-800 rounded-xl border border-[#E2E8F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Tell Us About Your Concerns <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <textarea
            rows={isCompact ? 2 : 3}
            placeholder="e.g. I have sensitivity when having cold drinks, or looking for cosmetic smile enhancement..."
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            className="w-full pl-10 pr-3 py-2.5 bg-[#F8FAFC] text-sm text-slate-800 rounded-xl border border-[#E2E8F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all resize-none"
          />
        </div>
      </div>

      {/* Privacy note */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-[#0D9488] shrink-0" />
        <span>Your information is strictly confidential and used solely for appointment coordination.</span>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>Confirm & Request Appointment</span>
          </>
        )}
      </button>
    </form>
  );
};
