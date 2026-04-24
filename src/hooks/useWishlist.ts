/**
 * useWishlist — manage the current user's saved products.
 *
 * Backed by Supabase `wishlists` (RLS = auth.uid() = user_id). For signed-out
 * visitors we fall back to localStorage so the heart toggle still works,
 * and `mergeLocalIntoRemote` is called on sign-in to upgrade them.
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const LOCAL_KEY = "tauret.wishlist.v1";

const readLocal = (): number[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
};

const writeLocal = (ids: number[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(ids));
  } catch { /* ignore */ }
};

export function useWishlist() {
  const { user, loading: authLoading } = useAuth();
  const [ids, setIds] = useState<Set<number>>(() => new Set(readLocal()));
  const [loading, setLoading] = useState(true);

  // Hydrate from server when logged in; merge local pending entries in.
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIds(new Set(readLocal()));
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      // Merge any local items into the remote wishlist (silently dedupes via UNIQUE)
      const local = readLocal();
      if (local.length > 0) {
        await supabase
          .from("wishlists")
          .upsert(local.map((product_id) => ({ user_id: user.id, product_id })), {
            onConflict: "user_id,product_id",
            ignoreDuplicates: true,
          });
        writeLocal([]);
      }
      const { data } = await supabase
        .from("wishlists")
        .select("product_id")
        .eq("user_id", user.id);
      if (cancelled) return;
      setIds(new Set((data ?? []).map((r) => r.product_id)));
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user, authLoading]);

  const toggle = useCallback(
    async (productId: number): Promise<boolean> => {
      const isFav = ids.has(productId);
      const next = new Set(ids);
      if (isFav) next.delete(productId); else next.add(productId);
      setIds(next);

      if (!user) {
        writeLocal(Array.from(next));
        return !isFav;
      }
      if (isFav) {
        await supabase.from("wishlists").delete()
          .eq("user_id", user.id).eq("product_id", productId);
      } else {
        await supabase.from("wishlists").upsert(
          { user_id: user.id, product_id: productId },
          { onConflict: "user_id,product_id", ignoreDuplicates: true },
        );
      }
      return !isFav;
    },
    [ids, user],
  );

  const has = useCallback((productId: number) => ids.has(productId), [ids]);

  return { ids: Array.from(ids), has, toggle, loading };
}
