import { Link } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { pushOrReplace } from "endoh-utils"
import { useAxios } from "hooks/utils/useAxios"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { SkillDto } from "types/domain/skillbase/SkillDto"
import { urls } from "utils/urls"

const useSaveSkill = () => {
  const {
    setSkills,
    setEditingSkill,

    skills: currentSkills,
  } = useSkillbaseStore()

  const { setSuccessMessage } = useSnackbarStore()
  const myAxios = useAxios()

  // PE 2/3
  const handleSubmit = async (
    skill: SkillDto,
    setSubmitting?: (isSubmitting: boolean) => void,
    closeAfterSaving = true
  ) => {
    if (setSubmitting) setSubmitting(true)

    // E.g;: if you change from 5 to ""
    if ((skill.currentLevel as unknown) === "") skill.currentLevel = null
    if ((skill.goalLevel as unknown) === "") skill.goalLevel = null

    myAxios
      .post<SkillDto>(urls.api.skillbase.skill, skill)
      .then((res) => {
        setSuccessMessage(
          <span>
            Skill saved!{" "}
            <b
              onClick={() => {
                setEditingSkill(res.data)
              }}
              style={{
                cursor: "pointer",
              }}
            >
              Open it
            </b>
          </span>
        )

        setSkills(pushOrReplace(currentSkills, res.data, "id"))

        if (closeAfterSaving) {
          setEditingSkill(null)
          return
        }

        setEditingSkill(res.data)
      })
      .finally(() => {
        if (setSubmitting) setSubmitting(false)
      })
  }

  return handleSubmit
}

export default useSaveSkill
