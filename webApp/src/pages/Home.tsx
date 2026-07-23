import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import { fetchProducts } from "../lib/api";
import { Bag, Search } from "../components/icons";

const HERO_IMAGE = "./greenHeadset.png";

const ALL_CATEGORIES = "All";

function Home() {
  const [products, setProducts] = useState<Product[]>  ([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = [
    ALL_CATEGORIES,
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory === ALL_CATEGORIES ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const fallbackHeroImage = products[0]?.imageUrl;

  return (
    <div className="flex flex-col gap-10 py-8">
      <section className="grid items-center gap-6 overflow-hidden rounded-panel bg-gradient-to-r from-hero to-hero-2 p-8 sm:p-12 lg:grid-cols-2" aria-label="Promotional offer">
        <div>
          <h1 className="text-3xl font-semibold leading-tight text-brand sm:text-4xl lg:text-5xl">
            Grab Upto 50% Off On
            <br />
            Selected Headphone
          </h1>

          <a
            href="#catalog"
            className="btn btn-primary mt-8 h-11 px-7 text-sm"
          >
            Buy Now
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src={HERO_IMAGE}
            alt="Premium headphones on sale - 50% off"
            onError={(e) => {
              const img = e.currentTarget;

              if (fallbackHeroImage && img.src !== fallbackHeroImage) {
                img.src = fallbackHeroImage;
              }
            }}
            className="h-56 w-auto object-contain drop-shadow-xl sm:h-72"
          />
        </div>
      </section>

      <section id="catalog" className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Our Unique Products
          </h2>

          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

            <input
              type="text"
              placeholder="Search products..."
              aria-label="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field h-11 w-full pl-11 pr-4 text-sm"
            />
          </div>
        </div>

        <fieldset className="flex flex-wrap gap-2.5">
          <legend className="sr-only">Filter products by category</legend>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`pill ${
                selectedCategory === cat ? "pill--active" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </fieldset>

        {loading ? (
          <ProductGridSkeleton />
        ) : products.length === 0 ? (
          <EmptyCatalog message="No products available right now. Please check back soon." />
        ) : filteredProducts.length === 0 ? (
          <EmptyCatalog message="No products match your search." />
        ) : (
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4" role="status" aria-live="polite" aria-label="Loading products">
      {Array.from({ length: 8 }, (_, i) => (
        <li key={i} className="list-none">
          <div className="aspect-square animate-pulse rounded-tile bg-panel" aria-hidden="true" />
          <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-panel" aria-hidden="true" />
          <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-panel" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

interface EmptyCatalogProps {
  message: string;
}

function EmptyCatalog({ message }: EmptyCatalogProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-panel bg-panel px-8 py-16 text-center" role="status">
      <Bag className="h-8 w-8 text-muted" aria-hidden="true" />
      <p className="text-sm text-muted">
        No products available right now. Please check back soon.
      </p>
    </div>
  );
}

export default Home;

