"use client";

import Reveal from "@/components/motion/Reveal";
import StackedLines from "@/components/motion/StackedLines";
import Eyebrow from "@/components/ui/Eyebrow";
import { STATS } from "@/lib/data";

export default function Stats() {
  return (
    <section className="mt-3 rounded-card-lg bg-brand-deep px-6 py-20 text-white sm:px-10">
      <Eyebrow tone="light">By the numbers</Eyebrow>
      <StackedLines
        as="h2"
        id="stats-title"
        lines={["A club that", "keeps score"]}
        className="mt-4 text-5xl font-medium leading-[0.95] tracking-[-0.02em]"
      />

      <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.value}
            from={{ opacity: 0, y: 30 }}
            delayIn={i * 0.11}
            config={{ tension: 180, friction: 24 }}
            className="border-t border-white/20 pt-5"
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd className="m-0">
              <div className="text-6xl font-medium leading-none tracking-tight sm:text-7xl">
                {stat.value}
              </div>
              <div className="mt-3 text-sm text-white/65">{stat.label}</div>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}