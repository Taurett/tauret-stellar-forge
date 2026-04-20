// Maps product id (numeric) -> Stripe price ID (lookup_key)
// Keep in sync with productsData in src/pages/ProductDetail.tsx
export const productPriceIdMap: Record<number, string> = {
  3: "tennis_outfit_price",
  20: "tennis_polo_price",
  28: "tennis_skort_price",
  29: "padel_shirt_price",
  30: "padel_skort_price",
  31: "padel_jacket_price",
  7: "football_jersey_price",
  9: "football_shorts_price",
  21: "goalkeeper_jersey_price",
  11: "basketball_jersey_price",
  22: "basketball_shorts_price",
  32: "basketball_shooter_price",
  12: "handball_jersey_price",
  33: "handball_shorts_price",
  34: "handball_jacket_price",
  14: "cycling_jersey_price",
  16: "cycling_shorts_price",
  23: "cycling_jacket_price",
  24: "running_tank_price",
  25: "running_leggings_price",
  35: "running_longsleeve_price",
  18: "gym_shirt_price",
  26: "gym_hoodie_price",
  27: "yoga_bra_price",
  36: "airsoft_shirt_price",
  // 37 (airsoft pants) and 38 (airsoft jacket) — products not yet created in payment system
};

export function getStripePriceId(productId: number): string | undefined {
  return productPriceIdMap[productId];
}
