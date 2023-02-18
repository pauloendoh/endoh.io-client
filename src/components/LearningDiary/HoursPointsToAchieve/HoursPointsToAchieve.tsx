import { Typography } from "@mui/material"
import { upToNDecimals } from "endoh-utils"
import { useMemo } from "react"
import { useLearningChartData } from "../LearningChart/useLearningChartData/useLearningChartData"
import { useCurrentHourLearning } from "../LearningDayCounter/useCurrentHourLearning/useCurrentHourLearning"
import { useTodayLearningCount } from "../LearningDayCounter/useTodayLearningCount"

type Props = {}

const HoursPointsToAchieve = (props: Props) => {
  const { chartData } = useLearningChartData()
  const lastData = useMemo(() => {
    return chartData[chartData.length - 1]
  }, [chartData])

  const { colorCurrentTime, currentHourLearning: avgHourLearning } =
    useCurrentHourLearning()

  const todayLearningCount = useTodayLearningCount()

  const hourPointsToAchieve = useMemo(() => {
    if (!lastData) return null

    const diffPoints = lastData.topPercentDaysAvgCount - todayLearningCount

    const currentHour = new Date().getHours() + 1
    const diffHour = 24 - currentHour
    const diffPointsPerHour = diffPoints / diffHour

    return upToNDecimals(diffPointsPerHour, 1)
  }, [avgHourLearning, todayLearningCount])

  if (!lastData) return null
  return (
    <Typography color={colorCurrentTime}>
      {hourPointsToAchieve} {"per hour -> "}
      {lastData.topPercentDaysAvgCount}
    </Typography>
  )
}

export default HoursPointsToAchieve
