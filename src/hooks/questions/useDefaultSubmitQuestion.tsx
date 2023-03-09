import { useAxios } from "hooks/utils/useAxios"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { NoteDto } from "types/domain/questions/NoteDto"
import { urls } from "utils/urls"
import QuestionSavedMessage from "./QuestionSavedMessage/QuestionSavedMessage"

export const useDefaultSubmitQuestion = () => {
  const { onClose, setIsSubmitting } = useNoteDialogStore()

  const { pushOrReplaceNote } = useDocsStore()

  const { setSuccessMessage } = useSnackbarStore()

  const axios = useAxios()
  const onSubmit = (updatedNote: NoteDto) => {
    // PE 1/3 - DRY
    setIsSubmitting(true)
    axios
      .post<NoteDto>(urls.api.define.note, updatedNote)
      .then((res) => {
        pushOrReplaceNote(res.data)

        onClose()
        setSuccessMessage(<QuestionSavedMessage question={res.data} />)
      })
      .finally(() => setIsSubmitting(false))
  }

  return onSubmit
}
