import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import { MotionButton, ScrollReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Your pricing request has been sent to Cedar Creek Farms.",
};

export default function SuccessPage() {
  return (
    <PublicLayout>
      <ScrollReveal as="section" className="page-hero compact">
        <p className="eyebrow">Request received</p>
        <h1>Thank you — your pricing request was sent.</h1>
        <p>
          We will review your request and follow up with current pricing and
          availability. If you need immediate assistance, please contact us
          directly from the Contact page.
        </p>
        <div className="hero-actions">
          <MotionButton className="button primary" href="/inventory">
            Back to Availability
          </MotionButton>
          <MotionButton className="button secondary" href="/contact">
            Contact Us
          </MotionButton>
        </div>
      </ScrollReveal>
    </PublicLayout>
  );
}
