import { useMemo } from "react"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"

export function useTagQueryUtils(tagId: number | undefined | null) {
  const { tags } = useRelearnStore()

  const tag = useMemo(() => {
    return tags.find((tag) => tag.id === tagId)
  }, [tags])

  if (tagId === undefined || tagId === null) {
    return undefined
  }

  return tag
}
