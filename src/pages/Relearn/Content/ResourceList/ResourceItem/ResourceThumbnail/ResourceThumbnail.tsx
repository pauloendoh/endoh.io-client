import { Box, Link, makeStyles } from "@material-ui/core"
import EventIcon from "@material-ui/icons/Event"
import ScheduleIcon from "@material-ui/icons/Schedule"
import { DateTime } from "luxon"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FlexVCenter from "../../../../../../components/shared/Flexboxes/FlexVCenter"
import { ResourceDto } from "../../../../../../interfaces/dtos/relearn/ResourceDto"
// @ts-ignore
import descriptionPng from "../../../../../../static/images/description.png"
// @ts-ignore
import linkPng from "../../../../../../static/images/link.png"
import { ApplicationState } from "../../../../../../store/store"
import { validateEstimatedTime } from "../../../../../../utils/relearn/validateEstimatedTime"

// PE 2/3
function ResourceThumbnail(props: Props) {
  const classes = useStyles()

  const getThumbnailSrc = (resource: ResourceDto): string => {
    if (resource.thumbnail.length) {
      return resource.thumbnail
    }

    if (resource.url.length) {
      return linkPng
    }
    return descriptionPng
  }

  return (
    <Box mr={2}>
      <Box minWidth={75} width={75} position="relative">
        {/* estimated time */}
        {validateEstimatedTime(props.resource.estimatedTime) && (
          <FlexVCenter
            position="absolute"
            top={0}
            right={0}
            bgcolor="black"
            fontSize={12}
          >
            <ScheduleIcon fontSize="inherit" />
            {props.resource.estimatedTime}
          </FlexVCenter>
        )}

        {/* image */}
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

        {/* due date  */}
        {props.resource.dueDate.length > 0 &&
          props.resource.completedAt.length === 0 && (
            <FlexVCenter
              position="absolute"
              bottom={0}
              right={0}
              bgcolor="black"
              fontSize={12}
            >
              <EventIcon fontSize="inherit" />
              {DateTime.fromISO(props.resource.dueDate).toFormat("LLL dd")}
            </FlexVCenter>
          )}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  resource: ResourceDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(ResourceThumbnail)
