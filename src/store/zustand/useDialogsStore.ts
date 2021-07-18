import create, { GetState, SetState } from "zustand"
import { DecisionDto } from "../../dtos/BigDecisions/DecisionDto"
import { DecisionTableDto } from "../../dtos/BigDecisions/DecisionTableDto"

interface IDialogHandlers {
  decisionDialogValue: DecisionDto
  decisionDialogOpen: boolean
  openDecisionDialog: (decision: DecisionDto) => void
  closeDecisionDialog: () => void

  decisionTableDialogValue: DecisionTableDto
  decisionTableDialogOpen: boolean
  openDecisionTableDialog: (decision: DecisionTableDto) => void
  closeDecisionTableDialog: () => void

  confirmDialogValue: IConfirmDialog
  confirmDialogIsOpen: boolean
  openConfirmDialog: (confirmDialog: IConfirmDialog) => void
  closeConfirmDialog: () => void
}

const useDialogsStore = create<IDialogHandlers>(
  (set: SetState<IDialogHandlers>, get: GetState<IDialogHandlers>) => ({
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
  })
)

interface IConfirmDialog {
  title: string
  description?: string
  confirmText?: string
  onConfirm: () => void
}

export default useDialogsStore
