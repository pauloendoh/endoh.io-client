import { Box } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ResourceDto } from "../../../../dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../../store/store"
import ResourceItem from "./ResourceItem/ResourceItem"

function ResourceList(props: Props) {
  return (
    <Box borderTop="1px solid rgb(255 255 255 / 0.1)">
      {props.resources.map((resource) => (
        <ResourceItem key={resource.id} resource={resource} />
      ))}
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  resources: ResourceDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList)
