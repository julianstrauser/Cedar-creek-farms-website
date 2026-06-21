import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/inventory.html", destination: "/inventory", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/gallery.html", destination: "/gallery", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/success.html", destination: "/success", permanent: true },
      { source: "/admin.html", destination: "/admin/login", permanent: true },
    ];
  },
};

export default nextConfig;
