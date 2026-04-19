import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Star, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { toast } from "@/hooks/use-toast";
import { getProductImage, type ProductImageKey } from "@/lib/productImages";

// Clothing-only catalog — image keys are resolved per active theme.
const products: Array<{
  id: number; name: string; price: number; imageKey: ProductImageKey;
  category: string; rating: number; reviews: number;
}> = [
  { id: 3,  name: "Tennis Athletic Dress",        price: 79.99,  imageKey: "tennis-outfit",     category: "tennis",     rating: 4.7, reviews: 189 },
  { id: 20, name: "Tennis Performance Polo",      price: 64.99,  imageKey: "tennis-polo",       category: "tennis",     rating: 4.6, reviews: 142 },
  { id: 7,  name: "Pro Football Jersey",          price: 79.99,  imageKey: "football-jersey",   category: "football",   rating: 4.8, reviews: 445 },
  { id: 9,  name: "Football Training Shorts",     price: 49.99,  imageKey: "football-shorts",   category: "football",   rating: 4.7, reviews: 312 },
  { id: 21, name: "Goalkeeper Long-Sleeve Jersey",price: 94.99,  imageKey: "goalkeeper-jersey", category: "football",   rating: 4.9, reviews: 198 },
  { id: 11, name: "Basketball Pro Jersey",        price: 89.99,  imageKey: "basketball-jersey", category: "basketball", rating: 4.8, reviews: 387 },
  { id: 22, name: "Basketball Court Shorts",      price: 54.99,  imageKey: "basketball-shorts", category: "basketball", rating: 4.7, reviews: 256 },
  { id: 12, name: "Handball Team Jersey",         price: 69.99,  imageKey: "handball-jersey",   category: "handball",   rating: 4.7, reviews: 234 },
  { id: 14, name: "Aerodynamic Cycling Jersey",   price: 109.99, imageKey: "cycling-jersey",    category: "cycling",    rating: 4.8, reviews: 276 },
  { id: 16, name: "Cycling Bib Shorts",           price: 99.99,  imageKey: "cycling-shorts",    category: "cycling",    rating: 4.7, reviews: 289 },
  { id: 23, name: "Cycling Windbreaker Jacket",   price: 129.99, imageKey: "cycling-jacket",    category: "cycling",    rating: 4.8, reviews: 167 },
  { id: 24, name: "Aero Running Tank",            price: 44.99,  imageKey: "running-tank",      category: "running",    rating: 4.6, reviews: 203 },
  { id: 25, name: "Compression Running Leggings", price: 74.99,  imageKey: "running-leggings",  category: "running",    rating: 4.8, reviews: 312 },
  { id: 18, name: "Compression Training Shirt",   price: 59.99,  imageKey: "gym-shirt",         category: "gym",        rating: 4.7, reviews: 334 },
  { id: 26, name: "Tech Fleece Gym Hoodie",       price: 89.99,  imageKey: "gym-hoodie",        category: "gym",        rating: 4.8, reviews: 421 },
  { id: 27, name: "High-Support Sports Bra",      price: 49.99,  imageKey: "yoga-bra",          category: "gym",        rating: 4.7, reviews: 287 },
];

const sportCategoryKeys = [
  { value: "all",        labelKey: "categories.all" },
  { value: "tennis",     labelKey: "categories.tennis" },
  { value: "football",   labelKey: "categories.football" },
  { value: "basketball", labelKey: "categories.basketball" },
  { value: "handball",   labelKey: "categories.handball" },
  { value: "cycling",    labelKey: "categories.cycling" },
  { value: "running",    labelKey: "categories.running" },
  { value: "gym",        labelKey: "categories.gymFitness" },
];

const Shop = () => {
  const { addToCart } = useCart();
  const { t, formatPrice } = useLanguage();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const sportCategories = sportCategoryKeys.map(c => ({ value: c.value, label: t(c.labelKey) }));

  const handleAddToCart = (product: typeof products[number]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImage(product.imageKey, theme),
      category: product.category
    });
    toast({
      title: t('toast.added'),
      description: `${product.name} ${t('toast.addedDesc')}`,
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />

      {/* Page header */}
      <header className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" />
            {t('shop.backHome')}
          </Link>
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">{t('shop.kicker')}</div>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-4">
            <span className="text-aurora">{t('shop.title')}</span>
          </h1>
          <p className="font-tech text-lg text-muted-foreground tracking-wide">
            {t('shop.subtitle')}
          </p>
        </div>
      </header>

      {/* Filters */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto glass clip-angle p-6 border border-primary/20">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70 h-4 w-4" />
              <Input
                placeholder={t('shop.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 bg-input/60 border-primary/20 text-foreground placeholder:text-muted-foreground/70 h-11 focus-visible:border-primary focus-visible:ring-primary/30"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[220px] bg-input/60 border-primary/20 text-foreground h-11 font-tech uppercase tracking-wider text-sm">
                <SelectValue placeholder={t('shop.filterPlaceholder')} />
              </SelectTrigger>
              <SelectContent className="bg-popover border-primary/30">
                {sportCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="font-tech uppercase tracking-wider text-sm">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const img = getProductImage(product.imageKey, theme);
              return (
                <div
                  key={product.id}
                  className="group relative glass clip-angle-lg overflow-hidden border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon-cyan"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative bg-foreground/5 aspect-square overflow-hidden">
                      <img
                        src={img}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                      />
                      <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm border border-primary/40 text-primary font-tech text-[10px] uppercase tracking-[0.2em] hover:bg-background/80">
                        {sportCategories.find(c => c.value === product.category)?.label}
                      </Badge>
                    </div>
                  </Link>

                  <div className="p-5">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="font-tech text-xs text-foreground">{product.rating}</span>
                      <span className="font-tech text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <p className="font-display text-2xl font-bold text-foreground mb-4">{formatPrice(product.price)}</p>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest text-xs hover:shadow-neon-cyan clip-angle"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {t('shop.addToCart')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 glass clip-angle-lg border border-primary/20">
              <p className="font-tech text-muted-foreground uppercase tracking-wider">{t('shop.noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
