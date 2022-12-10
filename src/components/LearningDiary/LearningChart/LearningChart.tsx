import { Theme, useMediaQuery, useTheme } from "@mui/material"
import useAvgLearningPerHourQuery from "hooks/react-query/progress-diary/useAvgLearningPerHourQuery"
import { DateTime } from "luxon"
import { useMemo } from "react"
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"
import useWindowFocus from "use-window-focus"
import { useTodayLearningCount } from "../LearningDayCounter/useTodayLearningCount"

interface Props {
  test?: string
}

const LearningChart = (props: Props) => {
  const theme = useTheme()

  const topPercentage = useLearningDiaryStore((s) => s.topPercentage)
  const { data: avgLearningPerHours, isLoading } = useAvgLearningPerHourQuery(
    topPercentage
  )

  const todayCount = useTodayLearningCount()

  const isFocused = useWindowFocus()

  const chartData = useMemo(() => {
    if (!avgLearningPerHours) return []

    const currentHour = DateTime.now().hour + 1

    return avgLearningPerHours
      .map((avgLearning) => {
        return {
          hour: avgLearning.hour,
          allAvgCount: avgLearning.count,
          topPercentDaysAvgCount: avgLearning.topPercentDaysLearningCount,
          nowCount: avgLearning.hour === currentHour ? todayCount : 0,
        }
      })
      .sort((a, b) => (a.hour < b.hour ? -1 : 1))
  }, [avgLearningPerHours, todayCount, isFocused])

  const isSmallScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  )
  const chartWidth = useMemo(() => (isSmallScreen ? 360 : 500), [isSmallScreen])

  if (isLoading) return null

  return (
    <>
      <LineChart
        width={chartWidth}
        height={isSmallScreen ? 200 : 200}
        data={chartData}
        style={{ marginLeft: isSmallScreen ? -16 : 24 }}
      >
        <XAxis
          dataKey="hour"
          angle={-45}
          textAnchor="end"
          interval={isSmallScreen ? undefined : 0}
          fontSize={12}
        />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line
          dot={false}
          type="monotone"
          dataKey="topPercentDaysAvgCount"
          stroke="gray"
        />

        <Line dot={false} type="monotone" dataKey="allAvgCount" stroke="gray" />

        <Line
          dot={false}
          type="monotone"
          dataKey="nowCount"
          stroke={theme.palette.primary.main}
        />
      </LineChart>
    </>
  )
}

export default LearningChart
