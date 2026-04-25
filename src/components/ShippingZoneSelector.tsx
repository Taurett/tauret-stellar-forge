/**
 * ShippingZoneSelector — radio-list of active shipping zones, used inside
 * the checkout modal. The chosen zone's flat rate is added to the Stripe
 * session as a `shipping_options` entry (created server-side).
 */
import { useEffect } from "react";
import { useShippingZones, type ShippingZone } from "@/hooks/useShippingZones";
import { Loader2, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  selectedZoneId: string | null;
  onChange: (zone: ShippingZone | null) => void;
}

const ShippingZoneSelector = ({ selectedZoneId, onChange }: Props) => {
  const { zones, loading } = useShippingZones();
  const { t } = useLanguage();

  // Auto-select the cheapest zone on first render so checkout has a default.
  useEffect(() => {
    if (loading) return;
    if (selectedZoneId) return;
    if (zones.length === 0) return;
    const cheapest = [...zones].sort((a, b) => a.flat_rate_cents - b.flat_rate_cents)[0];
    onChange(cheapest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, zones]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading shipping…
      </div>
    );
  }
  if (zones.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-primary inline-flex items-center gap-1.5">
        <Truck className="w-3 h-3" /> {t("shipping.choose") || "Shipping"}
      </div>
      <div className="space-y-2">
        {zones.map((z) => {
          const isSelected = selectedZoneId === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => onChange(z)}
              className={`w-full text-left p-3 rounded border transition-colors ${
                isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{z.name}</div>
                  {z.estimated_days && <div className="text-xs text-muted-foreground">{z.estimated_days}</div>}
                </div>
                <div className="font-tech font-bold text-primary text-sm">
                  {new Intl.NumberFormat(undefined, { style: "currency", currency: z.currency.toUpperCase() }).format(z.flat_rate_cents / 100)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShippingZoneSelector;
