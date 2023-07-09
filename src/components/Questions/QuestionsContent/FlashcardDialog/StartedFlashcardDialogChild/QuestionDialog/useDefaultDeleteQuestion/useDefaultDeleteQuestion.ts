import { useAxios } from "hooks/utils/useAxios"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"

export const useDefaultDeleteQuestion = () => {
  const { onClose } = useNoteDialogStore()

  const { notes: allQuestions, setNotes: setAllQuestions } = useDocsStore()

  const { setSuccessMessage } = useSnackbarStore()
  const axios = useAxios()

  const { openConfirmDialog } = useConfirmDialogStore()

  const defaultDeleteQuestion = async (questionId: number) => {
    openConfirmDialog({
      title: "Delete question?",
      description: "Are you sure you want to delete this question?",
      onConfirm: () => {
        axios.delete(urls.api.define.questionId(questionId)).then(() => {
          setAllQuestions(allQuestions.filter((q) => q.id !== questionId))
          onClose()
          setSuccessMessage("Question deleted!")
        })
      },
    })
  }

  return defaultDeleteQuestion
}
