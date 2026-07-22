import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart, useTotalPrice } from "../context/CartContext";
import { ArrowLeft, Check } from "../components/icons";
import Price from "../components/ui/Price";

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery", comingSoon: false },
  { id: "credit", label: "Credit / Debit Card", comingSoon: true },
] as const;

function Checkout() {
  const { items: cartItems, clearCart } = useCart();
  const totalPrice = useTotalPrice();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>("cod");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
    toast.success("Order placed! Your order is on its way.");
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-panel bg-panel px-8 py-20 text-center">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="text-2xl font-semibold text-ink">Order Placed</h2>
        <p className="mt-3 text-sm text-muted">
          Thank you for your purchase. Your order is on its way.
        </p>
        <Link to="/" className="btn btn-primary mt-8 h-11 px-6 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-panel bg-panel px-8 py-20 text-center">
        <h2 className="text-2xl font-semibold text-ink">Nothing to checkout</h2>
        <Link to="/" className="btn btn-primary mt-6 h-11 px-6 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          <section className="rounded-panel border border-line bg-white p-6">
            <h2 className="text-lg font-semibold text-ink">Delivery Information</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full name" type="text" placeholder="Alex Morgan" />
              <Field label="Email" type="email" placeholder="alex@example.com" />
              <Field
                label="Address"
                type="text"
                placeholder="123 Market Street"
                className="sm:col-span-2"
              />
              <Field label="City" type="text" placeholder="San Francisco" />
              <Field label="ZIP code" type="text" placeholder="94103" />
            </div>
          </section>

          <section className="rounded-panel border border-line bg-white p-6">
            <h2 className="text-lg font-semibold text-ink">Payment Details</h2>
            <div className="mt-5 flex flex-col gap-3">
              {PAYMENT_METHODS.map((method) => {
                const isActive = payment === method.id;
                return (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between rounded-xl border p-4 transition ${
                      method.comingSoon
                        ? "cursor-not-allowed border-line opacity-70"
                        : isActive
                          ? "cursor-pointer border-brand bg-brand-soft"
                          : "cursor-pointer border-line hover:border-brand"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={isActive}
                        disabled={method.comingSoon}
                        onChange={(e) => setPayment(e.target.value)}
                        className="h-4 w-4 accent-brand"
                      />
                      <span className="text-sm font-medium text-ink">
                        {method.label}
                      </span>
                    </span>
                    {method.comingSoon && (
                      <span className="rounded-full bg-panel px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                        Coming soon
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-panel border border-line bg-white p-6">
            <h2 className="text-lg font-semibold text-ink">Order Summary</h2>

            <div className="mt-5 flex gap-2">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="field h-11 flex-1 px-4 text-sm"
              />
              <button type="button" className="btn btn-primary h-11 px-5 text-sm">
                Apply
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-4 border-t border-line pt-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <div className="product-tile h-11 w-11 shrink-0 p-1.5">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <span className="min-w-0 flex-1 truncate text-muted">
                    {item.name}
                    <span className="text-faint"> × {item.qty}</span>
                  </span>
                  <Price
                    value={item.price * item.qty}
                    className="shrink-0 font-medium text-ink"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
              <span className="text-base font-semibold text-ink">Total</span>
              <Price value={totalPrice} className="text-xl font-semibold text-brand" />
            </div>

            <button type="submit" className="btn btn-primary mt-6 h-12 w-full text-sm">
              Place Order
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
  className = "",
}: {
  label: string;
  type: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="field field-box h-11 w-full px-4 text-sm"
      />
    </label>
  );
}

export default Checkout;
