import { ReactNode } from "react"
import create, { SetState } from "zustand"

interface ISnackBarStore {
  successMessage: ReactNode
  setSuccessMessage: (message: ReactNode) => void

  errorMessage: ReactNode
  setErrorMessage: (message: ReactNode) => void
}

const useSnackbarStore = create<ISnackBarStore>(
  (set: SetState<ISnackBarStore>) => ({
    successMessage: "",
    setSuccessMessage: (message) => {
      set({ successMessage: message })
    },

    errorMessage: "",
    setErrorMessage: (message) => {
      set({ errorMessage: message })
    },
  })
)

export default useSnackbarStore
