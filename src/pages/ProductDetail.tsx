import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, ArrowLeft, Star, Truck, RefreshCw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SearchBar from "@/components/SearchBar";

import tennisOutfit from "@/assets/products/tennis-outfit.jpg";
import tennisOutfitDetail from "@/assets/products/tennis-outfit-detail.jpg";
import footballJersey from "@/assets/products/football-jersey.jpg";
import footballJerseyDetail from "@/assets/products/football-jersey-detail.jpg";
import footballShorts from "@/assets/products/football-shorts.jpg";
import footballShortsDetail from "@/assets/products/football-shorts-detail.jpg";
import basketballJersey from "@/assets/products/basketball-jersey.jpg";
import basketballJerseyDetail from "@/assets/products/basketball-jersey-detail.jpg";
import handballJersey from "@/assets/products/handball-jersey.jpg";
import handballJerseyDetail from "@/assets/products/handball-jersey-detail.jpg";
import cyclingJersey from "@/assets/products/cycling-jersey.jpg";
import cyclingJerseyDetail from "@/assets/products/cycling-jersey-detail.jpg";
import cyclingShorts from "@/assets/products/cycling-shorts.jpg";
import cyclingShortsDetail from "@/assets/products/cycling-shorts-detail.jpg";
import gymShirt from "@/assets/products/gym-shirt.jpg";
import gymShirtDetail from "@/assets/products/gym-shirt-detail.jpg";

const productsData = [
  {
    id: 3, name: "Tennis Athletic Dress", price: 79.99,
    images: [tennisOutfit, tennisOutfitDetail], category: "tennis",
    rating: 4.7, reviews: 189,
    description: "Lightweight and breathable tennis dress with moisture-wicking technology. Perfect for intense matches and training sessions.",
    fabric: "88% Polyester, 12% Spandex — Moisture-wicking mesh fabric",
    features: ["Built-in shorts", "UV Protection 50+", "Anti-odor technology", "4-way stretch"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 7, name: "Pro Football Jersey", price: 79.99,
    images: [footballJersey, footballJerseyDetail], category: "football",
    rating: 4.8, reviews: 445,
    description: "Professional-grade football jersey with advanced moisture management. Designed for peak performance on the field.",
    fabric: "100% Recycled Polyester with Dri-FIT technology",
    features: ["Moisture-wicking", "Breathable mesh panels", "Athletic fit", "Machine washable"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 9, name: "Football Training Shorts", price: 49.99,
    images: [footballShorts, footballShortsDetail], category: "football",
    rating: 4.7, reviews: 312,
    description: "Lightweight training shorts with elastic waistband and quick-dry fabric. Essential for any football player.",
    fabric: "100% Polyester with moisture-wicking finish",
    features: ["Elastic waistband", "Side pockets", "Quick-dry", "Lightweight construction"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 11, name: "Basketball Pro Jersey", price: 89.99,
    images: [basketballJersey, basketballJerseyDetail], category: "basketball",
    rating: 4.8, reviews: 387,
    description: "Authentic basketball jersey with breathable mesh construction. Perfect for game day or casual wear.",
    fabric: "100% Polyester double-knit mesh",
    features: ["Breathable mesh", "Tackle twill graphics", "Straight hem", "Official team styling"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 12, name: "Handball Team Jersey", price: 69.99,
    images: [handballJersey, handballJerseyDetail], category: "handball",
    rating: 4.7, reviews: 234,
    description: "High-performance handball jersey with excellent ventilation and comfort for intense matches.",
    fabric: "Polyester blend with ClimaCool technology",
    features: ["Moisture management", "Ventilated design", "Ergonomic fit", "Durable construction"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 14, name: "Aerodynamic Cycling Jersey", price: 109.99,
    images: [cyclingJersey, cyclingJerseyDetail], category: "cycling",
    rating: 4.8, reviews: 276,
    description: "Aerodynamic cycling jersey with race-fit design. Features advanced fabric technology for optimal performance.",
    fabric: "Italian Lycra with compression zones",
    features: ["Race fit", "3 rear pockets", "Full-length zipper", "Silicone gripper"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 16, name: "Cycling Bib Shorts", price: 99.99,
    images: [cyclingShorts, cyclingShortsDetail], category: "cycling",
    rating: 4.7, reviews: 289,
    description: "Premium cycling bib shorts with Italian chamois pad. Designed for long-distance comfort and performance.",
    fabric: "Compression Lycra with 4-way stretch",
    features: ["Italian chamois pad", "Mesh bib straps", "Flat-lock seams", "Leg grippers"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 18, name: "Compression Training Shirt", price: 59.99,
    images: [gymShirt, gymShirtDetail], category: "gym",
    rating: 4.7, reviews: 334,
    description: "Compression training shirt that supports muscles and enhances performance. Perfect for any workout.",
    fabric: "80% Nylon, 20% Spandex compression fabric",
    features: ["Muscle support", "Quick-dry", "4-way stretch", "Flatlock seams"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const product = productsData.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <SearchBar />
        <div className="glass clip-angle-lg p-12 border border-primary/20 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6 uppercase">Product not found</h2>
          <Button onClick={() => navigate("/shop")} className="bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest clip-angle">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />

      <header className="pt-28 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/shop")}
            className="text-primary hover:text-primary-glow hover:bg-primary/10 font-tech uppercase tracking-[0.25em] text-xs"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
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
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[500px] object-contain p-8"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
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
                  <span className="font-tech text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <p className="font-display text-5xl font-bold text-aurora mb-6">${product.price}</p>
              </div>

              <div className="border-t border-primary/20 pt-6">
                <p className="text-muted-foreground text-base leading-relaxed">{product.description}</p>
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-tech text-xs uppercase tracking-[0.25em] text-primary mb-4">// Select Size</h3>
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
                Add to Cart
              </Button>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-primary/20">
                <div className="glass clip-angle p-4 text-center border border-primary/20">
                  <Truck className="h-6 w-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">Free Shipping</p>
                </div>
                <div className="glass clip-angle p-4 text-center border border-primary/20">
                  <RefreshCw className="h-6 w-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">30-Day Returns</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="glass border border-primary/20 p-1">
                <TabsTrigger value="details" className="font-tech uppercase tracking-wider data-[state=active]:bg-gradient-neon data-[state=active]:text-primary-foreground">
                  Details
                </TabsTrigger>
                <TabsTrigger value="specs" className="font-tech uppercase tracking-wider data-[state=active]:bg-gradient-neon data-[state=active]:text-primary-foreground">
                  Specifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <div className="glass clip-angle-lg p-8 border border-primary/20">
                  <div className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-3">// Material & Fabric</div>
                  <p className="text-muted-foreground mb-8">{product.fabric}</p>
                  <div className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-3">// Key Features</div>
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
                      { label: 'Category', value: product.category.toUpperCase() },
                      { label: 'Material', value: product.fabric },
                      { label: 'Available Sizes', value: product.sizes.join(', ') },
                      { label: 'Rating', value: `${product.rating}/5.0` },
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
