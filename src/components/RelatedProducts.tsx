/**
 * RelatedProducts — same-category upsell carousel on product detail.
 * Picks up to 4 other products from the same category.
 */
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { PRODUCTS, resolveProduct } from "@/lib/products";

interface RelatedProductsProps {
  currentId: number;
  category: string;
  limit?: number;
}

const RelatedProducts = ({ currentId, category, limit = 4 }: RelatedProductsProps) => {
  const { t, formatPrice, language } = useLanguage();
  const { theme } = useTheme();

  const related = PRODUCTS
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, limit)
    .map((p) => resolveProduct(p.id, language, theme))
    .filter((p): p is NonNullable<ReturnType<typeof resolveProduct>> => p !== null);

  if (related.length === 0) return null;

  return (
    <section className="mt-20" aria-label="Related products">
      <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-4">
        // {t("related.title")}
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-black mb-8">
        <span className="text-aurora">{t("related.title")}</span>
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {related.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="group glass clip-angle-lg overflow-hidden border border-primary/20 hover:border-primary/60 transition-all hover:-translate-y-1"
          >
            <div className="relative bg-foreground/5 aspect-square overflow-hidden">
              <img
                src={p.images[0]}
                alt={p.copy.name}
                loading="lazy"
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 md:p-4">
              <h3 className="font-display font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                {p.copy.name}
              </h3>
              <p className="font-tech text-sm md:text-base font-bold text-foreground">
                {formatPrice(p.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
