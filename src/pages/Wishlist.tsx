/**
 * /wishlist — saved products. Works for both logged-in users and guests
 * (guest data lives in localStorage via useWishlist).
 */
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import WishlistHeart from "@/components/WishlistHeart";
import { useWishlist } from "@/hooks/useWishlist";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { resolveProduct, getProductDefinition } from "@/lib/products";
import { useSeo } from "@/hooks/useSeo";

const Wishlist = () => {
  const { ids, loading } = useWishlist();
  const { t, formatPrice, language } = useLanguage();
  const { theme } = useTheme();
  const { addToCart } = useCart();

  useSeo({ title: `${t("wishlist.title")} · TAURET`, noindex: true, canonical: "/wishlist" });

  const products = ids
    .map((id) => resolveProduct(id, language, theme))
    .filter((p): p is NonNullable<ReturnType<typeof resolveProduct>> => p !== null);

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
            {t("shop.backHome")}
          </Link>
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
            {t("wishlist.kicker")}
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black">
            <span className="text-aurora">{t("wishlist.title")}</span>
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 text-center text-muted-foreground font-tech text-xs uppercase tracking-[0.3em]">
            …
          </div>
        ) : products.length === 0 ? (
          <div className="glass clip-angle-lg p-12 border border-primary/20 text-center max-w-md mx-auto">
            <Heart className="h-16 w-16 text-primary/40 mb-4 mx-auto" strokeWidth={1.4} />
            <p className="text-muted-foreground mb-6">{t("wishlist.empty")}</p>
            <Link to="/shop">
              <Button className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle">
                {t("cart.browse")}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => {
              const def = getProductDefinition(p.id);
              const canAddDirect = def && def.sizes.length === 0;
              return (
                <div key={p.id} className="group relative glass clip-angle-lg overflow-hidden border border-primary/20 hover:border-primary/60 transition-all">
                  <div className="absolute top-3 right-3 z-10">
                    <WishlistHeart productId={p.id} productName={p.copy.name} size="sm" />
                  </div>
                  <Link to={`/product/${p.id}`}>
                    <div className="relative bg-foreground/5 aspect-square overflow-hidden">
                      <img src={p.images[0]} alt={p.copy.name} loading="lazy" className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link to={`/product/${p.id}`}>
                      <h3 className="font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                        {p.copy.name}
                      </h3>
                    </Link>
                    <p className="font-display text-2xl font-bold text-foreground mb-4">{formatPrice(p.price)}</p>
                    {canAddDirect ? (
                      <Button
                        onClick={() => {
                          addToCart({
                            id: p.id, name: p.copy.name, price: p.price,
                            image: p.images[0], category: p.category, theme,
                          });
                          toast({ title: t("toast.added"), description: `${p.copy.name} ${t("toast.addedDesc")}` });
                        }}
                        className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest text-xs clip-angle"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t("shop.addToCart")}
                      </Button>
                    ) : (
                      <Link to={`/product/${p.id}`}>
                        <Button className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest text-xs clip-angle">
                          {t("wishlist.viewProduct")}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
