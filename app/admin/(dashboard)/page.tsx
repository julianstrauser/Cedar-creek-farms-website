import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Order, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const supabase = await createClient();

  const [productsResult, ordersResult] = await Promise.all([
    supabase.from("products").select("id, availability"),
    supabase.from("orders").select("id, status"),
  ]);

  const products = (productsResult.data ?? []) as Pick<Product, "id" | "availability">[];
  const orders = (ordersResult.data ?? []) as Pick<Order, "id" | "status">[];

  const stats = [
    { label: "Total products", value: products.length },
    {
      label: "Visible products",
      value: products.filter((item) => item.availability !== "hidden").length,
    },
    {
      label: "Sold out products",
      value: products.filter((item) => item.availability === "sold_out").length,
    },
    {
      label: "New orders",
      value: orders.filter((item) => item.status === "new").length,
    },
  ];

  return (
    <div className="admin-stack">
      <div>
        <p className="admin-eyebrow">Dashboard</p>
        <h1>Welcome back</h1>
        <p className="muted">
          Manage tree availability, gallery photos, and customer quote requests from
          here. Changes appear on the public website right away.
        </p>
      </div>

      <div className="admin-stat-grid">
        {stats.map((stat) => (
          <article className="admin-stat-card" key={stat.label}>
            <p className="muted">{stat.label}</p>
            <p className="admin-stat-value">{stat.value}</p>
          </article>
        ))}
      </div>

      <div className="admin-quick-links">
        <Link className="admin-card-link" href="/admin/products">
          <h2>Products</h2>
          <p>Add trees, update prices, mark sold out, or hide items.</p>
        </Link>
        <Link className="admin-card-link" href="/admin/gallery">
          <h2>Gallery</h2>
          <p>Upload farm and project photos for the public gallery.</p>
        </Link>
        <Link className="admin-card-link" href="/admin/orders">
          <h2>Orders</h2>
          <p>Review quote requests and track follow-up status.</p>
        </Link>
      </div>
    </div>
  );
}
