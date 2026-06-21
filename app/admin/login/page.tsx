import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getCurrentProfile } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const { isAdmin } = await getCurrentProfile();
  if (isAdmin) {
    redirect("/admin");
  }

  return (
    <div className="admin-login-page">
      <Suspense fallback={<p className="muted">Loading...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
