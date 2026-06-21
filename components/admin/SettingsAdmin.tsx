"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SiteSettings } from "@/lib/types";
import MotionButton from "@/components/motion/MotionButton";

type SettingsForm = {
  business_name: string;
  contact_email: string;
  phone_display: string;
  phone_tel: string;
  service_area: string;
  contact_page_intro: string;
  footer_note: string;
  facebook_url: string;
  instagram_url: string;
};

const emptySettings: SettingsForm = {
  business_name: "Cedar Creek Farms",
  contact_email: "",
  phone_display: "",
  phone_tel: "",
  service_area: "",
  contact_page_intro: "",
  footer_note: "",
  facebook_url: "",
  instagram_url: "",
};

export default function SettingsAdmin() {
  const [form, setForm] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "main")
        .maybeSingle();

      if (!error && data) {
        const row = data as SiteSettings;
        setForm({
          business_name: row.business_name,
          contact_email: row.contact_email,
          phone_display: row.phone_display ?? "",
          phone_tel: row.phone_tel ?? "",
          service_area: row.service_area,
          contact_page_intro: row.contact_page_intro ?? "",
          footer_note: row.footer_note,
          facebook_url: row.facebook_url ?? "",
          instagram_url: row.instagram_url ?? "",
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const payload = {
      business_name: form.business_name.trim(),
      contact_email: form.contact_email.trim(),
      phone_display: form.phone_display.trim() || null,
      phone_tel: form.phone_tel.trim() || null,
      service_area: form.service_area.trim(),
      contact_page_intro: form.contact_page_intro.trim() || null,
      footer_note: form.footer_note.trim(),
      facebook_url: form.facebook_url.trim() || null,
      instagram_url: form.instagram_url.trim() || null,
    };

    const { error } = await supabase
      .from("site_settings")
      .update(payload)
      .eq("id", "main");

    setSaving(false);

    if (error) {
      setMessage("Could not save settings. Please try again.");
      return;
    }

    setMessage("Settings saved.");
  }

  if (loading) {
    return <p className="muted">Loading settings...</p>;
  }

  return (
    <div className="admin-stack">
      <div>
        <h1>Site settings</h1>
        <p className="muted">
          Update contact information shown on the public website. Changes appear on the
          contact page, footer, and service area sections.
        </p>
      </div>

      {message ? <p className="form-note">{message}</p> : null}

      <form className="admin-card" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <label>
            Business name
            <input
              required
              value={form.business_name}
              onChange={(event) => setForm({ ...form, business_name: event.target.value })}
            />
          </label>
          <label>
            Contact email
            <input
              required
              type="email"
              value={form.contact_email}
              onChange={(event) => setForm({ ...form, contact_email: event.target.value })}
            />
          </label>
          <label>
            Phone display
            <input
              value={form.phone_display}
              onChange={(event) => setForm({ ...form, phone_display: event.target.value })}
              placeholder="(325) 555-1234"
            />
            <span className="form-note">Shown on the website.</span>
          </label>
          <label>
            Click-to-call phone (tel)
            <input
              value={form.phone_tel}
              onChange={(event) => setForm({ ...form, phone_tel: event.target.value })}
              placeholder="+13255551234"
            />
            <span className="form-note">Used for mobile tap-to-call links.</span>
          </label>
          <label className="admin-form-full">
            Service area
            <input
              required
              value={form.service_area}
              onChange={(event) => setForm({ ...form, service_area: event.target.value })}
            />
          </label>
          <label className="admin-form-full">
            Contact page intro
            <textarea
              rows={4}
              value={form.contact_page_intro}
              onChange={(event) =>
                setForm({ ...form, contact_page_intro: event.target.value })
              }
            />
          </label>
          <label className="admin-form-full">
            Footer note
            <input
              value={form.footer_note}
              onChange={(event) => setForm({ ...form, footer_note: event.target.value })}
            />
          </label>
          <label>
            Facebook URL
            <input
              value={form.facebook_url}
              onChange={(event) => setForm({ ...form, facebook_url: event.target.value })}
              placeholder="https://facebook.com/..."
            />
          </label>
          <label>
            Instagram URL
            <input
              value={form.instagram_url}
              onChange={(event) => setForm({ ...form, instagram_url: event.target.value })}
              placeholder="https://instagram.com/..."
            />
          </label>
        </div>
        <MotionButton className="button primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save settings"}
        </MotionButton>
      </form>
    </div>
  );
}
