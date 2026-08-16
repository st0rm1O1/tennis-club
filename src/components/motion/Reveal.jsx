"use client";

import { motion } from "motion/react";
import { spring, VIEWPORT_ONCE } from "@/lib/motion";

const DEFAULTS = { opacity: 0 };

export default function Reveal({
  children,
  className,
  from = {},
  to = {},
  delayIn = 0,
  config = { tension: 170, friction: 26 },
  viewport = VIEWPORT_ONCE,
  ...rest
}) {
  const initial = { ...DEFAULTS, ...from };
  const target = { opacity: 1, y: 0, scale: 1, ...to };
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={target}
      viewport={viewport}
      transition={{ ...spring(config), delay: delayIn }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}