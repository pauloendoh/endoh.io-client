import { useMutation } from "react-query"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { NoteDto } from "types/domain/define/NoteDto"
import myAxios from "utils/consts/myAxios"
import { urls } from "utils/urls"

export default function useCreateManyNotesMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const [setNotes, notes] = useDocsStore((s) => [s.setNotes, s.notes])

  return useMutation(
    (payload: { notesQuantity: number; docId: number }) =>
      myAxios
        .post<NoteDto[]>(urls.api.createManyNotesAtDoc(payload.docId), {
          notesQuantity: payload.notesQuantity,
        })
        .then((res) => res.data),
    {
      onSuccess: (savedNotes, docId) => {
        setNotes([...notes, ...savedNotes])

        setSuccessMessage("Notes created!")
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err))
      },
    }
  )
}
