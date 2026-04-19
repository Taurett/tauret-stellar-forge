import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import basketballJersey from "@/assets/products/basketball-jersey.png";
import cyclingJersey from "@/assets/products/cycling-jersey.png";
import footballJersey from "@/assets/products/football-jersey.png";
import gymShirt from "@/assets/products/gym-shirt.png";

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
    { id: 11, name: "Basketball Pro Jersey", price: 89.99, originalPrice: 109.99, image: basketballJersey, rating: 4.8, reviews: 387, badge: "BESTSELLER", category: "Basketball" },
    { id: 7,  name: "Pro Football Jersey",   price: 79.99, originalPrice: 99.99,  image: footballJersey,   rating: 4.8, reviews: 445, badge: "NEW",        category: "Football" },
    { id: 18, name: "Compression Training Shirt", price: 59.99, originalPrice: 79.99, image: gymShirt, rating: 4.7, reviews: 334, badge: "SALE",   category: "Gym & Fitness" },
    { id: 14, name: "Aerodynamic Cycling Jersey", price: 109.99, originalPrice: 139.99, image: cyclingJersey, rating: 4.8, reviews: 276, badge: "LIMITED", category: "Cycling" },
  ];

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">// Curated</div>
            <h2 className="font-display text-5xl md:text-7xl font-black">
              <span className="text-aurora">FEATURED GEAR</span>
            </h2>
          </div>
          <Link to="/shop" className="font-tech text-sm uppercase tracking-[0.25em] text-primary hover:text-primary-glow inline-flex items-center gap-2 group">
            {t('featured.viewAll')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative glass clip-angle-lg overflow-hidden border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon-cyan"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative bg-foreground/5 aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-background/80 backdrop-blur-sm border border-primary/40 font-tech text-[10px] uppercase tracking-[0.2em] text-primary">
                    {product.badge}
                  </div>
                </div>
              </Link>

              <div className="p-5">
                <div className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  {product.category}
                </div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span className="font-tech text-xs text-foreground">{product.rating}</span>
                  <span className="font-tech text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display font-bold text-2xl text-foreground">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="font-tech text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest text-xs hover:shadow-neon-cyan transition-all clip-angle"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t('featured.addToCart')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
