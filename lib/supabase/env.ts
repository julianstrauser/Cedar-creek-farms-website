import { SUPABASE_PUBLIC_CONFIG } from "@/lib/supabase/public-config";

export const SUPABASE_ENV_KEYS = {
  publicUrl: "NEXT_PUBLIC_SUPABASE_URL",
  publicAnonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  serverUrl: "SUPABASE_URL",
  serverAnonKey: "SUPABASE_ANON_KEY",
  serviceRoleKey: "SUPABASE_SERVICE_ROLE_KEY",
} as const;

export type SupabaseConfigStatus = {
  urlConfigured: boolean;
  anonKeyConfigured: boolean;
};

/** Browser/client — uses public config with env override baked in at build time. */
export function getClientSupabaseEnv() {
  return {
    url: SUPABASE_PUBLIC_CONFIG.url,
    anonKey: SUPABASE_PUBLIC_CONFIG.anonKey,
  };
}

/**
 * Server runtime — prefers server env vars, then public env vars,
 * then the same hardcoded public config used in the browser.
 * Never reads SUPABASE_SERVICE_ROLE_KEY.
 */
export function getServerSupabaseEnv() {
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    SUPABASE_PUBLIC_CONFIG.url;

  const anonKey =
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    SUPABASE_PUBLIC_CONFIG.anonKey;

  return { url, anonKey };
}

export function getSupabaseConfigStatus(
  target: "client" | "server" = "server"
): SupabaseConfigStatus {
  const env = target === "client" ? getClientSupabaseEnv() : getServerSupabaseEnv();
  return {
    urlConfigured: env.url.length > 0,
    anonKeyConfigured: env.anonKey.length > 0,
  };
}

export function isSupabaseConfigured(target: "client" | "server" = "server") {
  const status = getSupabaseConfigStatus(target);
  return status.urlConfigured && status.anonKeyConfigured;
}

function missingKeysForTarget(target: "client" | "server"): string[] {
  const missing: string[] = [];

  if (target === "client") {
    const clientEnv = getClientSupabaseEnv();
    if (!clientEnv.url) missing.push(SUPABASE_ENV_KEYS.publicUrl);
    if (!clientEnv.anonKey) missing.push(SUPABASE_ENV_KEYS.publicAnonKey);
    return missing;
  }

  const serverEnv = getServerSupabaseEnv();
  if (!serverEnv.url) {
    missing.push(`${SUPABASE_ENV_KEYS.serverUrl} or ${SUPABASE_ENV_KEYS.publicUrl}`);
  }
  if (!serverEnv.anonKey) {
    missing.push(
      `${SUPABASE_ENV_KEYS.serverAnonKey} or ${SUPABASE_ENV_KEYS.publicAnonKey}`
    );
  }
  return missing;
}

export function getSupabaseConfigErrorMessage(
  target: "client" | "server" = "server"
): string {
  const missing = missingKeysForTarget(target);

  if (missing.length === 0) {
    return "";
  }

  const missingList = missing.join(" and ");

  if (target === "server") {
    return `Supabase is not configured on the server: ${missingList} ${missing.length > 1 ? "are" : "is"} missing or empty. Admin login only requires the Supabase project URL and anon key.`;
  }

  return `Supabase is not configured in the browser: ${missingList} ${missing.length > 1 ? "are" : "is"} missing or empty.`;
}
