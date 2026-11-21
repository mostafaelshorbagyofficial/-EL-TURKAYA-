"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EDITORIAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Pure-CSS entrance animation for above-the-fold Hero elements.
 * Never traps SSR content at opacity: 0 and does not block LCP on JS hydration.
 */
export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <div
      className={`editorial-fade-in ${className}`}
      style={{ animationDelay: `${Math.round(delay * 1000)}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * Subtle below-the-fold motion enhancement.
 * Uses initial={false} so SSR and static content are always visible (never blank),
 * while still providing restrained GPU-only hover/entrance polish.
 */
export function RevealInView({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay, ease: EDITORIAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
