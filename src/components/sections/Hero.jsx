"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useApp } from "@/components/AppProvider";
import StackedLines, { WordReveal } from "@/components/motion/StackedLines";
import { TennisMark } from "@/components/ui/icons";
import CollectionSlider from "./CollectionSlider";
import MembershipCard from "./MembershipCard";
import { IMAGES } from "@/lib/data";

const HEADER_LINKS = [
  { label: "Programs & Coaches", href: "#programs" },
  { label: "Club & Events", href: "#facilities" },
];

export default function Hero() {
  const { ready, scrollTo, openModal, openMenu, menuOpen } = useApp();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate flex h-[calc(100svh-1rem)] min-h-[36rem] flex-col overflow-hidden rounded-card-lg bg-brand-deep text-white sm:h-[calc(100svh-1.5rem)]"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute left-0 right-0 top-[-16%] h-[132%] w-full will-change-transform"
        >
          <Image
            src={IMAGES.hero}
            alt="Player lunging for a shot on a hard court"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/[0.65] via-brand-deep/[0.35] to-brand-deep/[0.75]" />
      </div>

      <header className="relative z-10 flex items-center px-6 pt-6 text-xs text-white sm:px-10 sm:pt-8">
        <nav
          className="hidden flex-1 items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {HEADER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="text-white/90 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 items-center gap-2 text-base font-medium uppercase tracking-[0.2em] lg:justify-center">
          <TennisMark className="size-5" />
          <span>Baseline</span>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4 sm:gap-5">
          <button
            onClick={openModal}
            className="hidden uppercase tracking-wide underline-offset-4 transition-opacity hover:underline sm:inline-flex"
          >
            Book a Visit
          </button>
          <button
            onClick={openMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="grid size-10 place-items-center rounded-pill bg-white/15 backdrop-blur transition-colors duration-200 hover:bg-white/25"
          >
            <span className="flex flex-col items-center gap-[5px]">
              <span className="block h-px w-4 bg-white" />
              <span className="block h-px w-4 bg-white" />
            </span>
          </button>
        </div>
      </header>

      <div className="px-6 pt-4 sm:px-10">
        <h1
          id="hero-title"
          className="whitespace-break-spaces text-[12.5vw] font-medium uppercase leading-[0.85] tracking-tighter"
        >
          <WordReveal
            active={ready}
            words={["Own", "The", "Court"]}
            stagger={140}
            duration={1100}
          />
        </h1>
      </div>

      <div className="mt-auto flex flex-col gap-6 px-6 pb-8 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pb-10">
        <div
          aria-label="Show Up, Level Up"
          className="text-[2.4rem] font-medium uppercase leading-[0.95] tracking-tight text-white/85"
        >
          <StackedLines
            lines={["Show Up,", "Level Up"]}
            active={ready}
            baseDelay={350}
            stagger={110}
            duration={900}
          />
        </div>
        <div className="flex items-end gap-4">
          <CollectionSlider />
          <MembershipCard />
        </div>
      </div>
    </section>
  );
}