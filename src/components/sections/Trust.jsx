"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/motion/Reveal";
import ArrowButton from "@/components/ui/ArrowButton";
import CarouselDots from "@/components/ui/CarouselDots";
import { TRUST_SLIDES } from "@/lib/data";
import { easeOutExpo, spring } from "@/lib/motion";

const GHOST_PARALLAX = [
  ["-3%", "3%"],
  ["3%", "-3%"],
  ["-2%", "4%"],
  ["4%", "-3%"],
];

const ghostVariants = {
  hidden: { y: "115%", opacity: 0 },
  show: (i) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: easeOutExpo, delay: 0.05 + i * 0.06 },
  }),
};

function GhostWord({ word, wi, parallax, isInk }) {
  return (
    <motion.span style={{ x: parallax }} className="inline-block">
      <span className="block overflow-hidden pb-[0.12em]">
        <motion.span
          variants={ghostVariants}
          custom={wi}
          className={`block will-change-transform ${
            isInk ? "text-ink" : "text-ghost"
          }`}
        >
          {word}
        </motion.span>
      </span>
    </motion.span>
  );
}

function GhostHeading({ slide, sectionRef, index }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallax = [
    useTransform(scrollYProgress, [0, 1], GHOST_PARALLAX[0]),
    useTransform(scrollYProgress, [0, 1], GHOST_PARALLAX[1]),
    useTransform(scrollYProgress, [0, 1], GHOST_PARALLAX[2]),
    useTransform(scrollYProgress, [0, 1], GHOST_PARALLAX[3]),
  ];

  return (
    <h2
      id="trust-title"
      className="pointer-events-none relative z-0 mx-auto mt-12 max-w-500 select-none text-center text-[8vw] font-medium uppercase leading-[1.02] tracking-tighter"
    >
      <div
        key={index}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: {} }}
        className="flex flex-col"
      >
        <div className="flex justify-between">
          {[0, 1].map((wi) => (
            <GhostWord
              key={wi}
              word={slide.headline[wi]}
              wi={wi}
              parallax={parallax[wi]}
              isInk={wi === 2}
            />
          ))}
        </div>
        <div className="flex justify-between">
          {[2, 3].map((wi) => (
            <GhostWord
              key={wi}
              word={slide.headline[wi]}
              wi={wi}
              parallax={parallax[wi]}
              isInk={wi === 2}
            />
          ))}
        </div>
      </div>
    </h2>
  );
}

export default function Trust() {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const slide = TRUST_SLIDES[index];

  const next = () => setIndex((i) => (i + 1) % TRUST_SLIDES.length);
  const prev = () =>
    setIndex((i) => (i - 1 + TRUST_SLIDES.length) % TRUST_SLIDES.length);

  return (
    <section
      id="trust"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white px-6 py-16 sm:px-10 sm:py-20"
    >
      <div className="relative z-20 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Reveal
          from={{ opacity: 0, scale: 0.9 }}
          to={{ opacity: 1, scale: 1 }}
          config={{ tension: 220, friction: 22 }}
          className="grid size-28 shrink-0 place-items-center rounded-pill bg-surface sm:size-32"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-2xl font-medium">100%</span>
            <span className="max-w-[7em] text-[0.6rem] text-ink-soft">
              Coaching built around your game
            </span>
          </div>
        </Reveal>

        <Reveal
          from={{ opacity: 0, y: 24 }}
          delayIn={0.12}
          config={{ tension: 200, friction: 26 }}
          className="w-full max-w-md"
        >
          <article className="flex flex-col gap-4 rounded-card bg-surface p-5 sm:gap-5 sm:p-6">
            <span className="w-fit rounded-xl bg-white px-4 py-2 text-xl font-medium">
              #01
            </span>
            <h3 className="text-lg font-medium">Trusted by serious players</h3>
            <p className="text-xs leading-relaxed text-ink-soft">
              From first-timers to nationally ranked juniors, players train
              here because the progress shows up on the scoreboard.
            </p>
          </article>
        </Reveal>
      </div>

      <GhostHeading slide={slide} sectionRef={sectionRef} index={index} />

      <div className="relative z-10 mt-16 flex justify-center md:absolute md:left-1/2 md:top-1/2 md:mt-0 md:-translate-x-1/2 md:-translate-y-1/2">
        <Reveal
          from={{ opacity: 0, y: 60, scale: 0.92 }}
          to={{ opacity: 1, y: 0, scale: 1 }}
          config={{ tension: 170, friction: 26 }}
          className="w-52 md:w-64"
        >
          <figure className="relative aspect-3/4 rotate-6 overflow-hidden rounded-card bg-brand">
            <div className="absolute inset-0">
              <AnimatePresence initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={spring({ tension: 260, friction: 26 })}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.img}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 13rem, 16rem"
                    loading="lazy"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <figcaption className="absolute inset-x-3 bottom-3 rounded-xl bg-brand-deep/40 px-3 py-2 text-white backdrop-blur">
              <div className="text-sm font-medium">{slide.name}</div>
              <div className="text-[0.65rem] text-white/80">{slide.role}</div>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="relative z-20 mt-12 flex items-center justify-between sm:mt-24">
        <ArrowButton
          direction="prev"
          variant="outline"
          label="Previous coach"
          onClick={prev}
        />
        <CarouselDots
          count={TRUST_SLIDES.length}
          active={index}
          onChange={setIndex}
          tone="dark"
          labelPrefix="Coach"
        />
        <ArrowButton
          direction="next"
          variant="solid"
          label="Next coach"
          onClick={next}
        />
      </div>
    </section>
  );
}