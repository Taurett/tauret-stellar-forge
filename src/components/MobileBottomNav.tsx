/**
 * MobileBottomNav — fixed bottom nav bar shown only on mobile (<md).
 * Quick access to Home / Shop / Cart / Wishlist / Account.
 * Sits above page content; respects iOS safe-area-inset-bottom.
 */
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const MobileBottomNav = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const { ids: wishIds } = useWishlist();
  const { t } = useLanguage();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const cartCount = getTotalItems();
  const wishCount = wishIds.length;

  const items = [
    { to: "/", icon: Home,         label: t("nav.home") || "Home",      badge: 0 },
    { to: "/shop", icon: ShoppingBag, label: t("nav.shop") || "Shop",   badge: 0 },
    { to: "/cart", icon: ShoppingCart, label: t("nav.cart") || "Cart",  badge: cartCount },
    { to: "/wishlist", icon: Heart, label: t("nav.wishlist") || "Saved", badge: wishCount },
    { to: user ? "/orders" : "/auth", icon: User, label: t("nav.account") || "Account", badge: 0 },
  ];

  return (
    <nav
      aria-label="Primary mobile navigation"
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-40",
        "bg-background/95 backdrop-blur-xl border-t border-primary/20",
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = isActive(item.to);
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="relative">
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 1.8} />
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-gradient-neon text-primary-foreground text-[9px] font-bold rounded-full h-4 min-w-[16px] flex items-center justify-center font-tech px-1">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </span>
                <span className="font-tech text-[9px] uppercase tracking-wider">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
