import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import PageHero from "@/components/PageHero";
import { MotionButton } from "@/components/motion";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Your pricing request has been sent to Cedar Creek Farms.",
};

export default function SuccessPage() {
  return (
    <PublicLayout>
      <PageHero
        className="page-hero compact"
        eyebrow="Request received"
        title="Thank you — your pricing request was sent."
        description="We will review your request and follow up with current pricing and availability. If you need immediate assistance, please contact us directly from the Contact page."
      >
        <div className="hero-actions">
          <MotionButton className="button primary" href="/inventory">
            Back to Availability
          </MotionButton>
          <MotionButton className="button secondary" href="/contact">
            Contact Us
          </MotionButton>
        </div>
      </PageHero>
    </PublicLayout>
  );
}
