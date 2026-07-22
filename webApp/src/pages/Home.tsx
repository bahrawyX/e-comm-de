/*
  Home.tsx
  ────────
  The main landing page — shows all products in a grid.
  Includes a search bar and category filter buttons.
 
  KEY CONCEPTS:
  - useState → stores what the user typed in search and which category is selected
  - Filtering → we loop through products and only keep the ones that match
  - .map() → loops through an array and creates a component for each item
*/
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import { fetchProducts } from "../lib/api";
import { ArrowUpRight, Search } from "../components/icons";
// Persists across remounts within the session → entrance runs exactly once.
let hasGridEntered = false;
function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  // State for the search text input
  const [search, setSearch] = useState<string>("");
  // State for the selected category button
  const [category, setCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  // Build a list of unique categories from the products
  const categories = ["All", ...new Set(products.map((p) => p.category))];
   const reduce = useReducedMotion();
   const playEntrance = useRef(!hasGridEntered);
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
 
  return (
    <div className="flex flex-col gap-10">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="glass grid items-center gap-8 rounded-panel p-8 sm:p-10 lg:grid-cols-2 lg:p-14">
        <div className="reveal flex flex-col items-start">
          <h1 className="mt-6 text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
            Beautiful things,
            <br />
            thoughtfully priced.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            A calm little shop for premium everyday essentials — headphones,
            footwear and more, chosen with care.
          </p>
          <a href="#catalog" className="btn-accent mt-8 h-14">
            Shop now
            <span className="btn-accent__arrow">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </a>
        </div>

        <div className="relative flex min-h-[300px] items-center justify-center lg:min-h-[380px]">
          <img
            src={products[0].imageUrl}
            alt={products[0].imageUrl}
            className="relative z-10 h-64 w-auto object-contain drop-shadow-[0_24px_48px_rgba(10,18,38,0.18)] sm:h-72"
          />
        </div>
      </section>

      {/* ── Search + category filters ──────────────────────────────────── */}
      <div id="catalog" className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            All products
          </h2>

          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled
              className="field w-full cursor-not-allowed py-2.5 pl-11 pr-4 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => {
            const isSelected = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                disabled
                className={`filter-pill cursor-not-allowed ${
                  isSelected ? "filter-pill--active" : ""
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Product grid ───────────────────────────────────────────────── */}
      <motion.ul
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        initial={playEntrance.current && !reduce ? "hidden" : false}
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.ul>
    </div>
  );
}
 
export default Home;
 