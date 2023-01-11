import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SearchState {
  query: string;
  isSearching: boolean;
  setQuery: (query: string) => void;
  toggleSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  devtools((set) => ({
    query: '',
    isSearching: false,
    setQuery: (query: string) => set({ query }),
    toggleSearch: () => set((state) => ({ isSearching: !state.isSearching })),
  })),
);
