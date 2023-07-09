import { create } from "zustand"

interface IConfirmDialog {
  title: string
  description?: string
  confirmText?: string
  onConfirm: () => void
}

interface IStore {
  confirmDialogValue: IConfirmDialog
  confirmDialogIsOpen: boolean
  openConfirmDialog: (confirmDialog: IConfirmDialog) => void
  closeConfirmDialog: () => void
}

const useConfirmDialogStore = create<IStore>((set, get) => ({
  confirmDialogValue: { title: "", onConfirm: null },
  confirmDialogIsOpen: false,
  openConfirmDialog: (val) => {
    set({ confirmDialogValue: val, confirmDialogIsOpen: true })
  },
  closeConfirmDialog: () => set({ confirmDialogIsOpen: false }),
}))

export default useConfirmDialogStore
