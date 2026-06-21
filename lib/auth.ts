import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/types";

export async function getCurrentProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null, isAdmin: false };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return {
    user,
    profile,
    isAdmin: profile?.role === ("admin" as UserRole),
  };
}

export async function requireAdmin() {
  const result = await getCurrentProfile();
  if (!result.isAdmin) {
    throw new Error("Unauthorized");
  }
  return result;
}
