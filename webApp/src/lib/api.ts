import type { Product, ProductRating } from "../types";
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

export const submitRating = async (
  productId: number,
  stars: number,
): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/ratings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, stars }),
    });
  } catch (error) {
    console.warn("[api] Could not submit rating.", error);
  }
};

export const fetchProductRating = async (
  productId: number,
): Promise<ProductRating | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings/${productId}`);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    return {
      average: Number(data.average) || 0,
      count: Number(data.count) || 0,
    };
  } catch (error) {
    console.warn("[api] Could not fetch product rating.", error);
    return null;
  }
};
