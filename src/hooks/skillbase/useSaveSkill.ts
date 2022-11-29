import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { SkillDto } from "types/domain/skillbase/SkillDto"
import MyAxiosError from "types/MyAxiosError"
import myAxios from "utils/consts/myAxios"
import { urls } from "utils/urls"

const useSaveSkill = () => {
  const {
    setSkills,
    setEditingSkill,
    editingSkill: initialValue,
  } = useSkillbaseStore()

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  // PE 2/3
  const handleSubmit = (
    skill: SkillDto,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    if (setSubmitting) setSubmitting(true)

    // E.g;: if you change from 5 to ""
    if ((skill.currentLevel as unknown) === "") skill.currentLevel = null
    if ((skill.goalLevel as unknown) === "") skill.goalLevel = null

    myAxios
      .post<SkillDto[]>(urls.api.skillbase.skill, skill)
      .then((res) => {
        setSkills(res.data)
        setEditingSkill(null)
        setSuccessMessage("Skill saved!")
      })
      .catch((err: MyAxiosError) => {
        setErrorMessage(err.response.data.errors[0].message)
      })
      .finally(() => {
        if (setSubmitting) setSubmitting(false)
      })
  }

  return handleSubmit
}

export default useSaveSkill
