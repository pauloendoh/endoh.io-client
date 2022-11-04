import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box } from "@mui/material"
import useMultiSelectResource from "hooks/relearn/useMultiSelectResource"
import { Virtuoso } from "react-virtuoso"
import { ResourceDto } from "../../../../types/domain/relearn/ResourceDto"
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

  const { onCtrlClick, idIsSelected, onShiftClick } = useMultiSelectResource()

  if (isDraggable)
    return (
      <>
        {resources.map((resource, index) => (
          <div
            key={resource.id}
            onClick={(e) => {
              if (e.ctrlKey) {
                e.preventDefault()
                onCtrlClick(resource.id)
              }

              if (e.shiftKey) {
                e.preventDefault()
                onShiftClick(
                  resources.map((r) => r.id),
                  resource.id
                )
              }
            }}
          >
            <DraggableResourceItem
              resource={resource}
              index={index}
              className={classes.resourceItem}
            />
          </div>
        ))}
      </>
    )

  return (
    <Virtuoso
      style={{ height: "calc(100vh - 384px)" }}
      totalCount={resources.length}
      itemContent={(index) => (
        <Box
          p={1}
          borderBottom="1px solid rgb(255 255 255 / 0.1)"
          style={{
            background: idIsSelected(resources[index].id)
              ? "rgb(255 255 255 / 0.1)"
              : "unset",
          }}
          onClick={(e) => {
            if (e.ctrlKey) {
              e.preventDefault()
              onCtrlClick(resources[index].id)
            }

            if (e.shiftKey) {
              e.preventDefault()
              onShiftClick(
                resources.map((r) => r.id),
                resources[index].id
              )
            }
          }}
        >
          <ResourceItem resource={resources[index]} />
        </Box>
      )}
    />
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  resourceItem: {
    cursor: "grab",
  },
}))

export default ResourceList
