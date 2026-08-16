export default function Eyebrow({ children, tone = "dark", className = "" }) {
  const isLight = tone === "light";
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] ${
        isLight ? "text-white/70" : "text-ink-soft"
      } ${className}`}
    >
      <span
        className={`size-1.5 rounded-pill ${isLight ? "bg-brand-light" : "bg-brand"}`}
      />
      {children}
    </div>
  );
}