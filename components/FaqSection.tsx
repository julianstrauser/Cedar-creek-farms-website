import { ScrollReveal } from "@/components/motion";

const FAQ_ITEMS = [
  {
    question: "Do you provide pricing online?",
    answer:
      "Pricing can vary by tree type, size, quantity, and delivery or transplanting needs. Contact us for current pricing and availability.",
  },
  {
    question: "Is availability updated regularly?",
    answer:
      "Yes. Availability is updated regularly, but customers should contact us to confirm current inventory.",
  },
  {
    question: "Do you offer delivery or transplanting?",
    answer:
      "Cedar Creek Farms offers tree availability and transplanting services. Contact us with your location and the tree size you are interested in.",
  },
  {
    question: "What types of trees do you carry?",
    answer:
      "We carry shade trees, ornamental trees, privacy trees, and seasonal availability depending on current inventory.",
  },
  {
    question: "Can I request a specific tree?",
    answer:
      "Yes. Use the contact form to request a specific tree or ask about current options.",
  },
  {
    question: "What information should I include when requesting pricing?",
    answer:
      "Include the tree type, desired size, quantity, location, and whether you need delivery or transplanting.",
  },
];

export default function FaqSection({ title = "Frequently asked questions" }: { title?: string }) {
  return (
    <ScrollReveal as="section" className="section faq-section">
      <p className="eyebrow">Questions</p>
      <h2>{title}</h2>
      <div className="faq-list">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </ScrollReveal>
  );
}
