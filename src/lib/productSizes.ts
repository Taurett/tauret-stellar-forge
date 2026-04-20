// Single source of truth for available sizes per product id.
// Keep in sync with the Stripe catalog; used by Shop and ProductDetail.
const productSizes: Record<number, string[]> = {
  3: ["XS", "S", "M", "L", "XL"],
  20: ["XS", "S", "M", "L", "XL", "XXL"],
  28: ["XS", "S", "M", "L", "XL"],
  29: ["XS", "S", "M", "L", "XL"],
  30: ["XS", "S", "M", "L", "XL"],
  31: ["XS", "S", "M", "L", "XL", "XXL"],
  7: ["S", "M", "L", "XL", "XXL"],
  9: ["S", "M", "L", "XL", "XXL"],
  21: ["S", "M", "L", "XL", "XXL"],
  11: ["S", "M", "L", "XL", "XXL"],
  22: ["S", "M", "L", "XL", "XXL"],
  32: ["S", "M", "L", "XL", "XXL"],
  12: ["S", "M", "L", "XL", "XXL"],
  33: ["S", "M", "L", "XL", "XXL"],
  34: ["S", "M", "L", "XL", "XXL"],
  14: ["XS", "S", "M", "L", "XL", "XXL"],
  16: ["XS", "S", "M", "L", "XL", "XXL"],
  23: ["XS", "S", "M", "L", "XL", "XXL"],
  24: ["XS", "S", "M", "L", "XL"],
  25: ["XS", "S", "M", "L", "XL"],
  35: ["XS", "S", "M", "L", "XL"],
  18: ["S", "M", "L", "XL", "XXL"],
  26: ["S", "M", "L", "XL", "XXL"],
  27: ["XS", "S", "M", "L", "XL"],
  36: ["S", "M", "L", "XL", "XXL"],
  37: ["S", "M", "L", "XL", "XXL"],
  38: ["S", "M", "L", "XL", "XXL"],
};

const FALLBACK_SIZES = ["S", "M", "L", "XL"];

export const getSizesFor = (id: number): string[] =>
  productSizes[id] ?? FALLBACK_SIZES;
