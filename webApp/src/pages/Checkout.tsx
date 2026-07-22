/*
  Checkout.tsx
  ────────────
  A simple checkout form with order confirmation.

  KEY CONCEPTS (unchanged):
  - useCart() → cart items + clearCart
  - useTotalPrice() → computed total
  - handleSubmit → preventDefault, clearCart, show success (logic untouched)
  - useState → "submitted" toggles form ↔ success view
*/

import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart, useTotalPrice } from "../context/CartContext";
import { ArrowLeft, ArrowUpRight, Check } from "../components/icons";

function Checkout() {
  // Get cart data from context
  const { items: cartItems, clearCart } = useCart();
  const totalPrice = useTotalPrice();
  // Tracks whether the order has been placed
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Called when the form is submitted
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Stop the browser from reloading the page
    // In a real app you would send the order to a server here
    clearCart();
    setSubmitted(true);
  }

  // ── Order placed screen ──
  if (submitted) {
    return (
      <div className="glass mx-auto max-w-xl rounded-panel px-8 py-20 text-center">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-ink">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-ink">
          Order placed
        </h2>
        <p className="mt-3 text-[15px] text-muted">
          Thank you for your purchase. Your order is on its way.
        </p>
        <Link to="/" className="btn-dark mt-8 h-12 px-6 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>
      </div>
    );
  }

  // ── Nothing in cart ──
  if (cartItems.length === 0) {
    return (
      <div className="glass mx-auto max-w-xl rounded-panel px-8 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Nothing to checkout
        </h2>
        <Link to="/" className="btn-dark mt-6 h-12 px-6 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>
      </div>
    );
  }

  // ── Checkout form ──
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-ink">
        Checkout
      </h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Shipping form */}
        <form onSubmit={handleSubmit} className="glass rounded-panel p-8">
          <h2 className="text-lg font-semibold tracking-tight text-ink">
            Shipping information
          </h2>

          <div className="mt-6 flex flex-col gap-5">
            <Field label="Full name" type="text" placeholder="Alex Morgan" />
            <Field label="Email" type="email" placeholder="alex@example.com" />
            <Field label="Address" type="text" placeholder="123 Market Street" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="City" type="text" placeholder="San Francisco" />
              <Field label="ZIP code" type="text" placeholder="94103" />
            </div>
          </div>

          <button type="submit" className="btn-accent mt-8 h-14 w-full justify-center">
            Place order
            <span className="btn-accent__arrow">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </button>
        </form>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-panel p-6">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Order summary
            </h2>

            <div className="mt-5 flex flex-col gap-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="min-w-0 truncate text-muted">
                    {item.name}
                    <span className="text-faint"> × {item.qty}</span>
                  </span>
                  <span className="shrink-0 font-medium text-ink">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-hairline pt-5">
              <span className="text-base font-semibold text-ink">Total</span>
              <span className="text-2xl font-semibold tracking-tight text-ink">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Presentational field with a label above the input (a11y-friendly).
function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="field w-full px-4 py-3 text-sm outline-none"
      />
    </label>
  );
}

export default Checkout;
