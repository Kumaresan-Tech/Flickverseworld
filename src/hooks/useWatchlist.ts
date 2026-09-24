import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "flickverse:watchlist";

let cache: string[] | null = null;
const listeners = new Set<(ids: string[]) => void>();

function read(): string[] {
  if (cache) return cache;
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(ids: string[]) {
  cache = ids;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable — keep in-memory state */
  }
  listeners.forEach((fn) => fn(ids));
}

export function useWatchlist() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(read());
    const listener = (next: string[]) => setIds(next);
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        cache = null;
        setIds(read());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    const current = read();
    write(current.includes(id) ? current.filter((v) => v !== id) : [...current, id]);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((v) => v !== id));
  }, []);

  const clear = useCallback(() => write([]), []);

  return { ids, count: ids.length, has, toggle, remove, clear };
}
