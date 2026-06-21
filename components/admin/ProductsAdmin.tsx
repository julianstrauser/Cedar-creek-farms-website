"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Product, ProductAvailability } from "@/lib/types";
import { availabilityLabel, formatPrice, uploadSiteImage } from "@/lib/utils";
import SiteImage from "@/components/SiteImage";

const emptyProduct = {
  name: "",
  description: "",
  price: "Call for pricing",
  size: "",
  category: "",
  image_url: "",
  availability: "available" as ProductAvailability,
  sort_order: 0,
  featured: false,
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function loadProducts() {
    const supabase = createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    setProducts((data as Product[]) ?? []);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm({ ...emptyProduct, sort_order: products.length + 1 });
  }

  function startEdit(product: Product) {
    setCreating(false);
    setEditing(product);
    setForm({
      name: product.name,
      description: product.description ?? "",
      price: product.price ?? "",
      size: product.size ?? "",
      category: product.category ?? "",
      image_url: product.image_url ?? "",
      availability: product.availability,
      sort_order: product.sort_order,
      featured: product.featured,
    });
  }

  async function handleImageUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const supabase = createClient();
      const url = await uploadSiteImage(file, supabase);
      setForm((current) => ({ ...current, image_url: url }));
    } catch {
      setMessage("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  async function saveProduct(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    const supabase = createClient();
    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      price: form.price.trim() || null,
      size: form.size.trim() || null,
      category: form.category.trim() || null,
      image_url: form.image_url.trim() || null,
      availability: form.availability,
      sort_order: Number(form.sort_order) || 0,
      featured: form.featured,
    };

    const { error } = editing
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);

    if (error) {
      setMessage(error.message);
      return;
    }

    setCreating(false);
    setEditing(null);
    setForm(emptyProduct);
    setMessage("Saved.");
    await loadProducts();
  }

  async function setAvailability(product: Product, availability: ProductAvailability) {
    const supabase = createClient();
    await supabase.from("products").update({ availability }).eq("id", product.id);
    await loadProducts();
  }

  async function deleteProduct(product: Product) {
    if (
      !window.confirm(
        `Delete "${product.name}"? This cannot be undone.`
      )
    ) {
      return;
    }
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", product.id);
    if (editing?.id === product.id) {
      setEditing(null);
      setForm(emptyProduct);
    }
    await loadProducts();
  }

  return (
    <div className="admin-stack">
      <div className="admin-toolbar">
        <div>
          <h1>Products</h1>
          <p className="muted">Add, edit, hide, or mark trees sold out.</p>
        </div>
        <button className="button primary" type="button" onClick={startCreate}>
          Add Product
        </button>
      </div>

      {message ? <p className="form-note">{message}</p> : null}

      {(creating || editing) ? (
        <form className="admin-card" onSubmit={saveProduct}>
          <h2>{editing ? "Edit product" : "New product"}</h2>
          <div className="admin-form-grid">
            <label>
              Name
              <input
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
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
              Size
              <input
                value={form.size}
                onChange={(event) => setForm({ ...form, size: event.target.value })}
              />
            </label>
            <label>
              Price
              <input
                value={form.price}
                onChange={(event) => setForm({ ...form, price: event.target.value })}
              />
            </label>
            <label>
              Availability
              <select
                value={form.availability}
                onChange={(event) =>
                  setForm({
                    ...form,
                    availability: event.target.value as ProductAvailability,
                  })
                }
              >
                <option value="available">Available</option>
                <option value="sold_out">Sold out</option>
                <option value="hidden">Hidden</option>
              </select>
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
            Description / notes
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
            />
          </label>
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => setForm({ ...form, featured: event.target.checked })}
            />
            Show on homepage featured section
          </label>
          <label>
            Image
            <input
              value={form.image_url}
              onChange={(event) =>
                setForm({ ...form, image_url: event.target.value })
              }
              placeholder="Image URL or upload below"
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
              alt="Product preview"
              width={180}
              height={135}
            />
          ) : null}
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
                setForm(emptyProduct);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Size</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <strong>{product.name}</strong>
                  {product.featured ? <span className="admin-tag">Featured</span> : null}
                </td>
                <td>{product.category}</td>
                <td>{product.size}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{availabilityLabel(product.availability)}</td>
                <td>
                  <div className="admin-action-row">
                    <button type="button" className="button ghost" onClick={() => startEdit(product)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="button secondary"
                      onClick={() => setAvailability(product, "sold_out")}
                    >
                      Mark Sold Out
                    </button>
                    <button
                      type="button"
                      className="button secondary"
                      onClick={() => setAvailability(product, "hidden")}
                    >
                      Hide From Website
                    </button>
                    <button
                      type="button"
                      className="button danger"
                      onClick={() => deleteProduct(product)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
