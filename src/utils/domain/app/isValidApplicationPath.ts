import { urls } from "utils/urls"
export const isValidApplicationPath = (pathname: string) => {
  return (
    pathname.startsWith(urls.pages.monerateIndex) ||
    pathname.startsWith(urls.pages.relearn.index) ||
    pathname.startsWith(urls.pages.skillbase.index) ||
    pathname.startsWith(urls.pages.feed.index) ||
    pathname.startsWith(urls.pages.questions.index)
  )
}
