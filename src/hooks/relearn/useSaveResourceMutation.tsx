import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import ResourceSavedMessage from "components/Relearn/Dialogs/ResourceDialog/ResourceSavedMessage/ResourceSavedMessage"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { ResourceDto } from "types/domain/relearn/ResourceDto"
import { TagDto } from "types/domain/relearn/TagDto"
import myAxios from "utils/consts/myAxios"
import { urls } from "utils/urls"

export const useSaveResourceMutation = (options?: {
  afterSuccess?: (newResource: ResourceDto) => void
}) => {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const { pushOrReplaceResource, setTags } = useRelearnStore()

  return useMutation(
    async (resource: ResourceDto) => {
      return myAxios
        .post<ResourceDto>(urls.api.relearn.resource, resource)
        .then((res) => res.data)
    },
    {
      onSuccess: async (newResource) => {
        pushOrReplaceResource(newResource)

        setSuccessMessage(<ResourceSavedMessage resource={newResource} />)

        myAxios.get<TagDto[]>(urls.api.relearn.tag).then((res) => {
          setTags(res.data)
        })

        if (options?.afterSuccess) {
          options.afterSuccess(newResource)
        }
      },
      onError: (err: AxiosError) => {
        setErrorMessage(err.message || "Error while saving resource.")
      },
    }
  )
}
