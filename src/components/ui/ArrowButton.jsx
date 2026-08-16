"use client";

import { motion } from "motion/react";
import { ArrowIcon } from "./icons";
import { spring } from "@/lib/motion";
import { useHoverEnabled } from "@/components/motion/useHoverEnabled";

const VARIANTS = {
  outline: "border-hairline bg-transparent text-ink hover:border-ink",
  solid: "border-ink bg-ink text-white hover:border-brand-deep hover:bg-brand-deep",
};

export default function ArrowButton({
  direction = "next",
  variant = "outline",
  onClick,
  label,
  className = "",
}) {
  const enabled = useHoverEnabled();
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid size-12 place-items-center rounded-pill border transition-colors duration-200 sm:size-14 ${VARIANTS[variant]} ${className}`}
    >
      <motion.span
        whileHover={enabled ? { scale: 1.15 } : undefined}
        transition={spring({ tension: 320, friction: 18 })}
        className="inline-flex"
      >
        <ArrowIcon className={`size-5 ${isPrev ? "-scale-x-100" : ""}`} />
      </motion.span>
    </button>
  );
}