import { queryKeys } from "hooks/react-query/queryKeys";
import { useQuery } from "react-query";
import { SkillDto } from "types/domain/skillbase/SkillDto";
import { urls } from "utils/urls";
import myAxios from "../../../../utils/consts/myAxios";

export default function useSkillQuery(skillId: number) {
  return useQuery(queryKeys.skillId(skillId), () =>
    myAxios
      .get<SkillDto>(urls.api.skillbase.skillLabel(skillId))
      .then((res) => res.data)
  );
}
