/**
 * /admin/bundles — manage quantity-based bundle deals.
 */
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Plus, Tag, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { toast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/useSeo";
import type { BundleDeal } from "@/hooks/useBundleDeals";

const empty = {
  name: "",
  description: "",
  min_quantity: 2,
  discount_percent: 10,
  product_id: "",
  is_active: true,
};

const AdminBundles = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [bundles, setBundles] = useState<BundleDeal[]>([]);
  const [draft, setDraft] = useState(empty);
  const [saving, setSaving] = useState(false);

  useSeo({ title: "Admin · Bundle Deals · TAURET", noindex: true, canonical: "/admin/bundles" });

  const load = async () => {
    const { data } = await supabase
      .from("bundle_deals")
      .select("*")
      .order("sort_order", { ascending: true });
    setBundles((data ?? []) as BundleDeal[]);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (!authLoading && !user) return <Navigate to="/auth" replace />;
  if (!authLoading && !roleLoading && !isAdmin) return <Navigate to="/" replace />;

  const handleCreate = async () => {
    if (!draft.name.trim() || draft.min_quantity < 2 || draft.discount_percent < 1) {
      toast({ title: "Fill in name, min qty (≥2), discount % (1-90)", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      name: draft.name.trim(),
      description: draft.description.trim() || null,
      min_quantity: draft.min_quantity,
      discount_percent: draft.discount_percent,
      product_id: draft.product_id ? Number(draft.product_id) : null,
      is_active: draft.is_active,
    };
    const { error } = await supabase.from("bundle_deals").insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
      return;
    }
    setDraft(empty);
    toast({ title: "Bundle created" });
    load();
  };

  const handleToggle = async (b: BundleDeal) => {
    await supabase.from("bundle_deals").update({ is_active: !b.is_active }).eq("id", b.id);
    load();
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this bundle?")) return;
    await supabase.from("bundle_deals").delete().eq("id", id);
    load();
  };

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />

      <main className="max-w-5xl mx-auto px-4 pt-32 pb-16">
        <Link to="/admin/orders" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors mb-6">
          <ArrowLeft className="w-3 h-3" />
          Admin
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <Tag className="w-6 h-6 text-primary" />
          <h1 className="font-display text-4xl font-black">
            <span className="text-aurora">Bundle Deals</span>
          </h1>
        </div>

        <section className="glass clip-angle-lg p-6 border border-primary/20 mb-8">
          <h2 className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-4">New Bundle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-tech text-[10px] uppercase tracking-wider">Name</Label>
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="bg-input/60 border-primary/20" />
            </div>
            <div>
              <Label className="font-tech text-[10px] uppercase tracking-wider">Description (optional)</Label>
              <Input value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="bg-input/60 border-primary/20" />
            </div>
            <div>
              <Label className="font-tech text-[10px] uppercase tracking-wider">Min Quantity</Label>
              <Input type="number" min={2} value={draft.min_quantity} onChange={(e) => setDraft({ ...draft, min_quantity: Number(e.target.value) })} className="bg-input/60 border-primary/20" />
            </div>
            <div>
              <Label className="font-tech text-[10px] uppercase tracking-wider">Discount %</Label>
              <Input type="number" min={1} max={90} value={draft.discount_percent} onChange={(e) => setDraft({ ...draft, discount_percent: Number(e.target.value) })} className="bg-input/60 border-primary/20" />
            </div>
            <div className="md:col-span-2">
              <Label className="font-tech text-[10px] uppercase tracking-wider">
                Product ID (leave empty for site-wide)
              </Label>
              <Input value={draft.product_id} onChange={(e) => setDraft({ ...draft, product_id: e.target.value })} placeholder="e.g. 7 — or empty" className="bg-input/60 border-primary/20" />
            </div>
          </div>
          <Button onClick={handleCreate} disabled={saving} className="mt-4 bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest text-xs clip-angle">
            <Plus className="w-3 h-3 mr-2" />
            {saving ? "Saving…" : "Create Bundle"}
          </Button>
        </section>

        <section>
          <h2 className="font-tech text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Active & Inactive ({bundles.length})
          </h2>
          {bundles.length === 0 ? (
            <div className="glass clip-angle p-6 border border-primary/20 text-center text-sm text-muted-foreground">
              No bundles yet.
            </div>
          ) : (
            <ul className="space-y-3">
              {bundles.map((b) => (
                <li key={b.id} className="glass clip-angle p-4 border border-primary/20 flex items-center gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground">{b.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Buy {b.min_quantity}+ → {b.discount_percent}% off
                      {b.product_id != null ? ` · Product #${b.product_id}` : " · Site-wide"}
                      {b.description && ` · ${b.description}`}
                    </div>
                  </div>
                  <Button onClick={() => handleToggle(b)} size="sm" variant="outline" className="glass border-primary/30 font-tech uppercase tracking-widest text-[10px] clip-angle">
                    {b.is_active ? "Disable" : "Enable"}
                  </Button>
                  <Button onClick={() => handleDelete(b.id)} size="sm" variant="ghost" className="text-destructive">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminBundles;
