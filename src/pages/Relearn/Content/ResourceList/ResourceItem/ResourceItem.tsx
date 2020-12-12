import * as relearnActions from "../../../../../store/relearn/relearnActions"
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
import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import { ResourceDto } from "../../../../../dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../../../store/store"
import { isValidUrl } from "../../../../../utils/isValidUrl"
import RateButton from "./RateButton"

function ResourceItem(props: Props) {
  const classes = useStyles()

  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
    setAnchorEl(null) // avoids error "The `anchorEl` prop provided to the component is invalid"
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorEl(null)
  }

  return (
    <Flex
      p={2}
      borderBottom="1px solid rgb(255 255 255 / 0.1)"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.resource.thumbnail?.length > 0 && (
        <Box mr={2}>
          <Link href={props.resource.url} target="_blank">
            <img
              style={{ maxHeight: 75 }}
              alt={props.resource.thumbnail}
              src={props.resource.thumbnail}
            />
          </Link>
        </Box>
      )}
      <Box flexGrow={1}>
        <Flex justifyContent="space-between" className={classes.firstRow}>
          <Typography variant="subtitle1">{props.resource.title}</Typography>

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

            <MenuItem>
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
          <FlexVCenter>
            <Box pr={2}>{props.resource.estimatedTime}</Box>
            <Box pl={2} borderLeft="1px solid rgb(255 255 255)">
              {props.resource.dueDate}
            </Box>
          </FlexVCenter>

          <Flex ml="auto">
            <RateButton resource={props.resource} />

            {/* <Box ml={2}>| Delete</Box> */}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

const useStyles = makeStyles((theme) => ({
  link: {
    // fontSize: 12
  },
  listItemIcon: {
    width: 16,
  },
  firstRow: {
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
})

interface OwnProps {
  resource: ResourceDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(ResourceItem)
