import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/public'

// Use dynamic env to handle missing variables gracefully
const supabaseUrl = env.PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types (you'll generate these from your Supabase schema)
export interface Database {
  public: {
    Tables: {
      spots: {
        Row: {
          id: string
          name: string
          location: string
          images: string[]
          description: string
          distance?: string
          open_status?: boolean
          rating: {
            overall: number
            atmosphere: number
            comfort: number
            quiet: number
            seating: number
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          images: string[]
          description: string
          distance?: string
          open_status?: boolean
          rating: {
            overall: number
            atmosphere: number
            comfort: number
            quiet: number
            seating: number
          }
        }
        Update: {
          id?: string
          name?: string
          location?: string
          images?: string[]
          description?: string
          distance?: string
          open_status?: boolean
          rating?: {
            overall: number
            atmosphere: number
            comfort: number
            quiet: number
            seating: number
          }
        }
      }
    }
  }
} 