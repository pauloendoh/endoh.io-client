import { queryKeys } from "hooks/react-query/queryKeys";
import { useMutation } from "react-query";
import { LabelDto } from "types/domain/skillbase/LabelDto";
import { SkillDto } from "types/domain/skillbase/SkillDto";
import SkillLabelDto from "types/domain/skillbase/SkillLabelDto";
import { urls } from "utils/urls";
import useSnackbarStore from "../../../../store/zustand/useSnackbarStore";
import myAxios from "../../../../utils/consts/myAxios";
import { myQueryClient } from "../../../../utils/consts/myQueryClient";

export default function useDeleteLabelMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  return useMutation(
    (payload: SkillLabelDto) =>
      myAxios
        .delete(urls.api.skillbase.labelId(payload.labelId))
        .then((res) => res.data),
    {
      onSuccess: (_, payload) => {
        const labels = myQueryClient.getQueryData<LabelDto[]>(queryKeys.labels);
        const newLabels = [...labels].filter(
          (label) => label.id !== payload.labelId
        );
        myQueryClient.setQueryData(queryKeys.labels, newLabels);

        const skill = myQueryClient.getQueryData<SkillDto>(
          queryKeys.skillId(payload.skillId)
        );
        const newSkillLabels = skill.labels.filter(
          (label) => label.id !== payload.labelId
        );
        const newSkill = { ...skill, labels: newSkillLabels };
        myQueryClient.setQueryData(
          queryKeys.skillId(payload.skillId),
          newSkill
        );

        setSuccessMessage("Label deleted!");
      },
      onError: (err) => {
        setErrorMessage("Error while deleting label: " + JSON.stringify(err));
      },
    }
  );
}
