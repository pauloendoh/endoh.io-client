import { urls } from "utils/urls"

export const getCurrentTagId = (pathname: string): number => {
  if (pathname.startsWith(urls.pages.skillbase.tag)) {
    const tagId = Number(pathname.split("/").pop())
    return tagId
  }
  return null
}
