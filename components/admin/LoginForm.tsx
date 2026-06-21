"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { loginWithMagicLink, loginWithPassword } from "@/app/admin/login/actions";
import { createClient } from "@/lib/supabase/client";
import MotionButton from "@/components/motion/MotionButton";
import { LoadingPulse } from "@/components/motion/LoadingSkeleton";
import { fadeUpVariants } from "@/lib/motion/variants";

function isRedirectError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: string }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduced = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "note">("error");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showTryAgain, setShowTryAgain] = useState(false);

  const queryError = searchParams.get("error");
  const next = searchParams.get("next") || "/admin";

  useEffect(() => {
    let cancelled = false;

    async function redirectIfAlreadyAdmin() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (cancelled || authError || !user) {
          setCheckingSession(false);
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (cancelled || profileError) {
          setCheckingSession(false);
          return;
        }

        if (profile?.role === "admin") {
          router.replace(next);
          router.refresh();
          return;
        }

        setCheckingSession(false);
      } catch (error) {
        console.error("[admin login] session check failed:", error);
        setCheckingSession(false);
      }
    }

    redirectIfAlreadyAdmin();

    return () => {
      cancelled = true;
    };
  }, [next, router]);

  function clearStatus() {
    setMessage(null);
    setShowTryAgain(false);
  }

  async function handlePasswordLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    clearStatus();

    try {
      const result = await loginWithPassword(email, password);

      if (result?.error) {
        console.error("[admin login] password login failed:", result.error);
        setMessageType("error");
        setMessage(result.error);
        setShowTryAgain(true);
        return;
      }
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }

      console.error("[admin login] password login threw:", error);
      setMessageType("error");
      setMessage("Unable to sign in right now. Please try again.");
      setShowTryAgain(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    clearStatus();

    try {
      const result = await loginWithMagicLink(email, window.location.origin);

      if (result?.error) {
        console.error("[admin login] magic link failed:", result.error);
        setMessageType("error");
        setMessage(result.error);
        setShowTryAgain(true);
        return;
      }

      if (result?.message) {
        setMessageType("note");
        setMessage(result.message);
      }
    } catch (error) {
      console.error("[admin login] magic link threw:", error);
      setMessageType("error");
      setMessage("Unable to send the sign-in link. Please try again.");
      setShowTryAgain(true);
    } finally {
      setLoading(false);
    }
  }

  const queryErrorMessage =
    queryError === "not_admin"
      ? "This account is not approved as an admin. Contact the site developer to get access."
      : queryError === "auth_callback"
        ? "The sign-in link expired or was invalid. Please request a new one."
        : null;

  if (checkingSession) {
    return (
      <div className="admin-login-card">
        <LoadingPulse label="Checking sign-in status" />
      </div>
    );
  }

  const Card = reduced ? "div" : motion.div;

  return (
    <Card
      className="admin-login-card"
      {...(!reduced
        ? {
            initial: "hidden",
            animate: "visible",
            variants: fadeUpVariants,
          }
        : {})}
    >
      <p className="admin-eyebrow">Owner access only</p>
      <h1>Admin sign in</h1>
      <p className="muted">
        Sign in to manage products, photos, and quote requests. Public visitors cannot
        access this area.
      </p>

      {queryErrorMessage ? <p className="form-error">{queryErrorMessage}</p> : null}
      {message ? (
        <p className={messageType === "note" ? "form-note" : "form-error"}>{message}</p>
      ) : null}

      <div className="admin-toggle-row">
        <MotionButton
          type="button"
          className={mode === "password" ? "active" : ""}
          onClick={() => {
            setMode("password");
            clearStatus();
          }}
        >
          Email & password
        </MotionButton>
        <MotionButton
          type="button"
          className={mode === "magic" ? "active" : ""}
          onClick={() => {
            setMode("magic");
            clearStatus();
          }}
        >
          Magic link
        </MotionButton>
      </div>

      <form onSubmit={mode === "password" ? handlePasswordLogin : handleMagicLink}>
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="owner@example.com"
            disabled={loading}
          />
        </label>
        {mode === "password" ? (
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              disabled={loading}
            />
          </label>
        ) : null}
        <MotionButton className="button primary full" type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "password" ? "Sign in" : "Send magic link"}
        </MotionButton>
      </form>

      {showTryAgain ? (
        <MotionButton
          type="button"
          className="button secondary full"
          onClick={clearStatus}
          disabled={loading}
        >
          Try again
        </MotionButton>
      ) : null}
    </Card>
  );
}
