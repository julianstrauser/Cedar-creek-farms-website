import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_CONFIG } from "@/lib/supabase/public-config";

let browserClient: SupabaseClient | undefined;

export function createClient() {
  if (!browserClient) {
    browserClient = createBrowserClient(
      SUPABASE_PUBLIC_CONFIG.url,
      SUPABASE_PUBLIC_CONFIG.anonKey
    );
  }

  return browserClient;
}
