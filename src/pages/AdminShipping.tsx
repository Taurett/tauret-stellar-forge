/**
 * /admin/shipping — admin-only management for shipping zones.
 * Each zone has a flat rate, currency, country list, optional ETA and
 * active flag. Customers see only active zones at checkout.
 */
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldAlert, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useShippingZones, type ShippingZone } from "@/hooks/useShippingZones";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { useSeo } from "@/hooks/useSeo";
import { toast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

interface ZoneDraft {
  id?: string;
  name: string;
  description: string;
  country_codes: string;
  flat_rate: string;
  currency: string;
  estimated_days: string;
  is_active: boolean;
  sort_order: number;
}

const empty: ZoneDraft = {
  name: "", description: "", country_codes: "",
  flat_rate: "0.00", currency: "usd", estimated_days: "",
  is_active: true, sort_order: 0,
};

const AdminShipping = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const { zones, loading, refetch } = useShippingZones({ includeInactive: true });
  const [draft, setDraft] = useState<ZoneDraft | null>(null);
  const [saving, setSaving] = useState(false);

  useSeo({ title: "Admin · Shipping · TAURET", noindex: true, canonical: "/admin/shipping" });

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
    if (!draft.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      name: draft.name.trim(),
      description: draft.description.trim() || null,
      country_codes: draft.country_codes.split(",").map((c) => c.trim().toUpperCase()).filter(Boolean),
      flat_rate_cents: Math.round(parseFloat(draft.flat_rate || "0") * 100),
      currency: (draft.currency || "usd").toLowerCase(),
      estimated_days: draft.estimated_days.trim() || null,
      is_active: draft.is_active,
      sort_order: draft.sort_order,
    };
    const { error } = draft.id
      ? await supabase.from("shipping_zones").update(payload).eq("id", draft.id)
      : await supabase.from("shipping_zones").insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: draft.id ? "Zone updated" : "Zone created" });
    setDraft(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this shipping zone?")) return;
    const { error } = await supabase.from("shipping_zones").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Zone deleted" });
    refetch();
  };

  const editFrom = (z: ShippingZone): ZoneDraft => ({
    id: z.id,
    name: z.name,
    description: z.description ?? "",
    country_codes: z.country_codes.join(", "),
    flat_rate: (z.flat_rate_cents / 100).toFixed(2),
    currency: z.currency,
    estimated_days: z.estimated_days ?? "",
    is_active: z.is_active,
    sort_order: z.sort_order,
  });

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />

      <header className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow mb-6">
            <ArrowLeft className="w-3 h-3" /> Home
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
                Admin · Shipping
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-black">
                <span className="text-aurora">Zones &amp; Rates</span>
              </h1>
            </div>
            <Button onClick={() => setDraft(empty)} className="font-tech text-xs uppercase tracking-widest">
              <Plus className="w-4 h-4 mr-2" /> New Zone
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          </div>
        ) : zones.length === 0 ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 text-center text-muted-foreground">
            No shipping zones yet. Create your first one.
          </div>
        ) : (
          <div className="grid gap-4">
            {zones.map((z) => (
              <div key={z.id} className={`glass clip-angle-lg border p-5 ${z.is_active ? "border-primary/20" : "border-muted/20 opacity-60"}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-xl font-bold">{z.name}</h3>
                      {!z.is_active && (
                        <span className="font-tech text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded border border-muted/50 text-muted-foreground">
                          Inactive
                        </span>
                      )}
                    </div>
                    {z.description && <p className="text-sm text-muted-foreground mb-2">{z.description}</p>}
                    <div className="font-tech text-xs text-muted-foreground">
                      {z.country_codes.length === 0 ? "All countries" : z.country_codes.join(", ")}
                      {z.estimated_days && <> · {z.estimated_days}</>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-black text-primary">
                      {new Intl.NumberFormat(undefined, { style: "currency", currency: z.currency.toUpperCase() }).format(z.flat_rate_cents / 100)}
                    </div>
                    <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">flat rate</div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => setDraft(editFrom(z))}>Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(z.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{draft?.id ? "Edit Zone" : "New Shipping Zone"}</DialogTitle>
            <DialogDescription>Flat rate applied at checkout for matching countries.</DialogDescription>
          </DialogHeader>
          {draft && (
            <div className="space-y-3">
              <div>
                <Label>Name</Label>
                <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Romania" />
              </div>
              <div>
                <Label>Description</Label>
                <Input value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Standard shipping within Romania" />
              </div>
              <div>
                <Label>Country codes (comma-separated, ISO 2-letter; leave empty for catch-all)</Label>
                <Textarea
                  value={draft.country_codes}
                  onChange={(e) => setDraft({ ...draft, country_codes: e.target.value })}
                  placeholder="RO, MD"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Rate</Label>
                  <Input type="number" step="0.01" min={0} value={draft.flat_rate} onChange={(e) => setDraft({ ...draft, flat_rate: e.target.value })} />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Input value={draft.currency} onChange={(e) => setDraft({ ...draft, currency: e.target.value })} placeholder="usd" />
                </div>
                <div>
                  <Label>Sort</Label>
                  <Input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <Label>Estimated delivery</Label>
                <Input value={draft.estimated_days} onChange={(e) => setDraft({ ...draft, estimated_days: e.target.value })} placeholder="2-4 business days" />
              </div>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={draft.is_active} onChange={(e) => setDraft({ ...draft, is_active: e.target.checked })} />
                Active
              </label>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDraft(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminShipping;
