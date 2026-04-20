import { useState } from "react";
import { Palette } from "lucide-react";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const themes: { value: Theme; label: string }[] = [
  { value: 'cyber', label: 'Cyber' },
  { value: 'wimbledon', label: 'Wimbledon' },
  { value: 'arid', label: 'Arid' },
  { value: 'military', label: 'Military' },
  { value: 'retro', label: 'Retro' },
  { value: 'avalanche', label: 'Avalanche' },
];

interface ThemeToggleProps {
  /** Render mode: floating bar (desktop default) or inline trigger button (header). */
  variant?: 'floating' | 'inline';
}

const ThemeToggle = ({ variant = 'floating' }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  if (variant === 'inline') {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Change theme"
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Palette className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-56 p-2 glass border border-primary/30"
        >
          <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground px-2 pb-2">
            Theme
          </div>
          <div className="grid grid-cols-2 gap-1">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => { setTheme(t.value); setOpen(false); }}
                className={`font-tech font-bold uppercase tracking-[0.15em] text-[11px] h-9 px-2 rounded-sm transition-all ${
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
        </PopoverContent>
      </Popover>
    );
  }

  // Floating variant — desktop only (hidden on mobile, where the inline trigger lives in the header).
  return (
    <div className="hidden md:flex fixed bottom-6 left-6 z-50 flex-wrap gap-1 glass clip-angle p-1 border border-primary/30 max-w-[calc(100vw-3rem)]">
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
