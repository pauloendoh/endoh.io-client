import { create } from "zustand"

interface ISidebarStore {
  sidebarIsOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
}

const useSidebarStore = create<ISidebarStore>((set, get) => ({
  sidebarIsOpen: true,
  openSidebar: () => {
    set((state) => ({ sidebarIsOpen: true }))
  },
  closeSidebar: () => {
    set((state) => ({ sidebarIsOpen: false }))
  },
  toggleSidebar: () => {
    set((state) => ({ sidebarIsOpen: !state.sidebarIsOpen }))
  },
}))

export default useSidebarStore
