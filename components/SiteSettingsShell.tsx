import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { getSiteSettings } from "@/lib/settings";

export default async function SiteSettingsShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return <SiteSettingsProvider initialSettings={settings}>{children}</SiteSettingsProvider>;
}
