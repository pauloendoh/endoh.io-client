import {
  Box,
  createStyles,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import { getTodoResources } from "../../../utils/relearn/getTodoResources"
import PATHS from "../../../consts/PATHS"
import { TagDto } from "../../../dtos/relearn/TagDto"
import * as relearnActions from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"

function TagListItem(props: Props) {
  const classes = useStyles()

  const location = useLocation()
  const [pathName, setPathName] = useState(location.pathname)
  useEffect(() => {
    setPathName(location.pathname)
  }, [location])

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
    <ListItem
      key={props.tag.id}
      className={classes.tagListItem}
      button
      component={Link}
      to={PATHS.relearn.tag + "/" + props.tag.id}
      selected={pathName === PATHS.relearn.tag + "/" + props.tag.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ListItemText>
        {"# " + props.tag.name}
        <Typography variant="inherit" className={classes.resourcesCount}>
          {getTodoResources(props.tag.resources).length}
        </Typography>
      </ListItemText>

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
            props.editTag(props.tag)
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
    </ListItem>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tagListItem: {
      paddingLeft: theme.spacing(4),
      alignItems: "flex-start",
    },
    moreButtonBox: {
      width: 32,
      height: 32,
    },

    listItemIcon: {
      width: 16,
    },
    resourcesCount: {
      marginLeft: 8,
      fontSize: 12,
      color: theme.palette.grey[400],
    },
  })
)

const mapStateToProps = (state: ApplicationState) => ({
  // user: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  editTag: (tag: TagDto) => dispatch(relearnActions.editTag(tag)),
  // logout: () => dispatch(logoutActionCreator(dispatch)),
})

interface OwnProps {
  tag: TagDto
  // onCloseForm: () => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(TagListItem)
