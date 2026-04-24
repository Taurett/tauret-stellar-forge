/**
 * useRecentlyViewed — localStorage-backed product browse history.
 * Persists 12 most-recent product ids; exposes track() to push.
 */
import { useCallback, useEffect, useState } from "react";

const KEY = "tauret.recentlyViewed.v1";
const MAX = 12;

const read = (): number[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch { return []; }
};

const write = (ids: number[]) => {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(KEY, JSON.stringify(ids.slice(0, MAX))); } catch { /* ignore */ }
};

export function useRecentlyViewed() {
  const [ids, setIds] = useState<number[]>(() => read());

  // Cross-tab sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setIds(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const track = useCallback((productId: number) => {
    setIds((curr) => {
      const next = [productId, ...curr.filter((id) => id !== productId)].slice(0, MAX);
      write(next);
      return next;
    });
  }, []);

  return { ids, track };
}
