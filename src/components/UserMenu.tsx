import { Link, useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon, LogIn, Package, ShieldCheck, Heart, MessageSquare, Boxes, Truck, RotateCcw, BarChart3, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { toast } from "@/hooks/use-toast";

const UserMenu = () => {
  const { user, signOut, loading } = useAuth();
  const { t } = useLanguage();
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();

  if (loading) return null;

  if (!user) {
    return (
      <Button asChild size="sm" variant="outline" className="font-tech text-xs uppercase tracking-[0.2em] border-primary/40 hover:border-primary px-2 sm:px-3">
        <Link to="/auth" aria-label={t("auth.signIn")}>
          <LogIn className="w-3.5 h-3.5 sm:mr-1.5" />
          <span className="hidden sm:inline">{t("auth.signIn")}</span>
        </Link>
      </Button>
    );
  }

  const initials = (user.user_metadata?.display_name || user.email || "?")
    .split(/[\s@]/)[0]
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: t("auth.signedOut") });
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="font-tech text-xs uppercase tracking-[0.2em] border-primary/40 hover:border-primary px-2 sm:px-3" aria-label={t("auth.account")}>
          <span className="w-5 h-5 rounded-full bg-gradient-neon text-primary-foreground flex items-center justify-center text-[10px] font-bold sm:mr-1.5">
            {initials}
          </span>
          <span className="hidden sm:inline">{t("auth.account")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-tech text-xs">
          <div className="font-bold truncate">{user.user_metadata?.display_name || user.email}</div>
          <div className="text-muted-foreground truncate font-normal">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/orders">
            <Package className="w-4 h-4 mr-2" />
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/wishlist">
            <Heart className="w-4 h-4 mr-2" />
            {t("wishlist.menu")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/help">
            <HelpCircle className="w-4 h-4 mr-2" />
            {t("help.menu")}
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/admin/analytics"><BarChart3 className="w-4 h-4 mr-2" /> {t("admin.analytics.menu")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/admin/orders"><ShieldCheck className="w-4 h-4 mr-2" /> Admin · Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/admin/inventory"><Boxes className="w-4 h-4 mr-2" /> {t("admin.inventory.menu")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/admin/shipping"><Truck className="w-4 h-4 mr-2" /> {t("admin.shipping.menu")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/admin/returns"><RotateCcw className="w-4 h-4 mr-2" /> {t("admin.returns.menu")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/admin/reviews"><MessageSquare className="w-4 h-4 mr-2" /> {t("admin.reviews.menu")}</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          {t("auth.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
