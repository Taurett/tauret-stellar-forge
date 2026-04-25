/**
 * Return requests hook — both customer-scoped and admin-scoped views.
 * RLS handles visibility; the same query returns the right rows for each role.
 */
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ReturnStatus = "requested" | "approved" | "rejected" | "refunded" | "cancelled";

export interface ReturnRequest {
  id: string;
  order_id: string;
  user_id: string | null;
  customer_email: string | null;
  reason: string;
  details: string | null;
  photo_urls: string[];
  status: ReturnStatus;
  refund_amount_cents: number | null;
  refund_reference: string | null;
  admin_notes: string | null;
  created_at: string;
  resolved_at: string | null;
}

export function useReturnRequests(opts: { admin?: boolean } = {}) {
  const [requests, setRequests] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("return_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setRequests((data ?? []) as ReturnRequest[]);
    setLoading(false);
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { requests, loading, refetch };
}

export function useOrderReturnRequest(orderId: string | undefined) {
  const [request, setRequest] = useState<ReturnRequest | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!orderId) { setRequest(null); setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from("return_requests")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setRequest((data as ReturnRequest | null) ?? null);
    setLoading(false);
  }, [orderId]);

  useEffect(() => { refetch(); }, [refetch]);

  return { request, loading, refetch };
}
