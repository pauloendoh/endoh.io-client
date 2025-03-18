import { useMutation } from "@tanstack/react-query"
import { upsert } from "endoh-utils"
import { useAxios } from "hooks/utils/useAxios"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { TagDto } from "../../../types/domain/relearn/TagDto"
import { urls } from "../../../utils/urls"

export function useSaveTagMutation() {
  const axios = useAxios()
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()
  const { setTags, tags } = useRelearnStore()
  return useMutation(
    (tag: TagDto) =>
      axios.post<TagDto>(urls.api.relearn.tag, tag).then((res) => res.data),
    {
      onSuccess: (saved) => {
        setSuccessMessage("Tag saved!")
        const updatedTags = upsert(tags, saved, (tag) => tag.id === saved.id)
        setTags(updatedTags)
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err))
      },
    }
  )
}
