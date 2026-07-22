import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTotalItems } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import { useAuth } from "../context/AuthContext";
import { Search, Bag, Heart, User, ChevronDown, CartMark } from "./icons";

const NAV_LINKS = [
  { label: "Categories", hasMenu: true },
  { label: "Deals", hasMenu: false },
  { label: "What's New", hasMenu: false },
  { label: "Delivery", hasMenu: false },
];

function Navbar() {
  const totalItems = useTotalItems();
  const favCount = useFavourites((s) => s.ids.length);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/95 backdrop-blur">
      <nav className="container-page flex h-16 items-center gap-4 lg:gap-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <CartMark className="h-6 w-6 text-brand" />
          <span className="text-xl font-semibold tracking-tight text-ink">
            Shopcart
          </span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map(({ label, hasMenu }) => (
            <li key={label}>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-brand"
              >
                {label}
                {hasMenu && <ChevronDown className="h-3.5 w-3.5 text-muted" />}
              </button>
            </li>
          ))}
        </ul>

        <div className="relative ml-auto hidden max-w-xs flex-1 items-center md:flex lg:ml-4">
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-faint" />
          <input
            type="text"
            readOnly
            placeholder="Search Product"
            aria-label="Search products"
            className="field h-10 w-full pl-11 pr-4 text-sm"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0 md:gap-4">
          <button
            type="button"
            onClick={logout}
            title={user ? `Sign out (${user.email})` : "Sign out"}
            className="flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            {user?.picture ? (
              <img
                src={user.picture}
                alt=""
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <User className="h-5 w-5" />
            )}
            <span className="hidden sm:inline">Account</span>
          </button>

          <button
            type="button"
            aria-label={`Wishlist, ${favCount} items`}
            onClick={() =>
              toast(
                favCount > 0
                  ? `You have ${favCount} item${favCount === 1 ? "" : "s"} in your wishlist`
                  : "Your wishlist is empty",
              )
            }
            className="relative flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            <span className="relative">
              <Heart className="h-5 w-5" />
              {favCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                  {favCount}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">Wishlist</span>
          </button>

          <Link
            to="/cart"
            aria-label={`Cart, ${totalItems} items`}
            className="relative flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            <span className="relative">
              <Bag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
