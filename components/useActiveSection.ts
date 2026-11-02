"use client";

import { useEffect, useState } from "react";

/**
 * Scroll spy: returns the id of the section currently in view, or null above the
 * first one. A section counts as current once its top passes the navbar plus a
 * third of the viewport; at the very bottom the last section wins so it can be
 * reached even when it is shorter than a screen.
 */
export function useActiveSection(
  ids: readonly string[],
  enabled: boolean,
): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
        setActive(ids[ids.length - 1] ?? null);
        return;
      }
      const line = 64 + window.innerHeight / 3;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids, enabled]);

  return active;
}
