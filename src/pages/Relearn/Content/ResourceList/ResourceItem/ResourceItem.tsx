import { Box, Link, makeStyles, Typography } from "@material-ui/core"
import RootRef from "@material-ui/core/RootRef"
import EventIcon from "@material-ui/icons/Event"
import ScheduleIcon from "@material-ui/icons/Schedule"
import { DateTime } from "luxon"
import React, { useRef, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { connect } from "react-redux"
import TimeAgo from "react-timeago"
import { Dispatch } from "redux"
import Flex from "../../../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import { ResourceDto } from "../../../../../interfaces/dtos/relearn/ResourceDto"
import { IMoveResource } from "../../../../../interfaces/relearn/IMoveResource"
import descriptionPng from "../../../../../static/images/description.png"
import linkPng from "../../../../../static/images/link.png"
import * as relearnActions from "../../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../../store/store"
import * as utilsActions from "../../../../../store/utils/utilsActions"
import { urlIsValid } from "../../../../../utils/url/isValidUrl"
import RateButton from "./RateButton"
import ResourceMoreIcon from "./ResourceMoreIcon/ResourceMoreIcon"

// PE 1/3
function ResourceItem(props: Props) {
  const classes = useStyles()

  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const getThumbnailSrc = (resource: ResourceDto): string => {
    if (resource.thumbnail.length) {
      return resource.thumbnail
    }

    if (resource.url.length) {
      return linkPng
    }
    return descriptionPng
  }

  const validateEstimatedTime = (estimatedTime: string) => {
    if (
      // invalid estimated times
      estimatedTime === "  :  h" ||
      estimatedTime === "00:00h" ||
      estimatedTime === ""
    ) {
      return false
    }
    return true
  }

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "CARD", index: props.index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  const ref = useRef<HTMLDivElement>()

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedItem = item as any
      const draggedIndex = draggedItem.index as number
      const targetIndex = props.index

      if (draggedIndex === targetIndex) return

      const targetSize = ref.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2

      const draggedOffSet = monitor.getClientOffset()
      const draggedTop = draggedOffSet.y - targetSize.top

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return // ex: tentar arrastar o primeiro antes do segundo
      }
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return
      }

      // Disable dnd for completed items
      if (props.resource.completedAt.length > 0) {
        props.setErrorMessage("Completed items can't be moved")
        return
      }

      props.moveResource({
        tagId: props.resource.tag ? props.resource.tag.id : null,
        fromIndex: draggedIndex,
        toIndex: targetIndex,
      })

      draggedItem.index = targetIndex
    },
  })

  dragRef(dropRef(ref))
  // const StyledFlex = styled(Flex)``

  return (
    <RootRef rootRef={ref}>
      <Flex
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        p={1}
        borderBottom="1px solid rgb(255 255 255 / 0.1)" // Could be a const?
        className={
          props.className +
          " resource-item " +
          (isDragging ? classes.isDragging : "")
        }
      >
        {/* PE 1/3 - DRY */}
        <Box mr={2} minWidth={75} width={75}>
          {props.resource.url.length > 0 ? (
            <Link href={props.resource.url} target="_blank">
              <img
                style={{ width: "100%" }}
                alt={props.resource.thumbnail}
                src={getThumbnailSrc(props.resource)}
              />
            </Link>
          ) : (
            <img
              style={{ width: "100%" }}
              alt={props.resource.thumbnail}
              src={getThumbnailSrc(props.resource)}
            />
          )}
        </Box>

        <Box flexGrow={1}>
          <Flex className={classes.firstRow}>
            <Typography variant="body1">{props.resource.title}</Typography>

            {/* 'More' icon - PE 1/3 - can be a specific component */}
            <ResourceMoreIcon resource={props.resource} isHovered={isHovered} />
          </Flex>
          {urlIsValid(props.resource.url) && (
            <Link
              className={classes.link}
              href={props.resource.url}
              target="_blank"
            >
              {props.resource.url}
            </Link>
          )}

          <Flex my={1}>
            {props.resource.completedAt.length ? (
              <FlexVCenter>
                Completed&nbsp;
                <TimeAgo date={props.resource.completedAt} live={false} />
              </FlexVCenter>
            ) : (
              <FlexVCenter>
                {validateEstimatedTime(props.resource.estimatedTime) && (
                  <FlexVCenter pr={2}>
                    <FlexVCenter mr={1}>
                      <ScheduleIcon fontSize="small" />
                    </FlexVCenter>
                    {props.resource.estimatedTime}
                  </FlexVCenter>
                )}

                {props.resource.dueDate.length > 0 && (
                  <FlexVCenter
                    className={
                      validateEstimatedTime(props.resource.estimatedTime)
                        ? classes.dueDateBox
                        : ""
                    }
                  >
                    <FlexVCenter mr={1}>
                      <EventIcon fontSize="small" />
                    </FlexVCenter>
                    {DateTime.fromISO(props.resource.dueDate).toFormat(
                      "LLL dd"
                    )}
                  </FlexVCenter>
                )}
              </FlexVCenter>
            )}

            <Flex ml="auto">
              <RateButton resource={props.resource} />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </RootRef>
  )
}

const useStyles = makeStyles((theme) => ({
  link: {
    // fontSize: 12
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  isDragging: {
    border: "1px dashed rgba(255, 255, 255, 0.2)",
  },
  dueDateBox: {
    paddingLeft: 16,
    borderLeft: "1px solid rgb(255 255 255)",
  },
  listItemIcon: {
    width: 16,
  },
  firstRow: {
    justifyContent: "space-between",
    minHeight: 32,
    alignItems: "stretch",
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) =>
    dispatch(relearnActions.editResource(resource)),
  removeResource: (id: number) => dispatch(relearnActions.removeResource(id)),
  moveResource: (params: IMoveResource) =>
    dispatch(relearnActions.moveResource(params)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

interface OwnProps {
  resource: ResourceDto
  className?: string
  index: number
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(ResourceItem)
