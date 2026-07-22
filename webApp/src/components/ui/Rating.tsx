import { Star } from "../icons";

interface RatingProps {
  stars?: number;
  count?: number;
  className?: string;
}

const TOTAL_STARS = 5;

function Rating({ stars = 5, count = 121, className = "" }: RatingProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex text-star">
        {Array.from({ length: TOTAL_STARS }, (_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < stars ? "" : "text-line"}`}
          />
        ))}
      </div>
      <span className="text-xs text-muted">({count})</span>
    </div>
  );
}

export default Rating;
