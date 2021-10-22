import pageUrls from "../consts/pageUrls";

export const getCurrentTagId = (pathname: string): number => {
  if (pathname.startsWith(pageUrls.skillbase.tag)) {
    const tagId = Number(pathname.split("/").pop());
    return tagId;
  }
  return null;
};
