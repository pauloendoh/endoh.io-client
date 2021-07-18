import create, { GetState, SetState } from "zustand"

interface ISidebarStore {
  sidebarIsOpen: boolean
  toggleSidebar: () => void
}

const useDialogsStore = create<ISidebarStore>(
  (set: SetState<ISidebarStore>, get: GetState<ISidebarStore>) => ({
    sidebarIsOpen: true,
    toggleSidebar: () => {
      set((state) => ({ sidebarIsOpen: !state.sidebarIsOpen }))
    },
  })
)

export default useDialogsStore
