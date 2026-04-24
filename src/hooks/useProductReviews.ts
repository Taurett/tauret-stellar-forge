/**
 * useProductReviews — fetch approved reviews + the current user's own (any
 * status). Provides submit() + photo upload helpers.
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Review {
  id: string;
  user_id: string;
  product_id: number;
  rating: number;
  title: string | null;
  body: string;
  photo_urls: string[];
  status: "pending" | "approved" | "rejected";
  display_name: string | null;
  created_at: string;
}

export function useProductReviews(productId: number) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myReview, setMyReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    // RLS handles approved + own visibility.
    const { data } = await supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    const all = (data ?? []) as Review[];
    setReviews(all.filter((r) => r.status === "approved"));
    setMyReview(user ? all.find((r) => r.user_id === user.id) ?? null : null);
    setLoading(false);
  }, [productId, user]);

  useEffect(() => { refresh(); }, [refresh]);

  /** Upload an image File to the review-photos bucket; returns public URL. */
  const uploadPhoto = useCallback(async (file: File): Promise<string> => {
    if (!user) throw new Error("Sign in to upload");
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("review-photos").upload(path, file, {
      cacheControl: "3600", upsert: false, contentType: file.type,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("review-photos").getPublicUrl(path);
    return data.publicUrl;
  }, [user]);

  const submit = useCallback(async (input: {
    rating: number; title: string | null; body: string; photo_urls: string[];
    displayName?: string | null;
  }) => {
    if (!user) throw new Error("Sign in to submit");
    const { error } = await supabase.from("product_reviews").insert({
      user_id: user.id,
      product_id: productId,
      rating: input.rating,
      title: input.title,
      body: input.body,
      photo_urls: input.photo_urls,
      display_name: input.displayName ?? user.user_metadata?.display_name ?? null,
    });
    if (error) throw error;
    await refresh();
  }, [user, productId, refresh]);

  const summary = (() => {
    if (reviews.length === 0) return { count: 0, average: 0 };
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    return { count: reviews.length, average: sum / reviews.length };
  })();

  return { reviews, myReview, loading, submit, uploadPhoto, refresh, summary };
}
