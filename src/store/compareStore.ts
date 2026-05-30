import { create } from "zustand";

interface College {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
}

interface CompareStore {
  compareList: College[];
  addToCompare: (college: College) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  compareList: [],

  addToCompare: (college) => {
    const { compareList } = get();
    if (compareList.length >= 3) {
      alert("You can compare at most 3 colleges at a time.");
      return;
    }
    if (!compareList.find((c) => c.id === college.id)) {
      set({ compareList: [...compareList, college] });
    }
  },

  removeFromCompare: (id) => {
    set({ compareList: get().compareList.filter((c) => c.id !== id) });
  },

  clearCompare: () => set({ compareList: [] }),

  isInCompare: (id) => get().compareList.some((c) => c.id === id),
}));
