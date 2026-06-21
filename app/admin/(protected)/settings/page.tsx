import SettingsAdmin from "@/components/admin/SettingsAdmin";

export const metadata = {
  title: "Site Settings",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return <SettingsAdmin />;
}
