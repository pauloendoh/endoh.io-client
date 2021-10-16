import { useMutation } from "react-query";
import myAxios from "../../../consts/myAxios";
import { DocDto } from "../../../dtos/define/DocDto";
import { urls } from "../../../utils/urls";

export default function useSaveDocLastOpenedAt() {
  return useMutation(
    (docId: number) =>
      myAxios
        .put<DocDto>(urls.api.saveDocLastOpenedAt(docId))
        .then((res) => res.data),
    {
      onSuccess: (saved) => {},
    }
  );
}
