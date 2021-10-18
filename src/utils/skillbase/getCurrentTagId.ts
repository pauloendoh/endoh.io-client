import PATHS from "../consts/PATHS";

export const getCurrentTagId = (pathname: string): number => {
  if (pathname.startsWith(PATHS.skillbase.tag)) {
    const tagId = Number(pathname.split("/").pop());
    return tagId;
  }
  return null;
};
