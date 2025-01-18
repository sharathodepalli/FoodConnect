export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'donor' | 'recipient' | 'volunteer' | 'base_manager' | 'admin'
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          address: string | null
          business_name: string | null
          business_type: string | null
          storage_capacity: string | null
          operating_hours: string | null
          total_donations: number
          rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'donor' | 'recipient' | 'volunteer' | 'base_manager' | 'admin'
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address?: string | null
          business_name?: string | null
          business_type?: string | null
          storage_capacity?: string | null
          operating_hours?: string | null
          total_donations?: number
          rating?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'donor' | 'recipient' | 'volunteer' | 'base_manager' | 'admin'
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          address?: string | null
          business_name?: string | null
          business_type?: string | null
          storage_capacity?: string | null
          operating_hours?: string | null
          total_donations?: number
          rating?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'donor' | 'recipient' | 'volunteer' | 'base_manager' | 'admin'
    }
  }
}