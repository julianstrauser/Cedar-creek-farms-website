import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import SupabaseEnvDiagnosticPanel from "@/components/admin/SupabaseEnvDiagnosticPanel";
import { LoginSkeleton } from "@/components/motion/LoadingSkeleton";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="admin-login-page">
      <div className="admin-login-stack">
        <Suspense fallback={<LoginSkeleton />}>
          <LoginForm />
        </Suspense>
        <SupabaseEnvDiagnosticPanel />
      </div>
    </div>
  );
}
