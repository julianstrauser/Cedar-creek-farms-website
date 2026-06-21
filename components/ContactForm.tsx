"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  InquirySummary,
  selectedTreesText,
  useInquiry,
} from "@/components/InquiryProvider";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { PRICING_HELPER_TEXT } from "@/lib/contact";
import { settingsEmailHref, settingsPhoneHref } from "@/lib/settings-defaults";
import { submitQuoteRequest } from "@/app/contact/actions";
import MotionButton from "@/components/motion/MotionButton";

export default function ContactForm() {
  const router = useRouter();
  const { items, clearItems } = useInquiry();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const treeInterest = form.get("treeInterest")?.toString().trim() || "";
    const requestedItems = [
      treeInterest ? `Tree or item: ${treeInterest}` : "",
      selectedTreesText(items),
    ]
      .filter(Boolean)
      .join("\n");

    const result = await submitQuoteRequest({
      name: form.get("name")?.toString().trim() || "",
      email: form.get("email")?.toString().trim() || "",
      phone: form.get("phone")?.toString().trim() || "",
      treeInterest,
      message: form.get("message")?.toString().trim() || "",
      requestedItems,
    });

    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? "Please try again.");
      return;
    }

    clearItems();
    router.push("/success");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {error ? <p className="form-error">{error}</p> : null}
      <div className="field-row">
        <label>
          Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Phone
          <input name="phone" required placeholder="(000) 000-0000" />
        </label>
      </div>
      <label>
        Email
        <input name="email" type="email" required placeholder="you@example.com" />
      </label>
      <label>
        Tree or Item Interested In
        <input
          name="treeInterest"
          placeholder="Tree variety, size, or service needed"
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows={6}
          placeholder="Share quantity, delivery location, timeline, or any other details."
        />
      </label>
      <MotionButton className="button primary" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Request Pricing"}
      </MotionButton>
      <p className="form-note">
        Your request is sent privately to Cedar Creek Farms. We will follow up
        with current pricing and availability.
      </p>
    </form>
  );
}

export function ContactSidebar() {
  const settings = useSiteSettings();
  const phoneHref = settingsPhoneHref(settings);

  return (
    <aside className="contact-card">
      <h2>Contact Information</h2>
      <p>
        <strong>Email:</strong>{" "}
        <a href={settingsEmailHref(settings)}>{settings.contact_email}</a>
      </p>
      <p>
        <strong>Phone:</strong>{" "}
        {phoneHref ? (
          <a href={phoneHref}>{settings.phone_display}</a>
        ) : (
          settings.phone_display
        )}
      </p>
      <p className="muted">{PRICING_HELPER_TEXT}</p>
      <hr />
      <h3>Your selected trees</h3>
      <InquirySummary />
    </aside>
  );
}
