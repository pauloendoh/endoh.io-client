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
import LabelIcon from "@material-ui/icons/Label"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import API from "consts/API"
import MY_AXIOS from "consts/MY_AXIOS"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, Redirect, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import TagMoreIcon from "../../../../components/resources/TagMoreIcon/TagMoreIcon"
import Flex from "../../../../components/shared/Flexboxes/Flex"
import PATHS from "../../../../consts/PATHS"
import { TagDto } from "../../../../interfaces/dtos/relearn/TagDto"
import * as relearnActions from "../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../store/store"
import * as utilsActions from "../../../../store/utils/utilsActions"
import { getTodoResources } from "../../../../utils/relearn/getTodoResources"

// PE 2/3 - MenuItem could be shorter?
function TagListItem(props: Props) {
  const classes = useStyles()
  const location = useLocation()

  // PE 2/3 -  desnecessário?
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

  const [redirectTo, setRedirectTo] = useState("")

  // handleDelete would be better?
  const handleDeleteTag = (id: number) => {
    if (window.confirm("Confirm delete?")) {
      MY_AXIOS.delete(`${API.relearn.tag}/${id}`).then((res) => {
        props.setSuccessMessage("Tag deleted!")

        if (pathName.endsWith(id.toString())) {
          setRedirectTo(PATHS.relearn.index)
        }

        props.removeTag(id)
      })
    }
  }

  return (
    <ListItem
      key={props.tag.id}
      className={classes.tagListItem + " tag-item"}
      button
      component={Link}
      to={PATHS.relearn.tag + "/" + props.tag.id}
      selected={pathName === PATHS.relearn.tag + "/" + props.tag.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ListItemText>
        <Flex>
          <LabelIcon style={{ color: props.tag.color }} />
          <Box ml={1}>
            {props.tag.name}
            <Typography variant="inherit" className={classes.resourcesCount}>
              {getTodoResources(props.tag.resources).length}
            </Typography>
          </Box>
        </Flex>
      </ListItemText>

      {/* PE 1/3 - transformar em um componente próprio */}
      <TagMoreIcon
        show={isHovered}
        afterDelete={() => {
          if (pathName.endsWith(props.tag.id.toString())) {
            setRedirectTo(PATHS.relearn.index)
          }
        }}
        tag={props.tag}
      />

      {redirectTo.length > 0 && <Redirect to={redirectTo} />}
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
      position: "absolute",
      width: 32,
      height: 32,
      right: 0,
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
  removeTag: (id: number) => dispatch(relearnActions.removeTag(id)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
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
