import { useMutation, useQueryClient } from "react-query";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import FileDto from "types/domain/folder/FileDto";
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto";
import myAxios from "utils/consts/myAxios";
import { urls } from "utils/urls";
import { queryKeys } from "../queryKeys";

export default function useSaveFileMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (sent: FileDto) =>
      myAxios
        .request<FolderWithSubfoldersDto[]>({
          url: urls.api.files,
          data: sent,
          method: sent.id ? "PUT" : "POST",
        })
        .then((res) => res.data),
    {
      onSuccess: (folders) => {
        queryClient.setQueryData(queryKeys.folders, folders);

        setSuccessMessage("File saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
