import { Box, Link, makeStyles } from "@material-ui/core"
import React, { useState } from "react"
import { connect } from "react-redux"
import TimeAgo from "react-timeago"
import { Dispatch } from "redux"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import { ResourceDto } from "../../interfaces/dtos/relearn/ResourceDto"
import { IMoveResource } from "../../interfaces/relearn/IMoveResource"
import ResourceMoreIcon from "../../pages/Relearn/Content/ResourceList/ResourceItem/ResourceMoreIcon/ResourceMoreIcon"
import ResourceThumbnail from "../../pages/Relearn/Content/ResourceList/ResourceItem/ResourceThumbnail/ResourceThumbnail"
import * as relearnActions from "../../store/relearn/relearnActions"
import { ApplicationState } from "../../store/store"
import * as utilsActions from "../../store/utils/utilsActions"
import { validateEstimatedTime } from "../../utils/relearn/validateEstimatedTime"
import { getDomainFromUrl } from "../../utils/url/getDomainFromUrl"
import { urlIsValid } from "../../utils/url/isValidUrl"
import RateButton from "../resources/RateButton/RateButton"
import Flex from "../shared/Flexboxes/Flex"
import FlexVCenter from "../shared/Flexboxes/FlexVCenter"
import MyTextField from "../shared/MyInputs/MyTextField"

function FeedResourceItem(props: Props) {
  const classes = useStyles()

  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

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
    <Flex
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      p={1}
      borderBottom="1px solid rgb(255 255 255 / 0.1)" // Could be a const?
    >
      {/* PE 1/3 - DRY */}
      <ResourceThumbnail resource={props.resource} />

      <Box flexGrow={1}>
        <Flex className={classes.firstRow}>
          {/* 'More' icon - PE 1/3 - can be a specific component */}
          <Box>
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
            )}
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
          </Box>

          <ResourceMoreIcon resource={props.resource} isHovered={isHovered} />
        </Flex>

        <Flex mt={1}>
          <RateButton resource={props.resource} onChange={handleSaveRating} />
          <Flex ml="auto">
            {props.resource.completedAt.length ? (
              <FlexVCenter>
                Completed&nbsp;
                <TimeAgo date={props.resource.completedAt} live={false} />
              </FlexVCenter>
            ) : (
              <FlexVCenter>
                {/* {validateEstimatedTime(props.resource.estimatedTime) && (
                  <FlexVCenter pr={2}>
                   
                  </FlexVCenter>
                )} */}

                {props.resource.dueDate.length > 0 && (
                  <FlexVCenter
                    className={
                      validateEstimatedTime(props.resource.estimatedTime)
                        ? classes.dueDateBox
                        : ""
                    }
                  ></FlexVCenter>
                )}
              </FlexVCenter>
            )}
          </Flex>
        </Flex>

        {props.resource.publicReview?.length > 0 && (
          <Box mt={2}>
            <MyTextField
              value={props.resource.publicReview}
              fullWidth
              label="Public Review"
              disabled
            />
          </Box>
        )}

        {props.resource.privateNote?.length > 0 && (
          <Box mt={2}>
            <MyTextField
              value={props.resource.privateNote}
              fullWidth
              label="Private Notes"
              disabled
            />
          </Box>
        )}
      </Box>
    </Flex>
  )
}

const useStyles = makeStyles((theme) => ({
  link: {
    // fontSize: 12
    maxWidth: 400,
    overflow: "hidden",
    marginRight: 16,
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
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

interface OwnProps {
  resource: ResourceDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(FeedResourceItem)
