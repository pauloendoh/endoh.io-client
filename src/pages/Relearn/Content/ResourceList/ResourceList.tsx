import { makeStyles } from "@material-ui/core"
import React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ResourceDto } from "../../../../interfaces/dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../../store/store"
import ResourceItem from "./ResourceItem/ResourceItem"

function ResourceList(props: Props) {
  const classes = useStyles()

  return (
    <DndProvider backend={HTML5Backend}>
      {props.resources.map((resource, index) => (
        <ResourceItem
          key={resource.id}
          resource={resource}
          index={index}
          className={classes.resourceItem}
        />
      ))}
    </DndProvider>
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
