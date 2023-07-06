import { useMutation, useQueryClient } from "@tanstack/react-query"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import FolderDto from "types/domain/folder/FolderDto"
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto"
import myAxios from "utils/consts/myAxios"
import { urls } from "utils/urls"
import { queryKeys } from "../queryKeys"

export default function useSaveFolderMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const queryClient = useQueryClient()

  return useMutation(
    (sentFolder: FolderDto) =>
      myAxios
        .request<FolderWithSubfoldersDto[]>({
          url: urls.api.folders,
          data: sentFolder,
          method: sentFolder.id ? "PUT" : "POST",
        })
        .then((res) => res.data),
    {
      onSuccess: (folders) => {
        queryClient.setQueryData([queryKeys.folders], folders)
        setSuccessMessage("Folder saved!")
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err))
      },
    }
  )
}
