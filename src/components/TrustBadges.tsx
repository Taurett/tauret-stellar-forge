import { ShieldCheck, RotateCcw, Truck, Lock, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TKey } from "@/contexts/LanguageContext";

interface TrustBadgesProps {
  /** "row" = horizontal compact strip; "grid" = larger grid for cart/checkout */
  variant?: "row" | "grid";
  className?: string;
}

const items: { icon: typeof ShieldCheck; titleKey: TKey; descKey: TKey }[] = [
  { icon: Lock,        titleKey: "trust.securePayment.title",   descKey: "trust.securePayment.desc" },
  { icon: RotateCcw,   titleKey: "trust.freeReturns.title",     descKey: "trust.freeReturns.desc" },
  { icon: Truck,       titleKey: "trust.fastShipping.title",    descKey: "trust.fastShipping.desc" },
  { icon: ShieldCheck, titleKey: "trust.qualityGuarantee.title",descKey: "trust.qualityGuarantee.desc" },
  { icon: Headphones,  titleKey: "trust.support.title",         descKey: "trust.support.desc" },
];

const TrustBadges = ({ variant = "row", className = "" }: TrustBadgesProps) => {
  const { t } = useLanguage();

  if (variant === "row") {
    return (
      <div
        className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ${className}`}
        aria-label={t("trust.heading")}
      >
        {items.map(({ icon: Icon, titleKey }) => (
          <div
            key={titleKey}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
            <span className="font-tech text-[10px] uppercase tracking-[0.25em]">
              {t(titleKey)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${className}`}>
      {items.slice(0, 4).map(({ icon: Icon, titleKey, descKey }) => (
        <div
          key={titleKey}
          className="glass clip-angle border border-primary/15 p-3 text-center"
        >
          <Icon className="w-5 h-5 text-primary mx-auto mb-1.5" strokeWidth={1.75} />
          <div className="font-tech text-[10px] uppercase tracking-[0.2em] text-foreground">
            {t(titleKey)}
          </div>
          <div className="font-tech text-[10px] text-muted-foreground mt-0.5 leading-tight">
            {t(descKey)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
