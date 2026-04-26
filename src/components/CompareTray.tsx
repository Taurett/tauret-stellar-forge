/**
 * CompareTray — fixed bottom-left chip that surfaces the active compare list.
 * Quick way to jump to /compare when the user has 2+ items selected.
 */
import { Link } from "react-router-dom";
import { GitCompareArrows, X } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const CompareTray = () => {
  const { ids, clear } = useCompare();
  const { t } = useLanguage();

  if (ids.length < 2) return null;

  return (
    <div
      className="fixed left-4 bottom-20 md:bottom-6 z-40 glass clip-angle border border-primary/30 bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/10 px-3 py-2 flex items-center gap-2"
      role="status"
      aria-live="polite"
    >
      <GitCompareArrows className="w-4 h-4 text-primary" />
      <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-foreground">
        {ids.length}/4
      </span>
      <Button asChild size="sm" className="h-8 bg-gradient-neon text-primary-foreground font-tech text-[10px] uppercase tracking-wider clip-angle">
        <Link to="/compare">{t("compare.viewAll")}</Link>
      </Button>
      <button
        type="button"
        onClick={clear}
        aria-label={t("compare.clearAll")}
        className="text-muted-foreground hover:text-destructive p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CompareTray;
