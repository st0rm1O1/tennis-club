"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useApp } from "@/components/AppProvider";
import RevealGate from "@/components/motion/RevealGate";
import CarouselDots from "@/components/ui/CarouselDots";
import { COLLECTION_SLIDES } from "@/lib/data";
import { spring } from "@/lib/motion";

const CROSS = { tension: 210, friction: 24 };
const INVIEW = { tension: 200, friction: 26 };

function CollectionCard({ data }) {
  return (
    <div className="flex items-center gap-3 rounded-card border border-white/15 bg-white/10 p-3 shadow-[0_1rem_2rem_rgba(15,47,99,0.2)] backdrop-blur">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={data.img}
          alt={data.alt}
          fill
          sizes="3.5rem"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[0.7rem] font-medium uppercase tracking-wide text-white">
          {data.brand}
        </span>
        <span className="text-[0.7rem] uppercase text-white/80">
          {data.title}
        </span>
        <span className="text-[0.65rem] uppercase text-white underline underline-offset-2">
          {data.cta} &rarr;
        </span>
      </div>
    </div>
  );
}

export default function CollectionSlider() {
  const { ready } = useApp();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % COLLECTION_SLIDES.length);
    }, 3800);
    return () => clearInterval(id);
  }, [ready]);

  const goTo = (i) => {
    if (i === index) return;
    setIndex(i);
  };

  return (
    <RevealGate
      active={ready}
      delayIn={0.65}
      config={INVIEW}
      className="hidden w-64 flex-col gap-3 md:flex"
    >
      <div className="relative">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={spring(CROSS)}
          >
            <CollectionCard data={COLLECTION_SLIDES[index]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <CarouselDots
        count={COLLECTION_SLIDES.length}
        active={index}
        onChange={goTo}
        tone="light"
        labelPrefix="Collection"
      />
    </RevealGate>
  );
}