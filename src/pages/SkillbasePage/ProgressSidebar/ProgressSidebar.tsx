import {
  Box,
  createStyles,
  Drawer,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { TagDto } from "../../../interfaces/dtos/relearn/TagDto"
import * as relearnActions from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"

function ProgressSidebar(props: Props) {
  const classes = useStyles()

  useEffect(
    () => {
      MY_AXIOS.get<TagDto[]>(API.relearn.tag).then((res) => {
        props.setTags(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Drawer
      anchor="right"
      className={classes.root}
      variant="persistent"
      open={props.sidebarIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box className={classes.drawerContainer}>Kinda cringe lol</Box>
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
  })
)

const mapStateToProps = (state: ApplicationState) => ({
  sidebarIsOpen: state.skillbase.sidebarIsOpen
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  startNewTag: () => dispatch(relearnActions.startNewTag()),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(ProgressSidebar)
