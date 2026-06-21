import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, sanitizeCookieOptions(options));
          });
        } catch (error) {
          // Server Components cannot always set cookies during render.
          console.error("[supabase] failed to set auth cookies:", error);
        }
      },
    },
  });
}

function sanitizeCookieOptions(
  options: Record<string, unknown> | undefined
): Partial<ResponseCookie> | undefined {
  if (!options) return undefined;

  const sameSite = options.sameSite;
  const normalizedSameSite =
    sameSite === "lax" || sameSite === "strict" || sameSite === "none"
      ? sameSite
      : undefined;

  const sanitized: Partial<ResponseCookie> = {};

  if (typeof options.maxAge === "number") sanitized.maxAge = options.maxAge;
  if (options.expires instanceof Date) {
    sanitized.expires = options.expires;
  } else if (typeof options.expires === "string" || typeof options.expires === "number") {
    sanitized.expires = new Date(options.expires);
  }
  if (typeof options.path === "string") sanitized.path = options.path;
  if (typeof options.domain === "string") sanitized.domain = options.domain;
  if (typeof options.secure === "boolean") sanitized.secure = options.secure;
  if (typeof options.httpOnly === "boolean") sanitized.httpOnly = options.httpOnly;
  if (normalizedSameSite) sanitized.sameSite = normalizedSameSite;

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}
