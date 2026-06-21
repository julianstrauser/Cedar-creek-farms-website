import { Resend } from "resend";

export type QuoteEmailPayload = {
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  treeInterest: string | null;
  message: string | null;
  requestedItems: string | null;
  submittedAt: string;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function notificationRecipient() {
  return (
    process.env.QUOTE_NOTIFICATION_EMAIL?.trim() ||
    process.env.QUOTE_FROM_EMAIL?.trim() ||
    null
  );
}

function fromAddress() {
  return process.env.QUOTE_FROM_EMAIL?.trim() || "Cedar Creek Farms <onboarding@resend.dev>";
}

export async function sendQuoteNotificationEmail(payload: QuoteEmailPayload) {
  const resend = getResendClient();
  const to = notificationRecipient();

  if (!resend || !to) {
    console.warn("[email] Quote notification skipped — RESEND_API_KEY or QUOTE_NOTIFICATION_EMAIL not configured.");
    return { sent: false as const };
  }

  const lines = [
    `Name: ${payload.customerName}`,
    payload.customerEmail ? `Email: ${payload.customerEmail}` : null,
    payload.customerPhone ? `Phone: ${payload.customerPhone}` : null,
    payload.treeInterest ? `Tree or item: ${payload.treeInterest}` : null,
    payload.requestedItems ? `\nSelected trees / items:\n${payload.requestedItems}` : null,
    payload.message ? `\nMessage:\n${payload.message}` : null,
    `\nSubmitted: ${payload.submittedAt}`,
  ].filter(Boolean);

  try {
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to,
      subject: `New pricing request — ${payload.customerName}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("[email] Owner notification failed:", error.message);
      return { sent: false as const, error: error.message };
    }

    return { sent: true as const };
  } catch (error) {
    console.error("[email] Owner notification threw:", error);
    return { sent: false as const };
  }
}

export async function sendQuoteConfirmationEmail(payload: QuoteEmailPayload) {
  const resend = getResendClient();

  if (!resend || !payload.customerEmail) {
    return { sent: false as const };
  }

  const lines = [
    "Thank you for contacting Cedar Creek Farms.",
    "",
    "We received your request and will follow up with current pricing, size options, and availability as soon as possible.",
    "",
    payload.treeInterest ? `Requested item/tree: ${payload.treeInterest}` : null,
    `Contact email: ${payload.customerEmail}`,
    payload.customerPhone ? `Phone: ${payload.customerPhone}` : null,
    "",
    "— Cedar Creek Farms",
  ].filter(Boolean);

  try {
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: payload.customerEmail,
      subject: "We received your Cedar Creek Farms request",
      text: lines.join("\n"),
    });

    if (error) {
      console.error("[email] Customer confirmation failed:", error.message);
      return { sent: false as const, error: error.message };
    }

    return { sent: true as const };
  } catch (error) {
    console.error("[email] Customer confirmation threw:", error);
    return { sent: false as const };
  }
}
