"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Order, OrderStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const statuses: OrderStatus[] = ["new", "contacted", "fulfilled", "archived"];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  async function loadOrders() {
    const supabase = createClient();
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders((data as Order[]) ?? []);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(order: Order, status: OrderStatus) {
    const supabase = createClient();
    await supabase.from("orders").update({ status }).eq("id", order.id);
    await loadOrders();
  }

  const shown =
    filter === "all" ? orders : orders.filter((order) => order.status === filter);

  return (
    <div className="admin-stack">
      <div className="admin-toolbar">
        <div>
          <h1>Orders & quote requests</h1>
          <p className="muted">Review customer requests and update follow-up status.</p>
        </div>
        <select value={filter} onChange={(event) => setFilter(event.target.value as OrderStatus | "all")}>
          <option value="all">All statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-orders-list">
        {shown.length === 0 ? (
          <p className="muted">No orders yet.</p>
        ) : (
          shown.map((order) => (
            <article className="admin-order-card" key={order.id}>
              <div className="admin-order-head">
                <div>
                  <h2>{order.customer_name}</h2>
                  <p className="muted">{formatDate(order.created_at)}</p>
                </div>
                <select
                  value={order.status}
                  onChange={(event) =>
                    updateStatus(order, event.target.value as OrderStatus)
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-order-meta">
                {order.customer_email ? <p><strong>Email:</strong> {order.customer_email}</p> : null}
                {order.customer_phone ? <p><strong>Phone:</strong> {order.customer_phone}</p> : null}
              </div>
              {order.requested_items ? (
                <div>
                  <strong>Requested items</strong>
                  <pre className="admin-pre">{order.requested_items}</pre>
                </div>
              ) : null}
              {order.message ? (
                <div>
                  <strong>Message</strong>
                  <pre className="admin-pre">{order.message}</pre>
                </div>
              ) : null}
            </article>
          ))
        )}
      </div>
    </div>
  );
}
