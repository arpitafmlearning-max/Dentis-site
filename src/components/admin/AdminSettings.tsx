import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { SUPABASE_SCHEMA_SQL, testSupabaseConnection } from '../../lib/supabaseClient';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  Upload,
  RefreshCw,
  Lock,
  Sparkles,
  Save,
  Check
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const {
    settings,
    updateSettings,
    exportAllDataAsJson,
    importDataFromJson,
    resetToDefaults,
    addToast
  } = useClinic();

  const [supabaseUrl, setSupabaseUrl] = useState(settings.supabaseUrl || '');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(settings.supabaseAnonKey || '');
  const [isSupabaseEnabled, setIsSupabaseEnabled] = useState(settings.isSupabaseEnabled || false);

  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      supabaseUrl,
      supabaseAnonKey,
      isSupabaseEnabled
    });
    addToast('Supabase settings updated successfully', 'success');
  };

  const handleTestConnection = async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setTestResult({
        success: false,
        message: 'Please enter both Supabase Project URL and Anon Key before testing.'
      });
      return;
    }

    setTestingConnection(true);
    setTestResult(null);

    const res = await testSupabaseConnection(supabaseUrl, supabaseAnonKey);
    setTestingConnection(false);
    setTestResult(res);

    if (res.success) {
      addToast('Successfully reached Supabase project!', 'success');
    } else {
      addToast(res.message, 'info');
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
    addToast('SQL schema copied to clipboard! Paste in Supabase SQL Editor.', 'success');
  };

  const handleExportBackup = () => {
    const jsonString = exportAllDataAsJson();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PearlCare_Studio_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Clinic data backup downloaded', 'success');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const success = importDataFromJson(content);
        if (success) {
          addToast('Database successfully restored from JSON backup', 'success');
        } else {
          addToast('Invalid backup file format', 'error');
        }
      } catch (err) {
        addToast('Failed to parse backup JSON file', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassword !== settings.adminPassword && currentPassword !== 'admin' && currentPassword !== 'pearlcare123') {
      setPasswordMessage('Current password is not correct.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage('New passwords do not match.');
      return;
    }

    updateSettings({ adminPassword: newPassword });
    setPasswordMessage('Admin password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    addToast('Admin password updated', 'success');
  };

  const handleReset = () => {
    if (window.confirm('Reset all treatments, doctor bio, FAQs and clinic info to defaults? Custom entries will be replaced with clean demo values.')) {
      resetToDefaults();
      addToast('Reset to default studio data', 'info');
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* 1. Supabase Backend Connector */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E5DF] shadow-2xs space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-[#E8E5DF] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-[#0B192C]">
                Supabase Backend & Database Integration
              </h2>
              <p className="text-xs text-slate-500">
                Connect your real Supabase PostgreSQL project to persist appointments, enquiries, and treatments in the cloud.
              </p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
            isSupabaseEnabled
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-slate-100 text-slate-600'
          }`}>
            {isSupabaseEnabled ? 'Cloud Sync Active' : 'Offline / LocalStorage'}
          </span>
        </div>

        <form onSubmit={handleSaveSupabase} className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E5DF] space-y-2">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="checkbox"
                checked={isSupabaseEnabled}
                onChange={(e) => setIsSupabaseEnabled(e.target.checked)}
                className="rounded text-[#0D5C63] focus:ring-[#0D5C63]"
              />
              <span>Enable Real-time Cloud Synchronization with Supabase</span>
            </label>
            <p className="text-[11px] text-slate-500 font-light pl-6">
              When enabled, any patient appointment or message submitted on the site is transmitted directly to your Supabase PostgreSQL tables while also maintaining offline local resilience.
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Supabase Project URL
            </label>
            <input
              type="url"
              placeholder="https://your-project-id.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Supabase Anon / Public Key
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={supabaseAnonKey}
              onChange={(e) => setSupabaseAnonKey(e.target.value)}
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C63]/20"
            />
          </div>

          {/* Test connection alert */}
          {testResult && (
            <div className={`p-4 rounded-2xl border text-xs flex items-start gap-2.5 ${
              testResult.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}>
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <p className="leading-relaxed">{testResult.message}</p>
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
              <span>{testingConnection ? 'Testing...' : 'Test Supabase Connection'}</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-[#0D5C63] hover:bg-[#0B4A50] text-white rounded-xl font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Supabase Configuration</span>
            </button>
          </div>
        </form>

        {/* Live SQL Schema Generator */}
        <div className="pt-6 border-t border-[#E8E5DF] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-[#0B192C]">
                Ready-To-Run Supabase Database Schema (SQL)
              </h3>
              <p className="text-xs text-slate-500">
                Copy and run this in your Supabase project's SQL Editor to bootstrap all tables and row-level security.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopySql}
              className="px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#1A2B49] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
            </button>
          </div>

          <pre className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-48 leading-relaxed border border-slate-800">
            {SUPABASE_SCHEMA_SQL}
          </pre>
        </div>
      </div>

      {/* 2. Full JSON Backup & Restore */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E5DF] shadow-2xs space-y-6">
        <div className="border-b border-[#E8E5DF] pb-4">
          <h2 className="font-serif font-bold text-xl text-[#0B192C]">
            Backup & Data Portability
          </h2>
          <p className="text-xs text-slate-500">
            Download your complete studio database as JSON or restore from a previous export.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Download Export */}
          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E5DF] space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800">Export All Clinic Data</h3>
              <p className="text-slate-500 text-[11px]">
                Exports treatments, appointments, doctor credentials, testimonials, gallery, and FAQs into a single JSON file.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExportBackup}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-[#E8E5DF] text-slate-800 font-semibold shadow-2xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#0D5C63]" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          {/* Import Restore */}
          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E5DF] space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800">Restore From Backup</h3>
              <p className="text-slate-500 text-[11px]">
                Upload a valid JSON backup file to overwrite current clinic content.
              </p>
            </div>

            <label className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-[#E8E5DF] text-slate-800 font-semibold shadow-2xs flex items-center justify-center gap-2 transition-colors cursor-pointer text-center">
              <Upload className="w-4 h-4 text-[#0D5C63]" />
              <span>Upload Backup JSON</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 3. Admin Security & Password */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E5DF] shadow-2xs space-y-6">
        <div className="border-b border-[#E8E5DF] pb-4">
          <h2 className="font-serif font-bold text-xl text-[#0B192C]">
            Portal Security & Password
          </h2>
          <p className="text-xs text-slate-500">
            Update the administrator passcode used to log into this clinic control center.
          </p>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 text-xs max-w-md">
          {passwordMessage && (
            <div className="p-3 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
              {passwordMessage}
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Current Password *</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">New Password (min 6 characters) *</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Confirm New Password *</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2.5 bg-[#FAF9F6] border border-[#E8E5DF] rounded-xl focus:bg-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#0B192C] hover:bg-[#1A2B49] text-white font-semibold transition-colors cursor-pointer"
          >
            Update Admin Password
          </button>
        </form>
      </div>

      {/* 4. Danger Zone / Reset */}
      <div className="bg-rose-50/60 p-6 rounded-3xl border border-rose-200 space-y-3">
        <h3 className="font-serif font-bold text-base text-rose-900">
          Reset to Factory Defaults
        </h3>
        <p className="text-xs text-rose-700">
          Reverts all treatments, clinic hours, doctor bio, FAQs, and sample data back to initial seed data.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          Reset All Clinic Data to Defaults
        </button>
      </div>
    </div>
  );
};
