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
  const { onCtrlClick, idIsSelected, onShiftClick } = useMultiSelectResource()

  if (isDraggable)
    return (
      <>
        {resources.map((resource, index) => (
          <div
            key={resource.id}
            onClick={(e) => {
              if (e.ctrlKey && resource.id) {
                e.preventDefault()
                onCtrlClick(resource.id)
              }

              if (e.shiftKey) {
                e.preventDefault()
                onShiftClick(
                  resources.map((r) => r.id || 0),
                  resource.id || 0
                )
              }
            }}
          >
            <DraggableResourceItem resource={resource} index={index} />
          </div>
        ))}
      </>
    )

  return (
    <Virtuoso
      useWindowScroll
      totalCount={resources.length}
      itemContent={(index) => (
        <Box
          p={1}
          borderBottom="1px solid rgb(255 255 255 / 0.1)"
          style={{
            background: idIsSelected(resources[index].id || 0)
              ? "rgb(255 255 255 / 0.1)"
              : "unset",
          }}
          onClick={(e) => {
            if (e.ctrlKey) {
              e.preventDefault()
              onCtrlClick(resources[index].id || 0)
            }

            if (e.shiftKey) {
              e.preventDefault()
              onShiftClick(
                resources.map((r) => r.id || 0),
                resources[index].id || 0
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

export default ResourceList
