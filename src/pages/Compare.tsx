/**
 * Compare page — side-by-side comparison of up to 4 products.
 * Source data: in-memory product registry + i18n copy.
 */
import { Link } from "react-router-dom";
import { Trash2, ArrowLeft, Star, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCompare } from "@/hooks/useCompare";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { resolveProduct } from "@/lib/products";
import SearchBar from "@/components/SearchBar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { useSeo } from "@/hooks/useSeo";
import { toast } from "@/hooks/use-toast";

const Compare = () => {
  const { ids, remove, clear } = useCompare();
  const { t, formatPrice, language } = useLanguage();
  const { theme } = useTheme();
  const { addToCart } = useCart();

  useSeo({
    title: "Compare Products · TAURET",
    description: "Side-by-side comparison of TAURET sportswear.",
    canonical: "/compare",
    noindex: true,
  });

  const products = ids
    .map((id) => resolveProduct(id, language, theme))
    .filter((p): p is NonNullable<ReturnType<typeof resolveProduct>> => p !== null);

  const quickAdd = (p: ReturnType<typeof resolveProduct>) => {
    if (!p) return;
    addToCart({
      id: p.id,
      name: p.copy.name,
      price: p.price,
      image: p.images[0],
      category: p.category,
      theme,
    });
    toast({ title: t("toast.added"), description: p.copy.name });
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />

      <header className="pt-32 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow mb-6"
          >
            <ArrowLeft className="w-3 h-3" />
            {t("shop.backHome")}
          </Link>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
                // {t("compare.title")}
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-black mb-3">
                <span className="text-aurora">{t("compare.title")}</span>
              </h1>
              <p className="font-tech text-sm text-muted-foreground tracking-wide">
                {t("compare.subtitle")}
              </p>
            </div>
            {products.length > 0 && (
              <Button
                onClick={clear}
                variant="outline"
                className="font-tech text-xs uppercase tracking-wider border-destructive/40 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t("compare.clearAll")}
              </Button>
            )}
          </div>
        </div>
      </header>

      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="glass clip-angle-lg p-12 border border-primary/20 text-center">
              <p className="font-tech text-muted-foreground uppercase tracking-wider mb-6">
                {t("compare.empty")}
              </p>
              <Button asChild className="bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest clip-angle">
                <Link to="/shop">{t("product.backShop")}</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4">
              <div
                className="grid gap-4 min-w-fit"
                style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(220px, 1fr))` }}
              >
                {/* Header row — product cards */}
                <div />
                {products.map((p) => (
                  <div
                    key={`hdr-${p.id}`}
                    className="glass clip-angle border border-primary/20 p-3 relative"
                  >
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      aria-label={t("compare.remove")}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive p-1 z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Link to={`/product/${p.id}`} className="block">
                      <div className="bg-foreground/5 aspect-square overflow-hidden">
                        <img
                          src={p.images[0]}
                          alt={p.copy.name}
                          className="w-full h-full object-contain p-3"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="font-display font-bold text-sm text-foreground line-clamp-2 mt-2 hover:text-primary transition-colors">
                        {p.copy.name}
                      </h3>
                    </Link>
                    <Button
                      onClick={() => quickAdd(p)}
                      size="sm"
                      className="w-full mt-2 h-8 bg-gradient-neon text-primary-foreground font-tech text-[10px] uppercase tracking-wider clip-angle"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {t("shop.addToCart")}
                    </Button>
                  </div>
                ))}

                {/* Feature rows */}
                <CompareRow label={t("compare.feature.price")}>
                  {products.map((p) => (
                    <span key={p.id} className="font-display text-xl font-bold text-aurora">
                      {formatPrice(p.price)}
                    </span>
                  ))}
                </CompareRow>

                <CompareRow label={t("compare.feature.rating")}>
                  {products.map((p) => (
                    <span key={p.id} className="inline-flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-tech text-sm font-bold text-foreground">{p.rating}</span>
                    </span>
                  ))}
                </CompareRow>

                <CompareRow label={t("compare.feature.reviews")}>
                  {products.map((p) => (
                    <span key={p.id} className="font-tech text-sm text-foreground">{p.reviews}</span>
                  ))}
                </CompareRow>

                <CompareRow label={t("compare.feature.category")}>
                  {products.map((p) => (
                    <Badge
                      key={p.id}
                      className="bg-primary/15 text-primary border border-primary/30 font-tech text-[10px] uppercase tracking-[0.2em] hover:bg-primary/15 w-fit"
                    >
                      {t(p.categoryLabelKey as never)}
                    </Badge>
                  ))}
                </CompareRow>

                <CompareRow label={t("compare.feature.sizes")}>
                  {products.map((p) => (
                    <span key={p.id} className="font-tech text-xs text-foreground">
                      {p.sizes.length ? p.sizes.join(" · ") : "—"}
                    </span>
                  ))}
                </CompareRow>

                <CompareRow label={t("compare.feature.material")}>
                  {products.map((p) => (
                    <span key={p.id} className="text-xs text-muted-foreground line-clamp-3">
                      {p.copy.fabric}
                    </span>
                  ))}
                </CompareRow>

                <CompareRow label={t("compare.feature.features")}>
                  {products.map((p) => (
                    <ul key={p.id} className="space-y-1">
                      {p.copy.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="text-[11px] text-foreground flex gap-1.5">
                          <span className="text-primary">▸</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </CompareRow>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const CompareRow = ({ label, children }: { label: string; children: React.ReactNode[] }) => (
  <>
    <div className="glass clip-angle border border-primary/20 p-3 flex items-center">
      <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-primary">{label}</span>
    </div>
    {children.map((child, i) => (
      <div key={i} className="glass clip-angle border border-primary/20 p-3 flex items-start">
        {child}
      </div>
    ))}
  </>
);

export default Compare;
