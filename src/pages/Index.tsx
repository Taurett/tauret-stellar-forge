
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
    <div className="min-h-screen">
      <LanguageSwitcher />
      <SearchBar />
      <Hero />
      <PromotionalBanner />
      <SportCategories />
      <FeaturedProducts />
      <Features />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
