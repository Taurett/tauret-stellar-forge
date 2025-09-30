import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import basketballJersey from "@/assets/products/basketball-jersey.jpg";
import cyclingJersey from "@/assets/products/cycling-jersey.jpg";
import footballJersey from "@/assets/products/football-jersey.jpg";
import gymShirt from "@/assets/products/gym-shirt.jpg";

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();

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

  const featuredProducts = [
    {
      id: 11,
      name: "Basketball Pro Jersey",
      price: 89.99,
      originalPrice: 109.99,
      image: basketballJersey,
      rating: 4.8,
      reviews: 387,
      badge: "BESTSELLER",
      category: "Basketball"
    },
    {
      id: 7,
      name: "Pro Football Jersey",
      price: 79.99,
      originalPrice: 99.99,
      image: footballJersey,
      rating: 4.8,
      reviews: 445,
      badge: "NEW",
      category: "Football"
    },
    {
      id: 18,
      name: "Compression Training Shirt",
      price: 59.99,
      originalPrice: 79.99,
      image: gymShirt,
      rating: 4.7,
      reviews: 334,
      badge: "SALE",
      category: "Gym & Fitness"
    },
    {
      id: 14,
      name: "Aerodynamic Cycling Jersey",
      price: 109.99,
      originalPrice: 139.99,
      image: cyclingJersey,
      rating: 4.8,
      reviews: 276,
      badge: "LIMITED",
      category: "Cycling"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'SALE':
        return 'destructive';
      case 'NEW':
        return 'default';
      case 'BESTSELLER':
        return 'secondary';
      case 'LIMITED':
        default:
        return 'outline';
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('featured.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge 
                    className="absolute top-2 left-2"
                    variant={getBadgeVariant(product.badge)}
                  >
                    {product.badge}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-foreground">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t('featured.addToCart')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.location.href = '/shop'}
          >
            {t('featured.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;