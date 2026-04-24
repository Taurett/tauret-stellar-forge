/**
 * ShipmentTracker — visual shipment status timeline displayed on order pages.
 * Shows: processing → shipped → delivered with carrier + tracking link.
 */
import { Package, Truck, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShipmentTrackerProps {
  status: string;
  carrier?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  shippedAt?: string | null;
  deliveredAt?: string | null;
}

const STEPS = ["processing", "shipped", "delivered"] as const;

const ShipmentTracker = ({
  status, carrier, trackingNumber, trackingUrl, shippedAt, deliveredAt,
}: ShipmentTrackerProps) => {
  const { t } = useLanguage();
  const normalised = STEPS.includes(status as typeof STEPS[number]) ? (status as typeof STEPS[number]) : "processing";
  const currentIdx = STEPS.indexOf(normalised);
  const isCancelled = status === "cancelled";

  return (
    <section className="glass clip-angle p-5 md:p-6 border border-primary/20 print:hidden" aria-label="Shipment status">
      <div className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-4">
        // {t("tracking.title")}
      </div>

      {isCancelled ? (
        <div className="font-tech text-sm uppercase tracking-widest text-destructive">
          {t("tracking.status.cancelled")}
        </div>
      ) : (
        <>
          <ol className="grid grid-cols-3 gap-2 md:gap-4 mb-5">
            {STEPS.map((step, idx) => {
              const reached = idx <= currentIdx;
              const Icon = step === "processing" ? Package : step === "shipped" ? Truck : Check;
              return (
                <li key={step} className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-all
                    ${reached ? "border-primary bg-primary/15 text-primary shadow-neon-cyan" : "border-border text-muted-foreground/40"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`font-tech text-[10px] uppercase tracking-[0.2em] ${reached ? "text-foreground" : "text-muted-foreground/60"}`}>
                    {t(`tracking.status.${step}` as never)}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="space-y-1.5 text-sm">
            {carrier && (
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground font-tech text-[11px] uppercase tracking-[0.25em]">{t("tracking.carrier")}</span>
                <span className="font-medium">{carrier}</span>
              </div>
            )}
            {trackingNumber && (
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground font-tech text-[11px] uppercase tracking-[0.25em]">{t("tracking.number")}</span>
                <span className="font-mono text-xs">{trackingNumber}</span>
              </div>
            )}
            {shippedAt && (
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground font-tech text-[11px] uppercase tracking-[0.25em]">{t("tracking.shippedOn")}</span>
                <span>{new Date(shippedAt).toLocaleDateString()}</span>
              </div>
            )}
            {deliveredAt && (
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground font-tech text-[11px] uppercase tracking-[0.25em]">{t("tracking.deliveredOn")}</span>
                <span>{new Date(deliveredAt).toLocaleDateString()}</span>
              </div>
            )}
            {trackingUrl && (
              <a
                href={trackingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow"
              >
                {t("tracking.track")} →
              </a>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ShipmentTracker;
