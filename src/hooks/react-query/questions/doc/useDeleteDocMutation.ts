import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { useNavigate } from "react-router-dom"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"

import { deleteFromArray } from "endoh-utils"
import { urls } from "utils/urls"

export default function useDeleteDocMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const [setDocs, docs] = useDocsStore((s) => [s.setDocs, s.docs])
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const axios = useAxios()

  return useMutation(
    (docId: number) =>
      axios.delete(urls.api.docId(docId)).then((res) => res.data),
    {
      onSuccess: (_, docId) => {
        navigate(urls.pages.questionsIndex)

        queryClient.invalidateQueries([queryKeys.folders])

        // PE 1/3 - create a useDocsQuery
        setDocs(deleteFromArray(docs, (d) => d.id === docId))

        setSuccessMessage("Doc deleted!")
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err))
      },
    }
  )
}
