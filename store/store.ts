import { create } from 'zustand';

interface AppState {
  refetch: boolean;
  toggleRefetch: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  refetch: false,
  toggleRefetch: () => set((state) => ({ refetch: !state.refetch })),
}));
