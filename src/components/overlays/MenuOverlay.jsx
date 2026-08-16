"use client";

import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { CloseIcon, TennisMark } from "@/components/ui/icons";
import PillButton from "@/components/ui/PillButton";
import { useHoverEnabled } from "@/components/motion/useHoverEnabled";
import { spring } from "@/lib/motion";
import { useApp } from "@/components/AppProvider";
import { MENU_LINKS, SOCIAL_LINKS } from "@/lib/data";

export default function MenuOverlay() {
  const {
    setMenuOpen,
    setModalOpen,
    openModal,
    lockScroll,
    unlockScroll,
    scrollTo,
  } = useApp();
  const enabled = useHoverEnabled();

  const close = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  useEffect(() => {
    lockScroll();
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [lockScroll, close]);

  useEffect(() => {
    return () => unlockScroll();
  }, [unlockScroll]);

  const handleLink = (e, href) => {
    e.preventDefault();
    unlockScroll();
    close();
    scrollTo(href);
  };

  const handleBook = () => {
    close();
    openModal();
  };

  return createPortal(
    <motion.div className="fixed inset-0 z-70 flex flex-col p-2 sm:p-3">
      <motion.div
        className="absolute inset-0 bg-brand-deep"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={spring({ tension: 240, friction: 26 })}
        onClick={close}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="relative flex h-full flex-col "
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={spring({ tension: 220, friction: 28 })}
      >
        <div className="flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8">
          <div className="flex items-center gap-2 text-base font-medium uppercase tracking-[0.2em] text-white">
            <TennisMark className="size-5 text-white" />
            Baseline
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="grid size-10 place-items-center rounded-pill bg-white/10 transition-colors duration-200 hover:bg-white/20"
          >
            <motion.span
              whileHover={enabled ? { rotate: 90 } : undefined}
              transition={spring({ tension: 300, friction: 18 })}
              className="inline-flex text-white"
            >
              <CloseIcon className="size-5" />
            </motion.span>
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-1">
          {MENU_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLink(e, link.href)}
              className="block py-1 text-5xl font-medium tracking-tight text-white transition-colors duration-200 hover:text-brand-light sm:text-7xl"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...spring({ tension: 200, friction: 26 }),
                delay: 0.12 + i * 0.07,
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex flex-col gap-5 border-t border-white/15 pt-8 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <PillButton variant="light" onClick={handleBook}>
            Book a Visit
          </PillButton>
          <ul className="flex items-center gap-5 text-sm text-white/70">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLink(e, link.href)}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}