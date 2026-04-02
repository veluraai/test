console.log("ENV:", import.meta.env)
console.log("URL:", import.meta.env.VITE_SUPABASE_URL)
import { createClient } from '@supabase/supabase-js'

// Move these values to .env file as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default supabase