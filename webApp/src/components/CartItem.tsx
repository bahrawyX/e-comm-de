/*
  CartItem.tsx
  ────────────
  A single row inside the shopping cart page.

  KEY CONCEPTS (unchanged):
  - Props → receives an "item" object (product + qty)
  - useCart() → removeItem() and updateQty() (quantity controls are functional)
*/

import { useCart } from "../context/CartContext";
import type { CartItem as CartItemType } from "../types";
import { Plus, Minus, Trash } from "./icons";

interface CartItemProps {
  item: CartItemType;
}

// "item" is passed as a prop — it's a product object with an extra "qty" field
function CartItem({ item }: CartItemProps) {
  // Get cart functions we need
  const { removeItem, updateQty } = useCart();

  return (
    <div className="glass flex items-center gap-4 rounded-card p-3 sm:p-4">
      {/* Thumbnail on a soft tinted panel */}
      <div className="tint-panel flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-inner">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain p-2"
        />
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <span className="micro-label">{item.category}</span>
        <h3 className="truncate text-[15px] font-medium tracking-tight text-ink">
          {item.name}
        </h3>
        <p className="mt-0.5 text-sm text-muted">${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity controls (functional) */}
      <div className="glass flex items-center gap-1 rounded-pill p-1">
        <button
          onClick={() => updateQty(item.id, item.qty - 1)}
          aria-label="Decrease quantity"
          className="icon-pill h-8 w-8 border-transparent bg-transparent shadow-none"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-7 text-center text-sm font-semibold text-ink">
          {item.qty}
        </span>
        <button
          onClick={() => updateQty(item.id, item.qty + 1)}
          aria-label="Increase quantity"
          className="icon-pill h-8 w-8 border-transparent bg-transparent shadow-none"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Subtotal */}
      <p className="hidden w-24 text-right text-[15px] font-semibold tracking-tight text-ink sm:block">
        ${(item.price * item.qty).toFixed(2)}
      </p>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.name}`}
        className="icon-pill h-9 w-9 text-muted hover:text-ink"
      >
        <Trash className="h-4 w-4" />
      </button>
    </div>
  );
}

export default CartItem;
