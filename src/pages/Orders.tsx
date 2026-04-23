/**
 * /orders — list of the current user's orders.
 */
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, Package, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { useSeo } from "@/hooks/useSeo";

interface OrderRow {
  id: string;
  stripe_session_id: string;
  amount_total: number;
  currency: string;
  status: string;
  created_at: string;
  customer_email: string | null;
}

const formatMoney = (cents: number, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: (currency || "usd").toUpperCase(),
  }).format((cents || 0) / 100);

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useSeo({ title: "My Orders · TAURET", noindex: true, canonical: "/orders" });

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, stripe_session_id, amount_total, currency, status, created_at, customer_email")
        .order("created_at", { ascending: false });
      setOrders((data ?? []) as OrderRow[]);
      setLoading(false);
    })();
  }, [user, authLoading]);

  if (!authLoading && !user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />

      <header className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" />
            {t("shop.backHome")}
          </Link>
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
            Account
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black">
            <span className="text-aurora">My Orders</span>
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="font-tech text-xs uppercase tracking-[0.3em]">Loading…</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 text-center">
            <Package className="h-16 w-16 text-muted-foreground/40 mb-4 mx-auto" strokeWidth={1.5} />
            <p className="text-muted-foreground mb-6">No orders yet.</p>
            <Link to="/shop">
              <Button className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle">
                Browse the shop
              </Button>
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {orders.map((o) => (
              <li key={o.id}>
                <Link
                  to={`/orders/${o.id}`}
                  className="glass clip-angle border border-primary/20 hover:border-primary/40 p-4 md:p-5 flex flex-wrap items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {new Date(o.created_at).toLocaleString()}
                    </span>
                    <span className="font-mono text-[11px] truncate text-muted-foreground/80">
                      {o.stripe_session_id}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-tech text-[10px] uppercase tracking-[0.3em] px-2 py-1 rounded border border-primary/30 text-primary">
                      {o.status}
                    </span>
                    <span className="font-tech font-black text-lg text-aurora">
                      {formatMoney(o.amount_total, o.currency)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Orders;
