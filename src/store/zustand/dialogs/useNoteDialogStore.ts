import { buildNoteDto, NoteDto } from "types/domain/define/NoteDto"
import create from "zustand"

interface INoteDialogStore {
  isOpen: boolean
  initialValue: NoteDto
  openNoteDialog: (options: {
    initialValue: NoteDto
    onSubmit: (value: NoteDto) => void
  }) => void
  onClose: () => void
  onSubmit: (value: NoteDto) => void
}

const useNoteDialogStore = create<INoteDialogStore>((set, get) => ({
  isOpen: false,
  initialValue: buildNoteDto(),
  openNoteDialog: (options) =>
    set({
      isOpen: true,
      initialValue: options.initialValue,
      onSubmit: options.onSubmit,
    }),
  onSubmit: () => {},
  onClose: () => {
    set({ isOpen: false })
  },
}))

export default useNoteDialogStore
