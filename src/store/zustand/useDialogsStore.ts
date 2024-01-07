import { create } from "zustand"
import { DecisionDto } from "../../types/domain/big-decisions/DecisionDto"
import { DecisionTableDto } from "../../types/domain/big-decisions/DecisionTableDto"

interface IDialogHandlers {
  decisionDialogValue: DecisionDto | null
  decisionDialogOpen: boolean
  openDecisionDialog: (decision: DecisionDto) => void
  closeDecisionDialog: () => void

  decisionTableDialogValue: DecisionTableDto | null
  decisionTableDialogOpen: boolean
  openDecisionTableDialog: (decision: DecisionTableDto) => void
  closeDecisionTableDialog: () => void

  confirmDialogValue: IConfirmDialog | null
  confirmDialogIsOpen: boolean
  openConfirmDialog: (confirmDialog: IConfirmDialog) => void
  closeConfirmDialog: () => void
}

const useDialogsStore = create<IDialogHandlers>((set, get) => ({
  decisionDialogValue: null,
  decisionDialogOpen: false,
  openDecisionDialog: (decision) => {
    set({ decisionDialogValue: decision, decisionDialogOpen: true })
  },
  closeDecisionDialog: () => set({ decisionDialogOpen: false }),

  decisionTableDialogValue: null,
  decisionTableDialogOpen: false,
  openDecisionTableDialog: (table) => {
    set({ decisionTableDialogValue: table, decisionTableDialogOpen: true })
  },
  closeDecisionTableDialog: () => set({ decisionTableDialogOpen: false }),

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
  onConfirm: (() => void) | null
}

export default useDialogsStore
