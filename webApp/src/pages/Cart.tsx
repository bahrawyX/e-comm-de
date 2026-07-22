/*
  Cart.tsx
  ────────
  Shopping cart page — lists items, shows total, links to checkout.

  KEY CONCEPTS (unchanged):
  - useCart() → items + clearCart
  - useTotalPrice() → computed total
  - CartItem → one row per item
*/

import { Link } from "react-router-dom";
import { useCart, useTotalPrice } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { ArrowLeft, ArrowUpRight, Bag } from "../components/icons";

function Cart() {
  // Get everything we need from the cart
  const { items, clearCart } = useCart();
  const totalPrice = useTotalPrice();

  // If the cart is empty, show a friendly message
  if (items.length === 0) {
    return (
      <div className="glass mx-auto max-w-xl rounded-panel px-8 py-20 text-center">
        <span className="icon-pill mx-auto mb-6 flex h-16 w-16">
          <Bag className="h-7 w-7 text-muted" />
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Your cart is empty
        </h2>
        <p className="mt-2 text-[15px] text-muted">
          Add a few products to get started.
        </p>
        <Link to="/" className="btn-dark mt-8 h-12 px-6 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-ink">
        Shopping cart
      </h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* List of cart items — each one is a <CartItem> component */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Summary — sticky rounded panel */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-panel p-6">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Order summary
            </h2>

            <div className="mt-5 flex items-center justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span className="font-medium text-ink">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-muted">
              <span>Shipping</span>
              <span className="font-medium text-ink">Free</span>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-hairline pt-5">
              <span className="text-base font-semibold text-ink">Total</span>
              <span className="text-2xl font-semibold tracking-tight text-ink">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Link to="/checkout" className="btn-accent mt-6 h-14 w-full justify-center">
              Proceed to checkout
              <span className="btn-accent__arrow">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>

            <button
              onClick={clearCart}
              className="btn-outline mt-3 h-12 w-full text-sm"
            >
              Clear cart
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
