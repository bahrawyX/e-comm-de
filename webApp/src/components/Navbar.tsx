/*
  Navbar.tsx
  ──────────
  Floating translucent pill bar shown on every page.

  KEY CONCEPTS (unchanged):
  - <Link> → navigates between pages without reloading the browser
  - useTotalItems() → cart badge count

  NOTE: The header search field and the wishlist/account icon-pills are
  presentational chrome only (no wiring) — the app has no search/wishlist/account
  state, so they add zero behavior. The logo (→ home) and cart (→ /cart) are the
  real, unchanged links.
*/

import { Link } from "react-router-dom";
import { useTotalItems } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Search, Bag, Heart, User } from "./icons";

function Navbar() {
  // Get the total number of items in the cart
  const totalItems = useTotalItems();
  // Signed-in user + sign-out (auth is restored)
  const { user, logout } = useAuth();

  return (
    <div className="sticky top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-7xl items-center gap-3 rounded-pill px-3 py-2.5 sm:gap-5 sm:px-5">
        {/* Logo — clicking goes to home page */}
        <Link
          to="/"
          className="shrink-0 pl-1 pr-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl"
        >
          ShopEasy
        </Link>

        {/* Search field (presentational) with a dark circular icon button */}
        <div className="relative hidden flex-1 items-center md:flex">
          <input
            type="text"
            readOnly
            placeholder="Search for products, brands and more"
            aria-label="Search products"
            className="field w-full py-3 pl-5 pr-14 text-sm outline-none"
          />
          <span
            className="icon-pill icon-dark absolute right-1.5 h-9 w-9"
            aria-hidden="true"
          >
            <Search className="h-4 w-4" />
          </span>
        </div>

        {/* Right-side actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
          {/* Wishlist (presentational) */}
          <button
            type="button"
            aria-label="Wishlist"
            className="icon-pill hidden h-11 w-11 sm:inline-flex"
          >
            <Heart className="h-5 w-5" />
          </button>

          {/* Account — shows the signed-in avatar; click signs out */}
          <button
            type="button"
            onClick={logout}
            aria-label="Sign out"
            title={user ? `Sign out (${user.email})` : "Sign out"}
            className="icon-pill h-11 w-11 overflow-hidden p-0"
          >
            {user?.picture ? (
              <img
                src={user.picture}
                alt=""
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5" />
            )}
          </button>

          {/* Cart — real link with live badge */}
          <Link
            to="/cart"
            aria-label={`Cart, ${totalItems} items`}
            className="icon-pill icon-dark relative h-11 w-11"
          >
            <Bag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-ink">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
