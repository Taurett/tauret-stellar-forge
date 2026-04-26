/**
 * useCompare — manage the user's compare list (max 4 product ids).
 * Persists to localStorage with cross-tab sync.
 */
import { useCallback, useEffect, useState } from "react";

const KEY = "tauret.compare.v1";
const MAX = 4;

const read = (): number[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number").slice(0, MAX) : [];
  } catch { return []; }
};

const write = (ids: number[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
    // Notify same-tab listeners.
    window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
  } catch { /* ignore */ }
};

export function useCompare() {
  const [ids, setIds] = useState<number[]>(() => read());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setIds(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const has = useCallback((id: number) => ids.includes(id), [ids]);
  const isFull = ids.length >= MAX;

  const add = useCallback((id: number) => {
    setIds((curr) => {
      if (curr.includes(id) || curr.length >= MAX) return curr;
      const next = [...curr, id];
      write(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: number) => {
    setIds((curr) => {
      const next = curr.filter((x) => x !== id);
      write(next);
      return next;
    });
  }, []);

  const toggle = useCallback((id: number): boolean => {
    let added = false;
    setIds((curr) => {
      if (curr.includes(id)) {
        const next = curr.filter((x) => x !== id);
        write(next);
        return next;
      }
      if (curr.length >= MAX) return curr;
      added = true;
      const next = [...curr, id];
      write(next);
      return next;
    });
    return added;
  }, []);

  const clear = useCallback(() => {
    setIds([]);
    write([]);
  }, []);

  return { ids, has, isFull, add, remove, toggle, clear, max: MAX };
}
