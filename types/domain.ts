export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type ProductImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
};

export type ProductReview = {
  id: string;
  rating: number;
  title: string;
  content: string;
  author_name: string;
  created_at: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  brand: string;
  price: number;
  compare_at_price: number | null;
  rating: number;
  reviews_count: number;
  inventory_count: number;
  is_featured: boolean;
  is_kit: boolean;
  category_id: string;
  category?: ProductCategory | null;
  images: ProductImage[];
  reviews?: ProductReview[];
};

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
};

export type OrderStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderSummary = {
  id: string;
  status: OrderStatus;
  total_amount: number;
  subtotal_amount: number;
  shipping_amount: number;
  discount_amount: number;
  created_at: string;
  stripe_session_id: string | null;
  payment_intent_id: string | null;
  items: Array<{
    id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    image_url: string | null;
  }>;
};

export type Profile = {
  id: string;
  full_name: string | null;
  role: "customer" | "admin";
  phone: string | null;
  avatar_url: string | null;
};

export type SiteSettings = {
  shippingFlatRate: number;
  promoBanner: string;
  heroTag: string;
  whatsappNumber: string;
};

