import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import heroCyber from "@/assets/futuristic-hero-bg.jpg";
import heroWimbledon from "@/assets/hero-wimbledon.jpg";
import heroArid from "@/assets/hero-arid.jpg";
import heroMilitary from "@/assets/hero-military.jpg";
import heroRetro from "@/assets/hero-retro.jpg";
import heroAvalanche from "@/assets/hero-avalanche.jpg";

// Each card previews the actual hero background image of that theme.
const THEMES: { value: Theme; labelKey: string; descKey: string; image: string }[] = [
  { value: 'cyber',     labelKey: 'intro.theme.cyber.label',     descKey: 'intro.theme.cyber.desc',     image: heroCyber },
  { value: 'wimbledon', labelKey: 'intro.theme.wimbledon.label', descKey: 'intro.theme.wimbledon.desc', image: heroWimbledon },
  { value: 'arid',      labelKey: 'intro.theme.arid.label',      descKey: 'intro.theme.arid.desc',      image: heroArid },
  { value: 'military',  labelKey: 'intro.theme.military.label',  descKey: 'intro.theme.military.desc',  image: heroMilitary },
  { value: 'retro',     labelKey: 'intro.theme.retro.label',     descKey: 'intro.theme.retro.desc',     image: heroRetro },
  { value: 'avalanche', labelKey: 'intro.theme.avalanche.label', descKey: 'intro.theme.avalanche.desc', image: heroAvalanche },
];

const WelcomeIntro = () => {
  const { t } = useLanguage();
  const { theme, setTheme, hasChosenTheme, confirmTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<Theme>(theme);

  // Only auto-open on first visit (no cookie yet).
  useEffect(() => {
    if (!hasChosenTheme) {
      const id = window.setTimeout(() => setOpen(true), 250);
      return () => window.clearTimeout(id);
    }
  }, [hasChosenTheme]);

  // Lock body scroll while the intro is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const handlePreview = (next: Theme) => {
    setPending(next);
    setTheme(next); // live preview behind the modal
  };

  const handleConfirm = () => {
    confirmTheme(pending);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('intro.title')}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-background/30 backdrop-blur-[2px] animate-fade-in"
    >
      <div className="relative w-full max-w-3xl my-auto border border-primary/30 bg-background/70 backdrop-blur-2xl shadow-2xl rounded-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-2">
          {t('intro.kicker')}
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-black text-aurora">
          {t('intro.title')}
        </h2>
        <p className="font-tech text-sm md:text-base text-muted-foreground leading-relaxed mt-2">
          {t('intro.story')}
        </p>

        <div className="mt-4">
          <div className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-3">
            {t('intro.pickPrompt')}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {THEMES.map((opt) => {
              const isActive = pending === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handlePreview(opt.value)}
                  aria-pressed={isActive}
                  className={`group relative text-left clip-angle p-3 border transition-all ${
                    isActive
                      ? 'border-primary shadow-neon-cyan'
                      : 'border-primary/20 hover:border-primary/60'
                  }`}
                >
                  {/* Theme background preview */}
                  <div className="relative h-16 rounded-sm overflow-hidden mb-2 border border-primary/20">
                    <img
                      src={opt.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <div className="font-display font-bold text-sm uppercase tracking-wider text-foreground">
                    {t(opt.labelKey)}
                  </div>
                  <div className="font-tech text-[10px] text-muted-foreground leading-snug mt-1 line-clamp-2">
                    {t(opt.descKey)}
                  </div>
                </button>
              );
            })}
          </div>

          <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-4">
            {t('intro.pickHint')}
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4">
          <Button
            variant="ghost"
            onClick={() => { confirmTheme(pending); setOpen(false); }}
            className="font-tech uppercase tracking-widest text-xs"
          >
            {t('intro.skip')}
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest text-xs hover:shadow-neon-cyan clip-angle"
          >
            {t('intro.continue')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeIntro;
