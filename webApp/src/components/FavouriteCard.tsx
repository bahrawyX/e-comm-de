import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import type { Product } from "../types";
import { Bag, Heart } from "./icons";
import Price from "./ui/Price";
import Rating from "./ui/Rating";

interface FavouriteCardProps {
  product: Product;
}

function FavouriteCard({ product }: FavouriteCardProps) {
  const { addItem } = useCart();
  const toggle = useFavourites((s) => s.toggle);

  const addToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const removeFav = () => {
    toggle(product.id);
    toast.success(`${product.name} removed from wishlist`);
  };

  return (
    <div className="flex flex-col gap-4 rounded-panel border border-line bg-white p-4 sm:flex-row sm:items-center sm:gap-6">
      <Link
        to={`/product/${product.id}`}
        className="product-tile h-48 w-full shrink-0 sm:h-36 sm:w-36 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded"
      >
        <img src={product.imageUrl} alt={product.name} />
      </Link>

      <div className="min-w-0 flex-1">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {product.category}
        </span>
        <Link
          to={`/product/${product.id}`}
          className="block truncate text-base font-semibold text-ink transition-colors hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded px-1 py-0.5"
        >
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {product.description}
        </p>
        <Rating className="mt-2" />
        <Price
          value={product.price}
          className="mt-2 block text-lg font-semibold text-ink"
        />
      </div>

      <div className="flex items-center gap-2 sm:flex-col sm:items-stretch">
        <button
          type="button"
          onClick={addToCart}
          className="btn btn-outline h-10 flex-1 px-5 text-sm sm:flex-none focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        >
          <Bag className="h-4 w-4" aria-hidden="true" />
          Add to Cart
        </button>
        <button
          type="button"
          onClick={removeFav}
          aria-label={`Remove ${product.name} from wishlist`}
          className="icon-btn h-10 w-10 shrink-0 self-center !border-transparent !text-sale focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        >
          <Heart className="h-5 w-5" filled aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default FavouriteCard;
