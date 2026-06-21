import type { Metadata } from "next";
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Your pricing request has been sent to Cedar Creek Farms.",
};

export default function SuccessPage() {
  return (
    <PublicLayout>
      <section className="page-hero compact">
        <p className="eyebrow">Request received</p>
        <h1>Thank you — your pricing request was sent.</h1>
        <p>
          We will review your request and follow up with current pricing and
          availability. If you need immediate assistance, please contact us
          directly from the Contact page.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/inventory">
            Back to Availability
          </Link>
          <Link className="button secondary" href="/contact">
            Contact Us
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
