import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favourites from "./pages/Favourites";
import Orders from "./pages/OrdersHistory";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="flex min-h-dvh items-center justify-center bg-panel"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex items-center gap-3 rounded-pill border border-line bg-white px-6 py-3 text-sm font-medium text-muted">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand" aria-hidden="true" />
          <span>Loading Shopcart…</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Toaster richColors position="bottom-right" />
      <TopBar />
      <Navbar />

      <main id="main-content" className="container-page flex-1" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
