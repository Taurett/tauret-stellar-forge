/**
 * CurrencySwitcher — compact dropdown to switch display currency.
 * Display-only conversion: checkout still happens in the base currency.
 */
import { Check, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CURRENCIES, useCurrency, type CurrencyCode } from "@/contexts/CurrencyContext";

interface CurrencySwitcherProps {
  className?: string;
  /** Floating top-corner placement (used on the landing page header). */
  floating?: boolean;
}

const CurrencySwitcher = ({ className = "", floating = false }: CurrencySwitcherProps) => {
  const { currency, setCurrency, meta } = useCurrency();

  const trigger = (
    <Button
      variant="outline"
      size="sm"
      className={`glass border-primary/30 font-tech text-[10px] uppercase tracking-[0.25em] clip-angle ${className}`}
      aria-label="Change currency"
    >
      <Coins className="w-3 h-3 mr-1.5" />
      {meta.code}
    </Button>
  );

  const wrapper = floating ? (
    <div className="fixed top-4 right-44 z-40 hidden md:block">{trigger}</div>
  ) : (
    trigger
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{wrapper}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass border-primary/20 min-w-[180px]">
        {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
          const c = CURRENCIES[code];
          const active = code === currency;
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => setCurrency(code)}
              className="font-tech text-xs uppercase tracking-wider cursor-pointer flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true">{c.flag}</span>
                <span>{c.code}</span>
                <span className="text-muted-foreground normal-case tracking-normal text-[10px]">
                  {c.label}
                </span>
              </span>
              {active && <Check className="w-3 h-3 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySwitcher;
