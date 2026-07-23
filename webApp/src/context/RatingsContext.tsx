import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RatingsState {
  ratings: Record<number, number>; // productId -> stars (1..5)
  setRating: (id: number, value: number) => void;
}

export const useRatings = create<RatingsState>()(
  persist(
    (set) => ({
      ratings: {},
      setRating: (id, value) =>
        set((state) => ({ ratings: { ...state.ratings, [id]: value } })),
    }),
    { name: "shopcart-ratings" },
  ),
);
