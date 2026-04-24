/**
 * SizeGuide — modal with a generic measurements table.
 * Apparel-only; uses cm. Triggered next to the size selector.
 */
import { useState } from "react";
import { Ruler } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SizeGuideProps {
  /** Sizes the product actually offers — used to highlight rows. */
  availableSizes?: readonly string[];
}

interface Row { size: string; chest: string; waist: string; hip: string; }

const ROWS: Row[] = [
  { size: "XS",  chest: "82–86",   waist: "66–70",   hip: "88–92" },
  { size: "S",   chest: "87–91",   waist: "71–75",   hip: "93–97" },
  { size: "M",   chest: "92–97",   waist: "76–82",   hip: "98–103" },
  { size: "L",   chest: "98–103",  waist: "83–89",   hip: "104–109" },
  { size: "XL",  chest: "104–110", waist: "90–96",   hip: "110–116" },
  { size: "XXL", chest: "111–118", waist: "97–104",  hip: "117–124" },
];

const SizeGuide = ({ availableSizes = [] }: SizeGuideProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 font-tech text-[11px] uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors"
      >
        <Ruler className="w-3.5 h-3.5" />
        {t("sizeGuide.button")}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-background/95 backdrop-blur-xl border border-primary/30 clip-angle-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase tracking-wider text-aurora">
              {t("sizeGuide.title")}
            </DialogTitle>
            <DialogDescription className="font-tech text-xs text-muted-foreground leading-relaxed">
              {t("sizeGuide.intro")}
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground border-b border-border/60">
                  <th className="px-3 py-2 text-left">{t("sizeGuide.col.size")}</th>
                  <th className="px-3 py-2 text-left">{t("sizeGuide.col.chest")}</th>
                  <th className="px-3 py-2 text-left">{t("sizeGuide.col.waist")}</th>
                  <th className="px-3 py-2 text-left">{t("sizeGuide.col.hip")}</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => {
                  const has = availableSizes.length === 0 || availableSizes.includes(r.size);
                  return (
                    <tr
                      key={r.size}
                      className={`border-b border-border/30 last:border-b-0 font-tech ${has ? "" : "opacity-30"}`}
                    >
                      <td className="px-3 py-2 font-bold text-foreground">{r.size}</td>
                      <td className="px-3 py-2 text-muted-foreground">{r.chest}</td>
                      <td className="px-3 py-2 text-muted-foreground">{r.waist}</td>
                      <td className="px-3 py-2 text-muted-foreground">{r.hip}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="glass border-primary/30 font-tech uppercase tracking-widest clip-angle"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SizeGuide;
