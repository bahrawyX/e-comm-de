import { CartMark } from "./icons";

const FOOTER_LINKS = ["About", "Contact", "Shipping & Returns", "Privacy", "Terms"];

function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-panel">
      <div className="container-page flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <CartMark className="h-6 w-6 text-brand" />
          <span className="text-lg font-semibold tracking-tight text-ink">
            Shopcart
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-sm text-muted transition-colors hover:text-brand"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-muted">&copy; 2026 Shopcart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
