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

interface ProductData {
  id: number;
  name: string;
  price: number;
  imageKeys: ProductImageKey[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  fabric: string;
  features: string[];
  sizes: string[];
}

const productsData: ProductData[] = [
  {
    id: 3, name: "Tennis Athletic Dress", price: 79.99,
    imageKeys: ["tennis-outfit", "tennis-outfit-detail"], category: "tennis",
    rating: 4.7, reviews: 189,
    description: "Lightweight and breathable tennis dress with moisture-wicking technology. Perfect for intense matches and training sessions.",
    fabric: "88% Polyester, 12% Spandex — Moisture-wicking mesh fabric",
    features: ["Built-in shorts", "UV Protection 50+", "Anti-odor technology", "4-way stretch"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 7, name: "Pro Football Jersey", price: 79.99,
    imageKeys: ["football-jersey", "football-jersey-detail"], category: "football",
    rating: 4.8, reviews: 445,
    description: "Professional-grade football jersey with advanced moisture management. Designed for peak performance on the field.",
    fabric: "100% Recycled Polyester with Dri-FIT technology",
    features: ["Moisture-wicking", "Breathable mesh panels", "Athletic fit", "Machine washable"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 9, name: "Football Training Shorts", price: 49.99,
    imageKeys: ["football-shorts", "football-shorts-detail"], category: "football",
    rating: 4.7, reviews: 312,
    description: "Lightweight training shorts with elastic waistband and quick-dry fabric. Essential for any football player.",
    fabric: "100% Polyester with moisture-wicking finish",
    features: ["Elastic waistband", "Side pockets", "Quick-dry", "Lightweight construction"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 11, name: "Basketball Pro Jersey", price: 89.99,
    imageKeys: ["basketball-jersey", "basketball-jersey-detail"], category: "basketball",
    rating: 4.8, reviews: 387,
    description: "Authentic basketball jersey with breathable mesh construction. Perfect for game day or casual wear.",
    fabric: "100% Polyester double-knit mesh",
    features: ["Breathable mesh", "Tackle twill graphics", "Straight hem", "Official team styling"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 12, name: "Handball Team Jersey", price: 69.99,
    imageKeys: ["handball-jersey", "handball-jersey-detail"], category: "handball",
    rating: 4.7, reviews: 234,
    description: "High-performance handball jersey with excellent ventilation and comfort for intense matches.",
    fabric: "Polyester blend with ClimaCool technology",
    features: ["Moisture management", "Ventilated design", "Ergonomic fit", "Durable construction"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 14, name: "Aerodynamic Cycling Jersey", price: 109.99,
    imageKeys: ["cycling-jersey", "cycling-jersey-detail"], category: "cycling",
    rating: 4.8, reviews: 276,
    description: "Aerodynamic cycling jersey with race-fit design. Features advanced fabric technology for optimal performance.",
    fabric: "Italian Lycra with compression zones",
    features: ["Race fit", "3 rear pockets", "Full-length zipper", "Silicone gripper"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 16, name: "Cycling Bib Shorts", price: 99.99,
    imageKeys: ["cycling-shorts", "cycling-shorts-detail"], category: "cycling",
    rating: 4.7, reviews: 289,
    description: "Premium cycling bib shorts with Italian chamois pad. Designed for long-distance comfort and performance.",
    fabric: "Compression Lycra with 4-way stretch",
    features: ["Italian chamois pad", "Mesh bib straps", "Flat-lock seams", "Leg grippers"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 18, name: "Compression Training Shirt", price: 59.99,
    imageKeys: ["gym-shirt", "gym-shirt-detail"], category: "gym",
    rating: 4.7, reviews: 334,
    description: "Compression training shirt that supports muscles and enhances performance. Perfect for any workout.",
    fabric: "80% Nylon, 20% Spandex compression fabric",
    features: ["Muscle support", "Quick-dry", "4-way stretch", "Flatlock seams"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 20, name: "Tennis Performance Polo", price: 64.99,
    imageKeys: ["tennis-polo", "tennis-polo"], category: "tennis",
    rating: 4.6, reviews: 142,
    description: "Classic-cut tennis polo with futuristic neon trims. Engineered for fast play with breathable, moisture-wicking fabric.",
    fabric: "92% Polyester, 8% Elastane — Smooth-touch piqué knit",
    features: ["Reflective neon piping", "UV Protection 50+", "Athletic fit", "Anti-odor finish"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 21, name: "Goalkeeper Long-Sleeve Jersey", price: 94.99,
    imageKeys: ["goalkeeper-jersey", "goalkeeper-jersey"], category: "football",
    rating: 4.9, reviews: 198,
    description: "Long-sleeve goalkeeper jersey with padded forearms and high-grip torso panels. Built for the keepers who own the box.",
    fabric: "Recycled Polyester with foam-padded elbows",
    features: ["Elbow padding", "Grip torso print", "Ergonomic sleeves", "Breathable mesh back"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 22, name: "Basketball Court Shorts", price: 54.99,
    imageKeys: ["basketball-shorts", "basketball-shorts"], category: "basketball",
    rating: 4.7, reviews: 256,
    description: "Lightweight basketball shorts with above-the-knee cut and elastic waistband. Designed for explosive movement on the court.",
    fabric: "100% Polyester woven dazzle fabric",
    features: ["Elastic drawcord waist", "Side pockets", "Above-knee length", "Quick-dry"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 23, name: "Cycling Windbreaker Jacket", price: 129.99,
    imageKeys: ["cycling-jacket", "cycling-jacket"], category: "cycling",
    rating: 4.8, reviews: 167,
    description: "Ultra-light packable cycling windbreaker with reflective panels for low-light visibility. Your shield against wind and chill.",
    fabric: "Ripstop nylon with DWR water-repellent coating",
    features: ["Packable design", "Reflective accents", "Rear vent", "Drop tail hem"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 24, name: "Aero Running Tank", price: 44.99,
    imageKeys: ["running-tank", "running-tank"], category: "running",
    rating: 4.6, reviews: 203,
    description: "Featherweight running tank with laser-cut ventilation. Engineered for hot days and fast splits.",
    fabric: "Recycled Polyester mesh with mineral cooling yarn",
    features: ["Laser-cut vents", "Reflective logo", "Anti-chafe seams", "Lightweight feel"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 25, name: "Compression Running Leggings", price: 74.99,
    imageKeys: ["running-leggings", "running-leggings"], category: "running",
    rating: 4.8, reviews: 312,
    description: "High-rise compression leggings with sculpting seams and a hidden waistband pocket. Built for distance.",
    fabric: "78% Nylon, 22% Spandex — 4-way compression",
    features: ["Hidden waist pocket", "Sculpting seams", "Squat-proof", "Reflective accents"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 26, name: "Tech Fleece Gym Hoodie", price: 89.99,
    imageKeys: ["gym-hoodie", "gym-hoodie"], category: "gym",
    rating: 4.8, reviews: 421,
    description: "Tech fleece hoodie with brushed interior, kangaroo pocket and full-zip front. Pre and post-session warmth, refined.",
    fabric: "Tech fleece — 65% Cotton, 35% Polyester",
    features: ["Full-zip front", "Brushed interior", "Kangaroo pocket", "Ribbed cuffs and hem"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 27, name: "High-Support Sports Bra", price: 49.99,
    imageKeys: ["yoga-bra", "yoga-bra"], category: "gym",
    rating: 4.7, reviews: 287,
    description: "High-support sports bra with crossback straps and removable cups. Engineered for high-impact training and yoga flow alike.",
    fabric: "82% Recycled Polyester, 18% Elastane",
    features: ["Removable cups", "Crossback straps", "High support", "Sweat-wicking"],
    sizes: ["XS", "S", "M", "L", "XL"]
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t, formatPrice } = useLanguage();
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const product = productsData.find(p => p.id === Number(id));

  if (!product) {
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

  const images = product.imageKeys.map(k => getProductImage(k, theme));

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
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
      category: product.category
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
                    <img src={image} alt="" className="w-full h-24 object-contain p-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-gradient-neon text-primary-foreground font-tech text-[10px] uppercase tracking-[0.25em] mb-4 hover:bg-gradient-neon">
                  {product.category}
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

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-tech text-xs uppercase tracking-[0.25em] text-primary mb-4">{t('product.selectSize')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
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
                      { label: t('product.specs.category'), value: product.category.toUpperCase() },
                      { label: t('product.specs.material'), value: product.fabric },
                      { label: t('product.specs.sizes'),    value: product.sizes.join(', ') },
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
