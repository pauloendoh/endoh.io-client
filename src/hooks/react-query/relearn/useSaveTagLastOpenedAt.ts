import { useMutation } from "react-query";
import myAxios from "../../../consts/myAxios";
import { TagDto } from "../../../interfaces/dtos/relearn/TagDto";
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
