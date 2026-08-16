"use client";

import Reveal from "@/components/motion/Reveal";
import HoverSpring from "@/components/motion/HoverSpring";
import StackedLines from "@/components/motion/StackedLines";
import Eyebrow from "@/components/ui/Eyebrow";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white px-6 py-20 sm:px-10 sm:py-24"
    >
      <Eyebrow>What players say</Eyebrow>
      <StackedLines
        as="h2"
        id="testimonials-title"
        lines={["Loved by", "the locker room"]}
        className="mt-4 text-5xl font-medium leading-[0.95] tracking-[-0.02em]"
      />

      <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, i) => (
          <li key={testimonial.name} className="h-full">
            <Reveal
              from={{ opacity: 0, y: 40 }}
              delayIn={i * 0.12}
              config={{ tension: 180, friction: 26 }}
              className="h-full"
            >
              <HoverSpring
                to={{ y: -8 }}
                config={{ tension: 300, friction: 22 }}
                className="flex h-full flex-col justify-between rounded-card bg-surface p-7"
              >
                <figure className="flex flex-1 flex-col">
                  <span
                    aria-hidden="true"
                    className="text-4xl leading-none text-brand"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 text-lg leading-relaxed text-ink">
                    {testimonial.quote}
                  </blockquote>
                </figure>
                <figcaption className="mt-6 border-t border-hairline pt-4">
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="mt-0.5 text-sm text-ink-soft">
                    {testimonial.role}
                  </div>
                </figcaption>
              </HoverSpring>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}