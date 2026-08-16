"use client";

import { motion } from "motion/react";
import { spring } from "@/lib/motion";
import { useHoverEnabled } from "./useHoverEnabled";

export default function HoverSpring({
  children,
  className,
  to = {},
  config = { tension: 200, friction: 22 },
  ...rest
}) {
  const enabled = useHoverEnabled();
  return (
    <motion.div
      className={className}
      initial={false}
      whileHover={enabled ? to : undefined}
      transition={spring(config)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}