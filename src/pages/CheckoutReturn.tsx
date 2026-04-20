import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

const CheckoutReturn = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const { t } = useLanguage();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (sessionId && !cleared) {
      clearCart();
      setCleared(true);
    }
  }, [sessionId, cleared, clearCart]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative glass clip-angle-lg p-12 border border-primary/20 max-w-lg text-center">
        {sessionId ? (
          <>
            <CheckCircle2 className="h-20 w-20 text-primary mb-6 mx-auto" strokeWidth={1.5} />
            <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
              {t("checkout.return.kicker") || "Order Confirmed"}
            </div>
            <h1 className="font-display text-4xl font-black mb-4">
              <span className="text-aurora">{t("checkout.return.title") || "Payment Complete"}</span>
            </h1>
            <p className="text-muted-foreground mb-2">
              {t("checkout.return.desc") ||
                "Thanks for your order! We'll send a confirmation email shortly."}
            </p>
            <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-8 break-all">
              Ref: {sessionId}
            </p>
          </>
        ) : (
          <>
            <Package className="h-20 w-20 text-muted-foreground/40 mb-6 mx-auto" strokeWidth={1.5} />
            <h1 className="font-display text-3xl font-bold mb-4">
              {t("checkout.return.noSession") || "No order found"}
            </h1>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop">
            <Button className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle hover:shadow-neon-cyan">
              {t("checkout.return.continue") || "Continue Shopping"}
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="glass border-primary/30 font-tech uppercase tracking-widest clip-angle">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("checkout.return.home") || "Home"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutReturn;
