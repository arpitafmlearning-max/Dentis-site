import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { AdminTab, AppointmentStatus } from '../../types';
import {
  Calendar,
  Inbox,
  Stethoscope,
  Database,
  ArrowRight,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  UserCheck,
  Building2,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  setActiveTab: (tab: AdminTab) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveTab }) => {
  const {
    appointments,
    enquiries,
    treatments,
    settings,
    clinicInfo,
    updateAppointmentStatus,
    setIsBookingModalOpen
  } = useClinic();

  const totalAppointments = appointments.length;
  const newAppointments = appointments.filter(a => a.status === 'New').length;
  const confirmedAppointments = appointments.filter(a => a.status === 'Confirmed').length;
  const newEnquiries = enquiries.filter(e => e.status === 'New').length;
  const totalEnquiries = enquiries.length;

  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentEnquiries = [...enquiries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Completed':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* 4 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Appointments */}
        <div
          onClick={() => setActiveTab('appointments')}
          className="bg-white p-6 rounded-3xl border border-[#E8E5DF] shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Appointments
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0D5C63] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-serif text-3xl font-bold text-[#0B192C]">
              {totalAppointments}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                {newAppointments} New
              </span>
              <span className="text-[11px] text-slate-400">
                {confirmedAppointments} Confirmed
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2: Enquiries */}
        <div
          onClick={() => setActiveTab('enquiries')}
          className="bg-white p-6 rounded-3xl border border-[#E8E5DF] shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Patient Enquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-serif text-3xl font-bold text-[#0B192C]">
              {totalEnquiries}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {newEnquiries} Pending Followup
              </span>
            </div>
          </div>
        </div>

        {/* Metric 3: Active Treatments */}
        <div
          onClick={() => setActiveTab('treatments')}
          className="bg-white p-6 rounded-3xl border border-[#E8E5DF] shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Services
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-serif text-3xl font-bold text-[#0B192C]">
              {treatments.filter(t => t.isVisible).length}
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              {treatments.length} Total Registered in Studio
            </p>
          </div>
        </div>

        {/* Metric 4: Supabase / Storage Sync */}
        <div
          onClick={() => setActiveTab('settings')}
          className="bg-white p-6 rounded-3xl border border-[#E8E5DF] shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Database Sync
            </span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              settings.isSupabaseEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
            }`}>
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-[#0B192C] block">
              {settings.isSupabaseEnabled ? 'Supabase Connected' : 'Local Storage'}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {settings.isSupabaseEnabled ? 'Auto-syncing data' : 'Click to configure Cloud DB'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Strip */}
      <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-[#E8E5DF] space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Studio Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-4 py-2 bg-[#0D5C63] hover:bg-[#0B4A50] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Manual Booking</span>
          </button>

          <button
            onClick={() => setActiveTab('treatments')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-[#E8E5DF] rounded-xl text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Stethoscope className="w-4 h-4 text-[#0D5C63]" />
            <span>Manage Treatments</span>
          </button>

          <button
            onClick={() => setActiveTab('doctor')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-[#E8E5DF] rounded-xl text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-[#0D5C63]" />
            <span>Edit Doctor Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-[#E8E5DF] rounded-xl text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Supabase Cloud Integration</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Recent Appointments & Enquiries Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Appointments (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E5DF] shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#0B192C]">
                Recent Appointments
              </h3>
              <p className="text-xs text-slate-500">Latest patient consultation requests</p>
            </div>
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-xs font-bold text-[#0D5C63] hover:underline flex items-center gap-1"
            >
              <span>View All ({totalAppointments})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] text-slate-600 font-bold uppercase tracking-wider text-[10px] border-y border-[#E8E5DF]">
                <tr>
                  <th className="py-2.5 px-3">Patient</th>
                  <th className="py-2.5 px-3">Slot</th>
                  <th className="py-2.5 px-3">Treatment</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      No appointments recorded yet.
                    </td>
                  </tr>
                ) : (
                  recentAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-800 block">{apt.patientName}</span>
                        <span className="text-[11px] text-slate-500">{apt.phone}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-slate-700 block">{apt.preferredDate}</span>
                        <span className="text-[10px] text-slate-400">{apt.preferredTime}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-slate-700 truncate max-w-[120px] block">
                          {apt.treatment}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(apt.status)}`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:${apt.phone.replace(/\s+/g, '')}`}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                            title="Call Patient"
                          >
                            <Phone className="w-3 h-3" />
                          </a>
                          <a
                            href={`https://wa.me/${apt.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${apt.patientName}, confirming your appointment request for ${apt.treatment} at PearlCare Dental Studio.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                            title="WhatsApp Patient"
                          >
                            <MessageCircle className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Enquiries & Clinic Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Enquiries Feed */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E5DF] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#0B192C]">
                Recent Inquiries
              </h3>
              <button
                onClick={() => setActiveTab('enquiries')}
                className="text-xs font-bold text-[#0D5C63] hover:underline"
              >
                Inbox ({newEnquiries}) &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {recentEnquiries.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No inquiries logged yet.</p>
              ) : (
                recentEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E5DF] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800">{enq.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        enq.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 font-light">
                      "{enq.message}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>{enq.phone}</span>
                      <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Clinic Info Card */}
          <div className="bg-[#FAF9F6] rounded-3xl p-6 border border-[#E8E5DF] space-y-3">
            <h4 className="font-serif text-base font-bold text-[#0B192C]">
              Clinic At A Glance
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <p><strong>Studio:</strong> {clinicInfo.name} (Dr. Rohan Mehta)</p>
              <p><strong>Location:</strong> {clinicInfo.addressLine1}, Kalyan West</p>
              <p><strong>Contact:</strong> {clinicInfo.phone} • {clinicInfo.email}</p>
              <p><strong>Hours:</strong> {clinicInfo.weekdayHours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
