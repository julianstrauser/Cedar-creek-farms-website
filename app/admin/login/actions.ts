"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getSupabaseConfigErrorMessage,
  getSupabaseConfigStatus,
  isSupabaseConfigured,
} from "@/lib/supabase/env";

function isRedirectError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: string }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export async function loginWithPassword(email: string, password: string) {
  if (!isSupabaseConfigured("server")) {
    return { error: getSupabaseConfigErrorMessage("server") };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      console.error("[admin login] signInWithPassword failed:", error.message);
      return { error: error.message };
    }

    if (!data.user) {
      return { error: "Sign in failed. Please try again." };
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) {
      console.error("[admin login] profile lookup failed:", profileError.message);
      await supabase.auth.signOut();
      return { error: "Unable to verify admin access. Please try again." };
    }

    if (profile?.role !== "admin") {
      await supabase.auth.signOut();
      return {
        error: "This account is not approved as an admin. Contact the site developer.",
      };
    }

    redirect("/admin");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error("[admin login] unexpected error:", error);
    return { error: "Unable to sign in right now. Please try again." };
  }
}

export async function loginWithMagicLink(email: string, origin: string) {
  if (!isSupabaseConfigured("server")) {
    return { error: getSupabaseConfigErrorMessage("server") };
  }

  try {
    const supabase = await createClient();
    const redirectTo = `${origin.replace(/\/$/, "")}/auth/callback?next=/admin`;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      console.error("[admin login] signInWithOtp failed:", error.message);
      return { error: error.message };
    }

    return {
      message: "Check your email for a secure sign-in link. You can close this tab after clicking it.",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error("[admin login] magic link unexpected error:", error);
    return { error: "Unable to send the sign-in link. Please try again." };
  }
}

/** Development-only: reports whether server env vars are present (never returns key values). */
export async function getSupabaseConfigDiagnostic() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return {
    server: getSupabaseConfigStatus("server"),
  };
}
