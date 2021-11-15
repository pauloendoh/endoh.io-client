import { TagDto } from "../../types/domain/relearn/TagDto";
import pageUrls from "../url/urls/pageUrls";

export const getCurrentTag = (pathname: string, allTags: TagDto[]): TagDto => {
  if (pathname.startsWith(pageUrls.skillbase.tag)) {
    const tagId = Number(pathname.split("/").pop());
    const tag = allTags.find((tag) => tag.id === tagId);
    return tag;
  }
  return null;
};
