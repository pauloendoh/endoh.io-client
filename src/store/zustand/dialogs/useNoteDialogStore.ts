import { buildNoteDto, NoteDto } from "types/domain/questions/NoteDto"
import { create } from "zustand"

interface INoteDialogStore {
  isOpen: boolean
  initialValue: NoteDto
  openNoteDialog: (options: {
    initialValue: NoteDto
    onSubmit: (value: NoteDto) => void
    customOnDelete?: () => void
  }) => void
  onClose: () => void
  onSubmit: (value: NoteDto) => void
  customOnDelete?: () => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
}

const useNoteDialogStore = create<INoteDialogStore>((set, get) => ({
  isOpen: false,
  initialValue: buildNoteDto(),
  openNoteDialog: (options) =>
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

export default useNoteDialogStore
