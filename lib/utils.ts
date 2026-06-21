import type { Product } from "@/lib/types";

export function availabilityLabel(availability: Product["availability"]) {
  switch (availability) {
    case "available":
      return "Available";
    case "sold_out":
      return "Sold out";
    case "hidden":
      return "Hidden";
  }
}

export function formatPrice(price: string | null) {
  return price || "Call for pricing";
}

export function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export async function uploadSiteImage(
  file: File,
  supabase: ReturnType<typeof import("@/lib/supabase/client").createClient>
) {
  const extension = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error } = await supabase.storage
    .from("site-images")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (error) throw error;

  const { data } = supabase.storage.from("site-images").getPublicUrl(path);
  return data.publicUrl;
}
