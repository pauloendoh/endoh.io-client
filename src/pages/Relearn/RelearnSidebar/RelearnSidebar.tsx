import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
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
import PATHS from "consts/PATHS"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import { getTodoResources } from "utils/relearn/getTodoResources"
import { TagDto } from "../../../interfaces/dtos/relearn/TagDto"
import * as relearnActions from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"
import YourTagsLi from "./YourTagsLi/YourTagsLi"

function RelearnSidebar(props: Props) {
  const classes = useStyles()
  const theme = useTheme()

  const location = useLocation()

  // PE 2/3 - not worth having this?
  const [pathName, setPathName] = useState(location.pathname)
  useEffect(() => {
    setPathName(location.pathname)
  }, [location])

  const [publicLists, setPublicLists] = useState<TagDto[]>([])
  const [privateLists, setPrivateLists] = useState<TagDto[]>([])

  useEffect(() => {
    setPublicLists(props.tags.filter((t) => t.isPrivate === false))
    setPrivateLists(props.tags.filter((t) => t.isPrivate === true))
  }, [props.tags])

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
            <ListItemText primary="Add tag" />
          </ListItem>

          {/* PE 2/3 - Muito grande para mostrar apenas "Untagged - 16" */}
          {/* criar um <UntaggedLi/> ? */}
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

          {/* PE 2/3 - Dividir em um componente <YourTagsLi/> */}
          {/* <YourTagsLi lists={props.tags} type="public" /> */}

          <YourTagsLi lists={publicLists} type="public" />

          <YourTagsLi lists={privateLists} type="private" />
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
  startNewTag: () => dispatch(relearnActions.startNewTag(false)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(RelearnSidebar)
