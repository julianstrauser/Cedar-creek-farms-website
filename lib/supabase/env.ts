export const SUPABASE_ENV_KEYS = {
  publicUrl: "NEXT_PUBLIC_SUPABASE_URL",
  publicAnonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  serverUrl: "SUPABASE_URL",
  serverAnonKey: "SUPABASE_ANON_KEY",
} as const;

function readEnv(name: string): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

export type SupabaseConfigStatus = {
  urlConfigured: boolean;
  anonKeyConfigured: boolean;
};

/** Browser/client bundle — only NEXT_PUBLIC_* (inlined at build time). */
export function getClientSupabaseEnv() {
  return {
    url: readEnv(SUPABASE_ENV_KEYS.publicUrl),
    anonKey: readEnv(SUPABASE_ENV_KEYS.publicAnonKey),
  };
}

/**
 * Server runtime — prefers non-public vars (read at runtime on Vercel),
 * then falls back to NEXT_PUBLIC_* (inlined at build time).
 * Never reads SUPABASE_SERVICE_ROLE_KEY.
 */
export function getServerSupabaseEnv() {
  return {
    url:
      readEnv(SUPABASE_ENV_KEYS.serverUrl) || readEnv(SUPABASE_ENV_KEYS.publicUrl),
    anonKey:
      readEnv(SUPABASE_ENV_KEYS.serverAnonKey) ||
      readEnv(SUPABASE_ENV_KEYS.publicAnonKey),
  };
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

export function getSupabaseConfigErrorMessage(
  target: "client" | "server" = "server"
): string {
  const status = getSupabaseConfigStatus(target);
  const missing: string[] = [];

  if (!status.urlConfigured) {
    missing.push(SUPABASE_ENV_KEYS.publicUrl);
  }
  if (!status.anonKeyConfigured) {
    missing.push(SUPABASE_ENV_KEYS.publicAnonKey);
  }

  if (missing.length === 0) {
    return "";
  }

  const missingList = missing.join(" and ");
  const redeployHint =
    "After adding them in Vercel Production, trigger a new deployment so NEXT_PUBLIC values are baked into the build.";

  if (target === "server") {
    return `Supabase is not configured on the server: ${missingList} ${missing.length > 1 ? "are" : "is"} missing or empty. ${redeployHint} (Optional server runtime fallback: also set ${SUPABASE_ENV_KEYS.serverUrl} and ${SUPABASE_ENV_KEYS.serverAnonKey} to the same values.) SUPABASE_SERVICE_ROLE_KEY is not used for login.`;
  }

  return `Supabase is not configured in the browser: ${missingList} ${missing.length > 1 ? "are" : "is"} missing or empty. ${redeployHint} SUPABASE_SERVICE_ROLE_KEY is not used for login.`;
}
