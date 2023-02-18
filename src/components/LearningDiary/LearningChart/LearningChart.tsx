import { Theme, useMediaQuery, useTheme } from "@mui/material"
import { useMemo } from "react"
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { useLearningChartData } from "./useLearningChartData/useLearningChartData"

interface Props {
  test?: string
}

const LearningChart = (props: Props) => {
  const theme = useTheme()

  const { chartData, isLoading } = useLearningChartData()

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
