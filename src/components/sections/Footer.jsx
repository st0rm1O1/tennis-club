"use client";

import Reveal from "@/components/motion/Reveal";
import StackedLines from "@/components/motion/StackedLines";
import Eyebrow from "@/components/ui/Eyebrow";
import PillButton from "@/components/ui/PillButton";
import { TennisMark } from "@/components/ui/icons";
import { useApp } from "@/components/AppProvider";
import {
  FOOTER_NAVS,
  SOCIAL_LINKS,
  LEGAL_LINKS,
  CONTACT,
} from "@/lib/data";

export default function Footer() {
  const { openModal, scrollTo } = useApp();

  const handleNav = (e, href) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <footer
      id="contact"
      className="mt-3 rounded-card-lg bg-brand-deep px-6 py-14 text-white sm:px-10 sm:py-16"
    >
      <div className="flex flex-col gap-8 border-b border-white/15 pb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow tone="light">Get started</Eyebrow>
          <StackedLines
            as="p"
            lines={["Ready to", "play?"]}
            className="mt-4 text-6xl font-medium leading-[0.92] tracking-[-0.02em]"
          />
        </div>
        <Reveal
          from={{ opacity: 0, y: 20 }}
          delayIn={0.15}
          config={{ tension: 200, friction: 24 }}
        >
          <PillButton variant="light" onClick={openModal}>
            Book a Visit
          </PillButton>
        </Reveal>
      </div>

      <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex max-w-[20rem] flex-col">
          <div className="flex items-center gap-3 text-lg font-medium uppercase tracking-[0.2em]">
            <TennisMark className="size-6" />
            Baseline
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            A members&rsquo; tennis club and academy where focused coaching
            meets championship courts.
          </p>
          <address className="mt-6 flex flex-col gap-1.5 text-sm not-italic text-white/80">
            <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-white">
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="transition-colors hover:text-white">
              {CONTACT.phoneLabel}
            </a>
            <span className="text-white/55">{CONTACT.address}</span>
          </address>
        </div>

        {FOOTER_NAVS.map((nav) => (
          <nav key={nav.title} aria-label={nav.title}>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              {nav.title}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {nav.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="flex flex-col gap-5 border-t border-white/15 pt-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Baseline Tennis Club. All rights reserved.</span>
        <ul className="flex flex-wrap items-center gap-5">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center gap-5">
          {LEGAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}