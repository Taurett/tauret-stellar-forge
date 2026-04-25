/**
 * /admin/inventory — admin-only page for managing product variants.
 * Lists every variant grouped by product, lets admins create / edit / delete
 * and adjust stock counts. Out-of-stock and low-stock rows are visually
 * highlighted so triage is fast.
 */
import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldAlert, Plus, Trash2, AlertTriangle, PackageX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useAllVariants, type ProductVariant } from "@/hooks/useProductVariants";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { useSeo } from "@/hooks/useSeo";
import { toast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

interface VariantDraft {
  id?: string;
  product_id: number;
  color: string;
  color_hex: string;
  material: string;
  size: string;
  sku: string;
  image_url: string;
  price_override: string;
  stock_count: number;
  low_stock_threshold: number;
  is_active: boolean;
}

const emptyDraft = (productId: number): VariantDraft => ({
  product_id: productId,
  color: "",
  color_hex: "",
  material: "",
  size: "",
  sku: "",
  image_url: "",
  price_override: "",
  stock_count: 0,
  low_stock_threshold: 5,
  is_active: true,
});

const AdminInventory = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const { variants, loading, refetch } = useAllVariants();
  const [draft, setDraft] = useState<VariantDraft | null>(null);
  const [saving, setSaving] = useState(false);

  useSeo({ title: "Admin · Inventory · TAURET", noindex: true, canonical: "/admin/inventory" });

  const grouped = useMemo(() => {
    const map = new Map<number, ProductVariant[]>();
    for (const v of variants) {
      if (!map.has(v.product_id)) map.set(v.product_id, []);
      map.get(v.product_id)!.push(v);
    }
    return map;
  }, [variants]);

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

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    const payload = {
      product_id: draft.product_id,
      color: draft.color || null,
      color_hex: draft.color_hex || null,
      material: draft.material || null,
      size: draft.size || null,
      sku: draft.sku || null,
      image_url: draft.image_url || null,
      price_override: draft.price_override ? Math.round(parseFloat(draft.price_override) * 100) : null,
      stock_count: Math.max(0, Math.floor(draft.stock_count)),
      low_stock_threshold: Math.max(0, Math.floor(draft.low_stock_threshold)),
      is_active: draft.is_active,
    };
    const { error } = draft.id
      ? await supabase.from("product_variants").update(payload).eq("id", draft.id)
      : await supabase.from("product_variants").insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: draft.id ? "Variant updated" : "Variant created" });
    setDraft(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this variant? This cannot be undone.")) return;
    const { error } = await supabase.from("product_variants").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Variant deleted" });
    refetch();
  };

  const adjustStock = async (id: string, delta: number) => {
    const v = variants.find((x) => x.id === id);
    if (!v) return;
    const next = Math.max(0, v.stock_count + delta);
    const { error } = await supabase.from("product_variants").update({ stock_count: next }).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    refetch();
  };

  const totalStock = variants.reduce((s, v) => s + v.stock_count, 0);
  const lowStockCount = variants.filter((v) => v.is_active && v.stock_count > 0 && v.stock_count <= v.low_stock_threshold).length;
  const outCount = variants.filter((v) => v.is_active && v.stock_count === 0).length;

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
            Admin · Inventory
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-3">
            <span className="text-aurora">Stock Control</span>
          </h1>
          <div className="flex flex-wrap gap-3 font-tech text-xs">
            <span className="px-3 py-1.5 rounded border border-primary/40 text-primary">
              {variants.length} variants · {totalStock} units
            </span>
            {lowStockCount > 0 && (
              <span className="px-3 py-1.5 rounded border border-yellow-500/40 text-yellow-500 inline-flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3" /> {lowStockCount} low stock
              </span>
            )}
            {outCount > 0 && (
              <span className="px-3 py-1.5 rounded border border-destructive/40 text-destructive inline-flex items-center gap-1.5">
                <PackageX className="w-3 h-3" /> {outCount} out of stock
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16 space-y-8">
        {loading ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="font-tech text-xs uppercase tracking-[0.3em]">Loading…</span>
          </div>
        ) : (
          PRODUCTS.map((p) => {
            const productVariants = grouped.get(p.id) ?? [];
            return (
              <section key={p.id} className="glass clip-angle-lg border border-primary/20 p-5">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      #{p.id} · {p.category}
                    </div>
                    <div className="font-display text-lg font-bold capitalize">{p.primaryImage.replace(/-/g, " ")}</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setDraft(emptyDraft(p.id))}
                    className="font-tech text-xs uppercase tracking-widest"
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add Variant
                  </Button>
                </div>

                {productVariants.length === 0 ? (
                  <div className="text-sm text-muted-foreground italic">No variants. Uses base price &amp; default sizes.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-b border-border/60">
                          <th className="px-2 py-2 text-left">Color</th>
                          <th className="px-2 py-2 text-left">Material</th>
                          <th className="px-2 py-2 text-left">Size</th>
                          <th className="px-2 py-2 text-left">SKU</th>
                          <th className="px-2 py-2 text-right">Stock</th>
                          <th className="px-2 py-2 text-right">Low @</th>
                          <th className="px-2 py-2 text-right">Price</th>
                          <th className="px-2 py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {productVariants.map((v) => {
                          const isOut = v.stock_count === 0;
                          const isLow = !isOut && v.stock_count <= v.low_stock_threshold;
                          return (
                            <tr
                              key={v.id}
                              className={`border-b border-border/30 last:border-b-0 ${isOut ? "bg-destructive/5" : isLow ? "bg-yellow-500/5" : ""}`}
                            >
                              <td className="px-2 py-2">
                                <div className="flex items-center gap-2">
                                  {v.color_hex && (
                                    <span className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: v.color_hex }} />
                                  )}
                                  {v.color || "—"}
                                </div>
                              </td>
                              <td className="px-2 py-2">{v.material || "—"}</td>
                              <td className="px-2 py-2">{v.size || "—"}</td>
                              <td className="px-2 py-2 font-mono text-[11px] text-muted-foreground">{v.sku || "—"}</td>
                              <td className="px-2 py-2 text-right">
                                <div className="inline-flex items-center gap-1">
                                  <button onClick={() => adjustStock(v.id, -1)} className="px-1.5 text-xs hover:text-primary">−</button>
                                  <span className={`font-tech font-bold w-8 text-center ${isOut ? "text-destructive" : isLow ? "text-yellow-500" : ""}`}>
                                    {v.stock_count}
                                  </span>
                                  <button onClick={() => adjustStock(v.id, 1)} className="px-1.5 text-xs hover:text-primary">+</button>
                                </div>
                              </td>
                              <td className="px-2 py-2 text-right text-muted-foreground">{v.low_stock_threshold}</td>
                              <td className="px-2 py-2 text-right">
                                {v.price_override !== null ? `$${(v.price_override / 100).toFixed(2)}` : <span className="text-muted-foreground">base</span>}
                              </td>
                              <td className="px-2 py-2 text-right">
                                <div className="inline-flex gap-1">
                                  <button
                                    onClick={() => setDraft({
                                      id: v.id, product_id: v.product_id,
                                      color: v.color ?? "", color_hex: v.color_hex ?? "",
                                      material: v.material ?? "", size: v.size ?? "",
                                      sku: v.sku ?? "", image_url: v.image_url ?? "",
                                      price_override: v.price_override !== null ? (v.price_override / 100).toFixed(2) : "",
                                      stock_count: v.stock_count, low_stock_threshold: v.low_stock_threshold,
                                      is_active: v.is_active,
                                    })}
                                    className="font-tech text-[10px] uppercase tracking-widest text-primary hover:text-primary-glow px-2"
                                  >
                                    Edit
                                  </button>
                                  <button onClick={() => handleDelete(v.id)} className="text-destructive/70 hover:text-destructive px-1">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            );
          })
        )}
      </main>

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{draft?.id ? "Edit Variant" : "New Variant"}</DialogTitle>
            <DialogDescription>Stock-keeping unit for product #{draft?.product_id}</DialogDescription>
          </DialogHeader>
          {draft && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Color</Label>
                <Input value={draft.color} onChange={(e) => setDraft({ ...draft, color: e.target.value })} placeholder="Black" />
              </div>
              <div>
                <Label>Color hex</Label>
                <Input value={draft.color_hex} onChange={(e) => setDraft({ ...draft, color_hex: e.target.value })} placeholder="#000000" />
              </div>
              <div>
                <Label>Material</Label>
                <Input value={draft.material} onChange={(e) => setDraft({ ...draft, material: e.target.value })} placeholder="Cotton blend" />
              </div>
              <div>
                <Label>Size</Label>
                <Input value={draft.size} onChange={(e) => setDraft({ ...draft, size: e.target.value })} placeholder="M" />
              </div>
              <div className="col-span-2">
                <Label>SKU</Label>
                <Input value={draft.sku} onChange={(e) => setDraft({ ...draft, sku: e.target.value })} placeholder="TAU-TEN-OUT-BLK-M" />
              </div>
              <div className="col-span-2">
                <Label>Image URL (optional)</Label>
                <Input value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} placeholder="https://…" />
              </div>
              <div>
                <Label>Stock</Label>
                <Input type="number" min={0} value={draft.stock_count} onChange={(e) => setDraft({ ...draft, stock_count: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Low-stock threshold</Label>
                <Input type="number" min={0} value={draft.low_stock_threshold} onChange={(e) => setDraft({ ...draft, low_stock_threshold: Number(e.target.value) })} />
              </div>
              <div className="col-span-2">
                <Label>Price override (USD, optional)</Label>
                <Input type="number" step="0.01" min={0} value={draft.price_override} onChange={(e) => setDraft({ ...draft, price_override: e.target.value })} placeholder="leave blank for base price" />
              </div>
              <label className="col-span-2 inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.is_active}
                  onChange={(e) => setDraft({ ...draft, is_active: e.target.checked })}
                />
                Active (visible to shoppers)
              </label>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDraft(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInventory;
