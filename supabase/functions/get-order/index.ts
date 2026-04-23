// Returns the order + items for a given Stripe checkout session id.
// Falls back to fetching the session directly from Stripe if the webhook hasn't
// landed yet, so the success page is never blank.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, environment } = await req.json();
    if (!sessionId || typeof sessionId !== "string") {
      return new Response(JSON.stringify({ error: "sessionId required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Try DB first
    const { data: dbOrder } = await admin
      .from("orders")
      .select("*, order_items(*)")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (dbOrder) {
      return new Response(JSON.stringify({ source: "db", order: dbOrder }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Fallback to Stripe (webhook still in flight)
    const env = (environment || "sandbox") as StripeEnv;
    const stripe = createStripeClient(env);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    const items = (session.line_items?.data ?? []).map((li: any) => {
      const product = li.price?.product;
      const name = (typeof product === "object" && product?.name) || li.description || "Item";
      return {
        product_name: name,
        stripe_price_id: li.price?.lookup_key ?? null,
        unit_amount: li.price?.unit_amount ?? 0,
        quantity: li.quantity ?? 1,
        subtotal: (li.price?.unit_amount ?? 0) * (li.quantity ?? 1),
      };
    });

    const fallback = {
      stripe_session_id: session.id,
      customer_email: session.customer_email ?? session.customer_details?.email ?? null,
      amount_total: session.amount_total ?? 0,
      currency: (session.currency || "usd").toLowerCase(),
      status: session.payment_status === "paid" ? "completed" : (session.payment_status || "pending"),
      created_at: new Date((session.created ?? Date.now() / 1000) * 1000).toISOString(),
      order_items: items,
    };

    return new Response(JSON.stringify({ source: "stripe", order: fallback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("get-order error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
