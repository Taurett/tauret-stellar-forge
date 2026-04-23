import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const env = ((url.searchParams.get("env") as StripeEnv) || "sandbox") as StripeEnv;

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(JSON.stringify({ error: "Missing stripe-signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const webhookSecret = env === "sandbox"
      ? Deno.env.get("PAYMENTS_SANDBOX_WEBHOOK_SECRET")
      : Deno.env.get("PAYMENTS_LIVE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = createStripeClient(env);
    const body = await req.text();

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error("Webhook signature verification failed:", msg);
      return new Response(JSON.stringify({ error: `Invalid signature: ${msg}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Received webhook event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      console.log("Checkout completed:", session.id, "userId:", session.metadata?.userId);

      // Fetch full session with line items expanded
      const full = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items", "line_items.data.price.product"],
      });

      const userId = session.metadata?.userId || null;
      const lineItems = full.line_items?.data ?? [];

      // Upsert order (idempotent on stripe_session_id)
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .upsert(
          {
            user_id: userId,
            stripe_session_id: session.id,
            customer_email: session.customer_email || session.customer_details?.email || null,
            amount_total: session.amount_total ?? 0,
            currency: (session.currency || "usd").toLowerCase(),
            status: session.payment_status === "paid" ? "completed" : (session.payment_status || "pending"),
            environment: env,
            metadata: session.metadata ?? {},
          },
          { onConflict: "stripe_session_id" },
        )
        .select()
        .single();

      if (orderErr) {
        console.error("Order upsert failed:", orderErr);
        throw orderErr;
      }

      // Replace items (in case of retry)
      await supabase.from("order_items").delete().eq("order_id", order.id);

      const itemRows = lineItems.map((li: any) => {
        const product = li.price?.product;
        const name = (typeof product === "object" && product?.name) || li.description || "Item";
        const lookupKey = li.price?.lookup_key || li.price?.metadata?.lovable_external_id || null;
        const productIdMeta = (typeof product === "object" && product?.metadata?.product_id) || null;
        return {
          order_id: order.id,
          product_id: productIdMeta ? Number(productIdMeta) : null,
          product_name: name,
          stripe_price_id: lookupKey,
          unit_amount: li.price?.unit_amount ?? 0,
          quantity: li.quantity ?? 1,
          subtotal: (li.price?.unit_amount ?? 0) * (li.quantity ?? 1),
        };
      });

      if (itemRows.length > 0) {
        const { error: itemsErr } = await supabase.from("order_items").insert(itemRows);
        if (itemsErr) {
          console.error("Order items insert failed:", itemsErr);
          throw itemsErr;
        }
      }

      console.log("Order recorded:", order.id, "items:", itemRows.length);
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("payments-webhook error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
