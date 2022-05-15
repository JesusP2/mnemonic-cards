import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_PUBLIC!)
export default client;
