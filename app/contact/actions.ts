"use server";

import { createClient } from "@/lib/supabase/server";
import {
  sendQuoteConfirmationEmail,
  sendQuoteNotificationEmail,
} from "@/lib/email";

export type QuoteRequestInput = {
  name: string;
  email: string;
  phone: string;
  treeInterest: string;
  message: string;
  requestedItems: string;
};

export async function submitQuoteRequest(input: QuoteRequestInput) {
  const customerName = input.name.trim() || "Unknown";
  const customerEmail = input.email.trim() || null;
  const customerPhone = input.phone.trim() || null;
  const treeInterest = input.treeInterest.trim() || null;
  const message = input.message.trim() || null;
  const requestedItems = input.requestedItems.trim() || null;
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  try {
    const supabase = await createClient();
    const { error: insertError } = await supabase.from("orders").insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      message,
      requested_items: requestedItems,
      status: "new",
    });

    if (insertError) {
      console.error("[contact] order insert failed:", insertError.message);
      return {
        success: false as const,
        error: "We could not save your request right now. Please try again or contact us directly.",
      };
    }

    const emailPayload = {
      customerName,
      customerEmail,
      customerPhone,
      treeInterest,
      message,
      requestedItems,
      submittedAt,
    };

    await Promise.all([
      sendQuoteNotificationEmail(emailPayload),
      sendQuoteConfirmationEmail(emailPayload),
    ]);

    return { success: true as const };
  } catch (error) {
    console.error("[contact] submitQuoteRequest failed:", error);
    return {
      success: false as const,
      error: "We could not save your request right now. Please try again or contact us directly.",
    };
  }
}
