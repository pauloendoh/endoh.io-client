import { create } from "zustand"

interface IStore {
  isOpen: boolean
  openDocDialog: () => void
  onClose: () => void
}

const useDocDialogStore = create<IStore>((set, get) => ({
  isOpen: false,
  openDocDialog: () =>
    set({
      isOpen: true,
    }),
  onClose: () => {
    set({ isOpen: false })
  },
}))

export default useDocDialogStore
