import { ReactNode } from "react"
import { create } from "zustand"

interface ISnackBarStore {
  successMessage: ReactNode
  setSuccessMessage: (message: ReactNode) => void

  errorMessage: ReactNode
  setErrorMessage: (message: ReactNode) => void
}

const useSnackbarStore = create<ISnackBarStore>((set) => ({
  successMessage: "",
  setSuccessMessage: (message) => {
    set({ successMessage: message })
  },

  errorMessage: "",
  setErrorMessage: (message) => {
    set({ errorMessage: message })
  },
}))

export default useSnackbarStore
