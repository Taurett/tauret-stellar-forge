import { CartItem } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getStripePriceId } from "@/lib/productPricing";
import {
  StripeEmbeddedCheckout,
  CheckoutLineItem,
  CheckoutShipping,
} from "@/components/StripeEmbeddedCheckout";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ShippingZoneSelector from "@/components/ShippingZoneSelector";
import type { ShippingZone } from "@/hooks/useShippingZones";
import { Link } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  customerEmail?: string;
  userId?: string;
}

const guestEmailSchema = z.string().trim().email().max(255);

/**
 * Wraps the Stripe embedded checkout. For signed-in users we pass their email
 * & userId straight through. For guests we collect an email up-front and
 * proceed with no userId — the order will auto-link to a future account that
 * verifies the same email (server-side trigger).
 */
const CheckoutModal = ({
  open,
  onClose,
  items,
  customerEmail,
  userId,
}: CheckoutModalProps) => {
  const { t } = useLanguage();
  const isGuest = !userId;
  const [guestEmail, setGuestEmail] = useState("");
  const [guestEmailError, setGuestEmailError] = useState<string | null>(null);
  const [guestEmailConfirmed, setGuestEmailConfirmed] = useState<string | null>(null);
  const [shippingZone, setShippingZone] = useState<ShippingZone | null>(null);

  const lineItems: CheckoutLineItem[] = items
    .map((i): CheckoutLineItem | null => {
      const priceId = getStripePriceId(i.id);
      return priceId ? { priceId, quantity: i.quantity } : null;
    })
    .filter((i): i is CheckoutLineItem => i !== null);

  const handleClose = (next: boolean) => {
    if (!next) {
      onClose();
      // Reset for next open
      setGuestEmail("");
      setGuestEmailError(null);
      setGuestEmailConfirmed(null);
    }
  };

  const handleGuestContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const result = guestEmailSchema.safeParse(guestEmail);
    if (!result.success) {
      setGuestEmailError(result.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setGuestEmailError(null);
    setGuestEmailConfirmed(result.data);
  };

  const effectiveEmail = customerEmail ?? guestEmailConfirmed ?? undefined;
  const showStripe = (!isGuest || !!guestEmailConfirmed) && !!shippingZone;
  const shippingPayload: CheckoutShipping | undefined = shippingZone
    ? {
        zoneId: shippingZone.id,
        zoneName: shippingZone.name,
        amountCents: shippingZone.flat_rate_cents,
        currency: shippingZone.currency,
      }
    : undefined;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-2xl w-[calc(100%-2rem)] glass clip-angle-lg border border-primary/20 p-2 sm:p-4 bg-background/95 max-h-[90vh] overflow-y-auto"
      >
        <VisuallyHidden>
          <DialogTitle>{t("cart.checkout") || "Checkout"}</DialogTitle>
          <DialogDescription>
            {t("cart.checkoutDescription") || "Complete your purchase securely via Stripe."}
          </DialogDescription>
        </VisuallyHidden>

        {!emailReady ? (
          <form onSubmit={handleGuestContinue} className="p-4 sm:p-6 space-y-5">
            <div>
              <div className="font-tech text-[10px] uppercase tracking-[0.4em] text-primary mb-2">
                // {t("cart.checkout")}
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-black mb-2">
                <span className="text-aurora">{t("guest.heading")}</span>
              </h2>
              <p className="text-sm text-muted-foreground">{t("guest.subheading")}</p>
            </div>

            <div>
              <Label htmlFor="guest-email" className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1.5 block">
                {t("guest.emailLabel")}
              </Label>
              <Input
                id="guest-email"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                required
                autoComplete="email"
                maxLength={255}
                placeholder="you@example.com"
                className="bg-input/60 border-primary/20"
              />
              {guestEmailError && (
                <p className="text-xs text-destructive mt-1">{guestEmailError}</p>
              )}
              <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                {t("guest.linkNotice")}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle"
            >
              {t("guest.continue")}
            </Button>

            <div className="text-center">
              <Link
                to="/auth"
                onClick={onClose}
                className="font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow"
              >
                {t("guest.signInInstead")}
              </Link>
            </div>
          </form>
        ) : !showStripe ? (
          <div className="p-4 sm:p-6 space-y-5">
            <div>
              <div className="font-tech text-[10px] uppercase tracking-[0.4em] text-primary mb-2">
                // {t("shipping.choose")}
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-black mb-2">
                <span className="text-aurora">{t("shipping.choose")}</span>
              </h2>
            </div>
            <ShippingZoneSelector selectedZoneId={shippingZone?.id ?? null} onChange={setShippingZone} />
          </div>
        ) : (
          <StripeEmbeddedCheckout
            items={lineItems}
            customerEmail={effectiveEmail}
            userId={userId}
            returnUrl={`${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`}
            shipping={shippingPayload}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
