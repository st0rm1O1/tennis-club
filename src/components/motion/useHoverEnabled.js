"use client";

import { useSyncExternalStore } from "react";

const MOBILE_MAX = 768;
const isServer = typeof window === "undefined";

function subscribe(callback) {
  if (isServer) return () => {};
  const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return isServer || !window.matchMedia(`(max-width: ${MOBILE_MAX}px)`).matches;
}

export function useHoverEnabled() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}