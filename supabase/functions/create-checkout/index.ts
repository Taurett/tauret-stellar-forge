import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LineItemInput {
  priceId: string;
  quantity?: number;
}

interface ShippingInput {
  zoneId?: string;
  zoneName?: string;
  amountCents?: number;
  currency?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, customerEmail, userId, returnUrl, environment, shipping } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "items array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    for (const it of items as LineItemInput[]) {
      if (!it.priceId || typeof it.priceId !== "string" || !/^[a-zA-Z0-9_-]+$/.test(it.priceId)) {
        return new Response(JSON.stringify({ error: `Invalid priceId: ${it.priceId}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const env = (environment || "sandbox") as StripeEnv;
    const stripe = createStripeClient(env);

    // Resolve all human-readable price IDs to Stripe price IDs via lookup_keys
    const lookupKeys = (items as LineItemInput[]).map((i) => i.priceId);
    const prices = await stripe.prices.list({ lookup_keys: lookupKeys, limit: 100 });

    const priceMap = new Map<string, { id: string }>(
      prices.data.map((p: { id: string; lookup_key: string | null }) => [p.lookup_key ?? "", { id: p.id }]),
    );
    const line_items = (items as LineItemInput[]).map((i) => {
      const price = priceMap.get(i.priceId);
      if (!price) throw new Error(`Price not found: ${i.priceId}`);
      return { price: price.id, quantity: i.quantity || 1 };
    });

    // Optional shipping option — converted into a Stripe shipping_rate_data entry.
    const shippingOptions = (() => {
      const s = shipping as ShippingInput | undefined;
      if (!s || typeof s.amountCents !== "number" || s.amountCents < 0) return undefined;
      return [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(s.amountCents),
              currency: (s.currency || "usd").toLowerCase(),
            },
            display_name: s.zoneName || "Shipping",
          },
        },
      ];
    })();

    const metadata: Record<string, string> = {};
    if (userId) metadata.userId = userId;
    if (shipping?.zoneId) metadata.shipping_zone_id = shipping.zoneId;
    if (shipping?.zoneName) metadata.shipping_zone_name = shipping.zoneName;

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      ui_mode: "embedded",
      return_url: returnUrl || `${req.headers.get("origin")}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      ...(customerEmail && { customer_email: customerEmail }),
      ...(Object.keys(metadata).length > 0 && { metadata }),
      ...(shippingOptions && { shipping_options: shippingOptions }),
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("create-checkout error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
