import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Appointment, AppointmentStatus } from '../../types';
import {
  Calendar,
  Search,
  Filter,
  Phone,
  MessageCircle,
  Mail,
  Trash2,
  Edit3,
  Download,
  Plus,
  CheckCircle,
  Clock,
  User,
  FileText,
  X
} from 'lucide-react';

export const AdminAppointments: React.FC = () => {
  const {
    appointments,
    updateAppointmentStatus,
    updateAppointmentNotes,
    deleteAppointment,
    setIsBookingModalOpen
  } = useClinic();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedAppointmentForNotes, setSelectedAppointmentForNotes] = useState<Appointment | null>(null);
  const [noteText, setNoteText] = useState('');

  const statuses: (AppointmentStatus | 'All')[] = [
    'All',
    'New',
    'Contacted',
    'Confirmed',
    'Completed',
    'Cancelled'
  ];

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    updateAppointmentStatus(id, newStatus);
  };

  const handleOpenNotes = (apt: Appointment) => {
    setSelectedAppointmentForNotes(apt);
    setNoteText(apt.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedAppointmentForNotes) {
      updateAppointmentNotes(selectedAppointmentForNotes.id, noteText);
      setSelectedAppointmentForNotes(null);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the appointment for ${name}?`)) {
      deleteAppointment(id);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID,Patient Name,Phone,Email,Treatment,Preferred Date,Preferred Time,Status,Created At,Message,Notes'];
    const rows = appointments.map((a) =>
      [
        `"${a.id}"`,
        `"${a.patientName}"`,
        `"${a.phone}"`,
        `"${a.email}"`,
        `"${a.treatment}"`,
        `"${a.preferredDate}"`,
        `"${a.preferredTime}"`,
        `"${a.status}"`,
        `"${a.createdAt}"`,
        `"${(a.message || '').replace(/"/g, '""')}"`,
        `"${(a.notes || '').replace(/"/g, '""')}"`
      ].join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PearlCare_Appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Contacted':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Completed':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white p-6 rounded-3xl border border-[#E8E5DF] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient, phone, treatment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF9F6] text-xs rounded-xl border border-[#E8E5DF] focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-[#E8E5DF] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-4 py-2 bg-[#0D5C63] hover:bg-[#0B4A50] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {statuses.map((st) => {
          const count = st === 'All' ? appointments.length : appointments.filter(a => a.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                statusFilter === st
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E8E5DF]'
              }`}
            >
              <span>{st}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                statusFilter === st ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Appointments Data Table */}
      <div className="bg-white rounded-3xl border border-[#E8E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-[#E8E5DF]">
              <tr>
                <th className="py-3.5 px-4">Patient Information</th>
                <th className="py-3.5 px-4">Treatment & Request</th>
                <th className="py-3.5 px-4">Date & Slot</th>
                <th className="py-3.5 px-4">Status & Progression</th>
                <th className="py-3.5 px-4">Notes</th>
                <th className="py-3.5 px-4 text-right">Direct Patient Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No appointments found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Patient info */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 text-sm block">
                          {apt.patientName}
                        </span>
                        <span className="text-slate-600 block">{apt.phone}</span>
                        <span className="text-[11px] text-slate-400 block truncate max-w-[150px]">
                          {apt.email}
                        </span>
                        <span className="text-[10px] text-slate-400 block pt-1">
                          Booked: {new Date(apt.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </td>

                    {/* Treatment & Message */}
                    <td className="py-4 px-4 align-top max-w-[200px]">
                      <div className="space-y-1">
                        <span className="inline-block font-semibold text-[#0D5C63] bg-[#0D5C63]/10 px-2 py-0.5 rounded-lg text-xs">
                          {apt.treatment}
                        </span>
                        {apt.message && (
                          <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
                            "{apt.message}"
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Date & Slot */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800 block">
                          {apt.preferredDate}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded inline-block">
                          {apt.preferredTime}
                        </span>
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-2">
                        <select
                          value={apt.status}
                          onChange={(e) => handleStatusChange(apt.id, e.target.value as AppointmentStatus)}
                          className={`w-full text-xs font-bold rounded-lg border py-1.5 px-2 focus:outline-none ${getStatusBadge(apt.status)}`}
                        >
                          <option value="New">● New</option>
                          <option value="Contacted">● Contacted</option>
                          <option value="Confirmed">● Confirmed</option>
                          <option value="Completed">● Completed</option>
                          <option value="Cancelled">● Cancelled</option>
                        </select>
                      </div>
                    </td>

                    {/* Notes preview */}
                    <td className="py-4 px-4 align-top max-w-[150px]">
                      <button
                        onClick={() => handleOpenNotes(apt)}
                        className="text-left group flex items-start gap-1.5 text-xs text-slate-600 hover:text-[#0D5C63]"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0D5C63] shrink-0 mt-0.5" />
                        <span className="truncate block max-w-[120px]">
                          {apt.notes ? apt.notes : <span className="italic text-slate-400">Add note...</span>}
                        </span>
                      </button>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-4 align-top text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${apt.phone.replace(/\s+/g, '')}`}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Call Patient"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={`https://wa.me/${apt.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${apt.patientName}, this is PearlCare Dental Studio (Dr. Rohan Mehta). Regarding your appointment request for ${apt.treatment} on ${apt.preferredDate} (${apt.preferredTime}):`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                          title="WhatsApp Confirmation"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={`mailto:${apt.email}?subject=${encodeURIComponent(`Your Dental Consultation - PearlCare Studio`)}`}
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                          title="Email Patient"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => handleDelete(apt.id, apt.patientName)}
                          className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete appointment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Notes Modal */}
      {selectedAppointmentForNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E8E5DF] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0B192C]">
                  Internal Patient Notes
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedAppointmentForNotes.patientName} • {selectedAppointmentForNotes.treatment}
                </p>
              </div>
              <button
                onClick={() => setSelectedAppointmentForNotes(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <textarea
              rows={4}
              placeholder="e.g. Patient mentioned mild sensitivity on lower molar. Confirmed 4 PM slot via WhatsApp call."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full p-3 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20 resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedAppointmentForNotes(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-4 py-2 text-xs font-semibold bg-[#0D5C63] hover:bg-[#0B4A50] text-white rounded-xl shadow-xs"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
