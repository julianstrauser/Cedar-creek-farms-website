import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getClientSupabaseEnv,
  getSupabaseConfigErrorMessage,
} from "@/lib/supabase/env";

let browserClient: SupabaseClient | undefined;

export function createClient() {
  const { url, anonKey } = getClientSupabaseEnv();

  if (!url || !anonKey) {
    throw new Error(
      getSupabaseConfigErrorMessage("client") ||
        "Supabase environment variables are not configured."
    );
  }

  if (!browserClient) {
    browserClient = createBrowserClient(url, anonKey);
  }

  return browserClient;
}
