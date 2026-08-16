"use client";

import { motion } from "motion/react";
import Reveal from "@/components/motion/Reveal";
import StackedLines from "@/components/motion/StackedLines";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/icons";
import { useHoverEnabled } from "@/components/motion/useHoverEnabled";
import { spring } from "@/lib/motion";
import { useApp } from "@/components/AppProvider";
import { PROGRAMS } from "@/lib/data";

export default function Programs() {
  const { scrollTo } = useApp();
  const enabled = useHoverEnabled();

  return (
    <section
      id="programs"
      className="bg-surface px-6 py-24 sm:px-10"
    >
      <Eyebrow>Training programs</Eyebrow>
      <StackedLines
        as="h2"
        id="programs-title"
        lines={["Built for", "every level"]}
        className="mt-4 text-5xl font-medium leading-[0.95] tracking-[-0.02em]"
      />

      <ul className="mt-14">
        {PROGRAMS.map((program, i) => (
          <li key={program.index} className="border-t border-hairline last:border-b">
            <Reveal
              from={{ opacity: 0, y: 26 }}
              delayIn={i * 0.09}
              config={{ tension: 190, friction: 26 }}
            >
              <a
                href={program.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(program.href);
                }}
                className="flex items-center gap-6 py-7 transition-colors duration-200 focus:bg-white focus:px-4"
              >
                <span className="w-10 shrink-0 text-sm font-medium text-ink-soft">
                  {program.index}
                </span>
                <div className="flex-1">
                  <div className="text-2xl font-medium tracking-tight sm:text-3xl">
                    {program.name}
                  </div>
                  <div className="mt-1 text-sm text-ink-soft">{program.desc}</div>
                </div>
                <motion.span
                  initial={{ x: 0, opacity: 0.55 }}
                  whileHover={enabled ? { x: 8, opacity: 1 } : undefined}
                  transition={spring({ tension: 300, friction: 20 })}
                  className="grid size-11 shrink-0 place-items-center rounded-pill border border-hairline"
                >
                  <ArrowIcon className="size-4" />
                </motion.span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}