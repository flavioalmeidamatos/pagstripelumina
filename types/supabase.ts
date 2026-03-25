export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      coupons: {
        Row: {
          code: string;
          created_at: string;
          discount_type: "fixed" | "percentage";
          discount_value: number;
          id: string;
          is_active: boolean;
        };
        Insert: {
          code: string;
          created_at?: string;
          discount_type: "fixed" | "percentage";
          discount_value: number;
          id?: string;
          is_active?: boolean;
        };
        Update: {
          code?: string;
          created_at?: string;
          discount_type?: "fixed" | "percentage";
          discount_value?: number;
          id?: string;
          is_active?: boolean;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          created_at: string;
          id: string;
          stripe_customer_id: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          stripe_customer_id?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          stripe_customer_id?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      favorites: {
        Row: {
          created_at: string;
          id: string;
          product_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          product_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          product_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          image_url: string | null;
          order_id: string;
          product_id: string | null;
          product_name: string;
          quantity: number;
          unit_price: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_url?: string | null;
          order_id: string;
          product_id?: string | null;
          product_name: string;
          quantity: number;
          unit_price: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_url?: string | null;
          order_id?: string;
          product_id?: string | null;
          product_name?: string;
          quantity?: number;
          unit_price?: number;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          coupon_code: string | null;
          created_at: string;
          discount_amount: number;
          id: string;
          shipping_amount: number;
          status: "pending" | "paid" | "failed" | "refunded";
          stripe_customer_id: string | null;
          stripe_session_id: string | null;
          subtotal_amount: number;
          total_amount: number;
          payment_intent_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          coupon_code?: string | null;
          created_at?: string;
          discount_amount?: number;
          id?: string;
          shipping_amount?: number;
          status?: "pending" | "paid" | "failed" | "refunded";
          stripe_customer_id?: string | null;
          stripe_session_id?: string | null;
          subtotal_amount: number;
          total_amount: number;
          payment_intent_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          coupon_code?: string | null;
          created_at?: string;
          discount_amount?: number;
          id?: string;
          shipping_amount?: number;
          status?: "pending" | "paid" | "failed" | "refunded";
          stripe_customer_id?: string | null;
          stripe_session_id?: string | null;
          subtotal_amount?: number;
          total_amount?: number;
          payment_intent_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          amount: number;
          created_at: string;
          id: string;
          order_id: string;
          payment_intent_id: string | null;
          provider: string;
          provider_status: string | null;
          refund_id: string | null;
          stripe_customer_id: string | null;
          stripe_session_id: string | null;
          updated_at: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          id?: string;
          order_id: string;
          payment_intent_id?: string | null;
          provider?: string;
          provider_status?: string | null;
          refund_id?: string | null;
          stripe_customer_id?: string | null;
          stripe_session_id?: string | null;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: string;
          order_id?: string;
          payment_intent_id?: string | null;
          provider?: string;
          provider_status?: string | null;
          refund_id?: string | null;
          stripe_customer_id?: string | null;
          stripe_session_id?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          alt_text: string | null;
          created_at: string;
          id: string;
          image_url: string;
          product_id: string;
          sort_order: number;
        };
        Insert: {
          alt_text?: string | null;
          created_at?: string;
          id?: string;
          image_url: string;
          product_id: string;
          sort_order?: number;
        };
        Update: {
          alt_text?: string | null;
          created_at?: string;
          id?: string;
          image_url?: string;
          product_id?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      products: {
        Row: {
          brand: string;
          category_id: string;
          compare_at_price: number | null;
          created_at: string;
          description: string;
          id: string;
          inventory_count: number;
          is_featured: boolean;
          is_kit: boolean;
          name: string;
          price: number;
          rating: number;
          reviews_count: number;
          slug: string;
          subtitle: string;
          updated_at: string;
        };
        Insert: {
          brand: string;
          category_id: string;
          compare_at_price?: number | null;
          created_at?: string;
          description: string;
          id?: string;
          inventory_count?: number;
          is_featured?: boolean;
          is_kit?: boolean;
          name: string;
          price: number;
          rating?: number;
          reviews_count?: number;
          slug: string;
          subtitle: string;
          updated_at?: string;
        };
        Update: {
          brand?: string;
          category_id?: string;
          compare_at_price?: number | null;
          created_at?: string;
          description?: string;
          id?: string;
          inventory_count?: number;
          is_featured?: boolean;
          is_kit?: boolean;
          name?: string;
          price?: number;
          rating?: number;
          reviews_count?: number;
          slug?: string;
          subtitle?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          phone: string | null;
          role: "customer" | "admin";
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
          phone?: string | null;
          role?: "customer" | "admin";
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          role?: "customer" | "admin";
          updated_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          author_name: string;
          content: string;
          created_at: string;
          id: string;
          product_id: string;
          rating: number;
          title: string;
          user_id: string | null;
        };
        Insert: {
          author_name: string;
          content: string;
          created_at?: string;
          id?: string;
          product_id: string;
          rating: number;
          title: string;
          user_id?: string | null;
        };
        Update: {
          author_name?: string;
          content?: string;
          created_at?: string;
          id?: string;
          product_id?: string;
          rating?: number;
          title?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          created_at: string;
          id: string;
          key: string;
          value: Json;
        };
        Insert: {
          created_at?: string;
          id?: string;
          key: string;
          value: Json;
        };
        Update: {
          created_at?: string;
          id?: string;
          key?: string;
          value?: Json;
        };
        Relationships: [];
      };
    };
  };
};
