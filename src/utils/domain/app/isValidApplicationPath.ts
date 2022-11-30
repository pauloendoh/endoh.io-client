import { urls } from "utils/urls"
import pageUrls from "../../url/urls/pageUrls"
export const isValidApplicationPath = (pathname: string) => {
  return (
    pathname.startsWith(urls.pages.monerateIndex) ||
    pathname.startsWith(urls.pages.relearn.index) ||
    pathname.startsWith(pageUrls.skillbase.index) ||
    pathname.startsWith(pageUrls.feed.index) ||
    pathname.startsWith(pageUrls.questions.index)
  )
}
