import { urls } from "utils/urls"
import { TagDto } from "../../types/domain/relearn/TagDto"

export const getCurrentTag = (pathname: string, allTags: TagDto[]): TagDto => {
  if (pathname.startsWith(urls.pages.skills.tag)) {
    const tagId = Number(pathname.split("/").pop())
    const tag = allTags.find((tag) => tag.id === tagId)
    return tag
  }
  return null
}
