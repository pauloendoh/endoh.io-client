import { useMutation } from "@tanstack/react-query"
import { DocDto } from "../../../types/domain/questions/DocDto"
import myAxios from "../../../utils/consts/myAxios"
import { urls } from "../../../utils/urls"

export default function useSaveDocLastOpenedAt() {
  return useMutation(
    (docId: number) =>
      myAxios
        .put<DocDto>(urls.api.saveDocLastOpenedAt(docId))
        .then((res) => res.data),
    {
      onSuccess: (saved) => {},
    }
  )
}
