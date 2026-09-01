import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function formatSupabaseUrl(urlOrProjectId: string): string {
  if (!urlOrProjectId) return '';
  const trimmed = urlOrProjectId.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed.replace(/\/+$/, '');
  }
  // If user provided just the project ID (e.g. cnokwvxaewrpfkhkhcto)
  return `https://${trimmed}.supabase.co`;
}

export function getSupabaseClient(url?: string, anonKey?: string): SupabaseClient | null {
  const metaEnv = typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env : {};
  const rawUrl = url || metaEnv.VITE_SUPABASE_URL || '';
  const finalUrl = formatSupabaseUrl(rawUrl);
  const finalKey = (anonKey || metaEnv.VITE_SUPABASE_ANON_KEY || '').trim();

  if (!finalUrl || !finalKey) {
    return null;
  }

  if (!supabaseInstance || supabaseInstance['supabaseUrl'] !== finalUrl) {
    try {
      supabaseInstance = createClient(finalUrl, finalKey);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return supabaseInstance;
}

export async function testSupabaseConnection(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
  const finalUrl = formatSupabaseUrl(url);
  const finalKey = (anonKey || '').trim();

  if (!finalUrl || !finalKey) {
    return { success: false, message: 'Please provide both Supabase Project URL/ID and API Key.' };
  }

  try {
    const client = createClient(finalUrl, finalKey);
    // Simple ping check
    const { error } = await client.from('appointments').select('id').limit(1);
    if (error) {
      if (error.message.includes('relation "appointments" does not exist') || error.code === '42P01') {
        return {
          success: true,
          message: 'Connected to Supabase project successfully! Note: The "appointments" table is not created yet. Please execute the SQL Schema in your Supabase SQL Editor.'
        };
      }
      if (error.message.includes('fetch failed') || error.message.includes('Invalid API key') || error.code === 'PGRST301') {
        return { success: false, message: `Connection issue: ${error.message}` };
      }
    }
    return { success: true, message: 'Successfully connected and verified with Supabase database!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to connect to Supabase.' };
  }
}

export const SUPABASE_SCHEMA_SQL = `-- PearlCare Dental Studio - Supabase SQL Schema
-- Run this in your Supabase SQL Editor:

-- 1. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  treatment TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'New',
  notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Clinic Settings / Content Table
CREATE TABLE IF NOT EXISTS clinic_content (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_content ENABLE ROW LEVEL SECURITY;

-- Allow public to insert appointments & enquiries
CREATE POLICY "Public insert appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read appointments" ON appointments FOR SELECT USING (true);
CREATE POLICY "Public read enquiries" ON enquiries FOR SELECT USING (true);
CREATE POLICY "Public update appointments" ON appointments FOR UPDATE USING (true);
CREATE POLICY "Public update enquiries" ON enquiries FOR UPDATE USING (true);
`;

export const SUPABASE_SQL_SCHEMA = SUPABASE_SCHEMA_SQL;

