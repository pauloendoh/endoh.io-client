import { queryKeys } from "hooks/react-query/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import useDocsStore from "store/zustand/domain/useDocsStore";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import deleteFromArray from "utils/array/deleteFromArray";
import myAxios from "utils/consts/myAxios";
import { urls } from "utils/urls";

export default function useDeleteDocMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const [setDocs, docs] = useDocsStore((s) => [s.setDocs, s.docs]);
  const queryClient = useQueryClient();

  const history = useHistory();

  return useMutation(
    (docId: number) =>
      myAxios.delete(urls.api.docId(docId)).then((res) => res.data),
    {
      onSuccess: (_, docId) => {
        history.push(urls.pages.defineIndex);

        queryClient.invalidateQueries(queryKeys.folders);

        // PE 1/3 - create a useDocsQuery
        setDocs(deleteFromArray(docs, (d) => d.id === docId));

        setSuccessMessage("Doc deleted!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
