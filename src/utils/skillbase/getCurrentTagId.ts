import { urls } from "utils/urls"

export const getCurrentTagId = (pathname: string): number | null => {
  if (pathname.startsWith(urls.pages.skills.tag)) {
    const tagId = Number(pathname.split("/").pop())
    return tagId
  }
  return null
}
