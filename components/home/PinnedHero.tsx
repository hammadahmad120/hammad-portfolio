"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

/** Must match the `pin` screen in tailwind.config.ts. */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 780px)";

/**
 * Pins the hero on large, tall viewports and softly blurs and dims it as the
 * About panel scrolls over it, so the hero reads as a backdrop behind the panel.
 * Elsewhere it renders children in normal flow.
 */
export function PinnedHero({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const query = window.matchMedia(PIN_QUERY);
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Settles once the panel has climbed about half the viewport; values are
  // clamped after that so the hero stays as a soft, still-visible backdrop.
  const blur = useTransform(scrollY, [80, 520], [0, 8]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const opacity = useTransform(scrollY, [0, 520], [1, 0.55]);
  const scale = useTransform(scrollY, [0, 520], [1, 0.98]);
  const animate = pinned && !prefersReducedMotion;

  return (
    <motion.div
      className="pin:sticky pin:top-16 pin:z-0"
      style={animate ? { filter, opacity, scale } : undefined}
    >
      {children}
    </motion.div>
  );
}
