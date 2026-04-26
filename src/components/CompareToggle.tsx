/**
 * CompareToggle — small button to add/remove a product from the compare list.
 * Shown on product cards alongside the wishlist heart.
 */
import { GitCompareArrows } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Props {
  productId: number;
  productName?: string;
  className?: string;
}

const CompareToggle = ({ productId, productName, className }: Props) => {
  const { has, toggle, isFull } = useCompare();
  const { t } = useLanguage();
  const active = has(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!active && isFull) {
      toast({ title: t("compare.full"), variant: "destructive" });
      return;
    }
    const added = toggle(productId);
    toast({
      title: added ? t("compare.added") : t("compare.removed"),
      description: productName,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? t("compare.remove") : t("compare.add")}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center justify-center rounded-full backdrop-blur-sm border transition-all p-2",
        active
          ? "bg-primary/15 border-primary text-primary"
          : "bg-background/80 border-primary/30 hover:border-primary text-foreground",
        className,
      )}
      title={active ? t("compare.remove") : t("compare.add")}
    >
      <GitCompareArrows className="w-4 h-4" strokeWidth={1.8} />
    </button>
  );
};

export default CompareToggle;
