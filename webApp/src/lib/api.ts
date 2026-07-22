import type { Product } from "../types";
 
const API_BASE_URL = "http://localhost:8080/api";
 
/**
 * Calls the API endpoint to fetch all products.
 * @returns All products from the database
 */

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return (await response.json()) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
 