import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Trophy, Sun, Shield, Snowflake, Mountain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import heroBg from "@/assets/futuristic-hero-bg.jpg";
import heroWimbledon from "@/assets/hero-wimbledon.jpg";
import heroArid from "@/assets/hero-arid.jpg";
import heroMilitary from "@/assets/hero-military.jpg";
import heroRetro from "@/assets/hero-retro.jpg";
import heroAvalanche from "@/assets/hero-avalanche.jpg";

const HERO_BG: Record<string, string> = {
  cyber: heroBg,
  wimbledon: heroWimbledon,
  arid: heroArid,
  military: heroMilitary,
  retro: heroRetro,
  avalanche: heroAvalanche,
};

const Hero = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const bg = HERO_BG[theme] ?? heroBg;
  const isCyber = theme === 'cyber';
  const isWimbledon = theme === 'wimbledon';
  const isArid = theme === 'arid';
  const isMilitary = theme === 'military';
  const isRetro = theme === 'retro';
  const isAvalanche = theme === 'avalanche';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-[background-image] duration-700"
          style={{ backgroundImage: `url(${bg})` }}
        />
        {/* Theme-specific overlay */}
        {isCyber && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
            <div className="absolute inset-0 grid-bg animate-grid-drift opacity-40" />
          </>
        )}
        {isWimbledon && (
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        )}
        {isArid && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/35 to-background" />
            {/* Heat shimmer haze */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-accent/15 to-transparent" />
          </>
        )}
        {isMilitary && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/55 to-background" />
            {/* Tactical grid overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(hsl(var(--foreground) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.06) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </>
        )}
        {isRetro && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/45 to-background" />
            {/* Diagonal poster stripes */}
            <div
              className="absolute inset-0 opacity-25 mix-blend-multiply"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, transparent 0 28px, hsl(var(--foreground) / 0.08) 28px 30px)',
              }}
            />
          </>
        )}
        {isAvalanche && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
            {/* Cool icy mist haze */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/10 to-transparent" />
            {/* Subtle snowfall dots */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 30%, hsl(var(--foreground) / 0.35) 1px, transparent 1.5px), radial-gradient(circle at 70% 60%, hsl(var(--foreground) / 0.25) 1px, transparent 1.5px), radial-gradient(circle at 40% 80%, hsl(var(--foreground) / 0.3) 1px, transparent 1.5px)',
                backgroundSize: '120px 120px, 90px 90px, 160px 160px',
              }}
            />
          </>
        )}
        {!isCyber && !isWimbledon && !isArid && !isMilitary && !isRetro && !isAvalanche && (
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        )}
      </div>

      {/* Cyber: floating neon orbs */}
      {isCyber && (
        <>
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        </>
      )}

      {/* Wimbledon: corner trophy/court accents */}
      {isWimbledon && (
        <>
          <div className="hidden md:flex absolute top-28 left-8 flex-col items-center gap-2 text-primary/60 animate-float">
            <Trophy className="w-10 h-10" strokeWidth={1.5} />
            <span className="font-tech text-[10px] uppercase tracking-[0.3em]">Est. 1877</span>
          </div>
          <div className="hidden md:block absolute top-32 right-10 text-secondary/50">
            <div className="w-24 h-24 rounded-full border-2 border-current flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-current" />
            </div>
          </div>
          {/* Court line decoration */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </>
      )}

      {/* Arid: sun + dune silhouette */}
      {isArid && (
        <>
          <div className="absolute top-32 right-12 text-accent/70 animate-float">
            <Sun className="w-20 h-20" strokeWidth={1.2} />
          </div>
          <div className="hidden md:block absolute top-40 left-10 text-secondary/50 font-tech text-[10px] uppercase tracking-[0.4em] rotate-90 origin-left">
            ↑ 47°C — Sahara
          </div>
          {/* Faint dune curve at bottom */}
          <svg className="absolute bottom-0 inset-x-0 w-full h-32 text-primary/10" viewBox="0 0 1440 200" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,120 C240,60 480,180 720,100 C960,30 1200,140 1440,80 L1440,200 L0,200 Z" />
          </svg>
        </>
      )}

      {/* Military: stencil corners + tactical brackets */}
      {isMilitary && (
        <>
          {/* Corner brackets */}
          <div className="absolute top-24 left-6 w-12 h-12 border-l-2 border-t-2 border-primary/60" />
          <div className="absolute top-24 right-6 w-12 h-12 border-r-2 border-t-2 border-primary/60" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-primary/60" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-primary/60" />

          {/* Stencil callouts */}
          <div className="hidden md:flex absolute top-28 left-24 items-center gap-2 text-primary/70 font-tech text-[10px] tracking-[0.3em]">
            <Shield className="w-4 h-4" />
            <span>SECTOR 07-A</span>
          </div>
          <div className="hidden md:block absolute top-28 right-24 text-accent/70 font-tech text-[10px] tracking-[0.3em]">
            CLASSIFIED // OP. TAURET
          </div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 font-tech text-[10px] tracking-[0.4em] text-muted-foreground/80">
            ★ ★ ★  TACTICAL DIVISION  ★ ★ ★
          </div>
        </>
      )}

      {/* Avalanche: alpine peaks + snowflake accents */}
      {isAvalanche && (
        <>
          {/* Foreground mountain silhouette */}
          <svg
            className="absolute bottom-0 inset-x-0 w-full h-48 md:h-64 text-primary/25"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,320 L0,180 L160,80 L260,160 L380,40 L520,200 L640,120 L780,220 L900,90 L1040,200 L1180,110 L1300,210 L1440,140 L1440,320 Z" />
          </svg>
          {/* Mid-layer ridge */}
          <svg
            className="absolute bottom-0 inset-x-0 w-full h-32 md:h-40 text-secondary/30"
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,200 L0,120 L180,60 L320,140 L480,70 L640,150 L820,80 L980,140 L1160,70 L1320,150 L1440,100 L1440,200 Z" />
          </svg>
          {/* Top-left peak icon */}
          <div className="hidden md:flex absolute top-28 left-10 items-center gap-2 text-primary/70 animate-float">
            <Mountain className="w-10 h-10" strokeWidth={1.5} />
            <span className="font-tech text-[10px] uppercase tracking-[0.3em]">ALT. 4,478m</span>
          </div>
          {/* Top-right snowflake */}
          <div
            className="hidden md:block absolute top-32 right-12 text-foreground/60 animate-float"
            style={{ animationDelay: '1.5s' }}
          >
            <Snowflake className="w-16 h-16" strokeWidth={1} />
          </div>
          {/* Coordinates label */}
          <div className="hidden md:block absolute top-40 left-10 mt-12 text-secondary/60 font-tech text-[10px] uppercase tracking-[0.4em]">
            45.8326° N — 6.8652° E
          </div>
        </>
      )}

      {/* Retro: vintage Eastern European poster accents (no political symbols) */}
      {isRetro && (
        <>
          {/* Top-left date stamp */}
          <div className="hidden md:block absolute top-28 left-10 font-display font-black text-xs uppercase tracking-[0.4em] text-foreground/80 border-2 border-foreground px-3 py-1 bg-secondary">
            EST. 1925 — Vol. LXXVII
          </div>
          {/* Top-right edition tag */}
          <div className="hidden md:block absolute top-28 right-10 font-tech text-[10px] uppercase tracking-[0.4em] text-foreground/80 text-right">
            Ediția specială<br/>Nr. 042
          </div>
          {/* Bottom slogan strip */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 font-display font-black text-xs uppercase tracking-[0.4em] text-foreground/90">
            <span className="text-primary">★</span>
            <span>Înainte spre victorie</span>
            <span className="text-primary">★</span>
          </div>
          {/* Constructivist corner block */}
          <div className="absolute bottom-6 right-6 w-16 h-16 bg-secondary border-2 border-foreground flex items-center justify-center font-display font-black text-2xl text-foreground">
            T
          </div>
        </>
      )}

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Tag chip */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass clip-angle animate-fade-in">
          <Zap className="w-4 h-4 text-primary" />
          <span className="font-tech text-sm uppercase tracking-[0.3em] text-primary">
            {t(`hero.chip.${theme}`)}
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
        <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-12 sm:mt-20 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          {[
            { value: '08',  label: t('hero.stats.sports') },
            { value: '50+', label: t('hero.stats.products') },
            { value: '24/7', label: t('hero.stats.support') },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-aurora mb-1">{stat.value}</div>
              <div className="font-tech text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — hidden on small screens to avoid overlap */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
