import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCookie, setCookie } from '@/lib/cookies';

export type Theme = 'cyber' | 'wimbledon' | 'arid' | 'military' | 'retro' | 'avalanche';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  /** True once the user has explicitly picked a theme (cookie set). */
  hasChosenTheme: boolean;
  /** Mark the theme as user-confirmed (called from the welcome intro). */
  confirmTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const COOKIE_KEY = 'tauret-theme';
const CHOSEN_KEY = 'tauret-theme-chosen';
const LEGACY_LS_KEY = 'tauret-theme';
const VALID: Theme[] = ['cyber', 'wimbledon', 'arid', 'military', 'retro', 'avalanche'];

const readInitialTheme = (): { theme: Theme; chosen: boolean } => {
  if (typeof window === 'undefined') return { theme: 'cyber', chosen: false };
  // Cookie wins (set when user confirms a theme).
  const cookie = getCookie(COOKIE_KEY) as Theme | null;
  if (cookie && VALID.includes(cookie)) {
    return { theme: cookie, chosen: getCookie(CHOSEN_KEY) === '1' };
  }
  // Legacy fallback for users who already had a localStorage selection.
  const ls = window.localStorage.getItem(LEGACY_LS_KEY) as Theme | null;
  if (ls && VALID.includes(ls)) return { theme: ls, chosen: false };
  return { theme: 'cyber', chosen: false };
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const initial = readInitialTheme();
  const [theme, setThemeState] = useState<Theme>(initial.theme);
  const [hasChosenTheme, setHasChosenTheme] = useState<boolean>(initial.chosen);

  // Apply the theme to <html> + persist as cookie on every change.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'cyber') root.classList.add('dark');
    else root.classList.remove('dark');
    setCookie(COOKIE_KEY, theme);
    // Keep localStorage in sync for any legacy reads.
    try { window.localStorage.setItem(LEGACY_LS_KEY, theme); } catch { /* noop */ }
  }, [theme]);

  /**
   * Smoothly transition into a new theme:
   *  - Fades a soft overlay in (~350ms) to soften high-contrast jumps
   *    (e.g. dark → light), helpful for light-sensitivity / epilepsy.
   *  - Adds `theme-transitioning` so colors/backgrounds ease (~600ms) instead
   *    of snapping. Removed afterwards so micro-interactions stay snappy.
   *  - Skipped entirely under `prefers-reduced-motion: reduce`.
   */
  const applyThemeWithTransition = (next: Theme) => {
    if (typeof window === 'undefined' || next === theme) {
      setThemeState(next);
      return;
    }

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setThemeState(next);
      return;
    }

    const root = document.documentElement;
    let overlay = document.getElementById('theme-fade-overlay') as HTMLDivElement | null;
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'theme-fade-overlay';
      overlay.className = 'theme-fade-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
    }

    root.classList.add('theme-transitioning');
    // Force reflow so the transition picks up the initial opacity.
    void overlay.offsetWidth;
    overlay.classList.add('is-active');

    // Swap the theme quickly behind the gentle dim so it feels responsive.
    window.setTimeout(() => {
      setThemeState(next);
    }, 90);

    window.setTimeout(() => {
      overlay?.classList.remove('is-active');
    }, 220);

    window.setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 480);
  };

  const setTheme = (t: Theme) => applyThemeWithTransition(t);

  const confirmTheme = (t: Theme) => {
    applyThemeWithTransition(t);
    setCookie(CHOSEN_KEY, '1');
    setHasChosenTheme(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, hasChosenTheme, confirmTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
