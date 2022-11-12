import create, { GetState, SetState } from "zustand"

interface Store {
  isResponsiveSearching: boolean
  setIsResponsiveSearching: (value: boolean) => void
  toggleIsResponsiveSearching: () => void
}

const useResponsiveStore = create<Store>(
  (set: SetState<Store>, get: GetState<Store>) => ({
    isResponsiveSearching: false,
    setIsResponsiveSearching: (value: boolean) => {
      set({ isResponsiveSearching: value })
    },

    toggleIsResponsiveSearching: () => {
      set((curr) => ({ isResponsiveSearching: !curr.isResponsiveSearching }))
    },
  })
)

export default useResponsiveStore
