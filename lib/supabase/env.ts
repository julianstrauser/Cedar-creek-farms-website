export const SUPABASE_ENV_KEYS = {
  publicUrl: "NEXT_PUBLIC_SUPABASE_URL",
  publicAnonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  serverUrl: "SUPABASE_URL",
  serverAnonKey: "SUPABASE_ANON_KEY",
  serviceRoleKey: "SUPABASE_SERVICE_ROLE_KEY",
} as const;

export type SupabaseEnvVarName =
  | typeof SUPABASE_ENV_KEYS.publicUrl
  | typeof SUPABASE_ENV_KEYS.publicAnonKey
  | typeof SUPABASE_ENV_KEYS.serverUrl
  | typeof SUPABASE_ENV_KEYS.serverAnonKey
  | typeof SUPABASE_ENV_KEYS.serviceRoleKey;

/**
 * Client env — direct static references only.
 * Next.js inlines NEXT_PUBLIC_* at build time when accessed with dot notation.
 */
const CLIENT_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const CLIENT_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

export type SupabaseConfigStatus = {
  urlConfigured: boolean;
  anonKeyConfigured: boolean;
};

export type SupabaseEnvDiagnostic = {
  vars: Record<SupabaseEnvVarName, boolean>;
  serverReady: boolean;
  clientReady: boolean;
  loginReady: boolean;
};

/** Browser/client bundle — only NEXT_PUBLIC_* (inlined at build time). */
export function getClientSupabaseEnv() {
  return {
    url: CLIENT_SUPABASE_URL,
    anonKey: CLIENT_SUPABASE_ANON_KEY,
  };
}

/**
 * Server runtime — prefers non-public vars (read at runtime on Vercel),
 * then falls back to NEXT_PUBLIC_* (inlined at build time).
 * Never reads SUPABASE_SERVICE_ROLE_KEY.
 */
export function getServerSupabaseEnv() {
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    "";

  const anonKey =
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    "";

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

/** Safe diagnostics: true/false only, never key values. Uses direct env references. */
export function getSupabaseEnvDiagnostic(): SupabaseEnvDiagnostic {
  const clientEnv = getClientSupabaseEnv();
  const serverEnv = getServerSupabaseEnv();

  return {
    vars: {
      [SUPABASE_ENV_KEYS.publicUrl]:
        (process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "").length > 0,
      [SUPABASE_ENV_KEYS.publicAnonKey]:
        (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "").length > 0,
      [SUPABASE_ENV_KEYS.serverUrl]:
        (process.env.SUPABASE_URL?.trim() ?? "").length > 0,
      [SUPABASE_ENV_KEYS.serverAnonKey]:
        (process.env.SUPABASE_ANON_KEY?.trim() ?? "").length > 0,
      [SUPABASE_ENV_KEYS.serviceRoleKey]:
        (process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "").length > 0,
    },
    serverReady: serverEnv.url.length > 0 && serverEnv.anonKey.length > 0,
    clientReady: clientEnv.url.length > 0 && clientEnv.anonKey.length > 0,
    loginReady: serverEnv.url.length > 0 && serverEnv.anonKey.length > 0,
  };
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
  const redeployHint =
    "Add the variables in Vercel → Project Settings → Environment Variables (Production), then trigger a fresh Production redeploy using “Redeploy without build cache.” Do not just refresh the site.";

  if (target === "server") {
    return `Supabase is not configured on the server: ${missingList} ${missing.length > 1 ? "are" : "is"} missing or empty. ${redeployHint} Admin login only requires the Supabase project URL and anon key — SUPABASE_SERVICE_ROLE_KEY is not used for login.`;
  }

  return `Supabase is not configured in the browser: ${missingList} ${missing.length > 1 ? "are" : "is"} missing or empty. ${redeployHint} NEXT_PUBLIC_* values are baked in at build time. SUPABASE_SERVICE_ROLE_KEY is not used for login.`;
}
