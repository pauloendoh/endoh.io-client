import { Box, makeStyles } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ResourceDto } from "../../../../dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../../store/store"
import ResourceItem from "./ResourceItem/ResourceItem"

function ResourceList(props: Props) {
  const classes = useStyles()

  const moveResource = (tagId: number, fromIndex: number, toIndex: number) => {}

  return (
    <Box>
      {props.resources.map((resource, index) => (
        <ResourceItem
          key={resource.id}
          resource={resource}
          index={index}
          className={classes.resourceItem}
        />
      ))}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  resourceItem: {
    cursor: "grab",
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  resources: ResourceDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList)
