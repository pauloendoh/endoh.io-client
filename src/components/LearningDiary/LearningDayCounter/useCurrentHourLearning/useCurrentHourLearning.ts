import { useTheme } from "@mui/material"
import useAvgLearningPerHourQuery from "hooks/react-query/learning-diary/useAvgLearningPerHourQuery"
import { DateTime } from "luxon"
import { useMemo } from "react"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"
import { useTodayLearningCount } from "../useTodayLearningCount"

export const useCurrentHourLearning = () => {
  const theme = useTheme()
  const { topPercentage } = useLearningDiaryStore()
  const todayCount = useTodayLearningCount()

  const { data: avgLearningPerHours } =
    useAvgLearningPerHourQuery(topPercentage)

  const currentHour = DateTime.now().hour + 1
  const currentHourLearning = useMemo(() => {
    if (!avgLearningPerHours) return null
    return avgLearningPerHours.find(
      (avgLearning) => avgLearning.hour === currentHour
    )
  }, [avgLearningPerHours, currentHour])

  const colorCurrentTime = useMemo(() => {
    if (!avgLearningPerHours || !currentHourLearning) return "white"

    if (todayCount >= currentHourLearning.topPercentDaysLearningCount)
      return theme.palette.primary.main
    if (todayCount >= currentHourLearning.avgCount) return "white"
    return theme.palette.error.main
  }, [avgLearningPerHours, todayCount, currentHourLearning, currentHour])

  return { currentHourLearning, colorCurrentTime }
}
