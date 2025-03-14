import { LinkPreviewDto } from "generated/graphql"
import { useAxios } from "hooks/utils/useAxios"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { ResourceDto } from "types/domain/relearn/ResourceDto"
import { TagDto } from "types/domain/relearn/TagDto"
import { urlIsValid } from "utils/url/isValidUrl"
import { urls } from "utils/urls"

type HookOptions = {
  throttle: NodeJS.Timeout | null
  setThrottle: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>
  setIsFetchingLinkPreview: React.Dispatch<React.SetStateAction<boolean>>
  values: ResourceDto
  tags: TagDto[]
}

// PE 1/3 - params
export const useFetchLinkPreview = ({
  throttle,
  setThrottle,
  setIsFetchingLinkPreview,
  tags,
}: HookOptions) => {
  const { openConfirmDialog } = useConfirmDialogStore()
  const axios = useAxios()

  const { setErrorMessage } = useSnackbarStore()
  const fetchLinkPreview = (
    url: string,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void,
    setValues: (
      values: React.SetStateAction<ResourceDto>,
      shouldValidate?: boolean
    ) => void
  ) => {
    if (throttle) {
      clearTimeout(throttle)
    }
    setThrottle(
      setTimeout(() => {
        if (urlIsValid(url)) {
          setIsFetchingLinkPreview(true)
          setFieldValue("title", "Loading...")

          axios
            .get<LinkPreviewDto>(urls.api.linkPreview(url))

            .then((res) => {
              const preview = res.data
              if (preview.youtubeVideoLength !== "00:00h")
                setFieldValue("estimatedTime", preview.youtubeVideoLength)

              // if preview.title is null, it will bug the shrink label
              setFieldValue("title", preview.title || "")
              setFieldValue("thumbnail", preview.image)
              if (preview.url) {
                setFieldValue("url", preview.url)
              }

              if (preview.alreadySavedResource) {
                openConfirmDialog({
                  title: "You already saved this URL. Open it?",
                  description: preview.alreadySavedResource.title,
                  onConfirm: () => {
                    if (preview.alreadySavedResource?.tagId) {
                      const tag = tags.find(
                        (t) => t.id === preview.alreadySavedResource?.tagId
                      )
                      if (tag)
                        return setValues({
                          ...preview.alreadySavedResource,
                          tag,
                        } as ResourceDto)
                    }
                    setValues(preview.alreadySavedResource as ResourceDto)
                  },
                })
              }
            })
            .catch((e) => {
              console.log(e)
              setErrorMessage("Error fetching link preview")
              setFieldValue("title", "")
            })
            .finally(() => {
              setIsFetchingLinkPreview(false)
            })
        }
      }, 200)
    )
  }

  return fetchLinkPreview
}
