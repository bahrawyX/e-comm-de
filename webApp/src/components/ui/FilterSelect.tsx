import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "../icons";

interface Option<T> {
  value: T;
  label: string;
}

interface FilterSelectProps<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  /** Accessible name for the control. */
  label: string;
  /** Highlight the trigger when a non-default value is chosen. */
  active?: boolean;
}

function FilterSelect<T extends string | number>({
  value,
  onChange,
  options,
  label,
  active = false,
}: FilterSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`flex h-9 items-center gap-2 rounded-pill border px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 ${
          active
            ? "border-brand bg-brand-soft text-brand"
            : "border-line bg-white text-ink hover:border-brand"
        }`}
      >
        {selected?.label ?? label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute left-0 z-20 mt-2 min-w-[12rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lg"
        >
          {options.map((o) => {
            const isSelected = o.value === value;
            return (
              <li key={String(o.value)} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-brand-soft font-medium text-brand"
                      : "text-ink hover:bg-panel"
                  }`}
                >
                  {o.label}
                  {isSelected && <Check className="h-4 w-4 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default FilterSelect;
