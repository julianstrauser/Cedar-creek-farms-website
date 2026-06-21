"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryItem } from "@/lib/types";
import { uploadSiteImage } from "@/lib/utils";
import SiteImage from "@/components/SiteImage";

const emptyItem = {
  title: "",
  image_url: "",
  alt_text: "",
  caption: "",
  category: "",
  sort_order: 0,
  visible: true,
};

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState(emptyItem);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function loadItems() {
    const supabase = createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems((data as GalleryItem[]) ?? []);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm({ ...emptyItem, sort_order: items.length + 1 });
  }

  function startEdit(item: GalleryItem) {
    setCreating(false);
    setEditing(item);
    setForm({
      title: item.title,
      image_url: item.image_url,
      alt_text: item.alt_text ?? "",
      caption: item.caption ?? "",
      category: item.category ?? "",
      sort_order: item.sort_order,
      visible: item.visible,
    });
  }

  async function handleImageUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    try {
      const supabase = createClient();
      const url = await uploadSiteImage(file, supabase);
      setForm((current) => ({ ...current, image_url: url }));
    } catch {
      setMessage("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function saveItem(event: FormEvent) {
    event.preventDefault();
    const supabase = createClient();
    const payload = {
      title: form.title.trim(),
      image_url: form.image_url.trim(),
      alt_text: form.alt_text.trim() || null,
      caption: form.caption.trim() || null,
      category: form.category.trim() || null,
      sort_order: Number(form.sort_order) || 0,
      visible: form.visible,
    };

    const { error } = editing
      ? await supabase.from("gallery").update(payload).eq("id", editing.id)
      : await supabase.from("gallery").insert(payload);

    if (error) {
      setMessage(error.message);
      return;
    }

    setCreating(false);
    setEditing(null);
    setForm(emptyItem);
    setMessage("Saved.");
    await loadItems();
  }

  async function toggleVisible(item: GalleryItem) {
    const supabase = createClient();
    await supabase
      .from("gallery")
      .update({ visible: !item.visible })
      .eq("id", item.id);
    await loadItems();
  }

  async function deleteItem(item: GalleryItem) {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    const supabase = createClient();
    await supabase.from("gallery").delete().eq("id", item.id);
    await loadItems();
  }

  return (
    <div className="admin-stack">
      <div className="admin-toolbar">
        <div>
          <h1>Gallery</h1>
          <p className="muted">Upload photos and control what appears on the public gallery.</p>
        </div>
        <button className="button primary" type="button" onClick={startCreate}>
          Add Photo
        </button>
      </div>

      {message ? <p className="form-note">{message}</p> : null}

      {(creating || editing) ? (
        <form className="admin-card" onSubmit={saveItem}>
          <h2>{editing ? "Edit photo" : "New photo"}</h2>
          <div className="admin-form-grid">
            <label>
              Title
              <input
                required
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
              />
            </label>
            <label>
              Category
              <input
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
              />
            </label>
            <label>
              Alt text
              <input
                value={form.alt_text}
                onChange={(event) => setForm({ ...form, alt_text: event.target.value })}
              />
            </label>
            <label>
              Sort order
              <input
                type="number"
                value={form.sort_order}
                onChange={(event) =>
                  setForm({ ...form, sort_order: Number(event.target.value) })
                }
              />
            </label>
          </div>
          <label>
            Caption
            <textarea
              rows={3}
              value={form.caption}
              onChange={(event) => setForm({ ...form, caption: event.target.value })}
            />
          </label>
          <label>
            Image URL
            <input
              required
              value={form.image_url}
              onChange={(event) => setForm({ ...form, image_url: event.target.value })}
            />
          </label>
          <label>
            Upload image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event.target.files?.[0] ?? null)}
            />
          </label>
          {form.image_url ? (
            <SiteImage
              className="admin-thumb"
              src={form.image_url}
              alt="Gallery preview"
              width={180}
              height={135}
            />
          ) : null}
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={form.visible}
              onChange={(event) => setForm({ ...form, visible: event.target.checked })}
            />
            Visible on public website
          </label>
          <div className="button-row">
            <button className="button primary" type="submit" disabled={uploading}>
              Save Changes
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => {
                setCreating(false);
                setEditing(null);
                setForm(emptyItem);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="admin-gallery-grid">
        {items.map((item) => (
          <article className="admin-gallery-card" key={item.id}>
            <SiteImage
              className="admin-gallery-card-image"
              src={item.image_url}
              alt={item.alt_text || item.title}
              width={400}
              height={300}
              sizes="(max-width: 950px) 100vw, 33vw"
            />
            <div>
              <h3>{item.title}</h3>
              <p className="muted">{item.category}</p>
              <p>{item.visible ? "Visible" : "Hidden"}</p>
              <div className="admin-action-row">
                <button type="button" className="button ghost" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button type="button" className="button secondary" onClick={() => toggleVisible(item)}>
                  {item.visible ? "Hide From Website" : "Show On Website"}
                </button>
                <button type="button" className="button danger" onClick={() => deleteItem(item)}>
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
