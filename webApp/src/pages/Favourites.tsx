import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavouriteCard from "../components/FavouriteCard";
import { Product } from "../types";
import { fetchProducts } from "../lib/api";
import { useFavourites } from "../context/FavouritesContext";
import { ArrowLeft, Heart } from "../components/icons";

function Favourites() {
  const ids = useFavourites((s) => s.ids);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const favourites = products.filter((p) => ids.includes(p.id));

  if (loading) {
    return <p className="py-20 text-center text-sm text-muted" role="status" aria-live="polite">Loading…</p>;
  }

  return (
    <div className="py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        My Wishlist
      </h1>

      {favourites.length === 0 ? (
        <div className="mx-auto max-w-xl rounded-panel bg-panel px-8 py-20 text-center">
          <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-muted shadow-sm" aria-hidden="true">
            <Heart className="h-7 w-7" />
          </span>
          <h2 className="text-2xl font-semibold text-ink">
            Your wishlist is empty
          </h2>
          <p className="mt-2 text-sm text-muted">
            Tap the heart on a product to save it here.
          </p>
          <Link to="/" className="btn btn-primary mt-8 h-11 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4" role="list">
          {favourites.map((product) => (
            <FavouriteCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
