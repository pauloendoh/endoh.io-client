import { Box, FormControl, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"
import { TagDto } from "../../../types/domain/relearn/TagDto"
import { getLastWeekResourcesForChart } from "../../../utils/feed/getLastWeekResourcesForChart"
import { getLastYearResourcesForChart } from "../../../utils/feed/getLastYearResourcesForChart"

type ChartRange = "Last week" | "Last year"

interface Props {
  resources: FeedResourceDto[]
}

// PE 3/3
const ResourcesChart = (props: Props) => {
  const [tags, setTags] = useState<TagDto[]>([])
  const [data, setData] = useState<any[]>([])

  const [chartRange, setChartRange] = useState<ChartRange>("Last year")

  // prepare the graphic
  useEffect(() => {
    if (chartRange === "Last week") {
      const { tags, data } = getLastWeekResourcesForChart(props.resources)
      setTags(tags)
      setData(data)
    } else if (chartRange === "Last year") {
      const { tags, data } = getLastYearResourcesForChart(props.resources)
      setTags(tags)
      setData(data)
    }
  }, [props.resources, chartRange])

  return (
    <Box>
      <Box ml={25}>
        <FormControl variant="outlined" size="small">
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={chartRange}
            onChange={(e) => setChartRange(e.target.value as ChartRange)}
          >
            <MenuItem value={"Last week" as ChartRange}>Last week</MenuItem>
            <MenuItem value={"Last year" as ChartRange}>Last year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 32, left: 32 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis orientation="right" allowDecimals={false} />

        <Tooltip
          wrapperStyle={{
            zIndex: 1000,
          }}
          contentStyle={{
            background: "#292929",
            border: "none",
            borderRadius: 3,
          }}
        />
        <Legend margin={{ top: 8 }} />
        {tags.map((tag) => (
          <Bar
            key={tag.id}
            type="monotone"
            dataKey={tag.name}
            stackId="a"
            fill={tag.color}
          ></Bar>
        ))}
      </BarChart>
    </Box>
  )
}

export default ResourcesChart
