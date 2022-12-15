import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface SearchState {
  isSearching: boolean;
  toggleSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  devtools((set) => ({
    isSearching: false,
    toggleSearch: () => set((state) => ({ isSearching: !state.isSearching })),
  })),
);
