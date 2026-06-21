"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_SITE_SETTINGS } from "@/lib/settings-defaults";
import type { SiteSettings } from "@/lib/types";

const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SITE_SETTINGS);

export function SiteSettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: SiteSettings;
}) {
  const [settings, setSettings] = useState<SiteSettings>(
    initialSettings ?? DEFAULT_SITE_SETTINGS
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/site-settings");
        if (!response.ok) return;
        const data = (await response.json()) as SiteSettings;
        if (!cancelled) setSettings({ ...DEFAULT_SITE_SETTINGS, ...data });
      } catch {
        // Keep defaults
      }
    }

    if (!initialSettings) {
      load();
    }

    return () => {
      cancelled = true;
    };
  }, [initialSettings]);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
