/**
 * /admin/analytics — KPI dashboard for the store.
 * Fetches all orders + items and computes:
 *   • Revenue total + last 30 days + chart by day
 *   • Order count + AOV
 *   • Top-selling products by units & revenue
 *   • Order status / shipment status breakdown
 *   • Returns count + refund volume
 * Pure SQL aggregates would be cleaner long-term but client-side is plenty
 * fast at this scale and avoids extra RPCs.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldAlert, TrendingUp, ShoppingBag, RotateCcw, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { useSeo } from "@/hooks/useSeo";

interface OrderRow {
  id: string;
  amount_total: number;
  currency: string;
  status: string;
  shipment_status: string;
  created_at: string;
}

interface ItemRow {
  product_id: number | null;
  product_name: string;
  quantity: number;
  subtotal: number;
}

interface ReturnRow { status: string; refund_amount_cents: number | null }

const fmt = (cents: number, currency = "usd") =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);

const AdminAnalytics = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [items, setItems] = useState<ItemRow[]>([]);
  const [returns, setReturns] = useState<ReturnRow[]>([]);
  const [loading, setLoading] = useState(true);

  useSeo({ title: "Admin · Analytics · TAURET", noindex: true, canonical: "/admin/analytics" });

  useEffect(() => {
    if (roleLoading || !isAdmin) return;
    (async () => {
      const [oRes, iRes, rRes] = await Promise.all([
        supabase.from("orders").select("id, amount_total, currency, status, shipment_status, created_at").order("created_at", { ascending: false }).limit(1000),
        supabase.from("order_items").select("product_id, product_name, quantity, subtotal").limit(5000),
        supabase.from("return_requests").select("status, refund_amount_cents").limit(1000),
      ]);
      setOrders((oRes.data ?? []) as OrderRow[]);
      setItems((iRes.data ?? []) as ItemRow[]);
      setReturns((rRes.data ?? []) as ReturnRow[]);
      setLoading(false);
    })();
  }, [isAdmin, roleLoading]);

  const stats = useMemo(() => {
    const currency = orders[0]?.currency || "usd";
    const total = orders.reduce((s, o) => s + (o.amount_total || 0), 0);
    const now = Date.now();
    const last30 = orders.filter((o) => now - new Date(o.created_at).getTime() < 30 * 86400_000);
    const last30Total = last30.reduce((s, o) => s + (o.amount_total || 0), 0);
    const aov = orders.length ? total / orders.length : 0;

    const byShipment = orders.reduce<Record<string, number>>((acc, o) => {
      acc[o.shipment_status] = (acc[o.shipment_status] || 0) + 1;
      return acc;
    }, {});

    // Sales by day for last 30 days
    const byDay = new Map<string, number>();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now - i * 86400_000);
      byDay.set(d.toISOString().slice(0, 10), 0);
    }
    for (const o of last30) {
      const k = new Date(o.created_at).toISOString().slice(0, 10);
      if (byDay.has(k)) byDay.set(k, byDay.get(k)! + o.amount_total);
    }
    const dayPoints = Array.from(byDay.entries()).map(([day, cents]) => ({ day, cents }));
    const dayMax = Math.max(1, ...dayPoints.map((p) => p.cents));

    // Top products
    const byProduct = new Map<string, { name: string; units: number; revenue: number }>();
    for (const it of items) {
      const key = it.product_name || `#${it.product_id}`;
      const cur = byProduct.get(key) ?? { name: key, units: 0, revenue: 0 };
      cur.units += it.quantity;
      cur.revenue += it.subtotal;
      byProduct.set(key, cur);
    }
    const topProducts = Array.from(byProduct.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 8);

    const refundedCents = returns
      .filter((r) => r.status === "refunded")
      .reduce((s, r) => s + (r.refund_amount_cents || 0), 0);

    return { currency, total, last30Total, aov, byShipment, dayPoints, dayMax, topProducts, refundedCents };
  }, [orders, items, returns]);

  if (!authLoading && !user) return <Navigate to="/auth" replace />;
  if (!roleLoading && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="glass clip-angle-lg p-10 border border-destructive/30 max-w-md text-center">
          <ShieldAlert className="h-12 w-12 text-destructive mb-4 mx-auto" />
          <h1 className="font-display text-2xl font-bold mb-2">Admins only</h1>
          <Link to="/"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Home</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />

      <header className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow mb-6">
            <ArrowLeft className="w-3 h-3" /> Home
          </Link>
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
            Admin · Analytics
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black">
            <span className="text-aurora">Dashboard</span>
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16 space-y-6">
        {loading ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Kpi icon={<DollarSign className="w-4 h-4" />} label="Total revenue" value={fmt(stats.total, stats.currency)} />
              <Kpi icon={<TrendingUp className="w-4 h-4" />} label="Last 30 days" value={fmt(stats.last30Total, stats.currency)} />
              <Kpi icon={<ShoppingBag className="w-4 h-4" />} label="Orders / AOV" value={`${orders.length} · ${fmt(stats.aov, stats.currency)}`} />
              <Kpi icon={<RotateCcw className="w-4 h-4" />} label="Refunded" value={fmt(stats.refundedCents, stats.currency)} />
            </div>

            <section className="glass clip-angle-lg border border-primary/20 p-5">
              <h2 className="font-display text-lg font-bold mb-4">Revenue · Last 30 days</h2>
              <div className="flex items-end gap-1 h-40">
                {stats.dayPoints.map((p) => (
                  <div key={p.day} className="flex-1 flex flex-col items-center gap-1" title={`${p.day}: ${fmt(p.cents, stats.currency)}`}>
                    <div
                      className="w-full bg-gradient-neon rounded-sm min-h-[2px]"
                      style={{ height: `${(p.cents / stats.dayMax) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                <span>{stats.dayPoints[0]?.day}</span>
                <span>{stats.dayPoints[stats.dayPoints.length - 1]?.day}</span>
              </div>
            </section>

            <div className="grid lg:grid-cols-2 gap-6">
              <section className="glass clip-angle-lg border border-primary/20 p-5">
                <h2 className="font-display text-lg font-bold mb-4">Top Products</h2>
                {stats.topProducts.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No sales yet.</div>
                ) : (
                  <ul className="space-y-2">
                    {stats.topProducts.map((p, i) => (
                      <li key={p.name} className="flex items-center justify-between gap-3 py-2 border-b border-border/30 last:border-0">
                        <span className="font-tech text-xs text-muted-foreground w-6">#{i + 1}</span>
                        <span className="flex-1 truncate">{p.name}</span>
                        <span className="font-tech text-xs text-muted-foreground">{p.units}u</span>
                        <span className="font-tech font-bold text-primary">{fmt(p.revenue, stats.currency)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="glass clip-angle-lg border border-primary/20 p-5">
                <h2 className="font-display text-lg font-bold mb-4">Shipment Funnel</h2>
                <ul className="space-y-3">
                  {(["processing", "shipped", "delivered", "cancelled"] as const).map((s) => {
                    const count = stats.byShipment[s] || 0;
                    const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
                    return (
                      <li key={s}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{s}</span>
                          <span className="font-tech text-muted-foreground">{count} · {pct}%</span>
                        </div>
                        <div className="h-2 bg-muted/30 rounded overflow-hidden">
                          <div className="h-full bg-gradient-neon" style={{ width: `${pct}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const Kpi = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="glass clip-angle-lg border border-primary/20 p-4">
    <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground inline-flex items-center gap-1.5 mb-2">
      {icon} {label}
    </div>
    <div className="font-display text-2xl font-black text-aurora truncate">{value}</div>
  </div>
);

export default AdminAnalytics;
