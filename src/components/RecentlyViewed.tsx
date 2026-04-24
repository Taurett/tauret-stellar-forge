/**
 * RecentlyViewed — persistent strip of recently visited products.
 * Hidden when fewer than 2 items (or when only the current page is in the list).
 */
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { resolveProduct } from "@/lib/products";

interface RecentlyViewedProps {
  /** Skip this id (e.g. the current product detail page). */
  excludeId?: number;
  className?: string;
}

const RecentlyViewed = ({ excludeId, className }: RecentlyViewedProps) => {
  const { ids } = useRecentlyViewed();
  const { t, formatPrice, language } = useLanguage();
  const { theme } = useTheme();

  const products = ids
    .filter((id) => id !== excludeId)
    .map((id) => resolveProduct(id, language, theme))
    .filter((p): p is NonNullable<ReturnType<typeof resolveProduct>> => p !== null)
    .slice(0, 6);

  if (products.length < 2) return null;

  return (
    <section className={`mt-20 ${className ?? ""}`} aria-label="Recently viewed products">
      <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-4">
        // {t("recent.title")}
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-black mb-6">
        <span className="text-aurora">{t("recent.title")}</span>
      </h2>

      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-thin">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="group flex-none w-40 md:w-48 glass clip-angle overflow-hidden border border-primary/20 hover:border-primary/60 transition-all snap-start"
          >
            <div className="relative bg-foreground/5 aspect-square overflow-hidden">
              <img src={p.images[0]} alt={p.copy.name} loading="lazy" className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-2.5">
              <h3 className="font-display font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1 min-h-[2rem]">
                {p.copy.name}
              </h3>
              <p className="font-tech text-xs font-bold text-foreground">{formatPrice(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
