import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box } from "@mui/material"
import useMultiSelectResource from "hooks/relearn/useMultiSelectResource"
import { useMemo, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { ResourceDto } from "../../../../../types/domain/relearn/ResourceDto"
import ResourceItem from "./ResourceItem/ResourceItem"

interface Props {
  resource: ResourceDto
  className?: string
  index: number
}

// PE 1/3
function DraggableResourceItem(props: Props) {
  const { moveResource } = useRelearnStore()

  const classes = useStyles()
  const { idIsSelected } = useMultiSelectResource()

  const { setErrorMessage } = useSnackbarStore()

  const [collected, dragRef] = useDrag({
    type: "CARD",
    item: { index: props.index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  const ref = useRef<HTMLDivElement>(null)

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedItem = item as any
      const draggedIndex = draggedItem.index as number
      const targetIndex = props.index

      if (draggedIndex === targetIndex) return

      const targetSize = ref.current?.getBoundingClientRect()
      const targetCenter =
        ((targetSize?.bottom || 0) - (targetSize?.top || 0)) / 2

      const draggedOffSet = monitor.getClientOffset()
      const draggedTop = (draggedOffSet?.y || 0) - (targetSize?.top || 0)

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return // ex: tentar arrastar o primeiro antes do segundo
      }
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return
      }

      // Disable dnd for completed items
      if (props.resource.completedAt.length > 0) {
        setErrorMessage("Completed items can't be moved")
        return
      }

      moveResource({
        tagId: props.resource.tag?.id ? props.resource.tag.id : 0,
        fromIndex: draggedIndex,
        toIndex: targetIndex,
      })

      draggedItem.index = targetIndex
    },
  })

  dragRef(ref)
  dropRef(ref)

  const canGrab = useMemo(() => {
    return props.resource.tag?.sortingBy === "default"
  }, [props.resource.tag?.sortingBy])

  return (
    <div
      ref={canGrab ? ref : undefined}
      style={{
        transform: "translate3d(0,0,0)",
      }}
    >
      <Box
        p={1}
        borderBottom="1px solid rgb(255 255 255 / 0.1)" // Could be a const?
        className={
          props.className +
          " resource-item " +
          (collected.isDragging ? classes.isDragging : "")
        }
        style={{
          background: idIsSelected(props.resource.id || 0)
            ? "rgb(255 255 255 / 0.1)"
            : "unset",
          cursor: canGrab ? "grab" : "unset",
        }}
      >
        <ResourceItem index={props.index} resource={props.resource} />
      </Box>
    </div>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  isDragging: {
    border: "1px dashed rgba(255, 255, 255, 0.2)",
  },
}))

export default DraggableResourceItem
