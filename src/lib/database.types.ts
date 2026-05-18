// Auto-generated types matching the Supabase schema for Wilson Express Autos

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: {
          id: string
          make: string
          model: string
          year: number
          price: number
          condition: string
          location: string
          mileage: number | null
          transmission: string | null
          fuel_type: string | null
          body_type: string | null
          colour: string | null
          description: string | null
          whatsapp_number: string
          status: string
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          make: string
          model: string
          year: number
          price: number
          condition: string
          location: string
          mileage?: number | null
          transmission?: string | null
          fuel_type?: string | null
          body_type?: string | null
          colour?: string | null
          description?: string | null
          whatsapp_number: string
          status?: string
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          make?: string
          model?: string
          year?: number
          price?: number
          condition?: string
          location?: string
          mileage?: number | null
          transmission?: string | null
          fuel_type?: string | null
          body_type?: string | null
          colour?: string | null
          description?: string | null
          whatsapp_number?: string
          status?: string
          featured?: boolean
          created_at?: string
        }
      }
      car_images: {
        Row: {
          id: string
          car_id: string
          image_url: string
          is_primary: boolean
        }
        Insert: {
          id?: string
          car_id: string
          image_url: string
          is_primary?: boolean
        }
        Update: {
          id?: string
          car_id?: string
          image_url?: string
          is_primary?: boolean
        }
      }
      enquiries: {
        Row: {
          id: string
          car_id: string | null
          buyer_name: string | null
          buyer_phone: string | null
          message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          car_id?: string | null
          buyer_name?: string | null
          buyer_phone?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          car_id?: string | null
          buyer_name?: string | null
          buyer_phone?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
      }
    }
  }
}

// Convenience types
export type DbCar = Database['public']['Tables']['cars']['Row']
export type DbCarInsert = Database['public']['Tables']['cars']['Insert']
export type DbCarImage = Database['public']['Tables']['car_images']['Row']
export type DbEnquiry = Database['public']['Tables']['enquiries']['Row']

// Car with images joined
export type DbCarWithImages = DbCar & {
  car_images: DbCarImage[]
}
