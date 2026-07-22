import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { Heart, Bag } from "./icons";
import Price from "./ui/Price";
import Rating from "./ui/Rating";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <li className="product-card group list-none">
      <div className="product-tile aspect-square">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <img src={product.imageUrl} alt={product.name} />
        </Link>
        <button
          type="button"
          aria-label="Save to wishlist"
          className="wishlist-btn"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-semibold text-ink transition-colors group-hover:text-brand"
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
          onClick={() => addItem(product)}
          className="btn btn-outline mt-3 h-9 px-5 text-sm"
        >
          <Bag className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </li>
  );
}

export default ProductCard;
