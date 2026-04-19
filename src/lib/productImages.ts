// Maps product image filenames to their per-theme variants.

import type { Theme } from "@/contexts/ThemeContext";

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
import tennisSkortC from "@/assets/products/tennis-skort.jpg";
import padelShirtC from "@/assets/products/padel-shirt.jpg";
import padelSkortC from "@/assets/products/padel-skort.jpg";
import padelJacketC from "@/assets/products/padel-jacket.jpg";
import basketballShooterC from "@/assets/products/basketball-shooter.jpg";
import handballShortsC from "@/assets/products/handball-shorts.jpg";
import handballJacketC from "@/assets/products/handball-jacket.jpg";
import runningLongsleeveC from "@/assets/products/running-longsleeve.jpg";
import airsoftShirtC from "@/assets/products/airsoft-shirt.jpg";
import airsoftPantsC from "@/assets/products/airsoft-pants.jpg";
import airsoftJacketC from "@/assets/products/airsoft-jacket.jpg";

import tennisOutfitDetailC from "@/assets/products/tennis-outfit-detail.jpg";
import footballJerseyDetailC from "@/assets/products/football-jersey-detail.jpg";
import footballShortsDetailC from "@/assets/products/football-shorts-detail.jpg";
import basketballJerseyDetailC from "@/assets/products/basketball-jersey-detail.jpg";
import handballJerseyDetailC from "@/assets/products/handball-jersey-detail.jpg";
import cyclingJerseyDetailC from "@/assets/products/cycling-jersey-detail.jpg";
import cyclingShortsDetailC from "@/assets/products/cycling-shorts-detail.jpg";
import gymShirtDetailC from "@/assets/products/gym-shirt-detail.jpg";

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
import tennisSkortW from "@/assets/products/wimbledon/tennis-skort.jpg";
import padelShirtW from "@/assets/products/wimbledon/padel-shirt.jpg";
import padelSkortW from "@/assets/products/wimbledon/padel-skort.jpg";
import padelJacketW from "@/assets/products/wimbledon/padel-jacket.jpg";
import basketballShooterW from "@/assets/products/wimbledon/basketball-shooter.jpg";
import handballShortsW from "@/assets/products/wimbledon/handball-shorts.jpg";
import handballJacketW from "@/assets/products/wimbledon/handball-jacket.jpg";
import runningLongsleeveW from "@/assets/products/wimbledon/running-longsleeve.jpg";
import airsoftShirtW from "@/assets/products/wimbledon/airsoft-shirt.jpg";
import airsoftPantsW from "@/assets/products/wimbledon/airsoft-pants.jpg";
import airsoftJacketW from "@/assets/products/wimbledon/airsoft-jacket.jpg";

import tennisOutfitA from "@/assets/products/arid/tennis-outfit.jpg";
import tennisPoloA from "@/assets/products/arid/tennis-polo.jpg";
import footballJerseyA from "@/assets/products/arid/football-jersey.jpg";
import footballShortsA from "@/assets/products/arid/football-shorts.jpg";
import goalkeeperJerseyA from "@/assets/products/arid/goalkeeper-jersey.jpg";
import basketballJerseyA from "@/assets/products/arid/basketball-jersey.jpg";
import basketballShortsA from "@/assets/products/arid/basketball-shorts.jpg";
import handballJerseyA from "@/assets/products/arid/handball-jersey.jpg";
import cyclingJerseyA from "@/assets/products/arid/cycling-jersey.jpg";
import cyclingShortsA from "@/assets/products/arid/cycling-shorts.jpg";
import cyclingJacketA from "@/assets/products/arid/cycling-jacket.jpg";
import runningTankA from "@/assets/products/arid/running-tank.jpg";
import runningLeggingsA from "@/assets/products/arid/running-leggings.jpg";
import gymShirtA from "@/assets/products/arid/gym-shirt.jpg";
import gymHoodieA from "@/assets/products/arid/gym-hoodie.jpg";
import yogaBraA from "@/assets/products/arid/yoga-bra.jpg";
import tennisSkortA from "@/assets/products/arid/tennis-skort.jpg";
import padelShirtA from "@/assets/products/arid/padel-shirt.jpg";
import padelSkortA from "@/assets/products/arid/padel-skort.jpg";
import padelJacketA from "@/assets/products/arid/padel-jacket.jpg";
import basketballShooterA from "@/assets/products/arid/basketball-shooter.jpg";
import handballShortsA from "@/assets/products/arid/handball-shorts.jpg";
import handballJacketA from "@/assets/products/arid/handball-jacket.jpg";
import runningLongsleeveA from "@/assets/products/arid/running-longsleeve.jpg";
import airsoftShirtA from "@/assets/products/arid/airsoft-shirt.jpg";
import airsoftPantsA from "@/assets/products/arid/airsoft-pants.jpg";
import airsoftJacketA from "@/assets/products/arid/airsoft-jacket.jpg";

import tennisOutfitM from "@/assets/products/military/tennis-outfit.jpg";
import tennisPoloM from "@/assets/products/military/tennis-polo.jpg";
import footballJerseyM from "@/assets/products/military/football-jersey.jpg";
import footballShortsM from "@/assets/products/military/football-shorts.jpg";
import goalkeeperJerseyM from "@/assets/products/military/goalkeeper-jersey.jpg";
import basketballJerseyM from "@/assets/products/military/basketball-jersey.jpg";
import basketballShortsM from "@/assets/products/military/basketball-shorts.jpg";
import handballJerseyM from "@/assets/products/military/handball-jersey.jpg";
import cyclingJerseyM from "@/assets/products/military/cycling-jersey.jpg";
import cyclingShortsM from "@/assets/products/military/cycling-shorts.jpg";
import cyclingJacketM from "@/assets/products/military/cycling-jacket.jpg";
import runningTankM from "@/assets/products/military/running-tank.jpg";
import runningLeggingsM from "@/assets/products/military/running-leggings.jpg";
import gymShirtM from "@/assets/products/military/gym-shirt.jpg";
import gymHoodieM from "@/assets/products/military/gym-hoodie.jpg";
import yogaBraM from "@/assets/products/military/yoga-bra.jpg";
import tennisSkortM from "@/assets/products/military/tennis-skort.jpg";
import padelShirtM from "@/assets/products/military/padel-shirt.jpg";
import padelSkortM from "@/assets/products/military/padel-skort.jpg";
import padelJacketM from "@/assets/products/military/padel-jacket.jpg";
import basketballShooterM from "@/assets/products/military/basketball-shooter.jpg";
import handballShortsM from "@/assets/products/military/handball-shorts.jpg";
import handballJacketM from "@/assets/products/military/handball-jacket.jpg";
import runningLongsleeveM from "@/assets/products/military/running-longsleeve.jpg";
import airsoftShirtM from "@/assets/products/military/airsoft-shirt.jpg";
import airsoftPantsM from "@/assets/products/military/airsoft-pants.jpg";
import airsoftJacketM from "@/assets/products/military/airsoft-jacket.jpg";

import tennisOutfitR from "@/assets/products/retro/tennis-outfit.jpg";
import tennisPoloR from "@/assets/products/retro/tennis-polo.jpg";
import footballJerseyR from "@/assets/products/retro/football-jersey.jpg";
import footballShortsR from "@/assets/products/retro/football-shorts.jpg";
import goalkeeperJerseyR from "@/assets/products/retro/goalkeeper-jersey.jpg";
import basketballJerseyR from "@/assets/products/retro/basketball-jersey.jpg";
import basketballShortsR from "@/assets/products/retro/basketball-shorts.jpg";
import handballJerseyR from "@/assets/products/retro/handball-jersey.jpg";
import cyclingJerseyR from "@/assets/products/retro/cycling-jersey.jpg";
import cyclingShortsR from "@/assets/products/retro/cycling-shorts.jpg";
import cyclingJacketR from "@/assets/products/retro/cycling-jacket.jpg";
import runningTankR from "@/assets/products/retro/running-tank.jpg";
import runningLeggingsR from "@/assets/products/retro/running-leggings.jpg";
import gymShirtR from "@/assets/products/retro/gym-shirt.jpg";
import gymHoodieR from "@/assets/products/retro/gym-hoodie.jpg";
import yogaBraR from "@/assets/products/retro/yoga-bra.jpg";
import tennisSkortR from "@/assets/products/retro/tennis-skort.jpg";
import padelShirtR from "@/assets/products/retro/padel-shirt.jpg";
import padelSkortR from "@/assets/products/retro/padel-skort.jpg";
import padelJacketR from "@/assets/products/retro/padel-jacket.jpg";
import basketballShooterR from "@/assets/products/retro/basketball-shooter.jpg";
import handballShortsR from "@/assets/products/retro/handball-shorts.jpg";
import handballJacketR from "@/assets/products/retro/handball-jacket.jpg";
import runningLongsleeveR from "@/assets/products/retro/running-longsleeve.jpg";
import airsoftShirtR from "@/assets/products/retro/airsoft-shirt.jpg";
import airsoftPantsR from "@/assets/products/retro/airsoft-pants.jpg";
import airsoftJacketR from "@/assets/products/retro/airsoft-jacket.jpg";

export type ProductImageKey =
  | "tennis-outfit" | "tennis-outfit-detail" | "tennis-skort"
  | "tennis-polo"
  | "padel-shirt" | "padel-skort" | "padel-jacket"
  | "football-jersey" | "football-jersey-detail"
  | "football-shorts" | "football-shorts-detail"
  | "goalkeeper-jersey"
  | "basketball-jersey" | "basketball-jersey-detail" | "basketball-shooter"
  | "basketball-shorts"
  | "handball-jersey" | "handball-jersey-detail" | "handball-shorts" | "handball-jacket"
  | "cycling-jersey" | "cycling-jersey-detail"
  | "cycling-shorts" | "cycling-shorts-detail"
  | "cycling-jacket"
  | "running-tank" | "running-leggings" | "running-longsleeve"
  | "gym-shirt" | "gym-shirt-detail"
  | "gym-hoodie"
  | "yoga-bra"
  | "airsoft-shirt" | "airsoft-pants" | "airsoft-jacket";

const cyberMap: Record<ProductImageKey, string> = {
  "tennis-outfit": tennisOutfitC,
  "tennis-outfit-detail": tennisOutfitDetailC,
  "tennis-skort": tennisSkortC,
  "tennis-polo": tennisPoloC,
  "padel-shirt": padelShirtC,
  "padel-skort": padelSkortC,
  "padel-jacket": padelJacketC,
  "football-jersey": footballJerseyC,
  "football-jersey-detail": footballJerseyDetailC,
  "football-shorts": footballShortsC,
  "football-shorts-detail": footballShortsDetailC,
  "goalkeeper-jersey": goalkeeperJerseyC,
  "basketball-jersey": basketballJerseyC,
  "basketball-jersey-detail": basketballJerseyDetailC,
  "basketball-shooter": basketballShooterC,
  "basketball-shorts": basketballShortsC,
  "handball-jersey": handballJerseyC,
  "handball-jersey-detail": handballJerseyDetailC,
  "handball-shorts": handballShortsC,
  "handball-jacket": handballJacketC,
  "cycling-jersey": cyclingJerseyC,
  "cycling-jersey-detail": cyclingJerseyDetailC,
  "cycling-shorts": cyclingShortsC,
  "cycling-shorts-detail": cyclingShortsDetailC,
  "cycling-jacket": cyclingJacketC,
  "running-tank": runningTankC,
  "running-leggings": runningLeggingsC,
  "running-longsleeve": runningLongsleeveC,
  "gym-shirt": gymShirtC,
  "gym-shirt-detail": gymShirtDetailC,
  "gym-hoodie": gymHoodieC,
  "yoga-bra": yogaBraC,
  "airsoft-shirt": airsoftShirtC,
  "airsoft-pants": airsoftPantsC,
  "airsoft-jacket": airsoftJacketC,
};

const wimbledonMap: Record<ProductImageKey, string> = {
  "tennis-outfit": tennisOutfitW,
  "tennis-outfit-detail": tennisOutfitW,
  "tennis-skort": tennisSkortW,
  "tennis-polo": tennisPoloW,
  "padel-shirt": padelShirtW,
  "padel-skort": padelSkortW,
  "padel-jacket": padelJacketW,
  "football-jersey": footballJerseyW,
  "football-jersey-detail": footballJerseyW,
  "football-shorts": footballShortsW,
  "football-shorts-detail": footballShortsW,
  "goalkeeper-jersey": goalkeeperJerseyW,
  "basketball-jersey": basketballJerseyW,
  "basketball-jersey-detail": basketballJerseyW,
  "basketball-shooter": basketballShooterW,
  "basketball-shorts": basketballShortsW,
  "handball-jersey": handballJerseyW,
  "handball-jersey-detail": handballJerseyW,
  "handball-shorts": handballShortsW,
  "handball-jacket": handballJacketW,
  "cycling-jersey": cyclingJerseyW,
  "cycling-jersey-detail": cyclingJerseyW,
  "cycling-shorts": cyclingShortsW,
  "cycling-shorts-detail": cyclingShortsW,
  "cycling-jacket": cyclingJacketW,
  "running-tank": runningTankW,
  "running-leggings": runningLeggingsW,
  "running-longsleeve": runningLongsleeveW,
  "gym-shirt": gymShirtW,
  "gym-shirt-detail": gymShirtW,
  "gym-hoodie": gymHoodieW,
  "yoga-bra": yogaBraW,
  "airsoft-shirt": airsoftShirtW,
  "airsoft-pants": airsoftPantsW,
  "airsoft-jacket": airsoftJacketW,
};

const aridMap: Record<ProductImageKey, string> = {
  "tennis-outfit": tennisOutfitA,
  "tennis-outfit-detail": tennisOutfitA,
  "tennis-skort": tennisSkortA,
  "tennis-polo": tennisPoloA,
  "padel-shirt": padelShirtA,
  "padel-skort": padelSkortA,
  "padel-jacket": padelJacketA,
  "football-jersey": footballJerseyA,
  "football-jersey-detail": footballJerseyA,
  "football-shorts": footballShortsA,
  "football-shorts-detail": footballShortsA,
  "goalkeeper-jersey": goalkeeperJerseyA,
  "basketball-jersey": basketballJerseyA,
  "basketball-jersey-detail": basketballJerseyA,
  "basketball-shooter": basketballShooterA,
  "basketball-shorts": basketballShortsA,
  "handball-jersey": handballJerseyA,
  "handball-jersey-detail": handballJerseyA,
  "handball-shorts": handballShortsA,
  "handball-jacket": handballJacketA,
  "cycling-jersey": cyclingJerseyA,
  "cycling-jersey-detail": cyclingJerseyA,
  "cycling-shorts": cyclingShortsA,
  "cycling-shorts-detail": cyclingShortsA,
  "cycling-jacket": cyclingJacketA,
  "running-tank": runningTankA,
  "running-leggings": runningLeggingsA,
  "running-longsleeve": runningLongsleeveA,
  "gym-shirt": gymShirtA,
  "gym-shirt-detail": gymShirtA,
  "gym-hoodie": gymHoodieA,
  "yoga-bra": yogaBraA,
  "airsoft-shirt": airsoftShirtA,
  "airsoft-pants": airsoftPantsA,
  "airsoft-jacket": airsoftJacketA,
};

const militaryMap: Record<ProductImageKey, string> = {
  "tennis-outfit": tennisOutfitM,
  "tennis-outfit-detail": tennisOutfitM,
  "tennis-skort": tennisSkortM,
  "tennis-polo": tennisPoloM,
  "padel-shirt": padelShirtM,
  "padel-skort": padelSkortM,
  "padel-jacket": padelJacketM,
  "football-jersey": footballJerseyM,
  "football-jersey-detail": footballJerseyM,
  "football-shorts": footballShortsM,
  "football-shorts-detail": footballShortsM,
  "goalkeeper-jersey": goalkeeperJerseyM,
  "basketball-jersey": basketballJerseyM,
  "basketball-jersey-detail": basketballJerseyM,
  "basketball-shooter": basketballShooterM,
  "basketball-shorts": basketballShortsM,
  "handball-jersey": handballJerseyM,
  "handball-jersey-detail": handballJerseyM,
  "handball-shorts": handballShortsM,
  "handball-jacket": handballJacketM,
  "cycling-jersey": cyclingJerseyM,
  "cycling-jersey-detail": cyclingJerseyM,
  "cycling-shorts": cyclingShortsM,
  "cycling-shorts-detail": cyclingShortsM,
  "cycling-jacket": cyclingJacketM,
  "running-tank": runningTankM,
  "running-leggings": runningLeggingsM,
  "running-longsleeve": runningLongsleeveM,
  "gym-shirt": gymShirtM,
  "gym-shirt-detail": gymShirtM,
  "gym-hoodie": gymHoodieM,
  "yoga-bra": yogaBraM,
  "airsoft-shirt": airsoftShirtM,
  "airsoft-pants": airsoftPantsM,
  "airsoft-jacket": airsoftJacketM,
};

const retroMap: Record<ProductImageKey, string> = {
  "tennis-outfit": tennisOutfitR,
  "tennis-outfit-detail": tennisOutfitR,
  "tennis-skort": tennisSkortR,
  "tennis-polo": tennisPoloR,
  "padel-shirt": padelShirtR,
  "padel-skort": padelSkortR,
  "padel-jacket": padelJacketR,
  "football-jersey": footballJerseyR,
  "football-jersey-detail": footballJerseyR,
  "football-shorts": footballShortsR,
  "football-shorts-detail": footballShortsR,
  "goalkeeper-jersey": goalkeeperJerseyR,
  "basketball-jersey": basketballJerseyR,
  "basketball-jersey-detail": basketballJerseyR,
  "basketball-shooter": basketballShooterR,
  "basketball-shorts": basketballShortsR,
  "handball-jersey": handballJerseyR,
  "handball-jersey-detail": handballJerseyR,
  "handball-shorts": handballShortsR,
  "handball-jacket": handballJacketR,
  "cycling-jersey": cyclingJerseyR,
  "cycling-jersey-detail": cyclingJerseyR,
  "cycling-shorts": cyclingShortsR,
  "cycling-shorts-detail": cyclingShortsR,
  "cycling-jacket": cyclingJacketR,
  "running-tank": runningTankR,
  "running-leggings": runningLeggingsR,
  "running-longsleeve": runningLongsleeveR,
  "gym-shirt": gymShirtR,
  "gym-shirt-detail": gymShirtR,
  "gym-hoodie": gymHoodieR,
  "yoga-bra": yogaBraR,
  "airsoft-shirt": airsoftShirtR,
  "airsoft-pants": airsoftPantsR,
  "airsoft-jacket": airsoftJacketR,
};

export const getProductImage = (key: ProductImageKey, theme: Theme): string => {
  if (theme === "wimbledon") return wimbledonMap[key];
  if (theme === "arid") return aridMap[key];
  if (theme === "military") return militaryMap[key];
  if (theme === "retro") return retroMap[key];
  return cyberMap[key];
};