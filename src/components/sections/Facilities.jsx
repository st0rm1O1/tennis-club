"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import HoverSpring from "@/components/motion/HoverSpring";
import StackedLines from "@/components/motion/StackedLines";
import WordFade from "@/components/motion/WordFade";
import { COURT_TILES, IMAGES } from "@/lib/data";

export default function Facilities() {
  return (
    <section
      id="facilities"
      className="-mt-10 rounded-card-lg bg-white px-6 pb-20 pt-16 sm:px-10"
    >
      <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-2">
        <div className="max-w-[24rem]">
          <Reveal
            from={{ opacity: 0, scale: 0.85 }}
            to={{ opacity: 1, scale: 1 }}
            config={{ tension: 240, friction: 20 }}
            className="size-16"
          >
            <div className="relative size-16 overflow-hidden rounded-card">
              <Image
                src={IMAGES.three}
                alt="Player stretching for a forehand on clay"
                fill
                sizes="4rem"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>
          <StackedLines
            as="h2"
            id="facilities-title"
            lines={["Tour Our", "World-Class", "Courts"]}
            stagger={120}
            className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.02em]"
          />
          <WordFade
            text="Reserve a court for focused practice, squad drills, or private sessions — and train in the same conditions you'll compete in."
            className="mt-6 max-w-[20rem] text-sm leading-relaxed text-ink-soft"
          />
        </div>

        <div className="flex items-end gap-5">
          {COURT_TILES.map((tile, i) => (
            <div key={tile.name} className={`flex-1 ${i === 1 ? "mb-8" : ""}`}>
              <Reveal
                from={{ opacity: 0, y: 48 }}
                delayIn={i * 0.14}
                config={{ tension: 180, friction: 26 }}
              >
                <HoverSpring
                  to={{ scale: 1.03 }}
                  config={{ tension: 300, friction: 22 }}
                  className="relative aspect-[3/4] overflow-hidden rounded-card bg-surface"
                >
                  <Image
                    src={tile.img}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-x-3 bottom-3 rounded-xl px-4 py-3 text-white backdrop-blur ${
                      tile.tone === "clay"
                        ? "bg-accent-teal/55"
                        : "bg-brand-deep/40"
                    }`}
                  >
                    <div className="text-sm font-medium">{tile.name}</div>
                    <div className="mt-0.5 text-[0.65rem] leading-relaxed text-white/85">
                      {tile.desc}
                    </div>
                  </div>
                </HoverSpring>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}