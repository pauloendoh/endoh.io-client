import { Box } from "@mui/material"
import Txt from "components/_UI/Text/Txt"
import { DateTime } from "luxon"
import { useMemo } from "react"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"
import { useCurrentHourLearning } from "./useCurrentHourLearning/useCurrentHourLearning"
import { useTodayLearningCount } from "./useTodayLearningCount"

interface Props {
  test?: string
}

const LearningDayCounter = (props: Props) => {
  const { selectedDate } = useLearningDiaryStore()

  const isToday = useMemo(
    () => selectedDate === DateTime.now().toISODate(),
    [selectedDate]
  )

  const learningCount = useTodayLearningCount()

  const { currentHourLearning, colorCurrentTime } = useCurrentHourLearning()

  return (
    <Box mr={2}>
      <Txt variant="h5" style={{ color: isToday ? colorCurrentTime : "white" }}>
        {learningCount} learnings {isToday && "today"} |{" "}
        {currentHourLearning?.avgCount} |{" "}
        {currentHourLearning?.topPercentDaysLearningCount}
      </Txt>
    </Box>
  )
}

export default LearningDayCounter
