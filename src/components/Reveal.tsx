"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Distance in px the element travels up while fading in. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
};

/**
 * Fade-in + slide-up when the element enters the viewport.
 * Animations are intentionally subtle (small offset, short duration) and are
 * disabled for users who prefer reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const Component =
    as === "li" ? motion.li : as === "span" ? motion.span : motion.div;

  if (prefersReducedMotion) {
    const Static = as === "li" ? "li" : as === "span" ? "span" : "div";
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  /** Stagger between children in seconds. */
  stagger?: number;
};

/** Container that staggers the reveal of its direct children. */
export function RevealStagger({
  children,
  className,
  stagger = 0.08,
}: RevealStaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Child item for <RevealStagger>. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
