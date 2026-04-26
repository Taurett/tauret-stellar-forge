/**
 * Re-exports the publishable Supabase URL + anon key for use in components
 * that need to call edge functions directly (e.g., for SSE streaming where
 * supabase.functions.invoke can't be used).
 *
 * Reading from the auto-generated client.ts ensures these stay in sync.
 */
import { supabase } from "@/integrations/supabase/client";

// These are PUBLISHABLE / anon keys — safe to expose in the browser.
export const SUPABASE_URL: string =
  // @ts-expect-error supabaseUrl is a public field on the client instance
  supabase.supabaseUrl ?? import.meta.env.VITE_SUPABASE_URL ?? "";

export const SUPABASE_PUBLISHABLE_KEY: string =
  // @ts-expect-error supabaseKey is a public field on the client instance
  supabase.supabaseKey ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";
