import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import CheckoutModal from "@/components/cart/CheckoutModal";
import { getStripePriceId } from "@/lib/productPricing";
import { getProductCopy } from "@/lib/productI18n";
import { useTheme } from "@/contexts/ThemeContext";
import { useSeo } from "@/hooks/useSeo";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useSeo({
    title: `${t("cart.title")} · TAURET`,
    description: "Review your TAURET cart and check out securely.",
    canonical: "/cart",
    noindex: true, // cart is user-specific, no SEO value
  });

  const handleCheckout = () => {
    const skipped: string[] = [];
    let payable = 0;
    for (const item of items) {
      if (getStripePriceId(item.id)) payable++;
      else skipped.push(getProductCopy(item.id, language, theme).name);
    }
    if (payable === 0) {
      toast.error(t("cart.noPayable") || "No payable items in cart.");
      return;
    }
    if (skipped.length > 0) {
      toast.warning(
        `${t("cart.someSkipped") || "Some items unavailable for checkout"}: ${skipped.join(", ")}`
      );
    }
    setCheckoutOpen(true);
  };

  const Header = ({ title }: { title: string }) => (
    <header className="relative pt-32 pb-12 px-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors mb-6"
        >
          <ArrowLeft className="w-3 h-3" />
          {t("shop.backHome")}
        </Link>
        <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
          {t("cart.kicker")}
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-black">
          <span className="text-aurora">{title}</span>
        </h1>
      </div>
    </header>
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SearchBar />
        <LanguageSwitcher />
        <ThemeToggle />
        <Header title={t("cart.empty")} />

        <div className="flex flex-col items-center justify-center py-24 px-4">
          <div className="glass clip-angle-lg p-12 border border-primary/20 max-w-md text-center">
            <ShoppingBag
              className="h-20 w-20 text-primary/40 mb-6 mx-auto"
              strokeWidth={1.2}
            />
            <h2 className="font-display text-2xl font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("cart.emptyTitle")}
            </h2>
            <p className="text-muted-foreground mb-8">{t("cart.emptyDesc")}</p>
            <Link to="/shop">
              <Button className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle hover:shadow-neon-cyan">
                {t("cart.browse")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />
      <Header title={`${t("cart.title")} · ${getTotalItems()}`} />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemRow
                key={item.cartKey}
                item={item}
                onIncrement={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <CartSummary subtotal={getTotalPrice()} onCheckout={handleCheckout} />
          </div>
        </div>
      </div>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={items}
        customerEmail={user?.email ?? undefined}
        userId={user?.id ?? undefined}
      />
    </div>
  );
};

export default Cart;
