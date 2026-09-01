import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Sparkles, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setCurrentPage } = useClinic();
  const [email, setEmail] = useState('admin@pearlcaredental.in');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(password);
  };

  const handleFillDemoCredentials = () => {
    setEmail('admin@pearlcaredental.in');
    setPassword('pearlcare123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A2A44] via-[#102A43] to-[#1A2A44] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Top Header */}
        <div className="bg-[#1A2A44] p-8 text-white text-center relative">
          <button
            onClick={() => setCurrentPage('home')}
            className="absolute top-4 left-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Site</span>
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-3 text-[#D4AF37] shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">
            PearlCare Clinic Studio
          </h1>
          <p className="text-xs text-teal-300 font-medium uppercase tracking-wider mt-1">
            Doctor & Administration Portal
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Demo credential helper pill */}
          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-center justify-between text-xs">
            <div className="text-slate-600">
              <span className="font-bold text-slate-800 block">Demo Access:</span>
              <span className="text-[11px] text-slate-500">password: <code>pearlcare123</code></span>
            </div>
            <button
              type="button"
              onClick={handleFillDemoCredentials}
              className="px-3 py-1.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-lg font-semibold text-[11px] transition-colors cursor-pointer"
            >
              Fill Demo Key
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-[#F8FAFC] text-sm text-slate-800 rounded-xl border border-[#E2E8F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-[#0D9488] font-medium flex items-center gap-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-[#F8FAFC] text-sm text-slate-800 rounded-xl border border-[#E2E8F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#E2E8F0] text-[#0D9488] focus:ring-[#0D9488]"
              />
              <span>Remember session</span>
            </label>
            <span className="text-slate-400 text-[11px]">Kalyan West Studio</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In to Control Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Single Source of Truth • Real-Time Website Sync</span>
          </div>
        </form>
      </div>
    </div>
  );
};
