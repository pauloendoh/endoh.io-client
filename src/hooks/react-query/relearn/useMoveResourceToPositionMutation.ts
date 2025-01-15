import { useMutation } from "@tanstack/react-query"
import { pushOrReplaceMany } from "endoh-utils"
import { useAxios } from "hooks/utils/useAxios"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"

export const useMoveResourceToPositionMutation = (options?: {
  showSuccessMessage?: boolean
}) => {
  const axios = useAxios()
  const { setResources } = useRelearnStore()
  const { setSuccessMessage } = useSnackbarStore()

  return useMutation(
    async (input: {
      resourceId: number
      currentPosition: number
      newPosition: number
      tagId: number
    }) => {
      return axios
        .post<"OK">(urls.api.relearn.moveResourceToPosition(), input)
        .then((res) => res.data)
    },
    {
      onSuccess: (_, input) => {
        if (options?.showSuccessMessage) {
          setSuccessMessage("Resource moved successfully")
        }

        const resources = useRelearnStore.getState().resources

        const savedResources = resources.filter(
          (r) => r.tag?.id === input.tagId && !r.completedAt
        )

        debugger

        const foundIndex = savedResources.findIndex(
          (r) => r.id === input.resourceId
        )

        if (foundIndex === -1) return

        let newTagResources = [...savedResources]

        const [removed] = newTagResources.splice(input.currentPosition - 1, 1)

        newTagResources.splice(input.newPosition - 1, 0, removed)

        newTagResources = newTagResources.map((r, i) => ({
          ...r,
          position: i,
        }))

        const newResources = pushOrReplaceMany(
          resources,
          newTagResources,
          (newArrayItem, oldArrayItem) => newArrayItem.id === oldArrayItem.id
        ).sort((a, b) => a.position! - b.position!)

        setResources(newResources)
      },
    }
  )
}
