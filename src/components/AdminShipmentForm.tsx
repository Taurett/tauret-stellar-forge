/**
 * AdminShipmentForm — admin-only form to update shipment status, carrier
 * and tracking number for an order. Used on /orders/:id when admin.
 */
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

interface AdminShipmentFormProps {
  orderId: string;
  initial: {
    shipment_status: string;
    carrier?: string | null;
    tracking_number?: string | null;
    tracking_url?: string | null;
  };
  onSaved?: () => void;
}

const AdminShipmentForm = ({ orderId, initial, onSaved }: AdminShipmentFormProps) => {
  const { t } = useLanguage();
  const [status, setStatus] = useState(initial.shipment_status || "processing");
  const [carrier, setCarrier] = useState(initial.carrier ?? "");
  const [trackingNumber, setTrackingNumber] = useState(initial.tracking_number ?? "");
  const [trackingUrl, setTrackingUrl] = useState(initial.tracking_url ?? "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("orders").update({
      shipment_status: status,
      carrier: carrier.trim() || null,
      tracking_number: trackingNumber.trim() || null,
      tracking_url: trackingUrl.trim() || null,
    }).eq("id", orderId);
    setSaving(false);
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: t("admin.shipment.saved") });
    onSaved?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass clip-angle p-5 md:p-6 border border-primary/30 print:hidden mt-4 space-y-4"
    >
      <div className="font-tech text-xs uppercase tracking-[0.3em] text-primary">
        Admin · {t("admin.shipment.update")}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1.5 block">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-input/60 border-primary/20"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1.5 block">{t("tracking.carrier")}</Label>
          <Input value={carrier} onChange={(e) => setCarrier(e.target.value)} maxLength={80} placeholder="DHL, FedEx…" className="bg-input/60 border-primary/20" />
        </div>
        <div>
          <Label className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1.5 block">{t("tracking.number")}</Label>
          <Input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} maxLength={120} className="bg-input/60 border-primary/20" />
        </div>
        <div>
          <Label className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1.5 block">Tracking URL</Label>
          <Input value={trackingUrl} onChange={(e) => setTrackingUrl(e.target.value)} maxLength={500} type="url" className="bg-input/60 border-primary/20" />
        </div>
      </div>
      <Button
        type="submit"
        disabled={saving}
        className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle"
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : t("admin.shipment.update")}
      </Button>
    </form>
  );
};

export default AdminShipmentForm;
