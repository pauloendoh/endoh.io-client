import { create } from "zustand"

interface INumberDialog {
  title: string
  description?: string
  confirmChangeButtonLabel?: string
  initialNumber?: number
  onChange: (number: number) => void
}

interface IStore {
  dialogValues: INumberDialog
  isOpen: boolean
  openDialog: (confirmDialog: INumberDialog) => void
  closeDialog: () => void
}

export const useNumberDialogStore = create<IStore>((set, get) => ({
  dialogValues: { title: "", onChange: () => {} },
  isOpen: false,
  openDialog: (val) => {
    set({ dialogValues: val, isOpen: true })
  },
  closeDialog: () => set({ isOpen: false }),
}))
