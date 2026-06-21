export type ProductAvailability = "available" | "sold_out" | "hidden";
export type OrderStatus = "new" | "contacted" | "fulfilled" | "archived";
export type UserRole = "admin" | "user";

export type Product = {
  id: string;
  name: string;
  common_name: string | null;
  description: string | null;
  price: string | null;
  size: string | null;
  category: string | null;
  image_url: string | null;
  best_use: string | null;
  sun_needs: string | null;
  water_needs: string | null;
  mature_size: string | null;
  availability: ProductAvailability;
  sort_order: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  category: string | null;
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  message: string | null;
  requested_items: string | null;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
};

export type SiteSettings = {
  id: string;
  business_name: string;
  contact_email: string;
  phone_display: string | null;
  phone_tel: string | null;
  service_area: string;
  contact_page_intro: string | null;
  footer_note: string;
  facebook_url: string | null;
  instagram_url: string | null;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Product>;
      };
      gallery: {
        Row: GalleryItem;
        Insert: Omit<GalleryItem, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<GalleryItem>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, "id" | "created_at" | "updated_at" | "status"> & {
          id?: string;
          status?: OrderStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Order>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at"> & { created_at?: string };
        Update: Partial<Profile>;
      };
      site_settings: {
        Row: SiteSettings;
        Insert: Omit<SiteSettings, "updated_at"> & { updated_at?: string };
        Update: Partial<SiteSettings>;
      };
    };
  };
};
