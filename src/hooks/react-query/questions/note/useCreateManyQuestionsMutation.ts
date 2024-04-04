import { useMutation } from "@tanstack/react-query"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { QuestionDto } from "types/domain/questions/QuestionDto"
import myAxios from "utils/consts/myAxios"
import { urls } from "utils/urls"

export default function useCreateManyQuestionsMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const [setQuestions, questions] = useDocsStore((s) => [
    s.setQuestions,
    s.questions,
  ])

  return useMutation(
    (payload: { questionsQuantity: number; docId: number }) =>
      myAxios
        .post<QuestionDto[]>(urls.api.createManyQuestionsAtDoc(payload.docId), {
          questionsQuantity: payload.questionsQuantity,
        })
        .then((res) => res.data),
    {
      onSuccess: (savedQuestions, docId) => {
        setQuestions([...questions, ...savedQuestions])

        setSuccessMessage("Notes created!")
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err))
      },
    }
  )
}
