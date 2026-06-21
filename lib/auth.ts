import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Profile, UserRole } from "@/lib/types";

export async function getCurrentProfile() {
  if (!isSupabaseConfigured()) {
    return { user: null, profile: null, isAdmin: false };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { user: null, profile: null, isAdmin: false };
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      return { user, profile: null, isAdmin: false };
    }

    return {
      user,
      profile: profile as Profile | null,
      isAdmin: profile?.role === ("admin" as UserRole),
    };
  } catch {
    return { user: null, profile: null, isAdmin: false };
  }
}

/** Redirects to /admin/login when the visitor is not an approved admin. */
export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    redirect("/admin/login");
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    redirect("/admin/login?error=not_admin");
  }

  return { user, profile };
}
