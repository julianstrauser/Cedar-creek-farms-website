import type { Metadata } from "next";
import { InquiryProvider } from "@/components/InquiryProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cedar Creek Farms",
    template: "%s | Cedar Creek Farms",
  },
  description:
    "Field-grown trees, availability, transplanting services, and project photos.",
  icons: {
    icon: "/assets/logo.svg",
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
        <InquiryProvider>{children}</InquiryProvider>
      </body>
    </html>
  );
}
