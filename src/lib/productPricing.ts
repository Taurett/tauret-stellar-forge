// Thin shim — Stripe price ids are now declared on each product in
// src/lib/products.ts (the registry). Kept for backwards compatibility;
// new code should import from "@/lib/products".
import { PRODUCTS } from "@/lib/products";

export const productPriceIdMap: Record<number, string> = Object.fromEntries(
  PRODUCTS
    .filter((p): p is typeof p & { stripePriceId: string } => !!p.stripePriceId)
    .map((p) => [p.id, p.stripePriceId]),
);

export { getStripePriceIdFor as getStripePriceId } from "@/lib/products";
