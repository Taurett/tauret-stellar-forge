/**
 * /admin/orders — admin-only list of EVERY order across all users.
 * RLS allows admins to read all rows; non-admins are bounced to home.
 */
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { useSeo } from "@/hooks/useSeo";

interface AdminOrderRow {
  id: string;
  stripe_session_id: string;
  user_id: string | null;
  customer_email: string | null;
  amount_total: number;
  currency: string;
  status: string;
  environment: string;
  created_at: string;
}

const formatMoney = (cents: number, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: (currency || "usd").toUpperCase(),
  }).format((cents || 0) / 100);

const AdminOrders = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [orders, setOrders] = useState<AdminOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(0);

  useSeo({ title: "Admin · Orders · TAURET", noindex: true, canonical: "/admin/orders" });

  useEffect(() => {
    if (roleLoading || !isAdmin) return;
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, stripe_session_id, user_id, customer_email, amount_total, currency, status, environment, created_at")
        .order("created_at", { ascending: false })
        .limit(500);
      const list = (data ?? []) as AdminOrderRow[];
      setOrders(list);
      setRevenue(list.reduce((sum, o) => sum + (o.amount_total || 0), 0));
      setLoading(false);
    })();
  }, [isAdmin, roleLoading]);

  if (!authLoading && !user) return <Navigate to="/auth" replace />;
  if (!roleLoading && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="glass clip-angle-lg p-10 border border-destructive/30 max-w-md text-center">
          <ShieldAlert className="h-12 w-12 text-destructive mb-4 mx-auto" />
          <h1 className="font-display text-2xl font-bold mb-2">Admins only</h1>
          <p className="text-sm text-muted-foreground mb-6">You don't have permission to view this page.</p>
          <Link to="/">
            <Button variant="outline" className="glass border-primary/30 font-tech uppercase tracking-widest clip-angle">
              <ArrowLeft className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Group revenue by currency for the header (most common = USD)
  const currency = orders[0]?.currency || "usd";

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />

      <header className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" />
            Home
          </Link>
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
            Admin · {orders.length} orders
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-2">
            <span className="text-aurora">All Orders</span>
          </h1>
          <p className="font-tech text-sm text-muted-foreground">
            Total revenue: <span className="text-foreground font-bold">{formatMoney(revenue, currency)}</span>
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="font-tech text-xs uppercase tracking-[0.3em]">Loading…</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 text-center text-muted-foreground">
            No orders yet.
          </div>
        ) : (
          <div className="glass clip-angle-lg border border-primary/20 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-b border-border/60">
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Session</th>
                  <th className="px-4 py-3 text-left">Env</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-border/30 last:border-b-0 hover:bg-primary/5">
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {new Date(o.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{o.customer_email || "—"}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground/80 max-w-[180px] truncate">
                      {o.stripe_session_id}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-tech text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded border border-border/60">
                        {o.environment}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-tech text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded border border-primary/40 text-primary">
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-tech font-black">
                      {formatMoney(o.amount_total, o.currency)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link to={`/orders/${o.id}`} className="font-tech text-[10px] uppercase tracking-[0.3em] text-primary hover:text-primary-glow">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminOrders;
