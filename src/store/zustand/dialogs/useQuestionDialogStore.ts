import {
  buildQuestionDto,
  QuestionDto,
} from "types/domain/questions/QuestionDto"
import { create } from "zustand"

interface IStore {
  isOpen: boolean
  initialValue: QuestionDto
  openDialog: (options: {
    initialValue: QuestionDto
    onSubmit: (value: QuestionDto) => void
    customOnDelete?: () => void
  }) => void
  onClose: () => void
  onSubmit: (value: QuestionDto) => void
  customOnDelete?: () => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
}

const useQuestionDialogStore = create<IStore>((set, get) => ({
  isOpen: false,
  initialValue: buildQuestionDto(),
  openDialog: (options) =>
    set({
      isOpen: true,
      initialValue: options.initialValue,
      onSubmit: options.onSubmit,
      customOnDelete: options.customOnDelete,
    }),
  onSubmit: () => {},
  onClose: () => {
    set({ isOpen: false })
  },

  isSubmitting: false,
  setIsSubmitting: (value) => set({ isSubmitting: value }),
}))

export default useQuestionDialogStore
