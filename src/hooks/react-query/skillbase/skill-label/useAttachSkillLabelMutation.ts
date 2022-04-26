import { queryKeys } from "hooks/react-query/queryKeys";
import { useMutation } from "react-query";
import { SkillDto } from "types/domain/skillbase/SkillDto";
import SkillLabelDto from "types/domain/skillbase/SkillLabelDto";
import { urls } from "utils/urls";
import useSnackbarStore from "../../../../store/zustand/useSnackbarStore";
import myAxios from "../../../../utils/consts/myAxios";
import { myQueryClient } from "../../../../utils/consts/myQueryClient";

export default function useAttachSkillLabelMutation() {
  const { setErrorMessage } = useSnackbarStore();

  return useMutation(
    (payload: SkillLabelDto) =>
      myAxios
        .post<SkillDto>(urls.api.skillbase.skillLabel(payload.skillId), payload)
        .then((res) => res.data),
    {
      onSuccess: (returnedSkill, payload) => {
        myQueryClient.setQueryData(
          queryKeys.skillId(returnedSkill.id),
          returnedSkill
        );
      },
      onError: (err) => {
        setErrorMessage(
          "Error while saving skill label: " + JSON.stringify(err)
        );
      },
    }
  );
}
