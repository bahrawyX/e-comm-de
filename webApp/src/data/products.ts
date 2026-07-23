/*
  products.ts
  ───────────
  A simple array of product objects used as our "database".
  In a real app you would fetch this data from a backend API instead.

  Each product has:
  - id          → unique number to identify the product
  - name        → display name
  - price       → cost in dollars
  - image       → URL to a product photo
  - category    → grouping label
  - description → longer text shown on the detail page
*/

import type { Product } from "../types";

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    category: "Electronics",
    description:
      "Premium wireless headphones with noise cancellation, 30-hour battery life, and crystal-clear sound quality.",
    averageRating: 4.5,
    ratingCount: 24,
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    category: "Footwear",
    description:
      "Lightweight running shoes with responsive cushioning and breathable mesh upper for maximum comfort.",
    averageRating: 4.2,
    ratingCount: 18,
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 120.0,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    category: "Accessories",
    description:
      "Handcrafted genuine leather backpack with laptop compartment, multiple pockets, and adjustable straps.",
    averageRating: 4.7,
    ratingCount: 42,
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    category: "Electronics",
    description:
      "Feature-packed smartwatch with heart-rate monitor, GPS tracking, and 7-day battery life.",
    averageRating: 3.9,
    ratingCount: 9,
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 45.0,
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
    category: "Accessories",
    description:
      "Polarized UV400 sunglasses with lightweight frame. Perfect for outdoor adventures.",
    averageRating: 4.5,
    ratingCount: 15,
  },
  {
    id: 6,
    name: "Denim Jacket",
    price: 75.0,
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80",
    category: "Clothing",
    description:
      "Classic denim jacket with a modern slim fit. Versatile layering piece for any season.",
    averageRating: 4.3,
    ratingCount: 31,
  },
  {
    id: 7,
    name: "Yoga Mat",
    price: 35.0,
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80",
    category: "Fitness",
    description:
      "Eco-friendly non-slip yoga mat with extra cushioning. 6mm thick for joint protection.",
    averageRating: 5.0,
    ratingCount: 6,
  },
  {
    id: 8,
    name: "Coffee Maker",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80",
    category: "Home",
    description:
      "Programmable drip coffee maker with thermal carafe. Brews up to 12 cups of rich, flavorful coffee.",
    averageRating: 4.2,
    ratingCount: 27,
  },
];

export default products;
