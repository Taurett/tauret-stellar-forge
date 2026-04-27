export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bundle_deals: {
        Row: {
          created_at: string
          description: string | null
          discount_percent: number
          ends_at: string | null
          id: string
          is_active: boolean
          min_quantity: number
          name: string
          product_id: number | null
          sort_order: number
          starts_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_percent: number
          ends_at?: string | null
          id?: string
          is_active?: boolean
          min_quantity: number
          name: string
          product_id?: number | null
          sort_order?: number
          starts_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_percent?: number
          ends_at?: string | null
          id?: string
          is_active?: boolean
          min_quantity?: number
          name?: string
          product_id?: number | null
          sort_order?: number
          starts_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          session_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          session_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          session_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: number | null
          product_name: string
          quantity: number
          stripe_price_id: string | null
          subtotal: number
          unit_amount: number
          variant_id: string | null
          variant_label: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id?: number | null
          product_name: string
          quantity?: number
          stripe_price_id?: string | null
          subtotal?: number
          unit_amount?: number
          variant_id?: string | null
          variant_label?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: number | null
          product_name?: string
          quantity?: number
          stripe_price_id?: string | null
          subtotal?: number
          unit_amount?: number
          variant_id?: string | null
          variant_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          admin_notes: string | null
          amount_total: number
          carrier: string | null
          created_at: string
          currency: string
          customer_email: string | null
          delivered_at: string | null
          environment: string
          id: string
          metadata: Json | null
          shipment_status: string
          shipped_at: string | null
          shipping_address: Json | null
          shipping_amount: number
          shipping_zone_id: string | null
          shipping_zone_name: string | null
          status: string
          stripe_session_id: string
          tracking_number: string | null
          tracking_url: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount_total?: number
          carrier?: string | null
          created_at?: string
          currency?: string
          customer_email?: string | null
          delivered_at?: string | null
          environment?: string
          id?: string
          metadata?: Json | null
          shipment_status?: string
          shipped_at?: string | null
          shipping_address?: Json | null
          shipping_amount?: number
          shipping_zone_id?: string | null
          shipping_zone_name?: string | null
          status?: string
          stripe_session_id: string
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount_total?: number
          carrier?: string | null
          created_at?: string
          currency?: string
          customer_email?: string | null
          delivered_at?: string | null
          environment?: string
          id?: string
          metadata?: Json | null
          shipment_status?: string
          shipped_at?: string | null
          shipping_address?: Json | null
          shipping_amount?: number
          shipping_zone_id?: string | null
          shipping_zone_name?: string | null
          status?: string
          stripe_session_id?: string
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      product_answers: {
        Row: {
          body: string
          created_at: string
          display_name: string | null
          id: string
          is_admin_answer: boolean
          question_id: string
          status: Database["public"]["Enums"]["qa_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          display_name?: string | null
          id?: string
          is_admin_answer?: boolean
          question_id: string
          status?: Database["public"]["Enums"]["qa_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          display_name?: string | null
          id?: string
          is_admin_answer?: boolean
          question_id?: string
          status?: Database["public"]["Enums"]["qa_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "product_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      product_questions: {
        Row: {
          body: string
          created_at: string
          display_name: string | null
          id: string
          product_id: number
          status: Database["public"]["Enums"]["qa_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          display_name?: string | null
          id?: string
          product_id: number
          status?: Database["public"]["Enums"]["qa_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          display_name?: string | null
          id?: string
          product_id?: number
          status?: Database["public"]["Enums"]["qa_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          body: string
          created_at: string
          display_name: string | null
          id: string
          photo_urls: string[]
          product_id: number
          rating: number
          status: Database["public"]["Enums"]["review_status"]
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          display_name?: string | null
          id?: string
          photo_urls?: string[]
          product_id: number
          rating: number
          status?: Database["public"]["Enums"]["review_status"]
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          display_name?: string | null
          id?: string
          photo_urls?: string[]
          product_id?: number
          rating?: number
          status?: Database["public"]["Enums"]["review_status"]
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          color: string | null
          color_hex: string | null
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean
          low_stock_threshold: number
          material: string | null
          price_override: number | null
          product_id: number
          size: string | null
          sku: string | null
          sort_order: number
          stock_count: number
          updated_at: string
        }
        Insert: {
          color?: string | null
          color_hex?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          low_stock_threshold?: number
          material?: string | null
          price_override?: number | null
          product_id: number
          size?: string | null
          sku?: string | null
          sort_order?: number
          stock_count?: number
          updated_at?: string
        }
        Update: {
          color?: string | null
          color_hex?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          low_stock_threshold?: number
          material?: string | null
          price_override?: number | null
          product_id?: number
          size?: string | null
          sku?: string | null
          sort_order?: number
          stock_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      return_requests: {
        Row: {
          admin_notes: string | null
          created_at: string
          customer_email: string | null
          details: string | null
          id: string
          order_id: string
          photo_urls: string[]
          reason: string
          refund_amount_cents: number | null
          refund_reference: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["return_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          customer_email?: string | null
          details?: string | null
          id?: string
          order_id: string
          photo_urls?: string[]
          reason: string
          refund_amount_cents?: number | null
          refund_reference?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["return_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          customer_email?: string | null
          details?: string | null
          id?: string
          order_id?: string
          photo_urls?: string[]
          reason?: string
          refund_amount_cents?: number | null
          refund_reference?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["return_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      shipping_zones: {
        Row: {
          country_codes: string[]
          created_at: string
          currency: string
          description: string | null
          estimated_days: string | null
          flat_rate_cents: number
          id: string
          is_active: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          country_codes?: string[]
          created_at?: string
          currency?: string
          description?: string | null
          estimated_days?: string | null
          flat_rate_cents?: number
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          country_codes?: string[]
          created_at?: string
          currency?: string
          description?: string | null
          estimated_days?: string | null
          flat_rate_cents?: number
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      stock_notifications: {
        Row: {
          created_at: string
          email: string
          id: string
          notified_at: string | null
          product_id: number
          user_id: string | null
          variant_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          notified_at?: string | null
          product_id: number
          user_id?: string | null
          variant_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          notified_at?: string | null
          product_id?: number
          user_id?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_notifications_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wishlist_shares: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          share_token: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          share_token?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          share_token?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      qa_status: "pending" | "approved" | "rejected"
      return_status:
        | "requested"
        | "approved"
        | "rejected"
        | "refunded"
        | "cancelled"
      review_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      qa_status: ["pending", "approved", "rejected"],
      return_status: [
        "requested",
        "approved",
        "rejected",
        "refunded",
        "cancelled",
      ],
      review_status: ["pending", "approved", "rejected"],
    },
  },
} as const
