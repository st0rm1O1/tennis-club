"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { easeOutQuart } from "@/lib/motion";

export default function WordFade({
  text,
  className,
  wordClassName = "",
  stagger = 28,
  delayIn = 250,
  duration = 700,
  ease = easeOutQuart,
  amount = 0.3,
}) {
  const words = String(text).split(" ");
  const wordVariants = {
    hidden: { opacity: 0, y: 18 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: duration / 1000,
        ease,
        delay: delayIn / 1000 + i * (stagger / 1000),
      },
    }),
  };

  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: {} }}
      className={className}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={wordVariants}
            custom={i}
          >
            {word}
          </motion.span>{" "}
        </Fragment>
      ))}
    </motion.p>
  );
}