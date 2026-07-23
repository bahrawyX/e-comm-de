import { Star } from "../icons";

interface RatingProps {
  /** Average rating (0-5, may be fractional). */
  stars?: number;
  /** Number of ratings. */
  count?: number;
  className?: string;
}

const TOTAL_STARS = 5;

function Rating({ stars = 0, count = 0, className = "" }: RatingProps) {
  const filled = Math.round(stars);

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      role="img"
      aria-label={
        count > 0
          ? `Rated ${stars.toFixed(1)} out of ${TOTAL_STARS} stars from ${count} reviews`
          : "No ratings yet"
      }
    >
      <div className="flex text-star" aria-hidden="true">
        {Array.from({ length: TOTAL_STARS }, (_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < filled ? "" : "text-line"}`}
          />
        ))}
      </div>
      <span className="text-xs text-muted" aria-hidden="true">
        {count > 0 ? `${stars.toFixed(1)} (${count})` : "No ratings"}
      </span>
    </div>
  );
}

export default Rating;
