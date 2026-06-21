import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="admin-login-page">
      <Suspense fallback={<p className="muted">Loading...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
