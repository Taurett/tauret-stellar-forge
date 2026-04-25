/**
 * ReturnRequestPanel — shown on the OrderDetail page.
 * Lets a customer file a return request for a delivered/shipped order, attach
 * up to 3 photos and pick a reason. If a request already exists, shows its
 * current status instead of the form.
 */
import { useState } from "react";
import { Loader2, RotateCcw, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useOrderReturnRequest, type ReturnStatus } from "@/hooks/useReturnRequests";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

interface Props {
  orderId: string;
  customerEmail: string | null;
}

const REASONS = ["wrong_size", "defective", "not_as_described", "no_longer_wanted", "other"] as const;
type Reason = typeof REASONS[number];

const STATUS_TONE: Record<ReturnStatus, string> = {
  requested: "border-yellow-500/40 text-yellow-500",
  approved: "border-blue-500/40 text-blue-500",
  refunded: "border-emerald-500/40 text-emerald-500",
  rejected: "border-destructive/40 text-destructive",
  cancelled: "border-muted/40 text-muted-foreground",
};

const ReturnRequestPanel = ({ orderId, customerEmail }: Props) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { request, loading, refetch } = useOrderReturnRequest(orderId);
  const [reason, setReason] = useState<Reason>("wrong_size");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  if (loading || !user) return null;

  if (request) {
    return (
      <section className="glass clip-angle-lg border border-primary/20 p-5 mt-6 print:hidden">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-primary" />
            <h3 className="font-display text-lg font-bold">{t("returns.title") || "Return request"}</h3>
          </div>
          <span className={`font-tech text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded border ${STATUS_TONE[request.status]}`}>
            {request.status}
          </span>
        </div>
        <div className="mt-3 text-sm">
          <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t("returns.reason") || "Reason"}</div>
          <div className="font-medium mb-2">{request.reason}</div>
          {request.details && <p className="text-muted-foreground whitespace-pre-line">{request.details}</p>}
          {request.status === "refunded" && (
            <p className="text-emerald-500 mt-3 font-tech text-xs">
              {t("returns.refundedNotice") || "Your refund has been processed. It may take 5-10 business days to appear."}
            </p>
          )}
        </div>
      </section>
    );
  }

  const handleFiles = (input: FileList | null) => {
    if (!input) return;
    const arr = Array.from(input).slice(0, 3);
    setFiles(arr);
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      // Upload photos under {userId}/{orderId}/{filename}
      const photo_urls: string[] = [];
      for (const f of files) {
        const path = `${user.id}/${orderId}/${Date.now()}-${f.name.replace(/[^\w.\-]/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("return-photos").upload(path, f, { upsert: false });
        if (upErr) throw upErr;
        const { data: signed } = await supabase.storage.from("return-photos").createSignedUrl(path, 60 * 60 * 24 * 30);
        if (signed?.signedUrl) photo_urls.push(signed.signedUrl);
      }

      const { error } = await supabase.from("return_requests").insert({
        order_id: orderId,
        user_id: user.id,
        customer_email: customerEmail,
        reason,
        details: details.trim() || null,
        photo_urls,
      });
      if (error) throw error;
      toast({ title: t("returns.submitted") || "Return request submitted" });
      setDetails("");
      setFiles([]);
      refetch();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed";
      toast({ title: "Submit failed", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="glass clip-angle-lg border border-primary/20 p-5 mt-6 print:hidden">
      <div className="flex items-center gap-2 mb-3">
        <RotateCcw className="w-4 h-4 text-primary" />
        <h3 className="font-display text-lg font-bold">{t("returns.startTitle") || "Start a return"}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {t("returns.startBlurb") || "Tell us what went wrong and we'll process your return as soon as possible."}
      </p>

      <div className="space-y-3">
        <div>
          <Label className="font-tech text-[10px] uppercase tracking-[0.25em]">{t("returns.reason") || "Reason"}</Label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as Reason)}
            className="w-full mt-1 bg-input/60 border border-border rounded px-3 py-2 text-sm"
          >
            {REASONS.map((r) => (
              <option key={r} value={r}>{r.replace(/_/g, " ")}</option>
            ))}
          </select>
        </div>
        <div>
          <Label className="font-tech text-[10px] uppercase tracking-[0.25em]">{t("returns.details") || "Details"}</Label>
          <Textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={3} maxLength={1000} />
        </div>
        <div>
          <Label className="font-tech text-[10px] uppercase tracking-[0.25em]">{t("returns.photos") || "Photos (up to 3)"}</Label>
          <label className="inline-flex items-center gap-2 mt-1 px-3 py-2 border border-dashed border-primary/40 rounded cursor-pointer text-sm hover:border-primary">
            <Upload className="w-4 h-4" /> {files.length === 0 ? "Choose files" : `${files.length} selected`}
            <input type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
          </label>
          {files.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {files.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-xs bg-muted/30 px-2 py-1 rounded">
                  {f.name}
                  <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <Button onClick={handleSubmit} disabled={submitting} className="w-full bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest">
          {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {t("returns.submit") || "Submit return request"}
        </Button>
      </div>
    </section>
  );
};

export default ReturnRequestPanel;
