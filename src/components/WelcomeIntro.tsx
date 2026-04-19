import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Each theme card uses its own data-theme override so the swatch previews
// the actual look of that theme regardless of the currently active one.
const THEMES: { value: Theme; labelKey: string; descKey: string }[] = [
  { value: 'cyber',     labelKey: 'intro.theme.cyber.label',     descKey: 'intro.theme.cyber.desc' },
  { value: 'wimbledon', labelKey: 'intro.theme.wimbledon.label', descKey: 'intro.theme.wimbledon.desc' },
  { value: 'arid',      labelKey: 'intro.theme.arid.label',      descKey: 'intro.theme.arid.desc' },
  { value: 'military',  labelKey: 'intro.theme.military.label',  descKey: 'intro.theme.military.desc' },
  { value: 'retro',     labelKey: 'intro.theme.retro.label',     descKey: 'intro.theme.retro.desc' },
  { value: 'avalanche', labelKey: 'intro.theme.avalanche.label', descKey: 'intro.theme.avalanche.desc' },
];

const WelcomeIntro = () => {
  const { t } = useLanguage();
  const { theme, setTheme, hasChosenTheme, confirmTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<Theme>(theme);

  // Only auto-open on first visit (no cookie yet). Defer one tick so the page
  // renders behind the modal first.
  useEffect(() => {
    if (!hasChosenTheme) {
      const id = window.setTimeout(() => setOpen(true), 250);
      return () => window.clearTimeout(id);
    }
  }, [hasChosenTheme]);

  const handlePreview = (next: Theme) => {
    setPending(next);
    setTheme(next); // live preview behind the modal
  };

  const handleConfirm = () => {
    confirmTheme(pending);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl border-primary/30 bg-background/95 backdrop-blur-xl">
        <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-2">
          {t('intro.kicker')}
        </div>
        <DialogTitle className="font-display text-3xl md:text-4xl font-black text-aurora">
          {t('intro.title')}
        </DialogTitle>
        <DialogDescription className="font-tech text-sm md:text-base text-muted-foreground leading-relaxed">
          {t('intro.story')}
        </DialogDescription>

        <div className="mt-4">
          <div className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-3">
            {t('intro.pickPrompt')}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
                  {/* Swatch rendered inside its own data-theme to preview accurately. */}
                  <div data-theme={opt.value} className="relative h-16 rounded-sm overflow-hidden mb-2 border border-primary/20">
                    <div className="absolute inset-0 bg-background" />
                    <div className="absolute inset-0 bg-gradient-neon opacity-80" />
                    <div className="absolute bottom-1 left-1 right-1 h-1.5 rounded-full bg-primary" />
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
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeIntro;
