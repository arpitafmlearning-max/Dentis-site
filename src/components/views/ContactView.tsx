import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { BookingForm } from '../booking/BookingForm';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { clinicInfo, addEnquiry } = useClinic();
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone || !enquiryForm.message) return;

    setEnquirySubmitting(true);
    try {
      await addEnquiry({
        name: enquiryForm.name,
        phone: enquiryForm.phone,
        email: enquiryForm.email || `${enquiryForm.phone}@patient.temp`,
        subject: enquiryForm.subject || 'General Clinic Question',
        message: enquiryForm.message
      });
      setEnquirySuccess(true);
      setEnquiryForm({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setEnquirySubmitting(false);
    }
  };

  const handleDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      clinicInfo.googleMapsQuery || 'Shop 4 Silver Heights Murbad Road Kalyan West Maharashtra 421301'
    )}`;
    window.open(url, '_blank');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hello Dr. Rohan Mehta, I would like to make an enquiry regarding dental care at PearlCare.');
    const cleanPhone = clinicInfo.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-[#FDFCFB]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider border border-[#E3F2FD]">
          <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>Connect With PearlCare</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A2A44] tracking-tight">
          Your Next Smile Starts With a Conversation.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          Request an appointment with Dr. Rohan Mehta or reach out with any treatment questions. We respond promptly.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clinic Details & Map Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Details Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#E2E8F0] space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#1A2A44]">
                Studio Information
              </h2>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E3F2FD] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Address</h3>
                    <p className="text-slate-800 font-medium">{clinicInfo.name}</p>
                    <p>{clinicInfo.addressLine1}</p>
                    <p>{clinicInfo.addressLine2}</p>
                    <p>{clinicInfo.city}, {clinicInfo.state} – {clinicInfo.pincode}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E3F2FD] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Telephone</h3>
                    <a href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} className="text-[#0D9488] font-semibold hover:underline block">
                      {clinicInfo.phone}
                    </a>
                    <span className="text-xs text-slate-400">Available during operating hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E3F2FD] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Email</h3>
                    <a href={`mailto:${clinicInfo.email}`} className="text-slate-800 hover:text-[#0D9488] font-medium block">
                      {clinicInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E3F2FD] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Studio Hours</h3>
                    <p className="font-medium text-slate-800">{clinicInfo.weekdayHours}</p>
                    <p className="text-xs text-slate-500">{clinicInfo.weekendHours}</p>
                  </div>
                </div>
              </div>

              {/* Direct Route CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleDirections}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#1A2A44] hover:bg-[#243B5A] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="py-3 px-4 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Visual Location Frame with Map Mockup & Direction Guide */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#1A2A44]">
                  Location in Kalyan West
                </h3>
                <span className="text-[11px] font-semibold text-[#0F766E] bg-[#E3F2FD] px-2.5 py-0.5 rounded-full border border-[#E3F2FD]">
                  Murbad Road Landmark
                </span>
              </div>

              {/* Map Display Card */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-[#E2E8F0] aspect-[16/9] flex items-center justify-center group cursor-pointer" onClick={handleDirections}>
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-200 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1A2A44] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <p className="font-serif font-bold text-slate-800 mt-2 text-sm">
                    Shop 4, Silver Heights, Murbad Rd
                  </p>
                  <p className="text-xs text-slate-500">
                    Opposite Syndicate Bank • Kalyan West
                  </p>
                  <span className="mt-2 text-[11px] font-semibold text-[#0D9488] inline-flex items-center gap-1 group-hover:underline">
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Booking & Enquiry (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-[#E2E8F0] space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F2FD] text-[#1A2A44] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#E3F2FD]">
                <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>Online Booking</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#1A2A44]">
                Book Your Dental Appointment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-light">
                Fill out the form below. We will review Dr. Mehta's schedule and confirm your preferred slot within 2 business hours.
              </p>
            </div>

            <BookingForm />
          </div>
        </div>

        {/* Quick General Enquiry Form */}
        <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-[#E2E8F0]">
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#1A2A44]">
                Have a Quick General Question?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Send us a short message and our clinic coordinator will assist you with pricing guidance, consultation protocols, or directions.
              </p>
            </div>

            {enquirySuccess ? (
              <div className="p-6 bg-white rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-slate-800 text-lg">Thank You!</h4>
                <p className="text-xs text-slate-600">Your enquiry has been received. We will respond promptly.</p>
                <button
                  type="button"
                  onClick={() => setEnquirySuccess(false)}
                  className="text-xs text-[#0D9488] font-semibold underline mt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3.5 text-left max-w-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-white text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98190 12345"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-white text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject / Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Clear aligner cost & Sunday consultation"
                    value={enquiryForm.subject}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-white text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Write your question here..."
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-white text-sm rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={enquirySubmitting}
                  className="w-full py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{enquirySubmitting ? 'Sending Message...' : 'Send Direct Message to Clinic'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
