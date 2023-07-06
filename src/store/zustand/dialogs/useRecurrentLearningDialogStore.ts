import { RecurrentLearningDto } from "hooks/react-query/learning-diary/recurrent-learning/types/RecurrentLearningDto"
import { create } from "zustand"

interface IStore {
  isOpen: boolean
  initialValue: RecurrentLearningDto | null
  openDialog: (
    initialValue: RecurrentLearningDto,
    options?: {
      onSuccess?: (savedRecurrentLearning: RecurrentLearningDto) => void
    }
  ) => void
  onSuccess?: (savedRecurrentLearning: RecurrentLearningDto) => void
  closeDialog: () => void
}

const useRecurrentLearningDialogStore = create<IStore>((set, get) => ({
  isOpen: false,
  initialValue: null,
  openDialog: (initialValue: RecurrentLearningDto, options) =>
    set({
      isOpen: true,
      initialValue,
      onSuccess: options?.onSuccess,
    }),
  closeDialog: () => {
    set({ isOpen: false })
  },
  onSuccess: undefined,
}))

export default useRecurrentLearningDialogStore
