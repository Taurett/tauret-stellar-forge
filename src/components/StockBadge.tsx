/**
 * StockBadge — small pill that surfaces in-stock / low-stock / out-of-stock
 * status next to the price on the product page.
 */
import { AlertTriangle, CheckCircle2, PackageX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  stock: number;
  lowThreshold: number;
}

const StockBadge = ({ stock, lowThreshold }: Props) => {
  const { t } = useLanguage();
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded border border-destructive/40 text-destructive">
        <PackageX className="w-3 h-3" /> {t("stock.out") || "Out of stock"}
      </span>
    );
  }
  if (stock <= lowThreshold) {
    return (
      <span className="inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded border border-yellow-500/40 text-yellow-500">
        <AlertTriangle className="w-3 h-3" /> {(t("stock.low") || "Only {n} left").replace("{n}", String(stock))}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded border border-emerald-500/40 text-emerald-500">
      <CheckCircle2 className="w-3 h-3" /> {t("stock.inStock") || "In stock"}
    </span>
  );
};

export default StockBadge;
