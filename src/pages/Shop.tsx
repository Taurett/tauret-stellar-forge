import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { toast } from "@/hooks/use-toast";

// Mock product data
const products = [
  {
    id: 1,
    name: "Pro Football Jersey",
    price: 89.99,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png",
    category: "football",
    rating: 4.8,
    reviews: 234
  },
  {
    id: 2,
    name: "Elite Basketball Shorts",
    price: 49.99,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png",
    category: "basketball",
    rating: 4.9,
    reviews: 156
  },
  {
    id: 3,
    name: "Running Performance Tights",
    price: 79.99,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png",
    category: "running",
    rating: 4.7,
    reviews: 312
  },
  {
    id: 4,
    name: "Tennis Pro Polo",
    price: 69.99,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png",
    category: "tennis",
    rating: 4.6,
    reviews: 89
  },
  {
    id: 5,
    name: "Soccer Training Kit",
    price: 129.99,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png",
    category: "soccer",
    rating: 4.9,
    reviews: 445
  },
  {
    id: 6,
    name: "Cycling Performance Jersey",
    price: 89.99,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png",
    category: "cycling",
    rating: 4.8,
    reviews: 167
  }
];

const sportCategories = [
  { value: "all", label: "All Sports" },
  { value: "football", label: "Football" },
  { value: "basketball", label: "Basketball" },
  { value: "running", label: "Running" },
  { value: "tennis", label: "Tennis" },
  { value: "soccer", label: "Soccer" },
  { value: "cycling", label: "Cycling" }
];

const Shop = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black">
      <LanguageSwitcher />
      
      {/* Header */}
      <header className="bg-black border-b border-cyan-900/30 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Link to="/" className="text-cyan-400 hover:text-cyan-300 mb-2 inline-block">
                ← Back to Home
              </Link>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                TAURET SHOP
              </h1>
              <p className="text-gray-300 mt-2">Premium sports gear for elite athletes</p>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="px-4 py-8 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Filter by sport" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {sportCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="text-white">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-gray-900 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-cyan-600 text-white">
                      {sportCategories.find(cat => cat.value === product.category)?.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-2">{product.name}</CardTitle>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-400">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews} reviews)</span>
                  </div>
                  <p className="text-2xl font-bold text-cyan-400">${product.price}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;