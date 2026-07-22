/*
  ProductDetail.tsx
  ─────────────────
  Full details for a single product.

  KEY CONCEPTS (unchanged):
  - useParams() → reads :id from the URL
  - products.find() → looks up the product
  - useCart() → addItem() adds the product (qty 1, exactly as before)

  PRESENTATIONAL-ONLY additions (no new app state, no invented data):
  - stock chip, thumbnail rail (the single real image), quantity stepper (fixed
    at 1, disabled), wishlist button, and a generic trust row.
  - Rating, spec sheets, and color swatches are intentionally OMITTED because
    that data does not exist on the product model.
*/

import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ArrowLeft,
  Heart,
  ShieldCheck,
  Truck,
  Lock,
  Plus,
  Minus,
  Bag,
} from "../components/icons";
import { useEffect, useState } from "react";
import { Product } from "../types";
import { fetchProducts } from "../lib/api";

function ProductDetail() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCart();
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

   useEffect(() => {
      const fetchData = async() => {
        const dbProducts = await fetchProducts();
        setProducts(dbProducts);
        setLoading(false);
      };
      fetchData();
    }, []);
   
    if (loading) {
      return (
        <div>Loading...</div>
      )
    }
  console.log(products)

  if (!product) {
    return (
      <div className="glass mx-auto max-w-xl rounded-panel px-8 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Product not found
        </h2>
        <Link to="/" className="btn-dark mt-6 h-12 px-6 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ── Left: thumbnail rail + large image on a soft gradient panel ── */}
        <div className="flex gap-4">
          {/* Thumbnail rail (the single real image) */}
          <div className="hidden flex-col gap-3 sm:flex">
            <span className="tint-panel flex h-20 w-20 items-center justify-center overflow-hidden rounded-inner ring-1 ring-ink/15">
              <img
                src={product.imageUrl}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-contain p-2"
              />
            </span>
          </div>

          {/* Large image */}
          <div className="tint-panel relative flex flex-1 items-center justify-center overflow-hidden rounded-panel p-8">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(55% 55% at 50% 45%, rgba(216,246,81,0.28) 0%, rgba(216,246,81,0) 70%)",
              }}
            />
            <button
              type="button"
              aria-label="Save to wishlist"
              className="icon-pill absolute right-4 top-4 z-10 h-10 w-10"
            >
              <Heart className="h-5 w-5" />
            </button>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="relative z-1 h-72 w-auto object-contain drop-shadow-[0_24px_48px_rgba(10,18,38,0.16)] sm:h-80"
            />
          </div>
        </div>

        {/* ── Right: product info ────────────────────────────────────────── */}
        <div className="glass flex flex-col rounded-panel p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="micro-label">{product.category}</span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted">
            {product.description}
          </p>

          <p className="mt-7 text-4xl font-semibold tracking-tight text-ink">
            ${product.price.toFixed(2)}
          </p>

          {/* Quantity stepper (presentational, fixed at 1) + Add to Cart */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="glass flex items-center gap-1 rounded-pill p-1.5">
              <button
                type="button"
                disabled
                aria-label="Decrease quantity"
                className="icon-pill h-10 w-10 cursor-not-allowed border-transparent bg-transparent shadow-none"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-ink">
                1
              </span>
              <button
                type="button"
                disabled
                aria-label="Increase quantity"
                className="icon-pill h-10 w-10 cursor-not-allowed border-transparent bg-transparent shadow-none"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => addItem(product)}
              className="btn-dark h-14 flex-1 px-7 text-sm"
            >
              <Bag className="h-4 w-4" />
              Add to Cart
            </button>

            <button
              type="button"
              aria-label="Save to wishlist"
              className="btn-outline h-14 w-14 shrink-0"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Trust row (generic, presentational) */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-hairline pt-6">
            {[
              { icon: ShieldCheck, label: "Warranty included" },
              { icon: Truck, label: "Easy returns" },
              { icon: Lock, label: "Secure payment" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="icon-pill h-10 w-10">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-medium leading-tight text-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
