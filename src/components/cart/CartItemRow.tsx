import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { getCategoryLabelKey } from "@/lib/productI18n";

interface CartItemRowProps {
  item: CartItem;
  onIncrement: (cartKey: string, nextQty: number) => void;
  onRemove: (cartKey: string) => void;
}

const CartItemRow = ({ item, onIncrement, onRemove }: CartItemRowProps) => {
  const { t, formatPrice } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="glass clip-angle p-5 border border-primary/20 hover:border-primary/50 transition-all">
      <div className="flex items-center gap-4">
        <div className="bg-foreground/5 w-24 h-24 shrink-0 flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-2"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-foreground text-lg truncate">{item.name}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <Badge
              variant="outline"
              className="text-primary border-primary/40 font-tech text-[10px] uppercase tracking-[0.2em]"
            >
              {t(getCategoryLabelKey(item.category, theme))}
            </Badge>
            {item.theme && (
              <Badge
                variant="outline"
                className="text-accent border-accent/40 font-tech text-[10px] uppercase tracking-[0.2em]"
              >
                {t(`theme.${item.theme}`) !== `theme.${item.theme}`
                  ? t(`theme.${item.theme}`)
                  : item.theme}
              </Badge>
            )}
            {item.size && (
              <Badge
                variant="outline"
                className="text-foreground/80 border-foreground/30 font-tech text-[10px] uppercase tracking-[0.2em]"
              >
                {(t("cart.size") !== "cart.size" ? t("cart.size") : "Size")}: {item.size}
              </Badge>
            )}
          </div>
          <p className="font-display text-xl text-foreground font-bold mt-2">
            {formatPrice(item.price)}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
          <div className="flex items-center gap-2 glass px-2 py-1 border border-primary/20">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onIncrement(item.cartKey, item.quantity - 1)}
              className="h-7 w-7 hover:bg-primary/10 hover:text-primary"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="font-tech font-bold text-foreground min-w-[2ch] text-center">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onIncrement(item.cartKey, item.quantity + 1)}
              className="h-7 w-7 hover:bg-primary/10 hover:text-primary"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item.cartKey)}
            className="h-9 w-9 text-destructive hover:bg-destructive/10"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
