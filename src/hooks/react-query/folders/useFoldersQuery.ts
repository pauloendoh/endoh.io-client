import { useQuery } from "@tanstack/react-query"
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto"
import myAxios from "utils/consts/myAxios"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"

export const useFoldersQuery = () => {
  return useQuery([queryKeys.folders], () =>
    myAxios
      .get<FolderWithSubfoldersDto[]>(urls.api.folders)
      .then((res) => res.data)
  )
}
