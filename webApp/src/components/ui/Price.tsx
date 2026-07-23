interface PriceProps {
  value: number;
  className?: string;
}

function Price({ value, className = "" }: PriceProps) {
  const [dollars, cents] = value.toFixed(2).split(".");

  return (
    <span className={`whitespace-nowrap tabular-nums ${className}`} aria-label={`Price: $${dollars}.${cents}`}>
      <span className="align-super text-[0.6em] font-semibold" aria-hidden="true">$</span>
      {dollars}
      <span className="align-super text-[0.6em] font-semibold" aria-hidden="true">.{cents}</span>
    </span>
  );
}

export default Price;
