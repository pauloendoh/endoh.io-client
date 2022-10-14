import { buildNoteDto, NoteDto } from "types/domain/define/NoteDto"
import create from "zustand"

interface INoteDialogStore {
  isOpen: boolean
  initialValue: NoteDto
  onOpen: (options: {
    initialValue: NoteDto
    onSubmit: (value: NoteDto) => void
  }) => void
  onClose: () => void
  onSubmit: (value: NoteDto) => void
}

const useNoteDialogStore = create<INoteDialogStore>((set, get) => ({
  isOpen: false,
  initialValue: buildNoteDto(),
  onOpen: (options) =>
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

// <NoteDialog
// initialValue={initialValue}
// onClose={() => {
//   setDialogIsOpen(false)
// }}
// onSubmit={(updatedNote) => {
//   myAxios
//     .post<NoteDto>(apiUrls.define.note, updatedNote)
//     .then((res) => {
//       docsStore.pushOrReplaceNote(res.data)

//       setDialogIsOpen(false)
//       setSuccessMessage("Question saved!")
//     })
// }}
// open={dialogIsOpen}
// />
