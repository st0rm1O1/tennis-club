"use client";

import { motion } from "motion/react";
import { spring } from "@/lib/motion";

export default function RevealGate({
  children,
  className,
  active = false,
  delayIn = 0,
  from = {},
  to = {},
  config = { tension: 200, friction: 26 },
  ...rest
}) {
  const initial = { opacity: 0, y: 28, ...from };
  const target = { opacity: 1, y: 0, scale: 1, ...to };
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={active ? target : initial}
      transition={{ ...spring(config), delay: active ? delayIn : 0 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}