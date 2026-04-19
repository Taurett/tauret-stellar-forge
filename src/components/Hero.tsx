import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/futuristic-hero-bg.jpg";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 grid-bg animate-grid-drift opacity-40" />
      </div>

      {/* Floating neon orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Tag chip */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass clip-angle animate-fade-in">
          <Zap className="w-4 h-4 text-primary" />
          <span className="font-tech text-sm uppercase tracking-[0.3em] text-primary">
            {t('hero.chip')}
          </span>
        </div>

        {/* Main wordmark */}
        <h1 className="font-display text-7xl md:text-[10rem] font-black mb-6 leading-none animate-fade-in-up">
          <span className="text-aurora">TAURET</span>
        </h1>

        {/* Tagline */}
        <p className="font-tech text-2xl md:text-4xl text-foreground mb-6 tracking-[0.15em] uppercase animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {t('hero.tagline')}
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {t('hero.description')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button
            size="lg"
            onClick={() => window.location.href = '/shop'}
            className="group relative bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest px-10 py-6 text-base clip-angle hover:shadow-neon-cyan transition-all duration-500 border-0"
          >
            {t('hero.shopCollection')}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass border-primary/30 text-foreground font-tech font-bold uppercase tracking-widest px-10 py-6 text-base clip-angle hover:border-primary hover:text-primary hover:shadow-neon-cyan transition-all duration-500"
          >
            {t('hero.exploreSports')}
          </Button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          {[
            { value: '08',  label: t('hero.stats.sports') },
            { value: '50+', label: t('hero.stats.products') },
            { value: '24/7', label: t('hero.stats.support') },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-aurora mb-1">{stat.value}</div>
              <div className="font-tech text-xs uppercase tracking-[0.25em] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
