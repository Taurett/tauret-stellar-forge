/**
 * CurrencyContext — display-only multi-currency conversion.
 *
 * Prices throughout the app are authored in EUR. This context converts them
 * to the active display currency using approximate exchange rates. Checkout
 * still happens in the base currency (Stripe price ids are EUR-based).
 *
 * Auto-detection: on first load we sniff the browser locale; the user can
 * override via a switcher and the choice is persisted in localStorage.
 */
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type CurrencyCode = "EUR" | "USD" | "RON";

interface CurrencyMeta {
  code: CurrencyCode;
  symbol: string;
  /** Approximate base-EUR conversion rate. */
  rate: number;
  flag: string;
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  EUR: { code: "EUR", symbol: "€", rate: 1.0, flag: "🇪🇺", label: "Euro" },
  USD: { code: "USD", symbol: "$", rate: 1.08, flag: "🇺🇸", label: "US Dollar" },
  RON: { code: "RON", symbol: "lei", rate: 4.98, flag: "🇷🇴", label: "Romanian Leu" },
};

const STORAGE_KEY = "tauret.currency.v1";

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  /** Convert an EUR amount to the active currency value (number, no formatting). */
  convert: (eur: number) => number;
  /** Format an EUR amount as a localized currency string. */
  format: (eur: number) => string;
  meta: CurrencyMeta;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const detectInitialCurrency = (): CurrencyCode => {
  if (typeof window === "undefined") return "EUR";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored in CURRENCIES) return stored as CurrencyCode;
  } catch { /* ignore */ }
  // Heuristic: browser language → currency
  const lang = (navigator.language || "en").toLowerCase();
  if (lang.startsWith("ro")) return "RON";
  if (lang.startsWith("en-us") || lang === "en") return "USD";
  return "EUR";
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => detectInitialCurrency());

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      window.localStorage.setItem(STORAGE_KEY, c);
    } catch { /* ignore */ }
  };

  // Re-sync if storage changes in another tab.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && e.newValue in CURRENCIES) {
        setCurrencyState(e.newValue as CurrencyCode);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<CurrencyContextType>(() => {
    const meta = CURRENCIES[currency];
    const convert = (eur: number) => eur * meta.rate;
    const format = (eur: number) => {
      const amount = convert(eur);
      try {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: meta.code,
          maximumFractionDigits: 2,
        }).format(amount);
      } catch {
        return `${meta.symbol}${amount.toFixed(2)}`;
      }
    };
    return { currency, setCurrency, convert, format, meta };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
