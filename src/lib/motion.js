export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeOutQuart = [0.25, 1, 0.5, 1];
export const easeInOutCubic = [0.65, 0, 0.35, 1];

export const spring = ({ tension = 170, friction = 26 } = {}) => ({
  type: "spring",
  stiffness: tension,
  damping: friction,
  bounce: 0,
});

export const VIEWPORT_ONCE = { once: true, amount: 0.12 };