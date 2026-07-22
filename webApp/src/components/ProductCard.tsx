/*
  ProductCard.tsx
  ───────────────
  A reusable card that displays one product.

  PROPS (unchanged):
  - product → the product object { id, name, price, image, category, description }

  KEY CONCEPTS (unchanged):
  - useCart() → addItem() when the dark pill is clicked
  - <Link> → opens the product detail page

  MOTION: one coordinated hover gesture — the card lifts, its shadow blooms
  (two stacked shadow layers cross-fade via the .lift class), the image scales
  inside its rounded frame, and the CTA fades 0.85 → 1. The heart is
  presentational only (no wishlist state exists).
*/

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { Heart, Bag } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProductCardProps {
  product: Product;
}

// "product" is passed as a prop from the Home page
function ProductCard({ product }: ProductCardProps) {
  // Get the addItem function from the cart
  const { addItem } = useCart();
  const reduce = useReducedMotion();

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
      whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.4, ease: EASE } }}
      transition={{ duration: 0.25, ease: EASE }}
      className="group lift list-none rounded-card"
    >
      <div className="glass flex h-full flex-col rounded-card p-3">
        {/* Image panel — image sits on its own soft tinted panel with padding */}
        <div className="relative">
          <Link
            to={`/product/${product.id}`}
            className="relative block overflow-hidden rounded-inner tint-panel"
            aria-label={product.name}
          >
            <img
              src={product.imageUrl}
              alt={product.imageUrl}
              className="card-media h-56 w-full object-contain p-7"
            />
            {/* Light sweep on hover */}
            <span className="sheen" aria-hidden="true" />
          </Link>

          {/* Heart (presentational — no wishlist state) */}
          <button
            type="button"
            aria-label="Save to wishlist"
            className="icon-pill absolute right-3 top-3 h-9 w-9"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Product info */}
        <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
          <span className="micro-label">{product.category}</span>
          <Link
            to={`/product/${product.id}`}
            className="mt-2 text-base font-medium tracking-tight text-ink"
          >
            {product.name}
          </Link>

          {/* Price + Add — pinned to the bottom so CTAs align across the grid */}
          <div className="mt-auto pt-4">
            <span className="text-xl font-semibold tracking-tight text-ink">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={() => addItem(product)}
              className="btn-dark card-cta mt-3 h-11 w-full text-sm"
            >
              <Bag className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default ProductCard;
