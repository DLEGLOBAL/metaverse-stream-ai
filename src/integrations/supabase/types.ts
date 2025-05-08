export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_models: {
        Row: {
          description: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          description?: string | null
          id: string
          is_active?: boolean
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      avatars: {
        Row: {
          created_at: string
          id: string
          model_type: string
          model_url: string | null
          name: string
          processing_id: string | null
          settings: Json
          source_image_url: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          model_type: string
          model_url?: string | null
          name: string
          processing_id?: string | null
          settings?: Json
          source_image_url?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          model_type?: string
          model_url?: string | null
          name?: string
          processing_id?: string | null
          settings?: Json
          source_image_url?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          quantity: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          stream_url: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          stream_url?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          stream_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string | null
          id: string
          is_from_performer: boolean | null
          message: string
          stream_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_from_performer?: boolean | null
          message: string
          stream_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_from_performer?: boolean | null
          message?: string
          stream_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streaming_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      content_library: {
        Row: {
          content_url: string
          created_at: string | null
          description: string | null
          duration_seconds: number | null
          id: string
          performer_id: string
          preview_url: string | null
          price_tokens: number
          tags: string[] | null
          title: string
        }
        Insert: {
          content_url: string
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          performer_id: string
          preview_url?: string | null
          price_tokens: number
          tags?: string[] | null
          title: string
        }
        Update: {
          content_url?: string
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          performer_id?: string
          preview_url?: string | null
          price_tokens?: number
          tags?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_library_performer_id_fkey"
            columns: ["performer_id"]
            isOneToOne: false
            referencedRelation: "performers"
            referencedColumns: ["id"]
          },
        ]
      }
      content_purchases: {
        Row: {
          content_id: string
          created_at: string | null
          id: string
          price_paid: number
          user_id: string
        }
        Insert: {
          content_id: string
          created_at?: string | null
          id?: string
          price_paid: number
          user_id: string
        }
        Update: {
          content_id?: string
          created_at?: string | null
          id?: string
          price_paid?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_purchases_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_library"
            referencedColumns: ["id"]
          },
        ]
      }
      export_formats: {
        Row: {
          description: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          description?: string | null
          id: string
          is_active?: boolean
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          performer_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          performer_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          performer_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_performer_id_fkey"
            columns: ["performer_id"]
            isOneToOne: false
            referencedRelation: "performers"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          created_at: string
          id: string
          square_order_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          square_order_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          square_order_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          card_brand: string | null
          created_at: string
          id: string
          is_default: boolean | null
          last_four: string | null
          square_customer_id: string | null
          square_payment_method_id: string | null
          user_id: string
        }
        Insert: {
          card_brand?: string | null
          created_at?: string
          id?: string
          is_default?: boolean | null
          last_four?: string | null
          square_customer_id?: string | null
          square_payment_method_id?: string | null
          user_id: string
        }
        Update: {
          card_brand?: string | null
          created_at?: string
          id?: string
          is_default?: boolean | null
          last_four?: string | null
          square_customer_id?: string | null
          square_payment_method_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      performers: {
        Row: {
          bio: string | null
          categories: string[] | null
          created_at: string | null
          id: string
          image_url: string | null
          is_live: boolean | null
          name: string
          price_per_minute: number
          rating: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bio?: string | null
          categories?: string[] | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_live?: boolean | null
          name: string
          price_per_minute?: number
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bio?: string | null
          categories?: string[] | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_live?: boolean | null
          name?: string
          price_per_minute?: number
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      private_show_requests: {
        Row: {
          created_at: string | null
          duration_minutes: number
          id: string
          performer_id: string
          price_tokens: number
          requested_time: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes: number
          id?: string
          performer_id: string
          price_tokens: number
          requested_time: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number
          id?: string
          performer_id?: string
          price_tokens?: number
          requested_time?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "private_show_requests_performer_id_fkey"
            columns: ["performer_id"]
            isOneToOne: false
            referencedRelation: "performers"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          in_stock: boolean | null
          name: string
          price: number
          size: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          name: string
          price: number
          size: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          name?: string
          price?: number
          size?: string
          updated_at?: string | null
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
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      programs: {
        Row: {
          channel_id: string
          created_at: string | null
          description: string | null
          end_time: string
          id: string
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          channel_id: string
          created_at?: string | null
          description?: string | null
          end_time: string
          id?: string
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          channel_id?: string
          created_at?: string | null
          description?: string | null
          end_time?: string
          id?: string
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      streaming_sessions: {
        Row: {
          actual_start: string | null
          created_at: string | null
          description: string | null
          end_time: string | null
          id: string
          is_private: boolean | null
          performer_id: string
          scheduled_start: string | null
          status: string | null
          stream_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          actual_start?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          is_private?: boolean | null
          performer_id: string
          scheduled_start?: string | null
          status?: string | null
          stream_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          actual_start?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          is_private?: boolean | null
          performer_id?: string
          scheduled_start?: string | null
          status?: string | null
          stream_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "streaming_sessions_performer_id_fkey"
            columns: ["performer_id"]
            isOneToOne: false
            referencedRelation: "performers"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscription_tiers: {
        Row: {
          created_at: string
          description: string | null
          features: Json
          id: string
          name: string
          price: number
          stripe_price_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          name: string
          price: number
          stripe_price_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          name?: string
          price?: number
          stripe_price_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          performer_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          performer_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          performer_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_performer_id_fkey"
            columns: ["performer_id"]
            isOneToOne: false
            referencedRelation: "performers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorites: {
        Row: {
          channel_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          channel_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          channel_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          notification_settings: Json | null
          preferred_categories: string[] | null
          theme: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          language?: string | null
          notification_settings?: Json | null
          preferred_categories?: string[] | null
          theme?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          notification_settings?: Json | null
          preferred_categories?: string[] | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          created_at: string | null
          id: string
          token_balance: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          token_balance?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          token_balance?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
