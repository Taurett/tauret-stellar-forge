import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-1 glass clip-angle p-1 border border-primary/30">
      {(['en', 'ro'] as const).map((lang) => (
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
      ))}
    </div>
  );
};

export default LanguageSwitcher;
