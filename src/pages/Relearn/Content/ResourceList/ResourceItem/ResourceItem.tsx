import ScheduleIcon from "@material-ui/icons/Schedule"
import EventIcon from "@material-ui/icons/Event"

import DoneIcon from "@material-ui/icons/Done"
import { faGlobeAmericas, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Link, makeStyles, Typography } from "@material-ui/core"
import RootRef from "@material-ui/core/RootRef"
import React, { useRef, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { connect } from "react-redux"
import TimeAgo from "react-timeago"
import { Dispatch } from "redux"
import RateButton from "../../../../../components/resources/RateButton/RateButton"
import Flex from "../../../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import MyTextField from "../../../../../components/shared/MyInputs/MyTextField"
import API from "../../../../../consts/API"
import MY_AXIOS from "../../../../../consts/MY_AXIOS"
import { ResourceDto } from "../../../../../interfaces/dtos/relearn/ResourceDto"
import { IMoveResource } from "../../../../../interfaces/relearn/IMoveResource"
import * as relearnActions from "../../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../../store/store"
import * as utilsActions from "../../../../../store/utils/utilsActions"
import { validateEstimatedTime } from "../../../../../utils/relearn/validateEstimatedTime"
import { getDomainFromUrl } from "../../../../../utils/url/getDomainFromUrl"
import { urlIsValid } from "../../../../../utils/url/isValidUrl"
import ResourceMoreIcon from "./ResourceMoreIcon/ResourceMoreIcon"
import ResourceThumbnail from "./ResourceThumbnail/ResourceThumbnail"
import { DateTime } from "luxon"

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

  const handleSaveRating = (rating: number) => {
    const resource = { ...props.resource, rating } as ResourceDto
    MY_AXIOS.post<ResourceDto[]>(API.relearn.resource, resource).then((res) => {
      props.setResources(res.data)

      if (resource.rating) {
        props.setSuccessMessage("Resource rated!")
      } else {
        props.setSuccessMessage("Rating removed!")
      }
    })
  }

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
        <ResourceThumbnail resource={props.resource} />

        <Box flexGrow={1}>
          <Flex className={classes.firstRow}>
            {/* 'More' icon - PE 1/3 - can be a specific component */}
            {/* <Box>
              {urlIsValid(props.resource.url) ? (
                <>
                  <Link
                    className={classes.link}
                    href={props.resource.url}
                    target="_blank"
                  >
                    {props.resource.title}
                  </Link>
                  <span
                    style={{
                      marginRight: 16,
                      display: "inline-flex",
                      opacity: 0.75,
                    }}
                  >
                    ({getDomainFromUrl(props.resource.url)})
                  </span>
                </>
              ) : (
                <span style={{ marginRight: 16 }}>{props.resource.title}</span>
              )} */}

            {/* {props.resource.estimatedTime.length > 0 && (
                <span
                  style={{
                    marginRight: 16,
                    display: "inline-flex",
                    position: "relative",
                    top: 5,
                  }}
                >
                  <ScheduleIcon fontSize="small" />
                  {props.resource.estimatedTime}
                </span>
              )} */}

            {/* {props.resource.dueDate.length > 0 && (
                <span
                  style={{
                    display: "inline-flex",
                    marginRight: 16,
                    position: "relative",
                    top: 5,
                  }}
                >
                  <EventIcon fontSize="small" />
                  {DateTime.fromISO(props.resource.dueDate).toFormat("LLL dd")}
                </span>
              )} */}
            {/* </Box> */}

            <Box>
              <Typography>{props.resource.title}</Typography>
              {props.resource.url.length > 0 && (
                <Link
                  className={classes.link}
                  href={props.resource.url}
                  target="_blank"
                >
                  <Typography noWrap style={{ maxWidth: "inherit" }}>
                    {props.resource.url}
                  </Typography>
                </Link>
              )}
            </Box>
            <ResourceMoreIcon resource={props.resource} isHovered={isHovered} />
          </Flex>

          <FlexVCenter justifyContent="space-between">
            <FlexVCenter>
              {/* Due date */}
              {props.resource.dueDate.length > 0 &&
                props.resource.completedAt.length === 0 && (
                  <FlexVCenter mr={2}>
                    <EventIcon fontSize="inherit" style={{ marginRight: 4 }} />
                    {DateTime.fromISO(props.resource.dueDate).toFormat(
                      "LLL dd"
                    )}
                  </FlexVCenter>
                )}

              {/* Completed timeago */}
              {props.resource.completedAt.length > 0 && (
                <FlexVCenter mr={2}>
                  <DoneIcon />
                  &nbsp;
                  <TimeAgo date={props.resource.completedAt} live={false} />
                </FlexVCenter>
              )}

              {/* Duration */}
              {validateEstimatedTime(props.resource.estimatedTime) && (
                <FlexVCenter mr={2}>
                  <ScheduleIcon style={{ marginRight: 4 }} />
                  {props.resource.estimatedTime}
                </FlexVCenter>
              )}
            </FlexVCenter>

            <RateButton resource={props.resource} onChange={handleSaveRating} />
          </FlexVCenter>

          {props.resource.publicReview?.length > 0 && (
            <Box mt={2}>
              <MyTextField
                value={props.resource.publicReview}
                fullWidth
                label={
                  <FlexVCenter>
                    <FontAwesomeIcon
                      icon={faGlobeAmericas}
                      style={{ marginRight: 4 }}
                    />
                    Public Review
                  </FlexVCenter>
                }
                disabled
                multiline
              />
            </Box>
          )}

          {props.resource.privateNote?.length > 0 && (
            <Box mt={2}>
              <MyTextField
                value={props.resource.privateNote}
                fullWidth
                multiline
                label={
                  <FlexVCenter>
                    <FontAwesomeIcon icon={faLock} style={{ marginRight: 4 }} />
                    Private Notes
                  </FlexVCenter>
                }
                disabled
              />
            </Box>
          )}
        </Box>
      </Flex>
    </RootRef>
  )
}

const useStyles = makeStyles((theme) => ({
  link: {
    // fontSize: 12
    maxWidth: 400,
    overflow: "hidden",
    marginRight: 16,
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
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) =>
    dispatch(relearnActions.editResource(resource)),
  removeResource: (id: number) => dispatch(relearnActions.removeResource(id)),
  moveResource: (params: IMoveResource) =>
    dispatch(relearnActions.moveResource(params)),

  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),

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
