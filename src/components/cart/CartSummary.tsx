import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
}

const CartSummary = ({ subtotal, onCheckout }: CartSummaryProps) => {
  const { t, formatPrice } = useLanguage();
  const tax = subtotal * 0.1;
  const total = subtotal * 1.1;

  return (
    <div className="glass clip-angle-lg p-6 border border-primary/20 sticky top-28">
      <div className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-4">
        {t("cart.summary")}
      </div>
      <h3 className="font-display text-2xl font-bold text-foreground mb-6 uppercase">
        {t("cart.orderTotal")}
      </h3>

      <div className="space-y-3 font-tech text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span className="uppercase tracking-wider">{t("cart.subtotal")}</span>
          <span className="text-foreground">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span className="uppercase tracking-wider">{t("cart.shipping")}</span>
          <span className="text-primary">{t("cart.free")}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span className="uppercase tracking-wider">{t("cart.tax")}</span>
          <span className="text-foreground">{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-primary/20 pt-4 mt-4">
          <div className="flex justify-between items-baseline">
            <span className="font-tech text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {t("cart.total")}
            </span>
            <span className="font-display text-3xl font-bold text-aurora">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <Button
          onClick={onCheckout}
          className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle hover:shadow-neon-cyan py-6"
        >
          {t("cart.checkout")}
        </Button>
        <Link to="/shop" className="block">
          <Button
            variant="outline"
            className="w-full glass border-primary/30 text-foreground hover:text-primary hover:border-primary font-tech uppercase tracking-widest clip-angle"
          >
            {t("cart.keepShopping")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
