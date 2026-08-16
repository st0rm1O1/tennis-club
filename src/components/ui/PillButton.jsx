"use client";

import { motion } from "motion/react";
import { ArrowIcon } from "./icons";
import { spring } from "@/lib/motion";
import { useHoverEnabled } from "@/components/motion/useHoverEnabled";

const VARIANTS = {
  light: "bg-white text-brand-deep hover:bg-brand-light hover:text-white",
  solid: "bg-ink text-white hover:bg-brand-deep",
  outline: "border border-current text-ink hover:bg-ink hover:text-white",
};

export default function PillButton({
  children,
  variant = "light",
  className = "",
  onClick,
  type = "button",
  arrow = true,
  ...rest
}) {
  const enabled = useHoverEnabled();
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-pill px-7 py-3.5 text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
      {arrow ? (
        <motion.span
          whileHover={enabled ? { x: 5 } : undefined}
          transition={spring({ tension: 320, friction: 20 })}
          className="inline-flex"
        >
          <ArrowIcon className="size-4" />
        </motion.span>
      ) : null}
    </button>
  );
}