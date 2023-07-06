import { create } from "zustand"

interface IStore {
  isOpen: boolean
  openDialog: () => void
  onClose: () => void
}

const useLearningsPerDayDialogStore = create<IStore>((set, get) => ({
  isOpen: false,
  openDialog: () =>
    set({
      isOpen: true,
    }),
  onClose: () => {
    set({ isOpen: false })
  },
}))

export default useLearningsPerDayDialogStore
