/**
 * useBundleDeals — fetch active quantity-based discounts.
 *
 * Bundles apply when cart quantity for a product (or site-wide) meets the
 * `min_quantity` threshold. Returns the best applicable discount per product
 * and a helper to compute the total discount for a given cart.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface BundleDeal {
  id: string;
  name: string;
  description: string | null;
  min_quantity: number;
  discount_percent: number;
  product_id: number | null;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  sort_order: number;
}

export function useBundleDeals() {
  const [bundles, setBundles] = useState<BundleDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("bundle_deals")
        .select("*")
        .order("sort_order", { ascending: true });
      if (cancelled) return;
      setBundles((data ?? []) as BundleDeal[]);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return { bundles, loading };
}

export interface CartLineForBundle {
  productId: number;
  quantity: number;
  unitPrice: number; // in EUR (base currency)
}

/**
 * Compute the best discount (in EUR) for a list of cart lines using the
 * provided bundles. Strategy: per product, pick the highest-percent bundle
 * whose min_quantity is satisfied; site-wide bundles (product_id null) act
 * as fallback when no product-specific bundle qualifies.
 */
export function calculateBundleDiscount(
  lines: CartLineForBundle[],
  bundles: BundleDeal[],
): { discountEur: number; appliedBundles: BundleDeal[] } {
  if (bundles.length === 0 || lines.length === 0) {
    return { discountEur: 0, appliedBundles: [] };
  }
  let total = 0;
  const applied: BundleDeal[] = [];

  for (const line of lines) {
    const candidates = bundles.filter(
      (b) => (b.product_id === line.productId || b.product_id === null)
        && line.quantity >= b.min_quantity,
    );
    if (candidates.length === 0) continue;
    const best = candidates.reduce((a, b) =>
      b.discount_percent > a.discount_percent ? b : a,
    );
    const lineTotal = line.unitPrice * line.quantity;
    total += lineTotal * (best.discount_percent / 100);
    if (!applied.find((x) => x.id === best.id)) applied.push(best);
  }

  return { discountEur: total, appliedBundles: applied };
}
