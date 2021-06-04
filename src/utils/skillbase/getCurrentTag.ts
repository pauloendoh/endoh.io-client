import PATHS from "../../consts/PATHS"
import { TagDto } from "../../interfaces/dtos/relearn/TagDto"

export const getCurrentTag = (pathname: string, allTags: TagDto[]): TagDto => {
  if (pathname.startsWith(PATHS.skillbase.tag)) {
    const tagId = Number(pathname.split("/").pop())
    const tag = allTags.find((tag) => tag.id === tagId)
    return tag
  }
  return null
}
