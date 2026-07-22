import { Link } from "react-router-dom";
import { useCart, useTotalPrice } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { ArrowLeft, Bag } from "../components/icons";
import Price from "../components/ui/Price";

function Cart() {
  const { items, clearCart } = useCart();
  const totalPrice = useTotalPrice();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-panel bg-panel px-8 py-20 text-center">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-muted shadow-sm">
          <Bag className="h-7 w-7" />
        </span>
        <h2 className="text-2xl font-semibold text-ink">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted">Add a few products to get started.</p>
        <Link to="/" className="btn btn-primary mt-8 h-11 px-6 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Shopping Cart
      </h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-panel border border-line bg-white p-6">
            <h2 className="text-lg font-semibold text-ink">Order Summary</h2>

            <div className="mt-5 flex items-center justify-between text-sm text-muted">
              <span>Subtotal</span>
              <Price value={totalPrice} className="font-medium text-ink" />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-muted">
              <span>Shipping</span>
              <span className="font-medium text-ink">Free</span>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
              <span className="text-base font-semibold text-ink">Total</span>
              <Price value={totalPrice} className="text-xl font-semibold text-brand" />
            </div>

            <Link to="/checkout" className="btn btn-primary mt-6 h-12 w-full text-sm">
              Proceed to Checkout
            </Link>
            <button onClick={clearCart} className="btn btn-outline mt-3 h-11 w-full text-sm">
              Clear Cart
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
