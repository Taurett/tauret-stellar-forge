import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";
import OrderReceipt, { ReceiptOrder } from "@/components/OrderReceipt";

const CheckoutReturn = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const { t } = useLanguage();
  const [cleared, setCleared] = useState(false);
  const [order, setOrder] = useState<ReceiptOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId && !cleared) {
      clearCart();
      setCleared(true);
    }
  }, [sessionId, cleared, clearCart]);

  // Fetch the order. Webhook may take a moment, so we retry a few times.
  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    let attempts = 0;

    const fetchOrder = async () => {
      setLoading(true);
      while (!cancelled && attempts < 5) {
        attempts++;
        try {
          const { data, error: fnErr } = await supabase.functions.invoke("get-order", {
            body: { sessionId, environment: getStripeEnvironment() },
          });
          if (fnErr) throw fnErr;
          if (data?.order) {
            if (!cancelled) {
              setOrder(data.order as ReceiptOrder);
              setLoading(false);
            }
            return;
          }
        } catch (e) {
          if (attempts >= 5) {
            if (!cancelled) {
              setError(e instanceof Error ? e.message : "Failed to load order");
              setLoading(false);
            }
            return;
          }
        }
        await new Promise((r) => setTimeout(r, 1500));
      }
      if (!cancelled) setLoading(false);
    };

    fetchOrder();
    return () => { cancelled = true; };
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto pt-16">
        {!sessionId ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 text-center">
            <Package className="h-16 w-16 text-muted-foreground/40 mb-4 mx-auto" strokeWidth={1.5} />
            <h1 className="font-display text-3xl font-bold mb-4">
              {t("checkout.return.noSession") || "No order found"}
            </h1>
            <Link to="/shop">
              <Button className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle">
                {t("checkout.return.continue") || "Continue Shopping"}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8 print:hidden">
              <CheckCircle2 className="h-16 w-16 text-primary mb-4 mx-auto" strokeWidth={1.5} />
              <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-2">
                {t("checkout.return.kicker") || "Order Confirmed"}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-black mb-3">
                <span className="text-aurora">{t("checkout.return.title") || "Payment Complete"}</span>
              </h1>
              <p className="text-muted-foreground">
                {t("checkout.return.desc") ||
                  "Thanks for your order! We've sent a confirmation email."}
              </p>
            </div>

            {loading && !order && (
              <div className="glass clip-angle-lg p-12 border border-primary/20 flex flex-col items-center gap-3 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="font-tech text-xs uppercase tracking-[0.3em]">Loading receipt…</span>
              </div>
            )}

            {error && !order && (
              <div className="glass clip-angle-lg p-8 border border-destructive/30 text-center text-sm text-destructive">
                {error}
              </div>
            )}

            {order && <OrderReceipt order={order} />}

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8 print:hidden">
              <Link to="/orders">
                <Button variant="outline" className="glass border-primary/30 font-tech uppercase tracking-widest clip-angle">
                  My Orders
                </Button>
              </Link>
              <Link to="/shop">
                <Button className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle hover:shadow-neon-cyan">
                  {t("checkout.return.continue") || "Continue Shopping"}
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" className="font-tech uppercase tracking-widest">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("checkout.return.home") || "Home"}
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutReturn;
