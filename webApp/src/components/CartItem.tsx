import { useCart } from "../context/CartContext";
import type { CartItem as CartItemType } from "../types";
import { Plus, Minus, Trash } from "./icons";
import Price from "./ui/Price";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQty } = useCart();

  return (
    <div className="flex items-center gap-4 rounded-panel border border-line bg-white p-3 sm:p-4">
      <div className="product-tile h-20 w-20 shrink-0 p-2">
        <img src={item.imageUrl} alt={item.name} />
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {item.category}
        </span>
        <h3 className="truncate text-sm font-semibold text-ink">{item.name}</h3>
        <Price value={item.price} className="mt-0.5 text-sm text-muted" />
      </div>

      <div className="flex items-center rounded-pill border border-line">
        <button
          onClick={() => updateQty(item.id, item.qty - 1)}
          aria-label="Decrease quantity"
          className="btn btn-ghost h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-7 text-center text-sm font-semibold text-ink">
          {item.qty}
        </span>
        <button
          onClick={() => updateQty(item.id, item.qty + 1)}
          aria-label="Increase quantity"
          className="btn btn-ghost h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <Price
        value={item.price * item.qty}
        className="hidden w-24 text-right text-sm font-semibold text-ink sm:block"
      />

      <button
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.name}`}
        className="icon-btn h-9 w-9 !border-transparent text-muted hover:!text-sale"
      >
        <Trash className="h-4 w-4" />
      </button>
    </div>
  );
}

export default CartItem;
