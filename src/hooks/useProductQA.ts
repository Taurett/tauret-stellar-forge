/**
 * useProductQA — load approved questions + answers for a product.
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProductQuestion {
  id: string;
  product_id: number;
  user_id: string;
  display_name: string | null;
  body: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  answers: ProductAnswer[];
}

export interface ProductAnswer {
  id: string;
  question_id: string;
  user_id: string;
  display_name: string | null;
  body: string;
  is_admin_answer: boolean;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export function useProductQA(productId: number | null) {
  const [questions, setQuestions] = useState<ProductQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (productId == null) return;
    setLoading(true);
    const { data: qs } = await supabase
      .from("product_questions")
      .select("*")
      .eq("product_id", productId)
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    const qIds = (qs ?? []).map((q) => q.id);
    let answersByQ: Record<string, ProductAnswer[]> = {};
    if (qIds.length > 0) {
      const { data: ans } = await supabase
        .from("product_answers")
        .select("*")
        .in("question_id", qIds)
        .eq("status", "approved")
        .order("created_at", { ascending: true });
      answersByQ = (ans ?? []).reduce((acc, a) => {
        (acc[a.question_id] ||= []).push(a as ProductAnswer);
        return acc;
      }, {} as Record<string, ProductAnswer[]>);
    }
    setQuestions(
      (qs ?? []).map((q) => ({ ...(q as unknown as ProductQuestion), answers: answersByQ[q.id] ?? [] })),
    );
    setLoading(false);
  }, [productId]);

  useEffect(() => { load(); }, [load]);

  return { questions, loading, reload: load };
}
