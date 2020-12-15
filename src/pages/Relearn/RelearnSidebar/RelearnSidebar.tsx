import { faPlus, faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  Collapse,
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import PATHS from "consts/PATHS"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import { getTodoResources } from "utils/relearn/getTodoResources"
import API from "../../../consts/API"
import { TagDto } from "../../../dtos/relearn/TagDto"
import * as relearnActions from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"
import myAxios from "../../../utils/myAxios"
import AddTagForm from "./AddTagForm"
import TagListItem from "./TagListItem"

function RelearnSidebar(props: Props) {
  const classes = useStyles()
  const theme = useTheme()

  const location = useLocation()
  const [pathName, setPathName] = useState(location.pathname)
  useEffect(() => {
    setPathName(location.pathname)
  }, [location])

  const [openTags, setOpenTags] = useState(true)
  const handleClickTags = () => {
    setOpenTags(!openTags)
  }

  const [tagFormIsOpen, setTagFormIsOpen] = useState(false)
  const handleClickAddTag = () => {
    setTagFormIsOpen(!tagFormIsOpen)
  }

  const [isLoadingTags, setIsLoadingTags] = useState(true)
  useEffect(
    () => {
      myAxios.get<TagDto[]>(API.relearn.tag).then((res) => {
        props.setTags(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box className={classes.drawerContainer}>
        <List disablePadding>
          <ListItem
            button
            component={Link}
            to={PATHS.relearn.index}
            selected={pathName === PATHS.relearn.index}
          >
            <ListItemText>
              Untagged
              <Typography variant="inherit" className={classes.resourcesCount}>
                {
                  getTodoResources(
                    props.resources.filter((resource) => resource.tag === null)
                  ).length
                }
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem button onClick={handleClickTags}>
            <ListItemIcon className={classes.listItemIcon}>
              <FontAwesomeIcon icon={faTags} />
            </ListItemIcon>
            <ListItemText primary="Your Tags" />
            {openTags ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openTags} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {props.tags.map((tag) => (
                <TagListItem key={tag.id} tag={tag} />
              ))}

              {tagFormIsOpen ? (
                <ListItem className={classes.nested}>
                  {/* Probably this will not be used anymore, just the dialog */}
                  <AddTagForm
                    onCloseForm={() => {
                      setTagFormIsOpen(false)
                    }}
                  />
                </ListItem>
              ) : (
                <ListItem
                  button
                  className={classes.nested}
                  id="add-tag-button"
                  onClick={() => {
                    props.startNewTag()
                  }}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      color={theme.palette.primary.main}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Add Tag" />
                </ListItem>
              )}
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
      flexShrink: 0,
    },

    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },

    drawerPaper: {
      width: 300,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
    drawerContainer: {
      // overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    listItemIcon: {
      minWidth: 32,
    },
    resourcesCount: {
      marginLeft: 8,
      fontSize: 12,
      color: theme.palette.grey[400],
    },
  })
)

const mapStateToProps = (state: ApplicationState) => ({
  tags: state.relearn.tags,
  resources: state.relearn.resources,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  startNewTag: () => dispatch(relearnActions.startNewTag()),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(RelearnSidebar)
