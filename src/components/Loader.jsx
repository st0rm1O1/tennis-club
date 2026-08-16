"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TennisMark } from "@/components/ui/icons";
import { easeInOutCubic, spring } from "@/lib/motion";
import { useApp } from "@/components/AppProvider";
import { MIN_VISIBLE_MS, MAX_VISIBLE_MS, EXIT_MS } from "@/lib/data";

export default function Loader() {
  const { setReady, lockScroll, unlockScroll } = useApp();
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);
  const reduced = useReducedMotion();
  const timersRef = useRef([]);
  const done = useRef(false);

  useEffect(() => {
    const timers = timersRef.current;
    lockScroll();

    if (reduced) {
      const t = setTimeout(() => {
        done.current = true;
        setReady(true);
        unlockScroll();
        setExiting(true);
      }, 200);
      timers.push(t);
      return () => timers.forEach(clearTimeout);
    }

    const finish = () => {
      if (done.current) return;
      done.current = true;
      setReady(true);
      unlockScroll();
      setExiting(true);
    };

    const startCountdown = () => timers.push(setTimeout(finish, MIN_VISIBLE_MS));
    timers.push(setTimeout(finish, MAX_VISIBLE_MS));

    if (document.readyState === "complete") {
      startCountdown();
    } else {
      const onLoad = () => {
        window.removeEventListener("load", onLoad);
        startCountdown();
      };
      window.addEventListener("load", onLoad);
      timers.push(onLoad);
    }

    return () => {
      timers.forEach((t) => {
        if (typeof t === "function") window.removeEventListener("load", t);
        else clearTimeout(t);
      });
    };
  }, [lockScroll, unlockScroll, setReady, reduced]);

  if (removed) return null;

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-brand-deep text-white"
      initial={false}
      animate={exiting ? { y: "-105%" } : { y: "0%" }}
      transition={{
        duration: reduced ? 0 : EXIT_MS / 1000,
        ease: easeInOutCubic,
      }}
      onAnimationComplete={() => {
        if (exiting) setRemoved(true);
      }}
    >
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring({ tension: 200, friction: 22 })}
      >
        <TennisMark className="size-7" />
        <span className="text-2xl font-medium uppercase tracking-[0.2em]">
          Baseline
        </span>
      </motion.div>

      <div className="h-px w-40 overflow-hidden rounded-pill bg-white/20">
        <motion.div
          className="h-full w-full origin-left rounded-pill bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: 0.12,
            duration: reduced ? 0 : (MIN_VISIBLE_MS - 120) / 1000,
            ease: easeInOutCubic,
          }}
        />
      </div>
    </motion.div>
  );
}