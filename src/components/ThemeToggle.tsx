import { useTheme, type Theme } from "@/contexts/ThemeContext";

const themes: { value: Theme; label: string }[] = [
  { value: 'cyber', label: 'Cyber' },
  { value: 'wimbledon', label: 'Wimbledon' },
  { value: 'arid', label: 'Arid' },
  { value: 'military', label: 'Military' },
  { value: 'retro', label: 'Retro' },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex gap-1 glass clip-angle p-1 border border-primary/30">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`font-tech font-bold uppercase tracking-[0.2em] text-[11px] h-8 px-3 rounded-sm transition-all ${
            theme === t.value
              ? 'bg-gradient-neon text-primary-foreground shadow-neon-cyan'
              : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
          }`}
          aria-pressed={theme === t.value}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
