import { CartItem } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getStripePriceId } from "@/lib/productPricing";
import {
  StripeEmbeddedCheckout,
  CheckoutLineItem,
} from "@/components/StripeEmbeddedCheckout";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  customerEmail?: string;
  userId?: string;
}

/**
 * Radix Dialog gives us focus trap, Esc-to-close, scroll lock,
 * `aria-modal` semantics, and a labelled close button for free.
 */
const CheckoutModal = ({
  open,
  onClose,
  items,
  customerEmail,
  userId,
}: CheckoutModalProps) => {
  const { t } = useLanguage();

  const lineItems: CheckoutLineItem[] = items
    .map((i): CheckoutLineItem | null => {
      const priceId = getStripePriceId(i.id);
      return priceId ? { priceId, quantity: i.quantity } : null;
    })
    .filter((i): i is CheckoutLineItem => i !== null);

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent
        className="max-w-2xl w-[calc(100%-2rem)] glass clip-angle-lg border border-primary/20 p-2 sm:p-4 bg-background/95 max-h-[90vh] overflow-y-auto"
      >
        {/* Title + description are required for screen readers but visually hidden
            so the embedded Stripe iframe stays the visual focus. */}
        <VisuallyHidden>
          <DialogTitle>{t("cart.checkout") || "Checkout"}</DialogTitle>
          <DialogDescription>
            {t("cart.checkoutDescription") ||
              "Complete your purchase securely via Stripe."}
          </DialogDescription>
        </VisuallyHidden>
        <StripeEmbeddedCheckout
          items={lineItems}
          customerEmail={customerEmail}
          userId={userId}
          returnUrl={`${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
