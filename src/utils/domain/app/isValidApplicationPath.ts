import pageUrls from "../../url/urls/pageUrls";
export const isValidApplicationPath = (pathname: string) => {
  return (
    pathname.startsWith(pageUrls.monerate.index) ||
    pathname.startsWith(pageUrls.relearn.index) ||
    pathname.startsWith(pageUrls.skillbase.index) ||
    pathname.startsWith(pageUrls.feed.index) ||
    pathname.startsWith(pageUrls.define.index)
  );
};
