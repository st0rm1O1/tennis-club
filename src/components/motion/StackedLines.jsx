"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

function StackedLines({
  as: Tag = "div",
  lines = [],
  className,
  lineClassName = "",
  clipClassName = "",
  stagger = 120,
  baseDelay = 0,
  duration = 950,
  ease = easeOutExpo,
  active,
  amount = 0.3,
  ...rest
}) {
  const MotionTag = motion[Tag] || motion.div;
  const gated = active !== undefined;
  const lineVariants = {
    hidden: { y: "115%", opacity: 0 },
    show: (i) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: duration / 1000,
        ease,
        delay: baseDelay / 1000 + i * (stagger / 1000),
      },
    }),
  };

  return (
    <MotionTag
      initial="hidden"
      {...(gated
        ? { animate: active ? "show" : "hidden" }
        : { whileInView: "show", viewport: { once: true, amount } })}
      variants={{ hidden: {}, show: {} }}
      className={className}
      {...rest}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={`block overflow-hidden pb-[0.14em] ${clipClassName}`}
        >
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            variants={lineVariants}
            custom={i}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

function WordReveal({
  words = [],
  className,
  wordClassName = "",
  clipClassName = "",
  stagger = 140,
  baseDelay = 0,
  duration = 1100,
  ease = easeOutExpo,
  active = false,
}) {
  const wordVariants = {
    hidden: { y: "115%", opacity: 0 },
    show: (i) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: duration / 1000,
        ease,
        delay: baseDelay / 1000 + i * (stagger / 1000),
      },
    }),
  };

  return (
    <motion.span
      initial="hidden"
      animate={active ? "show" : "hidden"}
      variants={{ hidden: {}, show: {} }}
      className={className}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className={`inline-block overflow-hidden pb-[0.14em] align-bottom ${clipClassName}`}
          >
            <motion.span
              className={`inline-block will-change-transform ${wordClassName}`}
              variants={wordVariants}
              custom={i}
            >
              {word}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </motion.span>
  );
}

export default StackedLines;
export { WordReveal };