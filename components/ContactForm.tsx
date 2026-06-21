"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  InquirySummary,
  selectedTreesText,
  useInquiry,
} from "@/components/InquiryProvider";
import {
  SITE_CONTACT,
  contactEmailHref,
  contactPhoneHref,
} from "@/lib/contact";

export default function ContactForm() {
  const router = useRouter();
  const { items, clearItems } = useInquiry();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const treeInterest = form.get("treeInterest")?.toString().trim() || "";
    const requestedItems = [
      treeInterest ? `Tree or item: ${treeInterest}` : "",
      selectedTreesText(items),
    ]
      .filter(Boolean)
      .join("\n");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("orders").insert({
      customer_name: form.get("name")?.toString().trim() || "Unknown",
      customer_email: form.get("email")?.toString().trim() || null,
      customer_phone: form.get("phone")?.toString().trim() || null,
      message: form.get("message")?.toString().trim() || null,
      requested_items: requestedItems || null,
      status: "new",
    });

    setSubmitting(false);

    if (insertError) {
      const name = form.get("name")?.toString().trim() || "";
      const email = form.get("email")?.toString().trim() || "";
      const phone = form.get("phone")?.toString().trim() || "";
      const message = form.get("message")?.toString().trim() || "";
      const subject = encodeURIComponent("Pricing Request from Cedar Creek Farms Website");
      const body = encodeURIComponent(
        [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          treeInterest ? `Tree or item interested in: ${treeInterest}` : "",
          requestedItems ? `\nSelected trees:\n${requestedItems}` : "",
          message ? `\nMessage:\n${message}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      );
      window.location.href = `mailto:${SITE_CONTACT.email}?subject=${subject}&body=${body}`;
      return;
    }

    clearItems();
    router.push("/success");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
      <button className="button primary" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Request Pricing"}
      </button>
      <p className="form-note">
        Your request is sent privately to Cedar Creek Farms. We will follow up
        with current pricing and availability.
      </p>
    </form>
  );
}

export function ContactSidebar() {
  const phoneHref = contactPhoneHref();

  return (
    <aside className="contact-card">
      <h2>Contact Information</h2>
      <p>
        <strong>Email:</strong>{" "}
        <a href={contactEmailHref()}>{SITE_CONTACT.email}</a>
      </p>
      <p>
        <strong>Phone:</strong>{" "}
        {phoneHref ? (
          <a href={phoneHref}>{SITE_CONTACT.phone.display}</a>
        ) : (
          SITE_CONTACT.phone.display
        )}
      </p>
      <p className="muted">
        Contact us for current pricing, size options, and availability.
      </p>
      <hr />
      <h3>Your selected trees</h3>
      <InquirySummary />
    </aside>
  );
}
