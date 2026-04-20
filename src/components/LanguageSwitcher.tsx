import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSwitcherProps {
  /** Render mode: floating bar (desktop default) or inline (header on mobile). */
  variant?: 'floating' | 'inline';
}

const LanguageSwitcher = ({ variant = 'floating' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  const buttons = (['en', 'ro'] as const).map((lang) => (
    <Button
      key={lang}
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(lang)}
      className={`font-tech font-bold uppercase tracking-[0.2em] text-xs h-8 px-3 transition-all ${
        language === lang
          ? 'bg-gradient-neon text-primary-foreground shadow-neon-cyan'
          : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
      }`}
    >
      {lang}
    </Button>
  ));

  if (variant === 'inline') {
    return (
      <div className="flex gap-1 glass clip-angle p-1 border border-primary/30">
        {buttons}
      </div>
    );
  }

  // Floating — desktop only (mobile uses the inline variant inside the header).
  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-50 gap-1 glass clip-angle p-1 border border-primary/30">
      {buttons}
    </div>
  );
};

export default LanguageSwitcher;
