"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import { FONT_BASE, BASE_W, COEF } from "@/lib/data";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const lenisRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    lenisRef.current = lenis;
    let rafId;
    const raf = (t) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    window.scrollTo(0, 0);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const adapt = () => {
      const root = document.documentElement;
      const reduction = ((BASE_W - window.innerWidth) / BASE_W) * 100 * COEF;
      const size = FONT_BASE - (FONT_BASE * reduction) / 100;
      if (size > FONT_BASE) root.style.fontSize = `${size}px`;
      else root.style.removeProperty("font-size");
    };
    adapt();
    window.addEventListener("resize", adapt);
    window.addEventListener("orientationchange", adapt);
    return () => {
      window.removeEventListener("resize", adapt);
      window.removeEventListener("orientationchange", adapt);
    };
  }, []);

  const lockScroll = useCallback(() => {
    document.documentElement.classList.add("is-locked");
    document.body.classList.add("is-locked");
    lenisRef.current?.stop();
  }, []);

  const unlockScroll = useCallback(() => {
    document.documentElement.classList.remove("is-locked");
    document.body.classList.remove("is-locked");
    lenisRef.current?.start();
    lenisRef.current?.resize();
  }, []);

  const scrollTo = useCallback((target) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.start();
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          lenis.resize();
          lenis.scrollTo(el, { duration: 1.2, force: true });
          return;
        }
        window.location.hash = target;
        return;
      }
      lenis.resize();
      lenis.scrollTo(target, { duration: 1.2, force: true });
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const openModal = useCallback(() => setModalOpen(true), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  const value = useMemo(
    () => ({
      lenisRef,
      ready,
      setReady,
      modalOpen,
      setModalOpen,
      menuOpen,
      setMenuOpen,
      lockScroll,
      unlockScroll,
      scrollTo,
      openModal,
      openMenu,
    }),
    [
      lenisRef,
      ready,
      setReady,
      modalOpen,
      setModalOpen,
      menuOpen,
      setMenuOpen,
      lockScroll,
      unlockScroll,
      scrollTo,
      openModal,
      openMenu,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);