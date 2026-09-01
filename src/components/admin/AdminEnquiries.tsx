import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Enquiry, EnquiryStatus } from '../../types';
import {
  Inbox,
  Search,
  Phone,
  MessageCircle,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  User,
  Filter
} from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useClinic();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const statuses: (EnquiryStatus | 'All')[] = ['All', 'New', 'Contacted', 'Resolved'];

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    const matchesSearch =
      enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.phone.includes(searchTerm) ||
      enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete enquiry from ${name}?`)) {
      deleteEnquiry(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-3xl border border-[#E8E5DF] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inquiries, phone, messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF9F6] text-xs rounded-xl border border-[#E8E5DF] focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E8E5DF]'
              }`}
            >
              {st} ({st === 'All' ? enquiries.length : enquiries.filter(e => e.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEnquiries.length === 0 ? (
          <div className="col-span-2 bg-white rounded-3xl p-12 text-center text-slate-400 border border-[#E8E5DF]">
            No patient inquiries found matching your filters.
          </div>
        ) : (
          filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-3xl p-6 border border-[#E8E5DF] shadow-2xs hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#0B192C]">
                      {enq.name}
                    </h3>
                    <p className="text-xs text-slate-500">{enq.phone} • {enq.email}</p>
                  </div>

                  <select
                    value={enq.status}
                    onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                    className={`text-xs font-bold rounded-lg border py-1 px-2 focus:outline-none ${
                      enq.status === 'New'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : enq.status === 'Contacted'
                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    <option value="New">● New</option>
                    <option value="Contacted">● Contacted</option>
                    <option value="Resolved">● Resolved</option>
                  </select>
                </div>

                {/* Subject & Message */}
                <div className="bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#E8E5DF] space-y-1">
                  {enq.subject && (
                    <span className="text-[11px] font-bold text-[#0D5C63] uppercase tracking-wider block">
                      {enq.subject}
                    </span>
                  )}
                  <p className="text-xs text-slate-700 leading-relaxed font-light">
                    "{enq.message}"
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Received: {new Date(enq.createdAt).toLocaleString()}
                </span>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${enq.phone.replace(/\s+/g, '')}`}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, thank you for contacting PearlCare Dental Studio regarding: "${enq.message.slice(0, 50)}..."`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`mailto:${enq.email}?subject=${encodeURIComponent(`Response from PearlCare Dental Studio`)}`}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                    title="Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleDelete(enq.id, enq.name)}
                    className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
