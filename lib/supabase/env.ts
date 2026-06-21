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

function readEnv(name: string): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

export function isEnvVarSet(name: SupabaseEnvVarName | string): boolean {
  return readEnv(name).length > 0;
}

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

/** Safe diagnostics: true/false only, never key values. */
export function getSupabaseEnvDiagnostic(): SupabaseEnvDiagnostic {
  const serverStatus = getSupabaseConfigStatus("server");
  const clientStatus = getSupabaseConfigStatus("client");

  return {
    vars: {
      [SUPABASE_ENV_KEYS.publicUrl]: isEnvVarSet(SUPABASE_ENV_KEYS.publicUrl),
      [SUPABASE_ENV_KEYS.publicAnonKey]: isEnvVarSet(SUPABASE_ENV_KEYS.publicAnonKey),
      [SUPABASE_ENV_KEYS.serverUrl]: isEnvVarSet(SUPABASE_ENV_KEYS.serverUrl),
      [SUPABASE_ENV_KEYS.serverAnonKey]: isEnvVarSet(SUPABASE_ENV_KEYS.serverAnonKey),
      [SUPABASE_ENV_KEYS.serviceRoleKey]: isEnvVarSet(SUPABASE_ENV_KEYS.serviceRoleKey),
    },
    serverReady: serverStatus.urlConfigured && serverStatus.anonKeyConfigured,
    clientReady: clientStatus.urlConfigured && clientStatus.anonKeyConfigured,
    loginReady: serverStatus.urlConfigured && serverStatus.anonKeyConfigured,
  };
}

function missingKeysForTarget(target: "client" | "server"): string[] {
  const missing: string[] = [];

  if (target === "client") {
    if (!isEnvVarSet(SUPABASE_ENV_KEYS.publicUrl)) {
      missing.push(SUPABASE_ENV_KEYS.publicUrl);
    }
    if (!isEnvVarSet(SUPABASE_ENV_KEYS.publicAnonKey)) {
      missing.push(SUPABASE_ENV_KEYS.publicAnonKey);
    }
    return missing;
  }

  const serverEnv = getServerSupabaseEnv();
  if (!serverEnv.url) {
    missing.push(
      `${SUPABASE_ENV_KEYS.serverUrl} or ${SUPABASE_ENV_KEYS.publicUrl}`
    );
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
