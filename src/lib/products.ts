// =============================================================================
// Centralised product registry
// =============================================================================
// One place to declare which products exist and their structural data
// (price, category, image keys, ratings, sizes, Stripe price id).
//
// Per-theme images, per-language copy and per-theme copy overrides remain in
// `productImages.ts` and `productI18n.ts` because they're large lookup tables
// keyed by *image filename* / *theme*, not by product id. The registry below
// is the only thing you need to touch when adding/removing a product — sizes,
// prices, image keys and Stripe price id all live here together.
// =============================================================================

import type { Theme } from "@/contexts/ThemeContext";
import {
  getProductImage,
  type ProductImageKey,
} from "@/lib/productImages";
import {
  getProductCopy,
  getCategoryLabelKey,
  type Lang,
  type ProductCopy,
} from "@/lib/productI18n";

export interface ProductDefinition {
  id: number;
  price: number;
  /** Primary image key (used for shop grid + cart thumbnails). */
  primaryImage: ProductImageKey;
  /** Optional alternate image used on the product detail gallery. */
  detailImage?: ProductImageKey;
  /** Category id — resolved to an i18n label via `getCategoryLabelKey`. */
  category: string;
  rating: number;
  reviews: number;
  /** Available sizes — empty array means size-less product. */
  sizes: readonly string[];
  /** Stripe price `lookup_key`. `null` ⇒ not yet wired into payments. */
  stripePriceId: string | null;
}

const SIZES_XS_XL  = ["XS", "S", "M", "L", "XL"]            as const;
const SIZES_XS_XXL = ["XS", "S", "M", "L", "XL", "XXL"]     as const;
const SIZES_S_XXL  = ["S", "M", "L", "XL", "XXL"]           as const;

/** Single source of truth — order here drives the shop grid. */
export const PRODUCTS: readonly ProductDefinition[] = [
  // Tennis
  { id: 3,  price: 79.99,  primaryImage: "tennis-outfit",     detailImage: "tennis-outfit-detail",     category: "tennis",     rating: 4.7, reviews: 189, sizes: SIZES_XS_XL,  stripePriceId: "tennis_outfit_price" },
  { id: 20, price: 64.99,  primaryImage: "tennis-polo",       category: "tennis",     rating: 4.6, reviews: 142, sizes: SIZES_XS_XXL, stripePriceId: "tennis_polo_price" },
  { id: 28, price: 59.99,  primaryImage: "tennis-skort",      category: "tennis",     rating: 4.7, reviews: 164, sizes: SIZES_XS_XL,  stripePriceId: "tennis_skort_price" },
  // Padel
  { id: 29, price: 62.99,  primaryImage: "padel-shirt",       category: "padel",      rating: 4.7, reviews: 118, sizes: SIZES_XS_XL,  stripePriceId: "padel_shirt_price" },
  { id: 30, price: 57.99,  primaryImage: "padel-skort",       category: "padel",      rating: 4.6, reviews: 96,  sizes: SIZES_XS_XL,  stripePriceId: "padel_skort_price" },
  { id: 31, price: 94.99,  primaryImage: "padel-jacket",      category: "padel",      rating: 4.8, reviews: 87,  sizes: SIZES_XS_XXL, stripePriceId: "padel_jacket_price" },
  // Football
  { id: 7,  price: 79.99,  primaryImage: "football-jersey",   detailImage: "football-jersey-detail",   category: "football",   rating: 4.8, reviews: 445, sizes: SIZES_S_XXL,  stripePriceId: "football_jersey_price" },
  { id: 9,  price: 49.99,  primaryImage: "football-shorts",   detailImage: "football-shorts-detail",   category: "football",   rating: 4.7, reviews: 312, sizes: SIZES_S_XXL,  stripePriceId: "football_shorts_price" },
  { id: 21, price: 94.99,  primaryImage: "goalkeeper-jersey", category: "football",   rating: 4.9, reviews: 198, sizes: SIZES_S_XXL,  stripePriceId: "goalkeeper_jersey_price" },
  // Basketball
  { id: 11, price: 89.99,  primaryImage: "basketball-jersey", detailImage: "basketball-jersey-detail", category: "basketball", rating: 4.8, reviews: 387, sizes: SIZES_S_XXL,  stripePriceId: "basketball_jersey_price" },
  { id: 22, price: 54.99,  primaryImage: "basketball-shorts", category: "basketball", rating: 4.7, reviews: 256, sizes: SIZES_S_XXL,  stripePriceId: "basketball_shorts_price" },
  { id: 32, price: 64.99,  primaryImage: "basketball-shooter",category: "basketball", rating: 4.6, reviews: 143, sizes: SIZES_S_XXL,  stripePriceId: "basketball_shooter_price" },
  // Handball
  { id: 12, price: 69.99,  primaryImage: "handball-jersey",   detailImage: "handball-jersey-detail",   category: "handball",   rating: 4.7, reviews: 234, sizes: SIZES_S_XXL,  stripePriceId: "handball_jersey_price" },
  { id: 33, price: 51.99,  primaryImage: "handball-shorts",   category: "handball",   rating: 4.6, reviews: 121, sizes: SIZES_S_XXL,  stripePriceId: "handball_shorts_price" },
  { id: 34, price: 84.99,  primaryImage: "handball-jacket",   category: "handball",   rating: 4.7, reviews: 92,  sizes: SIZES_S_XXL,  stripePriceId: "handball_jacket_price" },
  // Cycling
  { id: 14, price: 109.99, primaryImage: "cycling-jersey",    detailImage: "cycling-jersey-detail",    category: "cycling",    rating: 4.8, reviews: 276, sizes: SIZES_XS_XXL, stripePriceId: "cycling_jersey_price" },
  { id: 16, price: 99.99,  primaryImage: "cycling-shorts",    detailImage: "cycling-shorts-detail",    category: "cycling",    rating: 4.7, reviews: 289, sizes: SIZES_XS_XXL, stripePriceId: "cycling_shorts_price" },
  { id: 23, price: 129.99, primaryImage: "cycling-jacket",    category: "cycling",    rating: 4.8, reviews: 167, sizes: SIZES_XS_XXL, stripePriceId: "cycling_jacket_price" },
  // Running
  { id: 24, price: 44.99,  primaryImage: "running-tank",      category: "running",    rating: 4.6, reviews: 203, sizes: SIZES_XS_XL,  stripePriceId: "running_tank_price" },
  { id: 25, price: 74.99,  primaryImage: "running-leggings",  category: "running",    rating: 4.8, reviews: 312, sizes: SIZES_XS_XL,  stripePriceId: "running_leggings_price" },
  { id: 35, price: 58.99,  primaryImage: "running-longsleeve",category: "running",    rating: 4.7, reviews: 154, sizes: SIZES_XS_XL,  stripePriceId: "running_longsleeve_price" },
  // Gym & yoga
  { id: 18, price: 59.99,  primaryImage: "gym-shirt",         detailImage: "gym-shirt-detail",         category: "gym",        rating: 4.7, reviews: 334, sizes: SIZES_S_XXL,  stripePriceId: "gym_shirt_price" },
  { id: 26, price: 89.99,  primaryImage: "gym-hoodie",        category: "gym",        rating: 4.8, reviews: 421, sizes: SIZES_S_XXL,  stripePriceId: "gym_hoodie_price" },
  { id: 27, price: 49.99,  primaryImage: "yoga-bra",          category: "gym",        rating: 4.7, reviews: 287, sizes: SIZES_XS_XL,  stripePriceId: "yoga_bra_price" },
  // Airsoft / tactical
  { id: 36, price: 72.99,  primaryImage: "airsoft-shirt",     category: "airsoft",    rating: 4.7, reviews: 108, sizes: SIZES_S_XXL,  stripePriceId: "airsoft_shirt_price" },
  { id: 37, price: 89.99,  primaryImage: "airsoft-pants",     category: "airsoft",    rating: 4.8, reviews: 99,  sizes: SIZES_S_XXL,  stripePriceId: null /* product not yet created */ },
  { id: 38, price: 119.99, primaryImage: "airsoft-jacket",    category: "airsoft",    rating: 4.8, reviews: 76,  sizes: SIZES_S_XXL,  stripePriceId: null /* product not yet created */ },
];

/** id → definition map (built once at module load). */
const BY_ID = new Map<number, ProductDefinition>(
  PRODUCTS.map((p) => [p.id, p]),
);

/** All known product ids — used for the sitemap & enumeration. */
export const PRODUCT_IDS: readonly number[] = PRODUCTS.map((p) => p.id);

export const getProductDefinition = (id: number): ProductDefinition | undefined =>
  BY_ID.get(id);

/**
 * Resolved view of a product for a given language + theme.
 * Returns `null` when the id is unknown so callers can render a 404.
 */
export interface ResolvedProduct {
  id: number;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  sizes: readonly string[];
  stripePriceId: string | null;
  /** Localised + theme-aware copy. */
  copy: ProductCopy;
  /** i18n key for the category label (theme-aware: airsoft → winterSports on avalanche). */
  categoryLabelKey: string;
  /** Theme-resolved image URLs. `images[0]` is the primary, `images[1]` the detail (fallback to primary). */
  images: [string, string];
}

export const resolveProduct = (
  id: number,
  language: Lang,
  theme: Theme,
): ResolvedProduct | null => {
  const def = BY_ID.get(id);
  if (!def) return null;
  const primary = getProductImage(def.primaryImage, theme);
  const detail = def.detailImage
    ? getProductImage(def.detailImage, theme)
    : primary;
  return {
    id: def.id,
    price: def.price,
    category: def.category,
    rating: def.rating,
    reviews: def.reviews,
    sizes: def.sizes,
    stripePriceId: def.stripePriceId,
    copy: getProductCopy(def.id, language, theme),
    categoryLabelKey: getCategoryLabelKey(def.category, theme),
    images: [primary, detail],
  };
};

/** Backwards-compatible accessors, now sourced from the registry. */
export const getSizesFor = (id: number): readonly string[] =>
  BY_ID.get(id)?.sizes ?? ["S", "M", "L", "XL"];

export const getStripePriceIdFor = (id: number): string | undefined =>
  BY_ID.get(id)?.stripePriceId ?? undefined;
