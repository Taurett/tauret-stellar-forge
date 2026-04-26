/**
 * ProductQuickView — modal that previews a product without leaving the shop.
 * Shows image, price, rating, sizes, and add-to-cart in one shot.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/hooks/use-toast";
import { resolveProduct, getSizesFor } from "@/lib/products";
import WishlistHeart from "@/components/WishlistHeart";
import CompareToggle from "@/components/CompareToggle";

interface Props {
  productId: number | null;
  open: boolean;
  onClose: () => void;
}

const ProductQuickView = ({ productId, open, onClose }: Props) => {
  const { t, formatPrice, language } = useLanguage();
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const product = productId ? resolveProduct(productId, language, theme) : null;
  const sizes = productId ? getSizesFor(productId) : [];
  const categoryLabel = product ? t(product.categoryLabelKey as never) : "";

  const handleAdd = () => {
    if (!product) return;
    if (sizes.length > 0 && !selectedSize) {
      toast({
        title: t("product.pleaseSelectSize"),
        variant: "destructive",
      });
      return;
    }
    addToCart({
      id: product.id,
      name: product.copy.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
      theme,
      size: selectedSize ?? undefined,
    });
    toast({
      title: t("toast.added"),
      description: `${product.copy.name} ${t("toast.addedDesc")}`,
    });
    onClose();
    setSelectedSize(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => { if (!o) { onClose(); setSelectedSize(null); } }}
    >
      <DialogContent className="bg-background/95 backdrop-blur-xl border border-primary/30 clip-angle-lg max-w-3xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="bg-foreground/5 aspect-square md:aspect-auto md:min-h-[420px] flex items-center justify-center p-6">
            {product && (
              <img
                src={product.images[0]}
                alt={product.copy.name}
                className="max-w-full max-h-[400px] object-contain"
              />
            )}
          </div>

          {/* Details */}
          <div className="p-6 space-y-4 flex flex-col">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex items-center justify-between gap-3">
                <Badge className="bg-gradient-neon text-primary-foreground font-tech text-[10px] uppercase tracking-[0.25em] hover:bg-gradient-neon w-fit">
                  {categoryLabel}
                </Badge>
                {product && (
                  <div className="flex items-center gap-1.5">
                    <CompareToggle productId={product.id} productName={product.copy.name} />
                    <WishlistHeart productId={product.id} productName={product.copy.name} size="sm" />
                  </div>
                )}
              </div>
              <DialogTitle className="font-display text-2xl md:text-3xl font-black uppercase tracking-wide text-foreground">
                {product?.copy.name ?? ""}
              </DialogTitle>
              <DialogDescription className="font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t("quickview.title")}
              </DialogDescription>
            </DialogHeader>

            {product && (
              <>
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-tech text-sm font-bold text-foreground">{product.rating}</span>
                  <span className="font-tech text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                <p className="font-display text-3xl font-bold text-aurora">
                  {formatPrice(product.price)}
                </p>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {product.copy.description}
                </p>

                {sizes.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-tech text-[10px] uppercase tracking-[0.25em] text-primary">
                      {t("quickview.selectSize")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => {
                        const active = selectedSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            aria-pressed={active}
                            className={`min-w-[44px] h-10 px-3 font-tech font-bold text-xs uppercase tracking-wider clip-angle border transition-all ${
                              active
                                ? "border-primary bg-primary/15 text-primary shadow-neon-cyan"
                                : "border-primary/20 text-foreground hover:border-primary/60 hover:bg-primary/5"
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-4 space-y-2">
                  <Button
                    onClick={handleAdd}
                    className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest text-xs h-11 hover:shadow-neon-cyan clip-angle"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t("shop.addToCart")}
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full font-tech font-bold uppercase tracking-widest text-xs h-11 border-primary/40 hover:border-primary clip-angle"
                  >
                    <Link to={`/product/${product.id}`} onClick={onClose}>
                      {t("quickview.viewFullDetails")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
