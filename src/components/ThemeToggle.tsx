import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex gap-1 glass clip-angle p-1 border border-primary/30">
      {(['cyber', 'wimbledon'] as const).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`font-tech font-bold uppercase tracking-[0.2em] text-[11px] h-8 px-3 rounded-sm transition-all ${
            theme === t
              ? 'bg-gradient-neon text-primary-foreground shadow-neon-cyan'
              : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
          }`}
          aria-pressed={theme === t}
        >
          {t === 'cyber' ? 'Cyber' : 'Wimbledon'}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
