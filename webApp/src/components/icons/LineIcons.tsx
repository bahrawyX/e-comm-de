import React from "react";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const ArrowUpRight: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} {...base}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowLeft: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} {...base}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const Search: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} {...base}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const Bag: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} {...base}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const Heart: React.FC<IconProps & { filled?: boolean }> = ({
  className = "w-5 h-5",
  filled = false,
}) => (
  <svg className={className} {...base} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7-4.35-9.5-8.5C.7 8.4 2.2 5 5.5 5 7.5 5 9 6.2 12 9c3-2.8 4.5-4 6.5-4 3.3 0 4.8 3.4 3 6.5C19 15.65 12 20 12 20Z" />
  </svg>
);

export const User: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} {...base}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);

export const Plus: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Minus: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} {...base}>
    <path d="M5 12h14" />
  </svg>
);

export const ShieldCheck: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} {...base}>
    <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    <path d="m9.5 12 1.8 1.8 3.2-3.4" />
  </svg>
);

export const Truck: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} {...base}>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17.5" cy="18" r="1.6" />
  </svg>
);

export const Lock: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} {...base}>
    <rect x="5" y="11" width="14" height="9" rx="2.5" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const Trash: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} {...base}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13" />
  </svg>
);

export const Check: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} {...base}>
    <path d="m5 12.5 4.5 4.5L19 6.5" />
  </svg>
);

export const Star: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} {...base} fill="currentColor" stroke="none">
    <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 22.6 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z" />
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} {...base}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Phone: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} {...base}>
    <path d="M5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5V18a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 1-2Z" />
  </svg>
);

export const MapPin: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} {...base}>
    <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Sliders: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} {...base}>
    <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4" />
    <circle cx="16" cy="6" r="2" fill="currentColor" stroke="none" />
    <circle cx="8" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="14" cy="18" r="2" fill="currentColor" stroke="none" />
  </svg>
);

export const RotateCcw: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} {...base}>
    <path d="M4 9a8 8 0 1 1-1 4" />
    <path d="M3 4v5h5" />
  </svg>
);

export const CartMark: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M3 4a1 1 0 0 0 0 2h1.2l2 9.4A2 2 0 0 0 8.15 17H18a1 1 0 0 0 0-2H8.55l-.3-1.4h10.1a1 1 0 0 0 .97-.76l1.4-5.6A1 1 0 0 0 19.75 6H6.6l-.34-1.6A1 1 0 0 0 5.28 4H3Z" />
    <circle cx="8.5" cy="20" r="1.6" />
    <circle cx="17.5" cy="20" r="1.6" />
  </svg>
);
