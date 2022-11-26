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

  const getCorrectedHour = (hour: number) => {
    const hourOffset = new Date().getTimezoneOffset() / 60
    console.log({
      hour,
      hourOffset,
      result: Math.abs(hour - hourOffset),
    })

    const result = hour - hourOffset
    if (result < 0) return 24 + result // result is negative
    return result
  }

  const data = useMemo(() => {
    if (!avgLearningPerHours) return []

    const currentHour = DateTime.now().hour

    return avgLearningPerHours
      .map((lp) => {
        return {
          ...lp,
          count: lp.count,
          hour: getCorrectedHour(lp.hour),
          nowCount: getCorrectedHour(lp.hour) === currentHour ? todayCount : 0,
        }
      })
      .sort((a, b) => (a.hour < b.hour ? -1 : 1))
  }, [avgLearningPerHours, todayCount, isFocused])

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
