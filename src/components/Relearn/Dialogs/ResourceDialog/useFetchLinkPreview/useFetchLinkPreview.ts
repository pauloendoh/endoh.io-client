import { LinkPreviewDto } from "generated/graphql"
import { useAxios } from "hooks/utils/useAxios"
import useDialogsStore from "store/zustand/useDialogsStore"
import { ResourceDto } from "types/domain/relearn/ResourceDto"
import { TagDto } from "types/domain/relearn/TagDto"
import { shortNumberFormatter } from "utils/math/shortNumberFormatter"
import { urlIsValid } from "utils/url/isValidUrl"
import { urls } from "utils/urls"

type HookOptions = {
  throttle: NodeJS.Timeout
  setThrottle: React.Dispatch<React.SetStateAction<NodeJS.Timeout>>
  setIsFetchingLinkPreview: React.Dispatch<React.SetStateAction<boolean>>
  values: ResourceDto
  tags: TagDto[]
}

export const useFetchLinkPreview = ({
  throttle,
  setThrottle,
  setIsFetchingLinkPreview,
  values,
  tags,
}: HookOptions) => {
  const { openConfirmDialog } = useDialogsStore()
  const axios = useAxios()

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
    clearTimeout(throttle)
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
              setFieldValue("title", preview.title)
              setFieldValue("thumbnail", preview.image)

              if (preview.viewCount > 0 && values.privateNote.length === 0) {
                setFieldValue(
                  "privateNote",
                  `${shortNumberFormatter(
                    preview.viewCount
                  )} views - ${new Date().toDateString()}`
                )
              }

              if (preview.alreadySavedResource) {
                openConfirmDialog({
                  title: "You already saved this URL. Open it?",
                  description: preview.alreadySavedResource.title,
                  onConfirm: () => {
                    if (preview.alreadySavedResource?.tagId) {
                      const tag = tags.find(
                        (t) => t.id === preview.alreadySavedResource.tagId
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
            .catch(() => {
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
