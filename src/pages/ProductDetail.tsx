import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, ArrowLeft, Star, Truck, Shield, RefreshCw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Import product images
import tennisRacket from "@/assets/products/tennis-racket.jpg";
import tennisRacketDetail from "@/assets/products/tennis-racket-detail.jpg";
import tennisOutfit from "@/assets/products/tennis-outfit.jpg";
import tennisOutfitDetail from "@/assets/products/tennis-outfit-detail.jpg";
import padelRacket from "@/assets/products/padel-racket.jpg";
import padelRacketDetail from "@/assets/products/padel-racket-detail.jpg";
import padelBag from "@/assets/products/padel-bag.jpg";
import padelBagDetail from "@/assets/products/padel-bag-detail.jpg";
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
import airsoftVest from "@/assets/products/airsoft-vest.jpg";
import airsoftVestDetail from "@/assets/products/airsoft-vest-detail.jpg";

const productsData = [
  {
    id: 1,
    name: "Professional Tennis Racket",
    price: 199.99,
    images: [tennisRacket, tennisRacketDetail],
    category: "tennis",
    rating: 4.9,
    reviews: 342,
    description: "High-performance tennis racket designed for professional players. Features advanced carbon fiber technology for optimal power and control.",
    fabric: "Carbon Fiber Composite",
    features: ["Weight: 300g", "Head Size: 98 sq in", "String Pattern: 16x19", "Grip: Synthetic leather"],
    sizes: ["4 1/8", "4 1/4", "4 3/8", "4 1/2"]
  },
  {
    id: 3,
    name: "Tennis Athletic Dress",
    price: 79.99,
    images: [tennisOutfit, tennisOutfitDetail],
    category: "tennis",
    rating: 4.7,
    reviews: 189,
    description: "Lightweight and breathable tennis dress with moisture-wicking technology. Perfect for intense matches and training sessions.",
    fabric: "88% Polyester, 12% Spandex - Moisture-wicking mesh fabric",
    features: ["Built-in shorts", "UV Protection 50+", "Anti-odor technology", "4-way stretch"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Carbon Fiber Padel Racket",
    price: 189.99,
    images: [padelRacket, padelRacketDetail],
    category: "padel",
    rating: 4.9,
    reviews: 298,
    description: "Premium padel racket with carbon fiber construction for maximum power and precision. Ideal for competitive play.",
    fabric: "12K Carbon Fiber with EVA foam core",
    features: ["Weight: 365g", "Balance: Medium", "Shape: Diamond", "Anti-vibration system"],
    sizes: ["One Size"]
  },
  {
    id: 6,
    name: "Professional Padel Bag",
    price: 89.99,
    images: [padelBag, padelBagDetail],
    category: "padel",
    rating: 4.6,
    reviews: 167,
    description: "Spacious padel bag with dedicated racket compartments and thermal protection. Perfect for transporting all your gear.",
    fabric: "600D Polyester with water-resistant coating",
    features: ["3 Racket compartments", "Thermal protection", "Shoe compartment", "Adjustable straps"],
    sizes: ["One Size"]
  },
  {
    id: 7,
    name: "Pro Football Jersey",
    price: 79.99,
    images: [footballJersey, footballJerseyDetail],
    category: "football",
    rating: 4.8,
    reviews: 445,
    description: "Professional-grade football jersey with advanced moisture management. Designed for peak performance on the field.",
    fabric: "100% Recycled Polyester with Dri-FIT technology",
    features: ["Moisture-wicking", "Breathable mesh panels", "Athletic fit", "Machine washable"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 9,
    name: "Football Training Shorts",
    price: 49.99,
    images: [footballShorts, footballShortsDetail],
    category: "football",
    rating: 4.7,
    reviews: 312,
    description: "Lightweight training shorts with elastic waistband and quick-dry fabric. Essential for any football player.",
    fabric: "100% Polyester with moisture-wicking finish",
    features: ["Elastic waistband", "Side pockets", "Quick-dry", "Lightweight construction"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 11,
    name: "Basketball Pro Jersey",
    price: 89.99,
    images: [basketballJersey, basketballJerseyDetail],
    category: "basketball",
    rating: 4.8,
    reviews: 387,
    description: "Authentic basketball jersey with breathable mesh construction. Perfect for game day or casual wear.",
    fabric: "100% Polyester double-knit mesh",
    features: ["Breathable mesh", "Tackle twill graphics", "Straight hem", "Official team styling"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 12,
    name: "Handball Team Jersey",
    price: 69.99,
    images: [handballJersey, handballJerseyDetail],
    category: "handball",
    rating: 4.7,
    reviews: 234,
    description: "High-performance handball jersey with excellent ventilation and comfort for intense matches.",
    fabric: "Polyester blend with ClimaCool technology",
    features: ["Moisture management", "Ventilated design", "Ergonomic fit", "Durable construction"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 14,
    name: "Aerodynamic Cycling Jersey",
    price: 109.99,
    images: [cyclingJersey, cyclingJerseyDetail],
    category: "cycling",
    rating: 4.8,
    reviews: 276,
    description: "Aerodynamic cycling jersey with race-fit design. Features advanced fabric technology for optimal performance.",
    fabric: "Italian Lycra with compression zones",
    features: ["Race fit", "3 rear pockets", "Full-length zipper", "Silicone gripper"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 16,
    name: "Cycling Bib Shorts",
    price: 99.99,
    images: [cyclingShorts, cyclingShortsDetail],
    category: "cycling",
    rating: 4.7,
    reviews: 289,
    description: "Premium cycling bib shorts with Italian chamois pad. Designed for long-distance comfort and performance.",
    fabric: "Compression Lycra with 4-way stretch",
    features: ["Italian chamois pad", "Mesh bib straps", "Flat-lock seams", "Leg grippers"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 18,
    name: "Compression Training Shirt",
    price: 59.99,
    images: [gymShirt, gymShirtDetail],
    category: "gym",
    rating: 4.7,
    reviews: 334,
    description: "Compression training shirt that supports muscles and enhances performance. Perfect for any workout.",
    fabric: "80% Nylon, 20% Spandex compression fabric",
    features: ["Muscle support", "Quick-dry", "4-way stretch", "Flatlock seams"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 19,
    name: "Tactical Airsoft Vest",
    price: 139.99,
    images: [airsoftVest, airsoftVestDetail],
    category: "airsoft",
    rating: 4.8,
    reviews: 267,
    description: "Military-grade tactical vest with MOLLE system. Durable construction for serious airsoft enthusiasts.",
    fabric: "1000D Cordura Nylon with reinforced stitching",
    features: ["MOLLE webbing", "Adjustable straps", "Multiple pockets", "Plate carrier compatible"],
    sizes: ["M", "L", "XL"]
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Product not found</h2>
          <Button onClick={() => navigate("/shop")} className="bg-cyan-600 hover:bg-cyan-700">
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
    <div className="min-h-screen bg-black">
      <LanguageSwitcher />
      
      {/* Header */}
      <header className="bg-black border-b border-cyan-900/30 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/shop")}
            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </header>

      {/* Product Details */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <Card className="bg-gray-900 border-gray-800 overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-[500px] object-contain bg-white"
                  />
                </CardContent>
              </Card>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? "border-cyan-500"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-24 object-contain bg-white"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-cyan-600 text-white mb-3">{product.category.toUpperCase()}</Badge>
                <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
                </div>
                <p className="text-5xl font-bold text-cyan-400 mb-6">${product.price}</p>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Select Size:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant="outline"
                        onClick={() => setSelectedSize(size)}
                        className={`${
                          selectedSize === size
                            ? "bg-cyan-600 text-white border-cyan-600"
                            : "bg-gray-900 text-white border-gray-700 hover:border-cyan-500"
                        }`}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-lg py-6"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
                <div className="text-center">
                  <Truck className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">2 Year Warranty</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">30-Day Returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="bg-gray-900 border border-gray-800">
                <TabsTrigger value="details" className="data-[state=active]:bg-cyan-600">
                  Product Details
                </TabsTrigger>
                <TabsTrigger value="specs" className="data-[state=active]:bg-cyan-600">
                  Specifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="text-white text-xl font-semibold mb-4">Material & Fabric</h3>
                    <p className="text-gray-300 mb-6">{product.fabric}</p>
                    <h3 className="text-white text-xl font-semibold mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-gray-300 flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="specs" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-gray-800">
                        <span className="text-gray-400">Category</span>
                        <span className="text-white font-semibold">{product.category.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-800">
                        <span className="text-gray-400">Material</span>
                        <span className="text-white font-semibold">{product.fabric}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-800">
                        <span className="text-gray-400">Available Sizes</span>
                        <span className="text-white font-semibold">{product.sizes.join(", ")}</span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-gray-400">Rating</span>
                        <span className="text-white font-semibold">{product.rating}/5.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
