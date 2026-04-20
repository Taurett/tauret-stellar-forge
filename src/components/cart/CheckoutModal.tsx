import { useEffect } from "react";
import { X } from "lucide-react";
import { CartItem } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getStripePriceId } from "@/lib/productPricing";
import {
  StripeEmbeddedCheckout,
  CheckoutLineItem,
} from "@/components/StripeEmbeddedCheckout";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  customerEmail?: string;
  userId?: string;
}

const CheckoutModal = ({
  open,
  onClose,
  items,
  customerEmail,
  userId,
}: CheckoutModalProps) => {
  const { t } = useLanguage();

  // Esc-to-close for accessibility.
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const lineItems: CheckoutLineItem[] = items
    .map((i): CheckoutLineItem | null => {
      const priceId = getStripePriceId(i.id);
      return priceId ? { priceId, quantity: i.quantity } : null;
    })
    .filter((i): i is CheckoutLineItem => i !== null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      className="fixed inset-0 z-[200] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl my-8">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em]"
          aria-label="Close checkout"
        >
          <X className="w-4 h-4" />
          {t("cart.close") || "Close"}
        </button>
        <div className="glass clip-angle-lg border border-primary/20 p-2 sm:p-4">
          <StripeEmbeddedCheckout
            items={lineItems}
            customerEmail={customerEmail}
            userId={userId}
            returnUrl={`${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
