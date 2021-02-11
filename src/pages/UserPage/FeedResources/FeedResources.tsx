import { Box } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FeedResourceItem from "../../../components/feed/FeedResourceItem"
import { ResourceDto } from "../../../interfaces/dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../store/store"

// PE 3/3
const FeedResources = (props: Props) => {
  const [resourcesPerDay, setResourcesPerDay] = useState<ResourcesPerDay[]>([])

  // separating resources per day
  useEffect(() => {
    const resourcesPerDay: ResourcesPerDay[] = []
    // const days: string[] = []

    for (const resource of props.resources) {
      const day = resource.completedAt.substring(0, 10)
      const index = resourcesPerDay.findIndex((r) => r.day === day)
      if (~index) {
        resourcesPerDay[index].resources = [
          ...resourcesPerDay[index].resources,
          resource,
        ]
      } else {
        resourcesPerDay.push({ day: day, resources: [resource] })
      }
    }

    setResourcesPerDay(resourcesPerDay)
  }, [props.resources])

  return (
    <Box mt={3}>
      {resourcesPerDay.map((rpd) => (
        // <Box mb={2} key={rpd.day}>
        //   {new Date(new Date(rpd.day).setHours(12)).toISOString()}
        //   <ReactTimeago date={rpd.day} live={false} />

        <Box>
          {rpd.resources.map((resource) => (
            <FeedResourceItem key={resource.id} resource={resource} />
          ))}
        </Box>

        // </Box>
      ))}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface ResourcesPerDay {
  day: string
  resources: ResourceDto[]
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedResources)
