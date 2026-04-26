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

      <footer className="border-t border-primary/20 py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <TrustBadges variant="row" />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-tech text-[11px] uppercase tracking-[0.25em]">
            <a href="/help" className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.help')}
            </a>
            <span className="text-primary/30" aria-hidden="true">·</span>
            <a href="/help#shipping" className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.shipping')}
            </a>
          </div>
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-muted-foreground text-center">
            © 2025 TAURET — Engineered for Athletes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
