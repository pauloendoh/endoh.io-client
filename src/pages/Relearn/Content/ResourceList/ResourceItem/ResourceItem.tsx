import {
  Box,
  IconButton,
  Link,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import API from "consts/API"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { connect } from "react-redux"
import TimeAgo from "react-timeago"
import { Dispatch } from "redux"
import myAxios from "utils/myAxios"
import Flex from "../../../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import { ResourceDto } from "../../../../../dtos/relearn/ResourceDto"
import * as relearnActions from "../../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../../store/store"
import * as utilsActions from "../../../../../store/utils/utilsActions"
import { isValidUrl } from "../../../../../utils/isValidUrl"
import RateButton from "./RateButton"

// PE 1/3
function ResourceItem(props: Props) {
  const classes = useStyles()

  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
    setAnchorEl(null) // Avoids error: "The `anchorEl` prop provided to the component is invalid"
  }

  // Anchor when you click 'More' icon
  const [anchorEl, setAnchorEl] = useState(null)
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorEl(null)
  }

  const handleDeleteResource = (id: number) => {
    if (window.confirm("Confirm delete?")) {
      myAxios.delete(`${API.relearn.resource}/${id}`).then((res) => {
        props.setSuccessMessage("Resource deleted!")

        props.removeResource(id)
      })
    }
  }

  return (
    <Flex
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      p={2}
      borderBottom="1px solid rgb(255 255 255 / 0.1)" // Could be a const?
      className="resource-item"
    >
      {/* PE 2/3 - Thumbnail */}
      <Box mr={2} minWidth={100} width={100}>
        {props.resource.thumbnail?.length > 0 && (
          <Link href={props.resource.url} target="_blank">
            <img
              style={{ width: "100%" }}
              alt={props.resource.thumbnail}
              src={props.resource.thumbnail}
            />
          </Link>
        )}
      </Box>

      <Box flexGrow={1}>
        <Flex className={classes.firstRow}>
          <Typography variant="h6">{props.resource.title}</Typography>

          {/* 'More' icon - PE 1/3 - can be a specific component */}
          <Box className={classes.moreButtonBox}>
            {isHovered && (
              <IconButton
                size="small"
                aria-label="tag-more"
                onClick={(e) => {
                  e.preventDefault()
                  handleOpenMore(e)
                }}
              >
                <MoreHorizIcon />
              </IconButton>
            )}
          </Box>
          <Menu
            id="tag-more"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={(e) => {
              const event = e as any
              event.preventDefault()
              handleCloseMore()
            }}
          >
            <MenuItem
              onClick={(e) => {
                e.preventDefault()
                props.editResource(props.resource)
              }}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                Edit
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleDeleteResource(props.resource.id)
              }}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                Delete
              </Typography>
            </MenuItem>
          </Menu>
        </Flex>
        {isValidUrl(props.resource.url) && (
          <Link
            className={classes.link}
            href={props.resource.url}
            target="_blank"
          >
            {props.resource.url}
          </Link>
        )}

        <Flex my={2}>
          {props.resource.completedAt.length ? (
            <FlexVCenter>
              Completed&nbsp;
              <TimeAgo date={props.resource.completedAt} live={false} />
            </FlexVCenter>
          ) : (
            <FlexVCenter>
              <Box pr={2}>{props.resource.estimatedTime}</Box>
              {props.resource.dueDate.length > 0 && (
                <Box pl={2} borderLeft="1px solid rgb(255 255 255)">
                  {DateTime.fromISO(props.resource.dueDate).toFormat("LLL dd")}
                </Box>
              )}
            </FlexVCenter>
          )}

          <Flex ml="auto">
            <RateButton resource={props.resource} />
          </Flex>
        </Flex>
      </Box>
    </Flex>
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
  listItemIcon: {
    width: 16,
  },
  firstRow: {
    justifyContent: "space-between",
    minHeight: 32,
  },
  moreButtonBox: {
    width: 32,
    height: 32,
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) =>
    dispatch(relearnActions.editResource(resource)),
  removeResource: (id: number) => dispatch(relearnActions.removeResource(id)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
})

interface OwnProps {
  resource: ResourceDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(ResourceItem)
