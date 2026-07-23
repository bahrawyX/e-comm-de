import { useState } from "react";
import { Star } from "../icons";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const STARS = [1, 2, 3, 4, 5];

function StarRating({ value, onChange, className = "" }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="radiogroup"
      aria-label="Rate this product"
    >
      {STARS.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          aria-pressed={value === n}
          className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        >
          <Star
            className={`h-6 w-6 ${n <= active ? "text-star" : "text-line"}`}
          />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
