// Maps product image filenames to their per-theme variants.
// Cyber set lives in src/assets/products/*, Wimbledon set in src/assets/products/wimbledon/*.

import type { Theme } from "@/contexts/ThemeContext";

// Cyber (default) imports
import tennisOutfitC from "@/assets/products/tennis-outfit.jpg";
import tennisPoloC from "@/assets/products/tennis-polo.jpg";
import footballJerseyC from "@/assets/products/football-jersey.jpg";
import footballShortsC from "@/assets/products/football-shorts.jpg";
import goalkeeperJerseyC from "@/assets/products/goalkeeper-jersey.jpg";
import basketballJerseyC from "@/assets/products/basketball-jersey.jpg";
import basketballShortsC from "@/assets/products/basketball-shorts.jpg";
import handballJerseyC from "@/assets/products/handball-jersey.jpg";
import cyclingJerseyC from "@/assets/products/cycling-jersey.jpg";
import cyclingShortsC from "@/assets/products/cycling-shorts.jpg";
import cyclingJacketC from "@/assets/products/cycling-jacket.jpg";
import runningTankC from "@/assets/products/running-tank.jpg";
import runningLeggingsC from "@/assets/products/running-leggings.jpg";
import gymShirtC from "@/assets/products/gym-shirt.jpg";
import gymHoodieC from "@/assets/products/gym-hoodie.jpg";
import yogaBraC from "@/assets/products/yoga-bra.jpg";

// Cyber detail imports
import tennisOutfitDetailC from "@/assets/products/tennis-outfit-detail.jpg";
import footballJerseyDetailC from "@/assets/products/football-jersey-detail.jpg";
import footballShortsDetailC from "@/assets/products/football-shorts-detail.jpg";
import basketballJerseyDetailC from "@/assets/products/basketball-jersey-detail.jpg";
import handballJerseyDetailC from "@/assets/products/handball-jersey-detail.jpg";
import cyclingJerseyDetailC from "@/assets/products/cycling-jersey-detail.jpg";
import cyclingShortsDetailC from "@/assets/products/cycling-shorts-detail.jpg";
import gymShirtDetailC from "@/assets/products/gym-shirt-detail.jpg";

// Wimbledon imports
import tennisOutfitW from "@/assets/products/wimbledon/tennis-outfit.jpg";
import tennisPoloW from "@/assets/products/wimbledon/tennis-polo.jpg";
import footballJerseyW from "@/assets/products/wimbledon/football-jersey.jpg";
import footballShortsW from "@/assets/products/wimbledon/football-shorts.jpg";
import goalkeeperJerseyW from "@/assets/products/wimbledon/goalkeeper-jersey.jpg";
import basketballJerseyW from "@/assets/products/wimbledon/basketball-jersey.jpg";
import basketballShortsW from "@/assets/products/wimbledon/basketball-shorts.jpg";
import handballJerseyW from "@/assets/products/wimbledon/handball-jersey.jpg";
import cyclingJerseyW from "@/assets/products/wimbledon/cycling-jersey.jpg";
import cyclingShortsW from "@/assets/products/wimbledon/cycling-shorts.jpg";
import cyclingJacketW from "@/assets/products/wimbledon/cycling-jacket.jpg";
import runningTankW from "@/assets/products/wimbledon/running-tank.jpg";
import runningLeggingsW from "@/assets/products/wimbledon/running-leggings.jpg";
import gymShirtW from "@/assets/products/wimbledon/gym-shirt.jpg";
import gymHoodieW from "@/assets/products/wimbledon/gym-hoodie.jpg";
import yogaBraW from "@/assets/products/wimbledon/yoga-bra.jpg";

export type ProductImageKey =
  | "tennis-outfit" | "tennis-outfit-detail"
  | "tennis-polo"
  | "football-jersey" | "football-jersey-detail"
  | "football-shorts" | "football-shorts-detail"
  | "goalkeeper-jersey"
  | "basketball-jersey" | "basketball-jersey-detail"
  | "basketball-shorts"
  | "handball-jersey" | "handball-jersey-detail"
  | "cycling-jersey" | "cycling-jersey-detail"
  | "cycling-shorts" | "cycling-shorts-detail"
  | "cycling-jacket"
  | "running-tank"
  | "running-leggings"
  | "gym-shirt" | "gym-shirt-detail"
  | "gym-hoodie"
  | "yoga-bra";

const cyberMap: Record<ProductImageKey, string> = {
  "tennis-outfit": tennisOutfitC,
  "tennis-outfit-detail": tennisOutfitDetailC,
  "tennis-polo": tennisPoloC,
  "football-jersey": footballJerseyC,
  "football-jersey-detail": footballJerseyDetailC,
  "football-shorts": footballShortsC,
  "football-shorts-detail": footballShortsDetailC,
  "goalkeeper-jersey": goalkeeperJerseyC,
  "basketball-jersey": basketballJerseyC,
  "basketball-jersey-detail": basketballJerseyDetailC,
  "basketball-shorts": basketballShortsC,
  "handball-jersey": handballJerseyC,
  "handball-jersey-detail": handballJerseyDetailC,
  "cycling-jersey": cyclingJerseyC,
  "cycling-jersey-detail": cyclingJerseyDetailC,
  "cycling-shorts": cyclingShortsC,
  "cycling-shorts-detail": cyclingShortsDetailC,
  "cycling-jacket": cyclingJacketC,
  "running-tank": runningTankC,
  "running-leggings": runningLeggingsC,
  "gym-shirt": gymShirtC,
  "gym-shirt-detail": gymShirtDetailC,
  "gym-hoodie": gymHoodieC,
  "yoga-bra": yogaBraC,
};

// Wimbledon set re-uses the same image for the "detail" view since we only generated one per product.
const wimbledonMap: Record<ProductImageKey, string> = {
  "tennis-outfit": tennisOutfitW,
  "tennis-outfit-detail": tennisOutfitW,
  "tennis-polo": tennisPoloW,
  "football-jersey": footballJerseyW,
  "football-jersey-detail": footballJerseyW,
  "football-shorts": footballShortsW,
  "football-shorts-detail": footballShortsW,
  "goalkeeper-jersey": goalkeeperJerseyW,
  "basketball-jersey": basketballJerseyW,
  "basketball-jersey-detail": basketballJerseyW,
  "basketball-shorts": basketballShortsW,
  "handball-jersey": handballJerseyW,
  "handball-jersey-detail": handballJerseyW,
  "cycling-jersey": cyclingJerseyW,
  "cycling-jersey-detail": cyclingJerseyW,
  "cycling-shorts": cyclingShortsW,
  "cycling-shorts-detail": cyclingShortsW,
  "cycling-jacket": cyclingJacketW,
  "running-tank": runningTankW,
  "running-leggings": runningLeggingsW,
  "gym-shirt": gymShirtW,
  "gym-shirt-detail": gymShirtW,
  "gym-hoodie": gymHoodieW,
  "yoga-bra": yogaBraW,
};

export const getProductImage = (key: ProductImageKey, theme: Theme): string => {
  return theme === "wimbledon" ? wimbledonMap[key] : cyberMap[key];
};
