import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, ArrowLeft, Star, Truck, RefreshCw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/hooks/use-toast";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { getProductImage, type ProductImageKey } from "@/lib/productImages";
import { getProductCopy, getCategoryLabelKey } from "@/lib/productI18n";
import { getSizesFor } from "@/lib/productSizes";
import { useSeo } from "@/hooks/useSeo";

interface ProductData {
  id: number;
  price: number;
  imageKeys: ProductImageKey[];
  category: string;       // category id, used to look up i18n label
  rating: number;
  reviews: number;
}

// Structural data only — name/description/fabric/features come from productI18n,
// available sizes come from productSizes.
const productsData: ProductData[] = [
  { id: 3,  price: 79.99,  imageKeys: ["tennis-outfit", "tennis-outfit-detail"],         category: "tennis",     rating: 4.7, reviews: 189 },
  { id: 20, price: 64.99,  imageKeys: ["tennis-polo", "tennis-polo"],                    category: "tennis",     rating: 4.6, reviews: 142 },
  { id: 28, price: 59.99,  imageKeys: ["tennis-skort", "tennis-skort"],                  category: "tennis",     rating: 4.7, reviews: 164 },
  { id: 29, price: 62.99,  imageKeys: ["padel-shirt", "padel-shirt"],                    category: "padel",      rating: 4.7, reviews: 118 },
  { id: 30, price: 57.99,  imageKeys: ["padel-skort", "padel-skort"],                    category: "padel",      rating: 4.6, reviews: 96 },
  { id: 31, price: 94.99,  imageKeys: ["padel-jacket", "padel-jacket"],                  category: "padel",      rating: 4.8, reviews: 87 },
  { id: 7,  price: 79.99,  imageKeys: ["football-jersey", "football-jersey-detail"],     category: "football",   rating: 4.8, reviews: 445 },
  { id: 9,  price: 49.99,  imageKeys: ["football-shorts", "football-shorts-detail"],     category: "football",   rating: 4.7, reviews: 312 },
  { id: 21, price: 94.99,  imageKeys: ["goalkeeper-jersey", "goalkeeper-jersey"],        category: "football",   rating: 4.9, reviews: 198 },
  { id: 11, price: 89.99,  imageKeys: ["basketball-jersey", "basketball-jersey-detail"], category: "basketball", rating: 4.8, reviews: 387 },
  { id: 22, price: 54.99,  imageKeys: ["basketball-shorts", "basketball-shorts"],        category: "basketball", rating: 4.7, reviews: 256 },
  { id: 32, price: 64.99,  imageKeys: ["basketball-shooter", "basketball-shooter"],      category: "basketball", rating: 4.6, reviews: 143 },
  { id: 12, price: 69.99,  imageKeys: ["handball-jersey", "handball-jersey-detail"],     category: "handball",   rating: 4.7, reviews: 234 },
  { id: 33, price: 51.99,  imageKeys: ["handball-shorts", "handball-shorts"],            category: "handball",   rating: 4.6, reviews: 121 },
  { id: 34, price: 84.99,  imageKeys: ["handball-jacket", "handball-jacket"],            category: "handball",   rating: 4.7, reviews: 92 },
  { id: 14, price: 109.99, imageKeys: ["cycling-jersey", "cycling-jersey-detail"],       category: "cycling",    rating: 4.8, reviews: 276 },
  { id: 16, price: 99.99,  imageKeys: ["cycling-shorts", "cycling-shorts-detail"],       category: "cycling",    rating: 4.7, reviews: 289 },
  { id: 23, price: 129.99, imageKeys: ["cycling-jacket", "cycling-jacket"],              category: "cycling",    rating: 4.8, reviews: 167 },
  { id: 24, price: 44.99,  imageKeys: ["running-tank", "running-tank"],                  category: "running",    rating: 4.6, reviews: 203 },
  { id: 25, price: 74.99,  imageKeys: ["running-leggings", "running-leggings"],          category: "running",    rating: 4.8, reviews: 312 },
  { id: 35, price: 58.99,  imageKeys: ["running-longsleeve", "running-longsleeve"],      category: "running",    rating: 4.7, reviews: 154 },
  { id: 18, price: 59.99,  imageKeys: ["gym-shirt", "gym-shirt-detail"],                 category: "gym",        rating: 4.7, reviews: 334 },
  { id: 26, price: 89.99,  imageKeys: ["gym-hoodie", "gym-hoodie"],                      category: "gym",        rating: 4.8, reviews: 421 },
  { id: 27, price: 49.99,  imageKeys: ["yoga-bra", "yoga-bra"],                          category: "gym",        rating: 4.7, reviews: 287 },
  { id: 36, price: 72.99,  imageKeys: ["airsoft-shirt", "airsoft-shirt"],                category: "airsoft",    rating: 4.7, reviews: 108 },
  { id: 37, price: 89.99,  imageKeys: ["airsoft-pants", "airsoft-pants"],                category: "airsoft",    rating: 4.8, reviews: 99 },
  { id: 38, price: 119.99, imageKeys: ["airsoft-jacket", "airsoft-jacket"],              category: "airsoft",    rating: 4.8, reviews: 76 },
];



const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t, formatPrice, language } = useLanguage();
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const base = productsData.find(p => p.id === Number(id));

  // Theme/copy/derived values — safe even when base is missing (we guard below).
  const copy = base ? getProductCopy(base.id, language, theme) : null;
  const product = base && copy ? { ...base, ...copy } : null;
  const categoryLabel = product ? t(getCategoryLabelKey(product.category, theme)) : "";
  const images = product ? product.imageKeys.map(k => getProductImage(k, theme)) : [];
  const availableSizes = product ? getSizesFor(product.id) : [];

  // Per-product SEO + JSON-LD Product schema for rich Google results.
  // Hook MUST run on every render — call it before any early return.
  useSeo({
    title: product ? `${product.name} · TAURET` : "Product not found · TAURET",
    description: product
      ? `${product.name} — ${categoryLabel}. Premium TAURET sportswear engineered for elite performance.`
      : "This product is no longer available.",
    canonical: product ? `/product/${product.id}` : "/shop",
    noindex: !product,
    jsonLd: product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          sku: `TAURET-${product.id}`,
          mpn: `TAURET-${product.id}`,
          category: categoryLabel,
          image:
            typeof window !== "undefined"
              ? `${window.location.origin}${images[0]}`
              : images[0],
          brand: { "@type": "Brand", name: "TAURET" },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviews,
          },
          offers: {
            "@type": "Offer",
            url:
              typeof window !== "undefined"
                ? `${window.location.origin}/product/${product.id}`
                : `/product/${product.id}`,
            priceCurrency: "USD",
            price: product.price,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
          },
        }
      : undefined,
  });

  if (!base || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <SearchBar />
        <div className="glass clip-angle-lg p-12 border border-primary/20 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6 uppercase">{t('product.notFound')}</h2>
          <Button onClick={() => navigate("/shop")} className="bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest clip-angle">
            {t('product.backShop')}
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (availableSizes.length > 0 && !selectedSize) {
      toast({
        title: t('product.pleaseSelectSize'),
        description: t('product.pleaseSelectSizeDesc'),
        variant: "destructive"
      });
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0],
      category: product.category,
      theme,
      size: selectedSize || undefined,
    });
    toast({
      title: t('toast.added'),
      description: `${product.name} ${t('toast.addedDesc')}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />

      <header className="pt-28 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/shop")}
            className="text-primary hover:text-primary-glow hover:bg-primary/10 font-tech uppercase tracking-[0.25em] text-xs"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('product.backShop')}
          </Button>
        </div>
      </header>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="glass clip-angle-lg overflow-hidden border border-primary/20 bg-foreground/5">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-[500px] object-contain p-8"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`glass clip-angle overflow-hidden bg-foreground/5 transition-all ${
                      selectedImage === index
                        ? "border-2 border-primary shadow-neon-cyan"
                        : "border border-primary/20 hover:border-primary/50"
                    }`}
                  >
                    <img src={image} alt="" loading="lazy" decoding="async" className="w-full h-24 object-contain p-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-gradient-neon text-primary-foreground font-tech text-[10px] uppercase tracking-[0.25em] mb-4 hover:bg-gradient-neon">
                  {categoryLabel}
                </Badge>
                <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4 uppercase">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-tech font-bold text-foreground">{product.rating}</span>
                  </div>
                  <span className="font-tech text-muted-foreground">({product.reviews} {t('product.reviews')})</span>
                </div>
                <p className="font-display text-5xl font-bold text-aurora mb-6">{formatPrice(product.price)}</p>
              </div>

              <div className="border-t border-primary/20 pt-6">
                <p className="text-muted-foreground text-base leading-relaxed">{product.description}</p>
              </div>

              {availableSizes.length > 0 && (
                <div>
                  <h3 className="font-tech text-xs uppercase tracking-[0.25em] text-primary mb-4">{t('product.selectSize')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[60px] py-3 px-4 font-tech font-bold uppercase tracking-wider clip-angle transition-all ${
                          selectedSize === size
                            ? "bg-gradient-neon text-primary-foreground shadow-neon-cyan"
                            : "glass border border-primary/30 text-foreground hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest text-base py-7 clip-angle hover:shadow-neon-cyan transition-all"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t('product.addToCart')}
              </Button>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-primary/20">
                <div className="glass clip-angle p-4 text-center border border-primary/20">
                  <Truck className="h-6 w-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">{t('product.freeShipping')}</p>
                </div>
                <div className="glass clip-angle p-4 text-center border border-primary/20">
                  <RefreshCw className="h-6 w-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">{t('product.returns')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="glass border border-primary/20 p-1">
                <TabsTrigger value="details" className="font-tech uppercase tracking-wider data-[state=active]:bg-gradient-neon data-[state=active]:text-primary-foreground">
                  {t('product.tabs.details')}
                </TabsTrigger>
                <TabsTrigger value="specs" className="font-tech uppercase tracking-wider data-[state=active]:bg-gradient-neon data-[state=active]:text-primary-foreground">
                  {t('product.tabs.specs')}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <div className="glass clip-angle-lg p-8 border border-primary/20">
                  <div className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-3">{t('product.material')}</div>
                  <p className="text-muted-foreground mb-8">{product.fabric}</p>
                  <div className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-3">{t('product.keyFeatures')}</div>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-foreground flex items-start font-tech">
                        <span className="text-primary mr-3">▸</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="specs" className="mt-6">
                <div className="glass clip-angle-lg p-8 border border-primary/20">
                  <div className="space-y-1 font-tech">
                    {[
                      { label: t('product.specs.category'), value: categoryLabel.toUpperCase() },
                      { label: t('product.specs.material'), value: product.fabric },
                      { label: t('product.specs.sizes'),    value: availableSizes.join(', ') },
                      { label: t('product.specs.rating'),   value: `${product.rating}/5.0` },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between py-3 border-b border-primary/10 last:border-0 gap-4">
                        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{row.label}</span>
                        <span className="text-foreground text-right">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
