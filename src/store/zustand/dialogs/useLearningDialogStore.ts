import { Learning } from "generated/graphql"
import create from "zustand"

interface IStore {
  isOpen: boolean
  initialValue: Learning | null
  openDialog: (initialValue: Learning) => void
  closeDialog: () => void
}

const useLearningDialogStore = create<IStore>((set, get) => ({
  isOpen: false,
  initialValue: null,
  openDialog: (initialValue: Learning) =>
    set({
      isOpen: true,
      initialValue,
    }),
  closeDialog: () => {
    set({ isOpen: false })
  },
}))

export default useLearningDialogStore
