import { Typography } from "@mui/material"
import { upToNDecimals } from "endoh-utils"
import { useMemo } from "react"
import { MdArrowRightAlt } from "react-icons/md"
import { useLearningChartData } from "../LearningChart/useLearningChartData/useLearningChartData"
import { useCurrentHourLearning } from "../LearningDayCounter/useCurrentHourLearning/useCurrentHourLearning"
import { useTodayLearningCount } from "../LearningDayCounter/useTodayLearningCount"

type Props = {}

const HoursPointsToAchieve = (props: Props) => {
  const { chartData } = useLearningChartData()
  const lastData = useMemo(() => {
    return chartData[chartData.length - 1]
  }, [chartData])

  const { colorCurrentTime } = useCurrentHourLearning()

  const todayLearningCount = useTodayLearningCount()

  const hourPointsToAchieve = useMemo(() => {
    if (!lastData) return null

    const diffPoints = lastData.topPercentDaysAvgCount - todayLearningCount

    const currentHour = new Date().getHours()
    const diffHour = 24 - currentHour
    const diffPointsPerHour = diffPoints / diffHour

    return upToNDecimals(diffPointsPerHour, 1)
  }, [todayLearningCount, lastData])

  if (!lastData) return null
  return (
    <Typography
      color={colorCurrentTime}
      sx={{ display: "flex", alignItems: "center" }}
    >
      {hourPointsToAchieve} {"per hour "} <MdArrowRightAlt />
      {lastData.topPercentDaysAvgCount}
    </Typography>
  )
}

export default HoursPointsToAchieve
