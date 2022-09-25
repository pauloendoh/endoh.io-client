import { useMutation, useQueryClient } from "react-query";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto";
import myAxios from "utils/consts/myAxios";
import { urls } from "utils/urls";
import { queryKeys } from "../queryKeys";

export default function useDeleteFolderMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (folderId: number) =>
      myAxios
        .delete<FolderWithSubfoldersDto[]>(urls.api.folderId(folderId))
        .then((res) => res.data),
    {
      onSuccess: (folders) => {
        queryClient.setQueryData(queryKeys.folders, folders);
        setSuccessMessage("Folder deleted!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
