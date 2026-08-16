"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import Eyebrow from "@/components/ui/Eyebrow";
import StackedLines from "@/components/motion/StackedLines";
import { CheckIcon, CloseIcon } from "@/components/ui/icons";
import { useHoverEnabled } from "@/components/motion/useHoverEnabled";
import { spring } from "@/lib/motion";
import { useApp } from "@/components/AppProvider";

const fieldClass =
  "w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-brand-light focus:outline-none focus:ring-2 focus:ring-brand-light/30";

export default function ContactModal() {
  const { setModalOpen, lockScroll, unlockScroll } = useApp();
  const enabled = useHoverEnabled();
  const nameRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const close = useCallback(() => setModalOpen(false), [setModalOpen]);

  useEffect(() => {
    lockScroll();
    const t = setTimeout(() => nameRef.current?.focus(), 120);
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [lockScroll, close]);

  useEffect(() => {
    return () => {
      unlockScroll();
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setSubmitting(false);
        setSubmitted(false);
      }, 350);
    };
  }, [unlockScroll]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const firstName = name.trim().split(/\s+/)[0];

  return createPortal(
    <motion.div className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-brand-deep/40 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={spring({ tension: 240, friction: 30 })}
        onClick={close}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Book a visit"
        className="relative max-h-[92svh] w-full overflow-y-auto rounded-card-lg bg-surface-card p-6 text-ink shadow-[0_2rem_4rem_rgba(15,47,99,0.35)] sm:max-w-[32rem] sm:p-8"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.96 }}
        transition={spring({ tension: 240, friction: 26 })}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>Book a visit</Eyebrow>
            <StackedLines
              as="h2"
              lines={["Come see", "the courts"]}
              active
              stagger={90}
              duration={800}
              className="mt-3 text-4xl font-medium leading-[0.95] tracking-[-0.02em] sm:text-5xl"
            />
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close modal"
            className="grid size-10 shrink-0 place-items-center rounded-pill bg-surface transition-colors duration-200 hover:bg-hairline"
          >
            <motion.span
              whileHover={enabled ? { rotate: 90 } : undefined}
              transition={spring({ tension: 300, friction: 18 })}
              className="inline-flex"
            >
              <CloseIcon className="size-5" />
            </motion.span>
          </button>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-card bg-surface p-6 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-pill bg-brand text-white">
              <CheckIcon className="size-5" />
            </div>
            <div className="mt-4 text-lg font-medium">Request received</div>
            <p className="mx-auto mt-2 max-w-[22rem] text-sm leading-relaxed text-ink-soft">
              Thanks, {firstName || "there"} — our team will be in touch to lock
              in your visit.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 rounded-pill bg-ink px-7 py-3.5 text-sm font-medium uppercase tracking-wide text-white transition-colors duration-200 hover:bg-brand-deep"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={onSubmit}
            className="mt-7 flex flex-col gap-4"
          >
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                Full name
              </span>
              <input
                ref={nameRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className={fieldClass}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className={fieldClass}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                What would you like to play?
              </span>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I'd love to try a private lesson on the clay courts…"
                className={`${fieldClass} resize-none`}
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="mt-1 self-start rounded-pill bg-ink px-7 py-3.5 text-sm font-medium uppercase tracking-wide text-white transition-colors duration-200 hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Request a visit"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
}