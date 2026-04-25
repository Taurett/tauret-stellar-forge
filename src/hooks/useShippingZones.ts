/**
 * Shipping zones hook — reads admin-configured shipping options.
 * Active-only by default; admin pages opt into showing inactive zones.
 */
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ShippingZone {
  id: string;
  name: string;
  description: string | null;
  country_codes: string[];
  flat_rate_cents: number;
  currency: string;
  estimated_days: string | null;
  is_active: boolean;
  sort_order: number;
}

export function useShippingZones(opts: { includeInactive?: boolean } = {}) {
  const { includeInactive = false } = opts;
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("shipping_zones")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!includeInactive) query = query.eq("is_active", true);
    const { data } = await query;
    setZones((data ?? []) as ShippingZone[]);
    setLoading(false);
  }, [includeInactive]);

  useEffect(() => { refetch(); }, [refetch]);

  return { zones, loading, refetch };
}
