import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Contact from "@/components/Contact";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SearchBar from "@/components/SearchBar";
import SportCategories from "@/components/SportCategories";
import PromotionalBanner from "@/components/PromotionalBanner";
import FeaturedProducts from "@/components/FeaturedProducts";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <Hero />
      <SportCategories />
      <PromotionalBanner />
      <FeaturedProducts />
      <Features />
      <About />
      <Contact />

      <footer className="border-t border-primary/20 py-8 text-center">
        <p className="font-tech text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © 2025 TAURET — Engineered for Athletes
        </p>
      </footer>
    </div>
  );
};

export default Index;
