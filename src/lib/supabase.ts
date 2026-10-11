import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Provided by the project configuration
const defaultUrl = 'https://svxobflhnvaoyityxvpr.supabase.co';
const defaultPublishableKey = 'sb_publishable_Bpfjrhret1Xcfvf5_8AbQA_hK1u-jPJ';
const defaultAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2eG9iZmxobnZhb3lpdHl4dnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2ODA3MTYsImV4cCI6MjEwNzI1NjcxNn0.0zq5trJsGdkA2q8d96J_bkhzhuuQQ-midBziaOGHi1I';

const rawUrl = (
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  defaultUrl
).trim();

// Strip trailing /rest/v1 or slashes if present
const cleanUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');

const supabaseApiKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  defaultPublishableKey ||
  defaultAnonKey
).trim();

export const isSupabaseConfigured = Boolean(
  cleanUrl &&
  supabaseApiKey &&
  cleanUrl.startsWith('http') &&
  !cleanUrl.includes('your-supabase-url')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(cleanUrl, supabaseApiKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;
