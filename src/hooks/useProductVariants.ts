/**
 * Product variants hook — reads variants for a given product id from Supabase.
 * Variants carry their own color/material/size/image/stock and an optional
 * price override. Used by the PDP variant picker and admin inventory tools.
 */
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProductVariant {
  id: string;
  product_id: number;
  color: string | null;
  color_hex: string | null;
  material: string | null;
  size: string | null;
  sku: string | null;
  image_url: string | null;
  price_override: number | null;
  stock_count: number;
  low_stock_threshold: number;
  is_active: boolean;
  sort_order: number;
}

export function useProductVariants(productId: number | null | undefined) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!productId) {
      setVariants([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", productId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    setVariants((data ?? []) as ProductVariant[]);
    setLoading(false);
  }, [productId]);

  useEffect(() => { refetch(); }, [refetch]);

  return { variants, loading, refetch };
}

export function useAllVariants() {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("product_variants")
      .select("*")
      .order("product_id", { ascending: true })
      .order("sort_order", { ascending: true });
    setVariants((data ?? []) as ProductVariant[]);
    setLoading(false);
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { variants, loading, refetch };
}
