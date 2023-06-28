import { useTodayLearningCount } from "components/LearningDiary/LearningDayCounter/useTodayLearningCount"
import useAvgLearningPerHourQuery from "hooks/react-query/learning-diary/useAvgLearningPerHourQuery"
import { DateTime } from "luxon"
import { useMemo } from "react"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"
import useWindowFocus from "use-window-focus"

export const useLearningChartData = () => {
  const topPercentage = useLearningDiaryStore((s) => s.topPercentage)

  const { data: avgLearningPerHours, isLoading } =
    useAvgLearningPerHourQuery(topPercentage)

  const todayCount = useTodayLearningCount()

  const isFocused = useWindowFocus()

  const chartData = useMemo(() => {
    if (!avgLearningPerHours) return []

    const currentHour = DateTime.now().hour + 1

    return avgLearningPerHours
      .map((avgLearning) => {
        return {
          hour: avgLearning.hour,
          allAvgCount: avgLearning.avgCount,
          topPercentDaysAvgCount: avgLearning.topPercentDaysLearningCount,
          nowCount: avgLearning.hour === currentHour ? todayCount : 0,
        }
      })
      .sort((a, b) => (a.hour < b.hour ? -1 : 1))
  }, [avgLearningPerHours, todayCount, isFocused])

  return { chartData, isLoading }
}
