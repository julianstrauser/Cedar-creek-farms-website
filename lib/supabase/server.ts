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
        } catch {
          // Server Components cannot always set cookies during render.
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

  return {
    maxAge: typeof options.maxAge === "number" ? options.maxAge : undefined,
    expires:
      options.expires instanceof Date
        ? options.expires
        : typeof options.expires === "string" || typeof options.expires === "number"
          ? new Date(options.expires)
          : undefined,
    path: typeof options.path === "string" ? options.path : undefined,
    domain: typeof options.domain === "string" ? options.domain : undefined,
    secure: typeof options.secure === "boolean" ? options.secure : undefined,
    httpOnly: typeof options.httpOnly === "boolean" ? options.httpOnly : undefined,
    sameSite: normalizedSameSite,
  };
}
