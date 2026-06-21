import {
  SUPABASE_ENV_KEYS,
  getSupabaseEnvDiagnostic,
} from "@/lib/supabase/env";

function StatusRow({ name, set }: { name: string; set: boolean }) {
  return (
    <div className="env-diagnostic-row">
      <code>{name}</code>
      <span className={set ? "env-diagnostic-ok" : "env-diagnostic-missing"}>
        {set ? "set" : "missing"}
      </span>
    </div>
  );
}

export default function SupabaseEnvDiagnosticPanel() {
  const diagnostic = getSupabaseEnvDiagnostic();

  if (diagnostic.serverReady && diagnostic.clientReady) {
    return null;
  }

  return (
    <aside className="env-diagnostic" aria-label="Supabase environment diagnostics">
      <p className="env-diagnostic-title">Supabase environment check</p>
      <p className="muted env-diagnostic-note">
        Values are never shown here — only whether each variable is present. Admin login
        requires the project URL and anon key only (not the service role key).
      </p>
      <div className="env-diagnostic-grid">
        <StatusRow
          name={SUPABASE_ENV_KEYS.publicUrl}
          set={diagnostic.vars[SUPABASE_ENV_KEYS.publicUrl]}
        />
        <StatusRow
          name={SUPABASE_ENV_KEYS.publicAnonKey}
          set={diagnostic.vars[SUPABASE_ENV_KEYS.publicAnonKey]}
        />
        <StatusRow
          name={SUPABASE_ENV_KEYS.serverUrl}
          set={diagnostic.vars[SUPABASE_ENV_KEYS.serverUrl]}
        />
        <StatusRow
          name={SUPABASE_ENV_KEYS.serverAnonKey}
          set={diagnostic.vars[SUPABASE_ENV_KEYS.serverAnonKey]}
        />
        <StatusRow
          name={SUPABASE_ENV_KEYS.serviceRoleKey}
          set={diagnostic.vars[SUPABASE_ENV_KEYS.serviceRoleKey]}
        />
      </div>
      <ul className="env-diagnostic-summary">
        <li>
          Server login ready:{" "}
          <strong>{diagnostic.loginReady ? "yes" : "no"}</strong>
        </li>
        <li>
          Browser client ready:{" "}
          <strong>{diagnostic.clientReady ? "yes" : "no"}</strong>
        </li>
        <li>
          Service role required for login: <strong>no</strong>
        </li>
      </ul>
      {!diagnostic.clientReady ? (
        <p className="form-note env-diagnostic-hint">
          NEXT_PUBLIC_* variables must be set in Vercel Production before deploy so they
          are included in the build. After updating them, redeploy without build cache.
        </p>
      ) : null}
    </aside>
  );
}
