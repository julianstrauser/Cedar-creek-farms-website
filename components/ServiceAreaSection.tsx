import { ScrollReveal } from "@/components/motion";
import { getSiteSettings } from "@/lib/settings";

export default async function ServiceAreaSection({
  compact = false,
}: {
  compact?: boolean;
}) {
  const settings = await getSiteSettings();

  return (
    <ScrollReveal as="section" className={`section service-area-section${compact ? " compact" : ""}`}>
      <p className="eyebrow">Service area</p>
      <h2>{settings.service_area}</h2>
      <p>
        Cedar Creek Farms serves homeowners, landscapers, builders, and property owners
        across {settings.service_area.toLowerCase()}. Contact us with your location for
        current tree availability, pricing, and transplanting options.
      </p>
    </ScrollReveal>
  );
}
