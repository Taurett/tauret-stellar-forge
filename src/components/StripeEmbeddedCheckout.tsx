import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { supabase } from "@/integrations/supabase/client";

export interface CheckoutLineItem {
  priceId: string;
  quantity?: number;
}

export interface CheckoutShipping {
  zoneId: string;
  zoneName: string;
  amountCents: number;
  currency: string;
}

interface StripeEmbeddedCheckoutProps {
  items: CheckoutLineItem[];
  customerEmail?: string;
  userId?: string;
  returnUrl?: string;
  shipping?: CheckoutShipping;
}

export function StripeEmbeddedCheckout({
  items,
  customerEmail,
  userId,
  returnUrl,
  shipping,
}: StripeEmbeddedCheckoutProps) {
  const fetchClientSecret = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: {
        items,
        customerEmail,
        userId,
        returnUrl,
        environment: getStripeEnvironment(),
        ...(shipping && { shipping }),
      },
    });
    if (error || !data?.clientSecret) {
      throw new Error(error?.message || "Failed to create checkout session");
    }
    return data.clientSecret;
  };

  return (
    <div id="checkout" className="bg-white rounded-md overflow-hidden">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
