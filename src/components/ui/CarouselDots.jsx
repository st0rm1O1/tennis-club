"use client";

export default function CarouselDots({
  count,
  active,
  onChange,
  tone = "dark",
  labelPrefix = "Slide",
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            type="button"
            key={i}
            onClick={() => onChange(i)}
            aria-label={`${labelPrefix} ${i + 1}`}
            aria-current={isActive ? "true" : undefined}
            className="p-1.5"
          >
            <span
              className={`block h-1.5 rounded-pill transition-all duration-300 ${
                isActive ? "w-5" : "w-1.5"
              } ${
                isActive
                  ? tone === "light"
                    ? "bg-white"
                    : "bg-ink"
                  : tone === "light"
                    ? "bg-white/40"
                    : "bg-ghost"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}