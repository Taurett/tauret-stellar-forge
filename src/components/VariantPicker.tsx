/**
 * VariantPicker — color/material swatches shown on the product page when
 * the product has admin-defined variants. Selecting a swatch can switch the
 * displayed image and stock state, and also drives size availability.
 *
 * Falls back gracefully when there are no variants — the parent keeps using
 * the legacy size grid.
 */
import { useMemo } from "react";
import type { ProductVariant } from "@/hooks/useProductVariants";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (id: string | null) => void;
}

const VariantPicker = ({ variants, selectedVariantId, onSelect }: Props) => {
  const { t } = useLanguage();

  // Group by color so swatches render once per color even if multiple sizes exist.
  const colorGroups = useMemo(() => {
    const map = new Map<string, { color: string; hex: string | null; firstId: string; totalStock: number }>();
    for (const v of variants) {
      if (!v.is_active || !v.color) continue;
      const key = v.color;
      const cur = map.get(key);
      if (cur) {
        cur.totalStock += v.stock_count;
      } else {
        map.set(key, { color: v.color, hex: v.color_hex, firstId: v.id, totalStock: v.stock_count });
      }
    }
    return Array.from(map.values());
  }, [variants]);

  const materials = useMemo(
    () => Array.from(new Set(variants.filter((v) => v.is_active && v.material).map((v) => v.material!))),
    [variants],
  );

  if (colorGroups.length === 0 && materials.length === 0) return null;

  const selected = variants.find((v) => v.id === selectedVariantId);

  return (
    <div className="space-y-4">
      {colorGroups.length > 0 && (
        <div>
          <div className="font-tech text-xs uppercase tracking-[0.25em] text-primary mb-3">
            {t("variant.color") || "Color"}
            {selected?.color && <span className="text-muted-foreground ml-2 normal-case tracking-normal">· {selected.color}</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {colorGroups.map((g) => {
              const isSelected = selected?.color === g.color;
              const isOut = g.totalStock === 0;
              return (
                <button
                  key={g.color}
                  type="button"
                  onClick={() => onSelect(g.firstId)}
                  disabled={isOut}
                  title={isOut ? "Out of stock" : g.color}
                  className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                    isSelected ? "border-primary shadow-neon-cyan scale-110" : "border-border hover:border-primary/60"
                  } ${isOut ? "opacity-40 cursor-not-allowed" : ""}`}
                  style={{ backgroundColor: g.hex || "#888" }}
                  aria-label={g.color}
                >
                  {isOut && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="block w-full h-px bg-foreground rotate-45" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {materials.length > 0 && (
        <div>
          <div className="font-tech text-xs uppercase tracking-[0.25em] text-primary mb-3">
            {t("variant.material") || "Material"}
          </div>
          <div className="flex flex-wrap gap-2">
            {materials.map((m) => (
              <span key={m} className="px-3 py-1.5 rounded border border-primary/30 font-tech text-xs text-foreground">
                {m}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantPicker;
