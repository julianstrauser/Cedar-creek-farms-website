import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/admin";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/admin";

  if (!code) {
    console.error("[auth callback] missing code parameter");
    return NextResponse.redirect(
      new URL("/admin/login?error=auth_callback", requestUrl.origin)
    );
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.user) {
      console.error("[auth callback] exchangeCodeForSession failed:", error?.message);
      return NextResponse.redirect(
        new URL("/admin/login?error=auth_callback", requestUrl.origin)
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError || profile?.role !== "admin") {
      await supabase.auth.signOut();
      return NextResponse.redirect(
        new URL("/admin/login?error=not_admin", requestUrl.origin)
      );
    }

    return NextResponse.redirect(new URL(safeNext, requestUrl.origin));
  } catch (error) {
    console.error("[auth callback] unexpected error:", error);
    return NextResponse.redirect(
      new URL("/admin/login?error=auth_callback", requestUrl.origin)
    );
  }
}
