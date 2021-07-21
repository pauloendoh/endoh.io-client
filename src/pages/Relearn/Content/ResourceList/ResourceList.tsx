import { Box, makeStyles } from "@material-ui/core"
import React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Virtuoso } from "react-virtuoso"
import { ResourceDto } from "../../../../interfaces/dtos/relearn/ResourceDto"
import DraggableResourceItem from "./DraggableResourceItem/DraggableResourceItem"
import ResourceItem from "./DraggableResourceItem/ResourceItem/ResourceItem"

function ResourceList({
  resources,
  isDraggable,
}: {
  resources: ResourceDto[]
  isDraggable: boolean
}) {
  const classes = useStyles()

  if (isDraggable)
  return (
    <DndProvider backend={HTML5Backend}>
      {resources.map((resource, index) => (
        <DraggableResourceItem
          key={resource.id}
          resource={resource}
          index={index}
          className={classes.resourceItem}
        />
      ))}
    </DndProvider>
  )

  return (
    <Virtuoso
      style={{ height: 600 }}
      totalCount={resources.length}
      itemContent={(index) => (
        <Box p={1} borderBottom="1px solid rgb(255 255 255 / 0.1)">
          <ResourceItem resource={resources[index]} />
        </Box>
      )}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  resourceItem: {
    cursor: "grab",
  },
}))

export default ResourceList
