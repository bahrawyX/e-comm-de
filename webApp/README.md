# 🛍️ ShopEasy — React E-Commerce Starter

A beginner-friendly e-commerce app built with **React 19**, **React Router**, and **Tailwind CSS 4**. Use it as a learning template to understand core React concepts.

## What You'll Learn

- **Component composition** — reusable `ProductCard`, `CartItem`, `Navbar`
- **React Router** — client-side routing with dynamic params (`/product/:id`)
- **Context + useReducer** — global cart state without external libraries
- **Tailwind CSS** — utility-first styling with responsive design
- **Vite** — fast dev server and production builds

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx       # Top navigation with cart badge
│   ├── ProductCard.jsx  # Product listing card
│   └── CartItem.jsx     # Single cart row with qty controls
├── context/
│   └── CartContext.jsx   # Cart state management (Context + Reducer)
├── data/
│   └── products.js      # Sample product catalog
├── pages/
│   ├── Home.jsx         # Product listing with search & filters
│   ├── ProductDetail.jsx# Single product view
│   ├── Cart.jsx         # Shopping cart page
│   └── Checkout.jsx     # Checkout form with order confirmation
├── App.jsx              # Root layout + route definitions
├── main.jsx             # Entry point (React, Router, CartProvider)
└── index.css            # Tailwind CSS import
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

| Feature              | Description                                         |
| -------------------- | --------------------------------------------------- |
| Product catalog      | Grid of products with images, prices, and categories |
| Search & filter      | Real-time search bar + category filter buttons      |
| Product detail page  | Detailed view with full description                 |
| Shopping cart        | Add, remove, update quantity                        |
| Cart badge           | Live item count in the navbar                       |
| Checkout flow        | Shipping form with order confirmation               |
| Responsive design    | Works on mobile, tablet, and desktop                |

## Ideas to Extend

- Connect to a real API (e.g., [Fake Store API](https://fakestoreapi.com/))
- Add user authentication (login/register)
- Persist cart to `localStorage`
- Add product reviews and ratings
- Integrate a payment gateway (Stripe)
- Write unit tests with Vitest + React Testing Library

## Tech Stack

- [React 19](https://react.dev/)
- [React Router 7](https://reactrouter.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Vite 6](https://vite.dev/)
