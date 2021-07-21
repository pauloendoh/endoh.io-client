import create, { GetState, SetState } from "zustand"

interface ISnackBarStore {
  successMessage: string
  setSuccessMessage: (message: string) => void

  errorMessage: string
  setErrorMessage: (message: string) => void
}

const useDialogsStore = create<ISnackBarStore>(
  (set: SetState<ISnackBarStore>, get: GetState<ISnackBarStore>) => ({
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

export default useDialogsStore
