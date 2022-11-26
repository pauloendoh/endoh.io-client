import { useTheme } from "@mui/material"
import useAvgLearningPerHourQuery from "hooks/react-query/progress-diary/useAvgLearningPerHourQuery"
import { DateTime } from "luxon"
import { useMemo } from "react"
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import useWindowFocus from "use-window-focus"
import { useTodayLearningCount } from "../LearningDayCounter/useTodayLearningCount"

interface Props {
  test?: string
}

const LearningChart = (props: Props) => {
  const theme = useTheme()

  const { data: avgLearningPerHours, isLoading } = useAvgLearningPerHourQuery()

  const todayCount = useTodayLearningCount()

  const isFocused = useWindowFocus()

  const data = useMemo(() => {
    if (!avgLearningPerHours) return []

    const currentHour = DateTime.now().hour

    return avgLearningPerHours.map((lp) => {
      return {
        ...lp,
        count: lp.count,
        hour: getCorrectedHour(currentHour),
        nowCount: getCorrectedHour(currentHour) === lp.hour ? todayCount : 0,
      }
    })
  }, [avgLearningPerHours, todayCount, isFocused])

  const getCorrectedHour = (hour: number) => {
    const hourOffset = new Date().getTimezoneOffset() / 60
    return Math.abs(hour - hourOffset)
  }

  if (isLoading) return null

  return (
    <>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dot={false} type="monotone" dataKey="count" stroke="gray" />
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
