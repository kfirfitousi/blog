import create from "zustand";
import { devtools } from "zustand/middleware";

interface SearchState {
  isSearching: boolean;
  searchQuery: string;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>()(
  devtools((set) => ({
    isSearching: false,
    searchQuery: "",
    toggleSearch: () => set((state) => ({ isSearching: !state.isSearching })),
    setSearchQuery: (query) => set({ searchQuery: query }),
  }))
);
