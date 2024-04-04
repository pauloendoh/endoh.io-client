import { useAxios } from "hooks/utils/useAxios"
import useQuestionDialogStore from "store/zustand/dialogs/useQuestionDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"

export const useDefaultDeleteQuestion = () => {
  const { onClose } = useQuestionDialogStore()

  const { questions: allQuestions, setQuestions: setAllQuestions } =
    useDocsStore()

  const { setSuccessMessage } = useSnackbarStore()
  const axios = useAxios()

  const { openConfirmDialog } = useConfirmDialogStore()

  const defaultDeleteQuestion = async (questionId: number) => {
    openConfirmDialog({
      title: "Delete question?",
      description: "Are you sure you want to delete this question?",
      onConfirm: () => {
        if (!questionId) {
          return
        }
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
