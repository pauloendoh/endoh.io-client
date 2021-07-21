import create, { GetState, SetState } from "zustand"

interface ISidebarStore {
  sidebarIsOpen: boolean
  closeSidebar: () => void
  toggleSidebar: () => void
}

const useDialogsStore = create<ISidebarStore>(
  (set: SetState<ISidebarStore>, get: GetState<ISidebarStore>) => ({
    sidebarIsOpen: true,
    closeSidebar: () => {
      set((state) => ({ sidebarIsOpen: false }))
    },
    toggleSidebar: () => {
      set((state) => ({ sidebarIsOpen: !state.sidebarIsOpen }))
    },
  })
)

export default useDialogsStore
