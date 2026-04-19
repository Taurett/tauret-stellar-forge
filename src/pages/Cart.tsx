import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { getProductCopy } from "@/lib/productI18n";

const CATEGORY_KEY: Record<string, string> = {
  basketball: 'categories.basketball',
  football:   'categories.football',
  tennis:     'categories.tennis',
  padel:      'categories.padel',
  handball:   'categories.handball',
  cycling:    'categories.cycling',
  running:    'categories.running',
  gym:        'categories.gymFitness',
  airsoft:    'categories.airsoft',
};

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { t, formatPrice, language } = useLanguage();

  const Header = ({ title }: { title: string }) => (
    <header className="relative pt-32 pb-12 px-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors mb-6">
          <ArrowLeft className="w-3 h-3" />
          {t('shop.backHome')}
        </Link>
        <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">{t('cart.kicker')}</div>
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
        <Header title={t('cart.empty')} />

        <div className="flex flex-col items-center justify-center py-24 px-4">
          <div className="glass clip-angle-lg p-12 border border-primary/20 max-w-md text-center">
            <ShoppingBag className="h-20 w-20 text-primary/40 mb-6 mx-auto" strokeWidth={1.2} />
            <h2 className="font-display text-2xl font-bold text-foreground mb-3 uppercase tracking-wide">
              {t('cart.emptyTitle')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('cart.emptyDesc')}
            </p>
            <Link to="/shop">
              <Button className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle hover:shadow-neon-cyan">
                {t('cart.browse')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const total = subtotal * 1.1;

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />
      <Header title={`${t('cart.title')} · ${getTotalItems()}`} />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="glass clip-angle p-5 border border-primary/20 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-foreground/5 w-24 h-24 shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={getProductCopy(item.id, language).name} className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-foreground text-lg truncate">{getProductCopy(item.id, language).name}</h3>
                    <Badge variant="outline" className="mt-1 text-primary border-primary/40 font-tech text-[10px] uppercase tracking-[0.2em]">
                      {t(CATEGORY_KEY[item.category] ?? 'categories.all')}
                    </Badge>
                    <p className="font-display text-xl text-foreground font-bold mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                    <div className="flex items-center gap-2 glass px-2 py-1 border border-primary/20">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-7 w-7 hover:bg-primary/10 hover:text-primary"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-tech font-bold text-foreground min-w-[2ch] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-7 w-7 hover:bg-primary/10 hover:text-primary"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="h-9 w-9 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass clip-angle-lg p-6 border border-primary/20 sticky top-28">
              <div className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-4">{t('cart.summary')}</div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-6 uppercase">{t('cart.orderTotal')}</h3>

              <div className="space-y-3 font-tech text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span className="uppercase tracking-wider">{t('cart.subtotal')}</span>
                  <span className="text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="uppercase tracking-wider">{t('cart.shipping')}</span>
                  <span className="text-primary">{t('cart.free')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="uppercase tracking-wider">{t('cart.tax')}</span>
                  <span className="text-foreground">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-primary/20 pt-4 mt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-tech text-xs uppercase tracking-[0.25em] text-muted-foreground">{t('cart.total')}</span>
                    <span className="font-display text-3xl font-bold text-aurora">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <Button className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle hover:shadow-neon-cyan py-6">
                  {t('cart.checkout')}
                </Button>
                <Link to="/shop" className="block">
                  <Button variant="outline" className="w-full glass border-primary/30 text-foreground hover:text-primary hover:border-primary font-tech uppercase tracking-widest clip-angle">
                    {t('cart.keepShopping')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
