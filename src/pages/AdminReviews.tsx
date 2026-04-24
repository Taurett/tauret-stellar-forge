/**
 * /admin/reviews — admin moderation queue.
 * Lists pending reviews with approve / reject actions.
 */
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldAlert, Star, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { useSeo } from "@/hooks/useSeo";
import { toast } from "@/hooks/use-toast";
import type { Review } from "@/hooks/useProductReviews";

const AdminReviews = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useSeo({ title: "Admin · Reviews · TAURET", noindex: true, canonical: "/admin/reviews" });

  const refresh = async () => {
    const { data } = await supabase
      .from("product_reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setReviews((data ?? []) as Review[]);
    setLoading(false);
  };

  useEffect(() => {
    if (roleLoading || !isAdmin) return;
    refresh();
  }, [isAdmin, roleLoading]);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase.from("product_reviews").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: status === "approved" ? "Approved" : "Rejected" });
    setReviews((rs) => rs.map((r) => r.id === id ? { ...r, status } : r));
  };

  if (!authLoading && !user) return <Navigate to="/auth" replace />;
  if (!roleLoading && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="glass clip-angle-lg p-10 border border-destructive/30 max-w-md text-center">
          <ShieldAlert className="h-12 w-12 text-destructive mb-4 mx-auto" />
          <h1 className="font-display text-2xl font-bold mb-2">Admins only</h1>
          <Link to="/">
            <Button variant="outline" className="glass border-primary/30 font-tech uppercase tracking-widest clip-angle">
              <ArrowLeft className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const pending = reviews.filter((r) => r.status === "pending");
  const decided = reviews.filter((r) => r.status !== "pending");

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
            Home
          </Link>
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
            Admin · {pending.length} pending
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black">
            <span className="text-aurora">{t("admin.reviews.title")}</span>
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16 space-y-10">
        {loading ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <section>
              <h2 className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-4">Pending</h2>
              {pending.length === 0 ? (
                <p className="text-muted-foreground text-sm">{t("admin.reviews.empty")}</p>
              ) : (
                <ul className="space-y-4">
                  {pending.map((r) => (
                    <ReviewCard key={r.id} r={r} onApprove={() => updateStatus(r.id, "approved")} onReject={() => updateStatus(r.id, "rejected")} />
                  ))}
                </ul>
              )}
            </section>

            {decided.length > 0 && (
              <section>
                <h2 className="font-tech text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Recent decisions</h2>
                <ul className="space-y-3">
                  {decided.slice(0, 20).map((r) => (
                    <li key={r.id} className="glass clip-angle p-4 border border-primary/10 flex items-center justify-between gap-4 text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`font-tech text-[10px] uppercase tracking-[0.25em] px-2 py-0.5 rounded border ${r.status === "approved" ? "border-primary/40 text-primary" : "border-destructive/40 text-destructive"}`}>
                          {r.status}
                        </span>
                        <span className="truncate">{r.title || r.body.slice(0, 60)}</span>
                      </div>
                      <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">#{r.product_id}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

const ReviewCard = ({ r, onApprove, onReject }: { r: Review; onApprove: () => void; onReject: () => void }) => (
  <li className="glass clip-angle-lg p-5 border border-primary/20">
    <div className="flex items-start justify-between gap-3 mb-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className={`w-3.5 h-3.5 ${n <= r.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
            ))}
          </div>
          <span className="font-tech text-xs text-muted-foreground">
            {r.display_name || "Anonymous"} · Product #{r.product_id}
          </span>
        </div>
        {r.title && <p className="font-bold">{r.title}</p>}
      </div>
      <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
        {new Date(r.created_at).toLocaleDateString()}
      </span>
    </div>
    <p className="text-sm text-muted-foreground whitespace-pre-line mb-3">{r.body}</p>
    {r.photo_urls.length > 0 && (
      <div className="flex gap-2 mb-3">
        {r.photo_urls.map((url) => (
          <a key={url} href={url} target="_blank" rel="noreferrer">
            <img src={url} alt="" loading="lazy" className="w-16 h-16 object-cover rounded border border-primary/20" />
          </a>
        ))}
      </div>
    )}
    <div className="flex gap-2">
      <Button onClick={onApprove} size="sm" className="bg-primary text-primary-foreground font-tech uppercase tracking-widest text-xs clip-angle">
        <Check className="w-4 h-4 mr-1" /> Approve
      </Button>
      <Button onClick={onReject} size="sm" variant="outline" className="glass border-destructive/40 text-destructive hover:bg-destructive/10 font-tech uppercase tracking-widest text-xs clip-angle">
        <X className="w-4 h-4 mr-1" /> Reject
      </Button>
    </div>
  </li>
);

export default AdminReviews;
