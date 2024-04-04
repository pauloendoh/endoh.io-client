import { useAxios } from "hooks/utils/useAxios"
import useQuestionDialogStore from "store/zustand/dialogs/useQuestionDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { QuestionDto } from "types/domain/questions/QuestionDto"
import { urls } from "utils/urls"
import QuestionSavedMessage from "./QuestionSavedMessage/QuestionSavedMessage"

export const useDefaultSubmitQuestion = () => {
  const { onClose, setIsSubmitting } = useQuestionDialogStore()

  const { pushOrReplaceQuestion: pushOrReplaceNote } = useDocsStore()

  const { setSuccessMessage } = useSnackbarStore()

  const axios = useAxios()
  const onSubmit = (updatedNote: QuestionDto) => {
    // PE 1/3 - DRY
    setIsSubmitting(true)
    axios
      .post<QuestionDto>(urls.api.define.questions, updatedNote)
      .then((res) => {
        pushOrReplaceNote(res.data)

        onClose()
        setSuccessMessage(<QuestionSavedMessage question={res.data} />)
      })
      .finally(() => setIsSubmitting(false))
  }

  return onSubmit
}
