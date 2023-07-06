import { create } from "zustand"

interface IDialogHandlers {
  confirmDialogValue: IConfirmDialog
  confirmDialogIsOpen: boolean
  openConfirmDialog: (confirmDialog: IConfirmDialog) => void
  closeConfirmDialog: () => void
}

const useDialogsStore = create<IDialogHandlers>((set, get) => ({
  confirmDialogValue: { title: "", onConfirm: null },
  confirmDialogIsOpen: false,
  openConfirmDialog: (val) => {
    set({ confirmDialogValue: val, confirmDialogIsOpen: true })
  },
  closeConfirmDialog: () => set({ confirmDialogIsOpen: false }),
}))

interface IConfirmDialog {
  title: string
  description?: string
  confirmText?: string
  onConfirm: () => void
}

export default useDialogsStore
