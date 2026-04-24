/**
 * Reusable heart toggle for product cards & detail pages.
 * Optimistic UI; works for guests via localStorage (handled in useWishlist).
 */
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface WishlistHeartProps {
  productId: number;
  productName?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASS: Record<NonNullable<WishlistHeartProps["size"]>, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const WishlistHeart = ({ productId, productName, className, size = "md" }: WishlistHeartProps) => {
  const { has, toggle } = useWishlist();
  const { t } = useLanguage();
  const isFav = has(productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowFav = await toggle(productId);
    toast({
      title: nowFav ? t("wishlist.added") : t("wishlist.removed"),
      description: productName,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isFav ? t("wishlist.remove") : t("wishlist.add")}
      aria-pressed={isFav}
      className={cn(
        "inline-flex items-center justify-center rounded-full backdrop-blur-sm border transition-all",
        "bg-background/80 hover:bg-background border-primary/30 hover:border-primary",
        "p-2",
        className,
      )}
    >
      <Heart
        className={cn(
          SIZE_CLASS[size],
          "transition-colors",
          isFav ? "fill-destructive text-destructive" : "text-foreground hover:text-destructive",
        )}
        strokeWidth={1.8}
      />
    </button>
  );
};

export default WishlistHeart;
