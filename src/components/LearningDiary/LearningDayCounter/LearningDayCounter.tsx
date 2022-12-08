import { Box, useTheme } from "@mui/material"
import Txt from "components/_UI/Text/Txt"
import useFilteredLearnings from "hooks/learning-diary/useFilteredLearnings"
import useAvgLearningPerHourQuery from "hooks/react-query/progress-diary/useAvgLearningPerHourQuery"
import { DateTime } from "luxon"
import { useMemo } from "react"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"
import { useTodayLearningCount } from "./useTodayLearningCount"

interface Props {
  test?: string
}

const LearningDayCounter = (props: Props) => {
  const { selectedDate, topPercentage } = useLearningDiaryStore()
  const learnings = useFilteredLearnings(selectedDate)

  const isToday = useMemo(() => selectedDate === DateTime.now().toISODate(), [
    selectedDate,
  ])

  const learningCount = useMemo(() => {
    return learnings.reduce(
      (total, learning) => (learning.isHighlight ? total + 2 : total + 1),
      0
    )
  }, [learnings])

  const todayCount = useTodayLearningCount()

  const { data: avgLearningPerHours } = useAvgLearningPerHourQuery(
    topPercentage
  )

  const currentHour = DateTime.now().hour + 1
  const currentHourLearning = useMemo(() => {
    if (!avgLearningPerHours) return null
    return avgLearningPerHours.find(
      (avgLearning) => avgLearning.hour === currentHour
    )
  }, [avgLearningPerHours, currentHour])

  const theme = useTheme()

  const colorCurrentTime = useMemo(() => {
    if (!avgLearningPerHours || !currentHourLearning) return "white"

    if (todayCount >= currentHourLearning.topPercentDaysLearningCount)
      return theme.palette.primary.main
    if (todayCount >= currentHourLearning.count) return "white"
    return theme.palette.error.main
  }, [avgLearningPerHours, todayCount, currentHourLearning, currentHour])

  // const colorDay = useCloserColorAvgLearning(learningCount)
  // const colorCurrentTime = useColorAtCurrentTime(learningCount)

  return (
    <Box mr={2}>
      <Txt variant="h5" style={{ color: isToday ? colorCurrentTime : "white" }}>
        {learningCount} learnings {isToday && "today"} |{" "}
        {currentHourLearning?.count} |{" "}
        {currentHourLearning?.topPercentDaysLearningCount}
      </Txt>
    </Box>
  )
}

export default LearningDayCounter
