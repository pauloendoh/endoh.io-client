import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { useQuery } from "react-query"
import { SkillDto } from "types/domain/skillbase/SkillDto"
import { urls } from "utils/urls"

export default function useSkillQuery(skillId: number) {
  const axios = useAxios()
  return useQuery(queryKeys.skillId(skillId), () =>
    axios
      .get<SkillDto>(urls.api.skillbase.skillLabel(skillId))
      .then((res) => res.data)
  )
}
