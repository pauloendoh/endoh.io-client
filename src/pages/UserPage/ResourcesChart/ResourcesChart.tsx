import { Box, FormControl, MenuItem, Select } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Dispatch } from "redux"
import { ResourceDto } from "../../../interfaces/dtos/relearn/ResourceDto"
import { TagDto } from "../../../interfaces/dtos/relearn/TagDto"
import {
  clearProfile,
  setProfileResources,
} from "../../../store/profile/profileActions"
import { ApplicationState } from "../../../store/store"
import { getLastWeekResourcesForChart } from "../../../utils/feed/getLastWeekResourcesForChart"
import { getLastYearResourcesForChart } from "../../../utils/feed/getLastYearResourcesForChart"

type ChartRange = "Last week" | "Last year"

// PE 3/3
const ResourcesChart = (props: Props) => {
  const [lists, setLists] = useState<TagDto[]>([])
  const [data, setData] = useState([])

  const [chartRange, setChartRange] = useState<ChartRange>("Last year")

  // prepare the graphic
  useEffect(() => {
    if (chartRange === "Last week") {
      const { lists, data } = getLastWeekResourcesForChart(props.resources)
      setLists(lists)
      setData(data)
    } else if (chartRange === "Last year") {
      const { lists, data } = getLastYearResourcesForChart(props.resources)
      setLists(lists)
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
          contentStyle={{
            background: "#292929",
            border: "none",
            borderRadius: 3,
          }}
        />
        <Legend margin={{ top: 8 }} />
        {lists.map((list) => (
          <Bar
            key={list.id}
            type="monotone"
            dataKey={list.name}
            stackId="a"
            fill={list.color}
          >
            {/* <LabelList dataKey={list.name} /> */}
          </Bar>
        ))}
      </BarChart>
    </Box>
  )
}

interface OwnProps {
  resources: ResourceDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearProfile: () => dispatch(clearProfile()),

  setProfileResources: (resources: ResourceDto[]) =>
    dispatch(setProfileResources(resources)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesChart)
