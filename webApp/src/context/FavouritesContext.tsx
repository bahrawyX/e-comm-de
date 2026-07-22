import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavouritesState {
  ids: number[];
  toggle: (id: number) => void;
}

export const useFavourites = create<FavouritesState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id],
        })),
    }),
    { name: "shopcart-favourites" },
  ),
);
