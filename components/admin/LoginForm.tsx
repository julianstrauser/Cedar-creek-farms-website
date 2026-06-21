"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const error = searchParams.get("error");
  const next = searchParams.get("next") || "/admin";

  async function handlePasswordLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setMessage(signInError.message);
      return;
    }

    router.push(next);
    router.refresh();
  }

  async function handleMagicLink(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const { error: magicError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    setLoading(false);

    if (magicError) {
      setMessage(magicError.message);
      return;
    }

    setMessage("Check your email for a secure sign-in link.");
  }

  return (
    <div className="admin-login-card">
      <p className="admin-eyebrow">Owner access only</p>
      <h1>Admin sign in</h1>
      <p className="muted">
        Sign in to manage products, photos, and quote requests. Public visitors cannot
        access this area.
      </p>

      {error === "not_admin" ? (
        <p className="form-error">
          This account is not approved as an admin. Contact the site developer to get
          access.
        </p>
      ) : null}
      {message ? <p className={message.includes("Check your email") ? "form-note" : "form-error"}>{message}</p> : null}

      <div className="admin-toggle-row">
        <button
          type="button"
          className={mode === "password" ? "active" : ""}
          onClick={() => setMode("password")}
        >
          Email & password
        </button>
        <button
          type="button"
          className={mode === "magic" ? "active" : ""}
          onClick={() => setMode("magic")}
        >
          Magic link
        </button>
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
            />
          </label>
        ) : null}
        <button className="button primary full" type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "password" ? "Sign in" : "Send magic link"}
        </button>
      </form>
    </div>
  );
}
