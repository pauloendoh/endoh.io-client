import { useHotkeys } from "react-hotkeys-hook"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"

export const useToggleCurrentGoalHotkey = () => {
  const { toggleFilterCurrentGoal } = useSkillbaseStore()

  useHotkeys(
    "shift+2",
    () => {
      toggleFilterCurrentGoal()
    },
    [toggleFilterCurrentGoal]
  )
}
