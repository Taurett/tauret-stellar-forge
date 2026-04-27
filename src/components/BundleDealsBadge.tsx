/**
 * BundleDealsBadge — display active bundle offers on a product detail page.
 * Encourages buying multiples to unlock the discount.
 */
import { Tag } from "lucide-react";
import { useBundleDeals } from "@/hooks/useBundleDeals";
import { useLanguage } from "@/contexts/LanguageContext";

interface BundleDealsBadgeProps {
  productId: number;
}

const BundleDealsBadge = ({ productId }: BundleDealsBadgeProps) => {
  const { bundles, loading } = useBundleDeals();
  const { t } = useLanguage();

  if (loading) return null;

  const applicable = bundles.filter(
    (b) => b.product_id === productId || b.product_id === null,
  );
  if (applicable.length === 0) return null;

  return (
    <div className="glass clip-angle p-3 border border-primary/30 bg-primary/5">
      <div className="flex items-center gap-2 mb-2">
        <Tag className="w-4 h-4 text-primary" />
        <span className="font-tech text-[10px] uppercase tracking-[0.3em] text-primary">
          {t("bundle.deals") || "Bundle Deals"}
        </span>
      </div>
      <ul className="space-y-1">
        {applicable.map((b) => (
          <li key={b.id} className="text-xs text-foreground">
            <span className="font-bold text-primary">
              {t("bundle.buy") || "Buy"} {b.min_quantity}+
            </span>
            {" "}
            <span className="text-muted-foreground">→</span>
            {" "}
            <span className="font-bold">{b.discount_percent}% {t("bundle.off") || "off"}</span>
            {b.description && (
              <span className="text-muted-foreground"> · {b.description}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BundleDealsBadge;
