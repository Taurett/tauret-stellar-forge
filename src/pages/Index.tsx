import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Contact from "@/components/Contact";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import SportCategories from "@/components/SportCategories";
import PromotionalBanner from "@/components/PromotionalBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import WelcomeIntro from "@/components/WelcomeIntro";
import UserMenu from "@/components/UserMenu";
import { useSeo } from "@/hooks/useSeo";

const Index = () => {
  useSeo({
    title: "TAURET — Futuristic Sportswear for Elite Athletes",
    description:
      "Premium futuristic sports clothing for tennis, football, basketball, cycling, gym & more. Engineered for elite performance.",
    canonical: "/",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "TAURET",
        url: typeof window !== "undefined" ? window.location.origin : "https://tauret.lovable.app",
        logo:
          typeof window !== "undefined"
            ? `${window.location.origin}/og-image.jpg`
            : "https://tauret.lovable.app/og-image.jpg",
        sameAs: [],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "TAURET",
        url: typeof window !== "undefined" ? window.location.origin : "https://tauret.lovable.app",
        potentialAction: {
          "@type": "SearchAction",
          target: `${typeof window !== "undefined" ? window.location.origin : "https://tauret.lovable.app"}/shop?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  });
  return (
    <div className="min-h-screen bg-background">
      <WelcomeIntro />
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />
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
