import { DateTime } from "luxon"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
// PE 3/3
const ResourcesChart = (props: Props) => {
  const [lists, setLists] = useState<TagDto[]>([])

  const [data, setData] = useState([])

  // prepare the graphic
  useEffect(() => {
    // only recent resources (from yesterday and one week ago)
    const fromDate = DateTime.local()
      .plus({ days: -7 })
      .set({ hour: 0, minute: 0 })
    const toDate = DateTime.local()
      .plus({ days: 0 })
      .set({ hour: 23, minute: 59 })
    const recentResources = props.resources.filter((r) => {
      const date = DateTime.fromISO(r.completedAt)
      return date > fromDate && date < toDate
    })

    // get list ids
    const lists: TagDto[] = []
    const listIds: number[] = []
    for (const resource of recentResources) {
      if (resource.tag && !listIds.includes(resource.tag.id)) {
        listIds.push(resource.tag.id)
        lists.push(resource.tag)
      }
    }
    setLists(lists)

    // select the days
    const days: DateTime[] = []
    for (let i = 7; i >= 0; i--) {
      const day = DateTime.local()
        .plus({ days: i * -1 })
        .set({ hour: 0, minute: 0 })
      days.push(day)
    }

    console.log(lists)
    // fill the data of each day { name: "Tue", tagId1: 6, tagId3: 4, tagId5: 0 }
    const data = []
    for (const day of days) {
      const obj: any = {
        name: day.toFormat("ccc"),
      }
      for (const list of lists) {
        obj[list.name] = 0
      }
      const resourcesFromDay = recentResources.filter((r) => {
        const completedAt = DateTime.fromISO(r.completedAt)
        return completedAt.day === day.day
      })
      for (const resource of resourcesFromDay) {
        if (resource.tag) {
          obj[resource.tag.name]++
        }
      }
      data.push(obj)
    }
    setData(data)
    console.log(data)
  }, [props.resources])

  return (
    <LineChart
      width={450}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {lists.map((list) => (
        <Line
          key={list.id}
          type="monotone"
          dataKey={list.name}
          stroke={list.color}
        />
      ))}
      {/* <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      <Line type="monotone" dataKey="amt" stroke="#ffffff" /> */}
    </LineChart>
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
