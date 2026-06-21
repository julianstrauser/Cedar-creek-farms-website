import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import FeaturedTrees from "@/components/FeaturedTrees";

const AVAILABILITY_CATEGORIES = [
  "Shade Trees",
  "Ornamental Trees",
  "Privacy Trees",
  "Seasonal Availability",
];

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="hero">
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
            <Link className="button primary" href="/inventory">
              View Available Trees
            </Link>
            <Link className="button secondary" href="/contact">
              Contact Us
            </Link>
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
      </section>

      <section className="section availability-section">
        <div>
          <p className="eyebrow">Availability updated regularly</p>
          <h2>Current inventory across tree types and seasons.</h2>
          <p>
            We regularly update available shade trees, ornamental trees, privacy
            trees, and seasonal inventory. Contact us for current pricing and
            availability.
          </p>
        </div>
        <div className="availability-categories" aria-label="Tree categories">
          {AVAILABILITY_CATEGORIES.map((category) => (
            <span key={category} className="badge">
              {category}
            </span>
          ))}
        </div>
        <Link className="button secondary" href="/inventory">
          View Tree Availability
        </Link>
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">What we offer</p>
          <h2>A professional tree farm experience for every customer.</h2>
          <p>
            Customers can review current tree availability, understand
            transplanting services, browse recent work, and contact us directly
            for pricing and availability.
          </p>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-icon">🌳</span>
            <h3>Tree inventory</h3>
            <p>Searchable availability by tree name, size, type, and notes.</p>
          </article>
          <article className="feature-card">
            <span className="feature-icon">🚜</span>
            <h3>Transplanting services</h3>
            <p>
              Clear service page explaining moving, delivery, planting, and site
              prep.
            </p>
          </article>
          <article className="feature-card">
            <span className="feature-icon">📷</span>
            <h3>Project gallery</h3>
            <p>
              Photo sections for farm rows, installs, before-and-after work, and
              equipment.
            </p>
          </article>
          <article className="feature-card">
            <span className="feature-icon">📩</span>
            <h3>Pricing requests</h3>
            <p>
              Contact us for current pricing, size options, and availability.
            </p>
          </article>
        </div>
      </section>

      <section className="section band">
        <div>
          <p className="eyebrow">Featured availability</p>
          <h2>Popular trees customers ask about.</h2>
          <p className="muted">
            Contact us for current pricing and availability on any tree listed
            below.
          </p>
        </div>
        <FeaturedTrees />
        <Link href="/inventory" className="text-link">
          See the full availability list →
        </Link>
      </section>

      <section className="section process">
        <p className="eyebrow">Simple customer flow</p>
        <h2>How customers work with the farm.</h2>
        <div className="steps">
          <article>
            <span>1</span>
            <h3>Browse availability</h3>
            <p>
              Review current trees and contact us about the varieties you need.
            </p>
          </article>
          <article>
            <span>2</span>
            <h3>Confirm the details</h3>
            <p>
              We confirm sizing, quantity, location, delivery, and transplanting
              needs with current pricing.
            </p>
          </article>
          <article>
            <span>3</span>
            <h3>Schedule the job</h3>
            <p>
              After pricing is approved, we schedule pickup, delivery, or
              transplanting.
            </p>
          </article>
        </div>
      </section>

      <section className="section cta-panel">
        <div>
          <p className="eyebrow">Ready to get started</p>
          <h2>Contact us for current pricing and availability.</h2>
          <p>
            Browse real inventory, request pricing, and see recent farm and
            transplanting photos.
          </p>
        </div>
        <Link className="button primary" href="/contact">
          Request Pricing
        </Link>
      </section>
    </PublicLayout>
  );
}
