import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import PageHero from "@/components/PageHero";
import {
  MotionButton,
  MotionCard,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "Tree Transplanting Services",
  description:
    "Tree transplanting, delivery, planting, site planning, and farm tree selection services.",
};

export default function ServicesPage() {
  return (
    <PublicLayout>
      <PageHero
        className="page-hero service-hero"
        eyebrow="Tree moving and planting"
        title="Tree Transplanting Services"
        description="Help customers understand what the farm can do: select trees, dig, move, deliver, install, and give aftercare instructions."
      >
        <MotionButton className="button primary" href="/contact">
          Ask About Transplanting
        </MotionButton>
      </PageHero>

      <ScrollReveal as="section" className="section">
        <StaggerContainer className="service-grid">
          <StaggerItem>
            <MotionCard className="service-card">
              <span>01</span>
              <h2>Tree selection</h2>
              <p>
                Guide customers toward the right tree based on size, sun exposure, soil,
                watering access, and long-term growth.
              </p>
            </MotionCard>
          </StaggerItem>
          <StaggerItem>
            <MotionCard className="service-card">
              <span>02</span>
              <h2>Digging and moving</h2>
              <p>
                Use the right equipment and timing to move established trees safely with
                the best chance of success.
              </p>
            </MotionCard>
          </StaggerItem>
          <StaggerItem>
            <MotionCard className="service-card">
              <span>03</span>
              <h2>Delivery and planting</h2>
              <p>
                Coordinate delivery, placement, planting depth, staking when needed, and
                cleanup after the job.
              </p>
            </MotionCard>
          </StaggerItem>
          <StaggerItem>
            <MotionCard className="service-card">
              <span>04</span>
              <h2>Aftercare guidance</h2>
              <p>
                Provide watering, mulching, and maintenance instructions so the tree has
                a strong start.
              </p>
            </MotionCard>
          </StaggerItem>
        </StaggerContainer>
        <MotionButton href="/tree-installation" className="text-link motion-text-link">
          See Our Full Planting Process →
        </MotionButton>
      </ScrollReveal>

      <ScrollReveal as="section" className="section split-section reverse">
        <MotionCard className="quote-card large">
          <h2>Good quote requests include:</h2>
          <ul className="check-list">
            <li>Tree variety and approximate size wanted</li>
            <li>Number of trees needed</li>
            <li>Job location or delivery area</li>
            <li>Photos of the planting area</li>
            <li>Access notes for equipment</li>
            <li>Timeline or deadline</li>
          </ul>
        </MotionCard>
        <div>
          <p className="eyebrow">Make pricing easier</p>
          <h2>Ask for the right details up front.</h2>
          <p>
            The contact form is written to collect the details a tree farm needs
            before quoting. That keeps calls cleaner and helps filter serious
            customers from vague inquiries.
          </p>
        </div>
      </ScrollReveal>
    </PublicLayout>
  );
}
