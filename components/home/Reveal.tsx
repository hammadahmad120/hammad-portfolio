"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const motionTags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof motionTags;
};

/** Fades and lifts content into view the first time it scrolls on screen. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motionTags[as];

  return (
    <Component
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
