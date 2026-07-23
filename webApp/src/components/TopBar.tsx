import { Phone, ChevronDown } from "./icons";

function TopBar() {
  return (
    <div className="bg-brand text-white">
      <div className="container-page flex h-9 items-center justify-between gap-4 text-xs">
        <span className="hidden items-center gap-2 sm:inline-flex">
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          <a href="tel:+001234567890" className="hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand rounded px-1">
            +001234567890
          </a>
        </span>

        <p className="flex-1 text-center text-white/90">
          Get 50% Off on Selected Items{" "}
          <span className="mx-1 text-white/40">|</span>{" "}
          <a href="#catalog" className="font-medium underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand rounded px-1">
            Shop Now
          </a>
        </p>

        <div className="hidden items-center gap-4 sm:flex">
          <button 
            type="button" 
            className="inline-flex items-center gap-1 hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand rounded px-2 py-1"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Select language"
          >
            Eng <ChevronDown className="h-3 w-3" aria-hidden="true" />
          </button>
          <button 
            type="button" 
            className="inline-flex items-center gap-1 hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand rounded px-2 py-1"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Select location"
          >
            Location <ChevronDown className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
