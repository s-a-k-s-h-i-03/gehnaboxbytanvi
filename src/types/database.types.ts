export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ItemStockType = "READY_TO_SHIP" | "MADE_TO_ORDER";
export type OrderStatus = "PENDING" | "CONFIRMED" | "IN_MAKING" | "DISPATCHED" | "DELIVERED" | "CANCELLED";
export type PaymentChannel = "ONLINE_RAZORPAY" | "COD" | "WHATSAPP_MANUAL";

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          banner_image_url: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          banner_image_url: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          banner_image_url?: string;
          display_order?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          sku: string;
          slug: string;
          title: string;
          subtitle: string | null;
          description: string;
          price_inr: number;
          mrp_inr: number;
          item_type: ItemStockType;
          lead_time_days: number;
          base_material: string;
          plating_type: string;
          stone_type: string | null;
          is_gift_wrappable: boolean;
          is_featured: boolean;
          is_trending: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          sku: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          description: string;
          price_inr: number;
          mrp_inr: number;
          item_type?: ItemStockType;
          lead_time_days?: number;
          base_material: string;
          plating_type: string;
          stone_type?: string | null;
          is_gift_wrappable?: boolean;
          is_featured?: boolean;
          is_trending?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          sku?: string;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          description?: string;
          price_inr?: number;
          mrp_inr?: number;
          item_type?: ItemStockType;
          lead_time_days?: number;
          base_material?: string;
          plating_type?: string;
          stone_type?: string | null;
          is_gift_wrappable?: boolean;
          is_featured?: boolean;
          is_trending?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          variant_name: string;
          sku_modifier: string | null;
          stock_quantity: number;
          price_delta_inr: number;
          color_code: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          variant_name: string;
          sku_modifier?: string | null;
          stock_quantity?: number;
          price_delta_inr?: number;
          color_code?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          variant_name?: string;
          sku_modifier?: string | null;
          stock_quantity?: number;
          price_delta_inr?: number;
          color_code?: string | null;
        };
      };
      product_media: {
        Row: {
          id: string;
          product_id: string;
          media_url: string;
          media_type: string;
          display_order: number;
          alt_text: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          media_url: string;
          media_type?: string;
          display_order?: number;
          alt_text?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          media_url?: string;
          media_type?: string;
          display_order?: number;
          alt_text?: string | null;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          shipping_address: Json;
          subtotal_inr: number;
          gift_wrap_selected: boolean;
          gift_wrap_fee_inr: number;
          gift_message: string | null;
          total_inr: number;
          status: OrderStatus;
          payment_mode: PaymentChannel;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_name: string;
          customer_phone: string;
          customer_email?: string | null;
          shipping_address: Json;
          subtotal_inr: number;
          gift_wrap_selected?: boolean;
          gift_wrap_fee_inr?: number;
          gift_message?: string | null;
          total_inr: number;
          status?: OrderStatus;
          payment_mode?: PaymentChannel;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string | null;
          shipping_address?: Json;
          subtotal_inr?: number;
          gift_wrap_selected?: boolean;
          gift_wrap_fee_inr?: number;
          gift_message?: string | null;
          total_inr?: number;
          status?: OrderStatus;
          payment_mode?: PaymentChannel;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          variant_id: string | null;
          quantity: number;
          unit_price_inr: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          variant_id?: string | null;
          quantity?: number;
          unit_price_inr: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          variant_id?: string | null;
          quantity?: number;
          unit_price_inr?: number;
        };
      };
    };
  };
}
