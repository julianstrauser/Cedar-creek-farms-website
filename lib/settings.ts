import { createClient } from "@/lib/supabase/server";
import { DEFAULT_SITE_SETTINGS } from "@/lib/settings-defaults";
import type { SiteSettings } from "@/lib/types";

export { DEFAULT_SITE_SETTINGS, settingsEmailHref, settingsPhoneHref } from "@/lib/settings-defaults";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", "main")
      .maybeSingle();

    if (error || !data) {
      return DEFAULT_SITE_SETTINGS;
    }

    return { ...DEFAULT_SITE_SETTINGS, ...(data as SiteSettings) };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
