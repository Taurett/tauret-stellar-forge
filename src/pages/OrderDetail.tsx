/**
 * /orders/:id — full receipt view of a single order (user or admin).
 */
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import OrderReceipt, { ReceiptOrder } from "@/components/OrderReceipt";
import { useSeo } from "@/hooks/useSeo";

const OrderDetail = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState<ReceiptOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useSeo({ title: "Order · TAURET", noindex: true, canonical: `/orders/${id}` });

  useEffect(() => {
    if (authLoading || !user || !id) return;
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", id)
        .maybeSingle();
      if (!data) {
        setNotFound(true);
      } else {
        setOrder(data as unknown as ReceiptOrder);
      }
      setLoading(false);
    })();
  }, [id, user, authLoading]);

  if (!authLoading && !user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />

      <main className="max-w-3xl mx-auto px-4 pt-32 pb-16">
        <Link to="/orders" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors mb-6 print:hidden">
          <ArrowLeft className="w-3 h-3" />
          Back to orders
        </Link>

        {loading ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="font-tech text-xs uppercase tracking-[0.3em]">Loading…</span>
          </div>
        ) : notFound || !order ? (
          <div className="glass clip-angle-lg p-12 border border-destructive/30 text-center">
            <p className="text-muted-foreground mb-6">Order not found.</p>
            <Link to="/orders">
              <Button variant="outline" className="glass border-primary/30 font-tech uppercase tracking-widest clip-angle">
                Back to orders
              </Button>
            </Link>
          </div>
        ) : (
          <OrderReceipt order={order} />
        )}
      </main>
    </div>
  );
};

export default OrderDetail;
