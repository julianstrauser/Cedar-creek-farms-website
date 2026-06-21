import PublicLayout from "@/components/PublicLayout";
import FeaturedTrees from "@/components/FeaturedTrees";
import FaqSection from "@/components/FaqSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import {
  MotionButton,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const AVAILABILITY_CATEGORIES = [
  "Shade Trees",
  "Ornamental Trees",
  "Privacy Trees",
  "Seasonal Availability",
];

export default function HomePage() {
  return (
    <PublicLayout>
      <ScrollReveal as="section" className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            Field-grown trees • Professional transplanting • Reliable availability
          </p>
          <h1>Quality trees grown for landscapes that need to last.</h1>
          <p className="hero-copy">
            Browse current availability, contact us for pricing, and see recent
            farm and transplanting work.
          </p>
          <div className="hero-actions">
            <MotionButton className="button primary" href="/inventory">
              View Available Trees
            </MotionButton>
            <MotionButton className="button secondary" href="/contact">
              Contact Us
            </MotionButton>
          </div>
        </div>
        <div className="hero-panel" aria-label="Tree farm highlight card">
          <div className="status-card">
            <span className="status-dot"></span>
            <p>Availability updated regularly</p>
          </div>
          <h2>
            Shade trees, ornamental trees, privacy trees, and transplanting
            services.
          </h2>
          <dl className="hero-stats">
            <div>
              <dt>Services</dt>
              <dd>Sales + Transplanting</dd>
            </div>
            <div>
              <dt>Use</dt>
              <dd>Homes, ranches, businesses</dd>
            </div>
            <div>
              <dt>Process</dt>
              <dd>Contact → Select → Deliver</dd>
            </div>
          </dl>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="section availability-section" delay={0.05}>
        <div>
          <p className="eyebrow">Availability updated regularly</p>
          <h2>Current inventory across tree types and seasons.</h2>
          <p>
            We regularly update available shade trees, ornamental trees, privacy
            trees, and seasonal inventory. Contact us for current pricing and
            availability.
          </p>
        </div>
        <StaggerContainer className="availability-categories" aria-label="Tree categories">
          {AVAILABILITY_CATEGORIES.map((category) => (
            <StaggerItem key={category}>
              <span className="badge">{category}</span>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <MotionButton className="button secondary" href="/inventory">
          View Tree Availability
        </MotionButton>
      </ScrollReveal>

      <ScrollReveal as="section" className="section split-section">
        <div>
          <p className="eyebrow">What we offer</p>
          <h2>A professional tree farm experience for every customer.</h2>
          <p>
            Customers can review current tree availability, understand
            transplanting services, browse recent work, and contact us directly
            for pricing and availability.
          </p>
        </div>
        <StaggerContainer className="feature-grid">
          <StaggerItem>
            <article className="feature-card motion-card">
              <span className="feature-icon">🌳</span>
              <h3>Tree inventory</h3>
              <p>Searchable availability by tree name, size, type, and notes.</p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="feature-card motion-card">
              <span className="feature-icon">🚜</span>
              <h3>Transplanting services</h3>
              <p>
                Clear service page explaining moving, delivery, planting, and site
                prep.
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="feature-card motion-card">
              <span className="feature-icon">📷</span>
              <h3>Project gallery</h3>
              <p>
                Photo sections for farm rows, installs, before-and-after work, and
                equipment.
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="feature-card motion-card">
              <span className="feature-icon">📩</span>
              <h3>Pricing requests</h3>
              <p>
                Contact us for current pricing, size options, and availability.
              </p>
            </article>
          </StaggerItem>
        </StaggerContainer>
      </ScrollReveal>

      <ScrollReveal as="section" className="section band">
        <div>
          <p className="eyebrow">Featured availability</p>
          <h2>Popular trees customers ask about.</h2>
          <p className="muted">
            Contact us for current pricing and availability on any tree listed
            below.
          </p>
        </div>
        <FeaturedTrees />
        <MotionButton href="/inventory" className="text-link motion-text-link">
          See the full availability list →
        </MotionButton>
      </ScrollReveal>

      <ScrollReveal as="section" className="section process">
        <p className="eyebrow">Simple customer flow</p>
        <h2>How customers work with the farm.</h2>
        <StaggerContainer className="steps">
          <StaggerItem>
            <article className="motion-card">
              <span>1</span>
              <h3>Browse availability</h3>
              <p>
                Review current trees and contact us about the varieties you need.
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="motion-card">
              <span>2</span>
              <h3>Confirm the details</h3>
              <p>
                We confirm sizing, quantity, location, delivery, and transplanting
                needs with current pricing.
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="motion-card">
              <span>3</span>
              <h3>Schedule the job</h3>
              <p>
                After pricing is approved, we schedule pickup, delivery, or
                transplanting.
              </p>
            </article>
          </StaggerItem>
        </StaggerContainer>
      </ScrollReveal>

      <ScrollReveal as="section" className="section cta-panel">
        <div>
          <p className="eyebrow">Ready to get started</p>
          <h2>Contact us for current pricing and availability.</h2>
          <p>
            Browse real inventory, request pricing, and see recent farm and
            transplanting photos.
          </p>
        </div>
        <MotionButton className="button primary" href="/contact">
          Request Pricing
        </MotionButton>
      </ScrollReveal>

      <ServiceAreaSection />
      <FaqSection />
    </PublicLayout>
  );
}
