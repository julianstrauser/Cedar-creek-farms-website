import type { Metadata } from "next";
import { InquiryProvider } from "@/components/InquiryProvider";
import SiteSettingsShell from "@/components/SiteSettingsShell";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cedar Creek Farms | Field-Grown Trees & Transplanting",
    template: "%s | Cedar Creek Farms",
  },
  description:
    "Cedar Creek Farms provides field-grown trees, privacy trees, shade trees, ornamental trees, and professional transplanting services. Contact us for current pricing and availability.",
  icons: {
    icon: "/assets/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Cedar Creek Farms",
    title: "Cedar Creek Farms | Field-Grown Trees & Transplanting",
    description:
      "Cedar Creek Farms provides field-grown trees, privacy trees, shade trees, ornamental trees, and professional transplanting services. Contact us for current pricing and availability.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteSettingsShell>
          <InquiryProvider>{children}</InquiryProvider>
        </SiteSettingsShell>
      </body>
    </html>
  );
}
