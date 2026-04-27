/**
 * /wishlist/share/:token — public read-only wishlist for the gift-hint flow.
 *
 * No auth required. Loads the share record by token, then resolves the wishlist
 * items belonging to that user. Visitors can browse but not modify.
 */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Gift, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { resolveProduct } from "@/lib/products";
import { useSeo } from "@/hooks/useSeo";

interface ShareInfo {
  id: string;
  user_id: string;
  title: string | null;
  is_active: boolean;
}

const SharedWishlist = () => {
  const { token } = useParams();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const { format } = useCurrency();
  const [share, setShare] = useState<ShareInfo | null>(null);
  const [productIds, setProductIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useSeo({
    title: `${t("share.pageTitle") || "Shared wishlist"} · TAURET`,
    canonical: `/wishlist/share/${token}`,
    noindex: true,
  });

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      const { data: s } = await supabase
        .from("wishlist_shares")
        .select("id, user_id, title, is_active")
        .eq("share_token", token)
        .maybeSingle();
      if (cancelled) return;
      if (!s || !s.is_active) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setShare(s as ShareInfo);
      const { data: items } = await supabase
        .from("wishlists")
        .select("product_id")
        .eq("user_id", s.user_id);
      if (cancelled) return;
      setProductIds((items ?? []).map((r: any) => r.product_id));
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [token]);

  const products = productIds
    .map((id) => resolveProduct(id, language, theme))
    .filter((p): p is NonNullable<ReturnType<typeof resolveProduct>> => p !== null);

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />
      <CurrencySwitcher floating />

      <header className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" />
            {t("shop.backHome") || "Back home"}
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <Gift className="w-5 h-5 text-primary" />
            <span className="font-tech text-xs uppercase tracking-[0.4em] text-primary">
              {t("share.giftHints") || "Gift Hints"}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black">
            <span className="text-aurora">{share?.title || (t("share.pageTitle") || "Shared Wishlist")}</span>
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 text-center text-muted-foreground font-tech text-xs uppercase tracking-[0.3em]">
            …
          </div>
        ) : notFound ? (
          <div className="glass clip-angle-lg p-12 border border-destructive/30 text-center max-w-md mx-auto">
            <p className="text-muted-foreground mb-6">
              {t("share.notFound") || "This wishlist is no longer available."}
            </p>
            <Link to="/shop">
              <Button className="bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest clip-angle">
                {t("cart.browse") || "Browse Shop"}
              </Button>
            </Link>
          </div>
        ) : products.length === 0 ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 text-center max-w-md mx-auto">
            <Heart className="h-16 w-16 text-primary/40 mb-4 mx-auto" strokeWidth={1.4} />
            <p className="text-muted-foreground">
              {t("share.empty") || "This wishlist is currently empty."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group glass clip-angle-lg overflow-hidden border border-primary/20 hover:border-primary/60 transition-all"
              >
                <div className="relative bg-foreground/5 aspect-square overflow-hidden">
                  <img src={p.images[0]} alt={p.copy.name} loading="lazy" className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                    {p.copy.name}
                  </h3>
                  <p className="font-display text-2xl font-bold text-foreground">{format(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SharedWishlist;
