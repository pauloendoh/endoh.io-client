import { useMutation } from "react-query";
import { TagDto } from "../../../types/domain/relearn/TagDto";
import myAxios from "../../../utils/consts/myAxios";
import { urls } from "../../../utils/urls";

export default function useSaveTagLastOpenedAt() {
  return useMutation(
    (tagId: number) =>
      myAxios
        .put<TagDto>(urls.api.saveTagLastOpenedAt(tagId))
        .then((res) => res.data),
    {
      onSuccess: (saved) => {},
    }
  );
}
