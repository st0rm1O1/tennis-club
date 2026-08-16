"use client";

import Image from "next/image";
import RevealGate from "@/components/motion/RevealGate";
import { useApp } from "@/components/AppProvider";
import { AVATAR_DOTS, IMAGES } from "@/lib/data";

const INVIEW = { tension: 200, friction: 26 };

export default function MembershipCard() {
  const { ready } = useApp();
  return (
    <RevealGate
      active={ready}
      delayIn={0.78}
      config={INVIEW}
      className="w-full max-w-[20rem] sm:max-w-60"
    >
      <article className="flex items-stretch gap-3 rounded-card border border-white/15 bg-white/10 p-3 shadow-[0_1rem_2rem_rgba(15,47,99,0.2)] backdrop-blur">
        <div className="flex w-full flex-col justify-between gap-2">
          <span className="text-3xl font-medium leading-none">9K+</span>
          <div className="flex -space-x-2">
            {AVATAR_DOTS.map((color) => (
              <span
                key={color}
                className="size-5 rounded-pill border border-brand-deep/40"
                style={{ background: color }}
              />
            ))}
          </div>
          <span className="text-[0.65rem] uppercase text-white/80">
            Members on court
          </span>
        </div>
        <div className="relative aspect-3/4 w-16 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={IMAGES.one}
            alt="Player waiting to return on a clay court"
            fill
            sizes="4rem"
            loading="lazy"
            className="object-cover"
          />
        </div>
      </article>
    </RevealGate>
  );
}