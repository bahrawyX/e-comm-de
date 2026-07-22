import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../lib/api";
import { Product } from "../types";
import {
  ArrowLeft,
  Plus,
  Minus,
  Bag,
  Truck,
  RotateCcw,
} from "../components/icons";
import Price from "../components/ui/Price";
import Rating from "../components/ui/Rating";
import ProductCard from "../components/ProductCard";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const product = useMemo(
    () => products.find((p) => p.id === Number(id)),
    [products, id],
  );

  const similar = useMemo(
    () => products.filter((p) => p.id !== Number(id)).slice(0, 4),
    [products, id],
  );

  const addToCart = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${qty} × ${product.name} added to cart`);
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  if (loading) {
    return <p className="py-20 text-center text-sm text-muted">Loading…</p>;
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-xl rounded-panel bg-panel px-8 py-20 text-center">
        <h2 className="text-2xl font-semibold text-ink">Product not found</h2>
        <Link to="/" className="btn btn-primary mt-6 h-11 px-6 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted">
        <Link to="/" className="hover:text-brand">Home</Link>
        <span>/</span>
        <span className="text-faint">{product.category}</span>
        <span>/</span>
        <span className="truncate text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="product-tile product-tile--contain aspect-[4/3]">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className="flex gap-3">
            <button className="product-tile h-20 w-20 shrink-0 p-2 ring-2 ring-brand">
              <img src={product.imageUrl} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            {product.category}
          </span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {product.name}
          </h1>
          <Rating className="mt-3" />

          <p className="mt-5 text-3xl font-semibold text-brand">
            <Price value={product.price} />
            <span className="ml-2 align-middle text-sm font-normal text-muted">
              or {(product.price / 6).toFixed(2)}/month
            </span>
          </p>

          <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-pill border border-line">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="btn btn-ghost h-11 w-11"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-ink">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="btn btn-ghost h-11 w-11"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button onClick={buyNow} className="btn btn-primary h-11 flex-1 px-8 text-sm">
              Buy Now
            </button>
            <button onClick={addToCart} className="btn btn-outline h-11 flex-1 px-8 text-sm">
              <Bag className="h-4 w-4" />
              Add to Cart
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6">
            <InfoRow
              icon={<Truck className="h-5 w-5" />}
              title="Free Delivery"
              body="Enter your postal code for delivery availability."
            />
            <InfoRow
              icon={<RotateCcw className="h-5 w-5" />}
              title="Return Delivery"
              body="Free 30-day delivery returns. Details."
            />
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-16 flex flex-col gap-6">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            Similar Items You Might Like
          </h2>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function InfoRow({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="text-xs text-muted">{body}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
