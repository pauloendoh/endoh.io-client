import { urls } from "utils/urls"
export const isValidApplicationPath = (pathname: string) => {
  return (
    pathname.startsWith(urls.pages.monerateIndex) ||
    pathname.startsWith(urls.pages.resources.index) ||
    pathname.startsWith(urls.pages.skills.index) ||
    pathname.startsWith(urls.pages.feed.index) ||
    pathname.startsWith(urls.pages.questions.index) ||
    pathname.startsWith(urls.pages.learningDiary)
  )
}
