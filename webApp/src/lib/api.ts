import type { Product } from "../types";
import sampleProducts from "../data/products";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return (await response.json()) as Product[];
  } catch (error) {
    console.warn(
      "[api] Could not reach the products API — using local sample data.",
      error,
    );
    return sampleProducts;
  }
};
