import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import type { Product } from "../types";
import { Heart, Bag } from "./icons";
import Price from "./ui/Price";
import Rating from "./ui/Rating";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const faved = useFavourites((s) => s.ids.includes(product.id));
  const toggle = useFavourites((s) => s.toggle);

  const toggleFav = () => {
    toggle(product.id);
    toast.success(
      faved
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
    );
  };

  return (
    <li className="product-card group list-none">
      <div className="product-tile aspect-square">
        <Link to={`/product/${product.id}`} className="focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded">
          <img src={product.imageUrl} alt={product.name} />
        </Link>
        <button
          type="button"
          aria-label={faved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={faved}
          onClick={toggleFav}
          className={`wishlist-btn focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded ${faved ? "wishlist-btn--active" : ""}`}
        >
          <Heart className="h-4 w-4" filled={faved} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-semibold text-ink transition-colors group-hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded px-1 py-0.5"
          >
            {product.name}
          </Link>
          <Price value={product.price} className="text-sm font-semibold text-ink" />
        </div>

        <p className="mt-1 line-clamp-1 text-xs text-muted">
          {product.description}
        </p>

        <Rating className="mt-2" />

        <button
          type="button"
          onClick={() => {
            addItem(product);
            toast.success(`${product.name} added to cart`);
          }}
          className="btn btn-outline mt-3 h-9 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        >
          <Bag className="h-4 w-4" aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </li>
  );
}

export default ProductCard;
