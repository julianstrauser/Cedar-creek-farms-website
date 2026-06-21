/**
 * Public Supabase credentials safe for browser use.
 * Env vars override these fallbacks when present at build time.
 * Never include the service role key here.
 */
export const SUPABASE_PUBLIC_CONFIG = {
  url:
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    "https://omnvuyxgbqmkalpieout.supabase.co",

  anonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tbnZ1eXhnYnFta2FscGllb3V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5OTIyNjcsImV4cCI6MjA5NzU2ODI2N30.pYHbdZ24WpIzTJL0Bh3Rguxrrx9FTPsFqwcDfnGlqe0",
} as const;

export function isPublicSupabaseConfigured() {
  return (
    SUPABASE_PUBLIC_CONFIG.url.length > 0 &&
    SUPABASE_PUBLIC_CONFIG.anonKey.length > 0
  );
}
