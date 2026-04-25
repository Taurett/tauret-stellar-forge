/**
 * /admin/returns — admin queue for processing return requests.
 * Lists every request newest-first; admins can approve, reject, or mark
 * refunded (after manually processing the refund in Stripe). Notes captured
 * here are visible to the admin only — the customer sees the status badge.
 */
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldAlert, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useReturnRequests, type ReturnStatus } from "@/hooks/useReturnRequests";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { useSeo } from "@/hooks/useSeo";
import { toast } from "@/hooks/use-toast";

const STATUS_TONE: Record<ReturnStatus, string> = {
  requested: "border-yellow-500/40 text-yellow-500",
  approved: "border-blue-500/40 text-blue-500",
  refunded: "border-emerald-500/40 text-emerald-500",
  rejected: "border-destructive/40 text-destructive",
  cancelled: "border-muted/40 text-muted-foreground",
};

const AdminReturns = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const { requests, loading, refetch } = useReturnRequests({ admin: true });
  const [busy, setBusy] = useState<string | null>(null);

  useSeo({ title: "Admin · Returns · TAURET", noindex: true, canonical: "/admin/returns" });

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

  const updateStatus = async (id: string, status: ReturnStatus, extra: Record<string, unknown> = {}) => {
    setBusy(id);
    const { error } = await supabase.from("return_requests").update({ status, ...extra }).eq("id", id);
    setBusy(null);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Marked ${status}` });
    refetch();
  };

  const saveNotes = async (id: string, notes: string) => {
    setBusy(id);
    const { error } = await supabase.from("return_requests").update({ admin_notes: notes }).eq("id", id);
    setBusy(null);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Notes saved" });
  };

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
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
            Admin · Returns
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black">
            <span className="text-aurora">Return Requests</span>
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16 space-y-4">
        {loading ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          </div>
        ) : requests.length === 0 ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 text-center text-muted-foreground">
            No return requests yet.
          </div>
        ) : (
          requests.map((r) => (
            <ReturnCard
              key={r.id}
              request={r}
              busy={busy === r.id}
              onUpdate={updateStatus}
              onSaveNotes={saveNotes}
              tone={STATUS_TONE[r.status]}
            />
          ))
        )}
      </main>
    </div>
  );
};

interface CardProps {
  request: ReturnType<typeof useReturnRequests>["requests"][number];
  busy: boolean;
  tone: string;
  onUpdate: (id: string, status: ReturnStatus, extra?: Record<string, unknown>) => void;
  onSaveNotes: (id: string, notes: string) => void;
}

const ReturnCard = ({ request: r, busy, tone, onUpdate, onSaveNotes }: CardProps) => {
  const [notes, setNotes] = useState(r.admin_notes ?? "");
  const [refundRef, setRefundRef] = useState(r.refund_reference ?? "");

  return (
    <article className="glass clip-angle-lg border border-primary/20 p-5">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
            {new Date(r.created_at).toLocaleString()}
          </div>
          <div className="font-bold">{r.customer_email || "—"}</div>
          <Link
            to={`/orders/${r.order_id}`}
            className="font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow inline-flex items-center gap-1"
          >
            Order <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        <span className={`font-tech text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded border ${tone}`}>
          {r.status}
        </span>
      </div>

      <div className="text-sm mb-3">
        <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">Reason</div>
        <div className="font-medium">{r.reason}</div>
        {r.details && <p className="text-muted-foreground mt-1 whitespace-pre-line">{r.details}</p>}
      </div>

      {r.photo_urls.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {r.photo_urls.map((u, i) => (
            <a key={i} href={u} target="_blank" rel="noreferrer">
              <img src={u} alt={`Return evidence ${i + 1}`} className="w-20 h-20 object-cover rounded border border-border" />
            </a>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3 mt-4">
        <div>
          <Label className="font-tech text-[10px] uppercase tracking-[0.25em]">Admin notes</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Internal notes…" />
          <Button size="sm" variant="outline" className="mt-2" onClick={() => onSaveNotes(r.id, notes)} disabled={busy}>
            Save notes
          </Button>
        </div>
        <div>
          <Label className="font-tech text-[10px] uppercase tracking-[0.25em]">Refund reference (Stripe id)</Label>
          <Input value={refundRef} onChange={(e) => setRefundRef(e.target.value)} placeholder="re_..." />
          <div className="flex flex-wrap gap-2 mt-2">
            {r.status === "requested" && (
              <>
                <Button size="sm" onClick={() => onUpdate(r.id, "approved")} disabled={busy}>Approve</Button>
                <Button size="sm" variant="outline" onClick={() => onUpdate(r.id, "rejected")} disabled={busy}>Reject</Button>
              </>
            )}
            {(r.status === "approved" || r.status === "requested") && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdate(r.id, "refunded", { refund_reference: refundRef || null })}
                disabled={busy}
              >
                Mark refunded
              </Button>
            )}
            {(r.status === "refunded" || r.status === "rejected") && (
              <Button size="sm" variant="ghost" onClick={() => onUpdate(r.id, "requested")} disabled={busy}>
                Reopen
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default AdminReturns;
