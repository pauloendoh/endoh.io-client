import { useAxios } from "hooks/utils/useAxios"
import { useMutation, useQueryClient } from "react-query"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"

export default function useDeleteFolderMutation() {
  const { setSuccessMessage } = useSnackbarStore()

  const axios = useAxios()
  const queryClient = useQueryClient()

  return useMutation(
    (folderId: number) =>
      axios
        .delete<FolderWithSubfoldersDto[]>(urls.api.folderId(folderId))
        .then((res) => res.data),
    {
      onSuccess: (folders) => {
        queryClient.setQueryData(queryKeys.folders, folders)
        setSuccessMessage("Folder deleted!")
      },
    }
  )
}
