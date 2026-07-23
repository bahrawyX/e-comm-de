import { Link } from "react-router-dom";
import { useTotalItems } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import { useAuth } from "../context/AuthContext";
import { Bag, Heart, User, ChevronDown, CartMark, Truck } from "./icons";

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
      <nav className="container-page flex h-16 items-center gap-4 lg:gap-8" aria-label="Main navigation">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Shopcart Home">
          <CartMark className="h-6 w-6 text-brand" aria-hidden="true" />
          <span className="text-xl font-semibold tracking-tight text-ink">
            Shopcart
          </span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map(({ label, hasMenu }) => (
            <li key={label}>
              <span
                className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded px-2 py-1"
                aria-haspopup={hasMenu ? "true" : undefined}
                aria-expanded={hasMenu ? "false" : undefined}
              >
                {label}
                {hasMenu && <ChevronDown className="h-3.5 w-3.5 text-muted" aria-hidden="true" />}
              </span>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <button
            type="button"
            onClick={logout}
            title={user ? `Sign out (${user.email})` : "Sign out"}
            className="flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded px-2 py-1"
            aria-label={`Sign out${user?.email ? ` as ${user.email}` : ""}`}
          >
            {user?.picture ? (
              <img
                src={user.picture}
                alt={`${user.email} profile picture`}
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <User className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">Account</span>
          </button>

          <Link
            to="/orders"
            aria-label="Orders"
            className="flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            <Truck className="h-5 w-5" />
            <span className="hidden sm:inline">Orders</span>
          </Link>

          <Link
            to="/favourites"
            aria-label={`Wishlist, ${favCount} item${favCount !== 1 ? "s" : ""}`}
            className="relative flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded px-2 py-1"
          >
            <span className="relative">
              <Heart className="h-5 w-5" aria-hidden="true" />
              {favCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white" aria-label={`${favCount} item${favCount !== 1 ? "s" : ""} in wishlist`}>
                  {favCount}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">Wishlist</span>
          </Link>

          <Link
            to="/cart"
            aria-label={`Cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            className="relative flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded px-2 py-1"
          >
            <span className="relative">
              <Bag className="h-5 w-5" aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white" aria-label={`${totalItems} item${totalItems !== 1 ? "s" : ""} in cart`}>
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
