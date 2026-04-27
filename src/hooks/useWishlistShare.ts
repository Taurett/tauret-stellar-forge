/**
 * useWishlistShare — manage the current user's shareable wishlist link.
 * One share per user; the token is auto-generated server-side.
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface WishlistShare {
  id: string;
  user_id: string;
  share_token: string;
  title: string | null;
  is_active: boolean;
  created_at: string;
}

export function useWishlistShare() {
  const { user } = useAuth();
  const [share, setShare] = useState<WishlistShare | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setShare(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("wishlist_shares")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    setShare((data ?? null) as WishlistShare | null);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const create = useCallback(async (title?: string) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from("wishlist_shares")
      .insert({ user_id: user.id, title: title ?? null })
      .select()
      .single();
    if (error) throw error;
    setShare(data as WishlistShare);
    return data as WishlistShare;
  }, [user]);

  const setActive = useCallback(async (active: boolean) => {
    if (!share) return;
    const { data } = await supabase
      .from("wishlist_shares")
      .update({ is_active: active })
      .eq("id", share.id)
      .select()
      .single();
    if (data) setShare(data as WishlistShare);
  }, [share]);

  const regenerate = useCallback(async () => {
    if (!share || !user) return;
    // Delete + recreate to get a fresh token.
    await supabase.from("wishlist_shares").delete().eq("id", share.id);
    await create(share.title ?? undefined);
  }, [share, user, create]);

  return { share, loading, create, setActive, regenerate, reload: load };
}
