/*
  App.tsx
  ────────
  The root layout of the app.

  HOW IT WORKS:
  - Ambient layers (animated aurora + grain) render behind everything, on every
    auth state, for a soft "alive" feel.
  - Auth gate: while Firebase resolves the session we show a branded loader;
    signed-in users get the shop, everyone else gets the Login screen.
  - Cart state lives in CartContext.tsx (Zustand). Routing is unchanged.
*/

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

// Soft animated colour wash + film grain, shared across every screen.
function Ambience() {
  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span
          className="aurora__blob aurora__blob--a"
          style={{
            top: "-10%",
            left: "-5%",
            width: "48vw",
            height: "48vw",
            background: "radial-gradient(circle, rgba(216,246,81,0.55), transparent 65%)",
          }}
        />
        <span
          className="aurora__blob aurora__blob--b"
          style={{
            bottom: "-15%",
            right: "-8%",
            width: "52vw",
            height: "52vw",
            background: "radial-gradient(circle, rgba(146,180,255,0.4), transparent 65%)",
          }}
        />
        <span
          className="aurora__blob aurora__blob--a"
          style={{
            top: "30%",
            right: "20%",
            width: "34vw",
            height: "34vw",
            background: "radial-gradient(circle, rgba(255,214,165,0.35), transparent 65%)",
            animationDelay: "-8s",
          }}
        />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        <Ambience />
        <div className="flex min-h-[100dvh] items-center justify-center">
          <div className="glass anim-glow flex items-center gap-3 rounded-pill px-6 py-3 text-sm font-medium text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            Loading ShopEasy…
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Ambience />
        <Login />
      </>
    );
  }

  return (
    <>
      <Ambience />
      <div className="flex min-h-[100dvh] flex-col">
        {/* Navbar appears on every page */}
        <Navbar />

        {/* Main content — the visible page changes based on the URL */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 pt-8 sm:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="mt-auto px-4 pb-8 sm:px-6">
          <div className="glass mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 rounded-panel px-8 py-6 text-sm text-muted sm:flex-row">
            <span className="text-base font-semibold tracking-tight text-ink">
              ShopEasy
            </span>
            <p>&copy; 2026 ShopEasy. Crafted with React &amp; Tailwind CSS.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
