import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import tauretLogo from "@/assets/tauret-logo-futuristic.png";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import UserMenu from "@/components/UserMenu";

const SearchBar = () => {
  const { t } = useLanguage();
  const { getTotalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo — large and prominent */}
          <Link to="/" className="flex items-center shrink-0 group">
            <img
              src={tauretLogo}
              alt="TAURET"
              width="56"
              height="56"
              decoding="async"
              fetchPriority="high"
              className="h-12 md:h-14 w-auto object-contain drop-shadow-[0_0_15px_hsl(var(--primary)/0.6)] group-hover:drop-shadow-[0_0_25px_hsl(var(--primary)/0.9)] transition-all duration-500"
            />
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 h-11 bg-input/60 border-primary/20 text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/30 font-tech tracking-wide"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            {/* Mobile-only language + theme pickers (desktop uses floating bars) */}
            <div className="md:hidden">
              <LanguageSwitcher variant="inline" />
            </div>
            <div className="md:hidden">
              <ThemeToggle variant="inline" />
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary hidden sm:inline-flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-neon text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center font-tech shadow-neon-cyan">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SearchBar;
