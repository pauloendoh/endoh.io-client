import {
  Box,
  createStyles, List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme, Typography
} from "@material-ui/core"
import PATHS from "consts/PATHS"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import MySidebar from "../../../components/shared/MySidebar"
import { TagDto } from "../../../interfaces/dtos/relearn/TagDto"
import { ApplicationState } from "../../../store/store"
import { getTodoResources } from "../../../utils/relearn/getTodoResources"
import RelearnSidebarTagList from "./RelearnSidebarTagList/RelearnSidebarTagList"

function RelearnSidebar(props: Props) {
  const [publicLists, setPublicLists] = useState<TagDto[]>([])
  const [privateLists, setPrivateLists] = useState<TagDto[]>([])
  useEffect(() => {
    setPublicLists(props.tags.filter((t) => t.isPrivate === false))
    setPrivateLists(props.tags.filter((t) => t.isPrivate === true))
  }, [props.tags])

  const location = useLocation()
  const isIndex = () => {
    return location.pathname === PATHS.relearn.index
  }

  const classes = useStyles()

  return (
    <MySidebar>
      <Box>
        <List disablePadding>
          {/* PE 2/3 - Muito grande para mostrar apenas "Untagged - 16" */}
          {/* criar um <UntaggedLi/> ? */}
          <ListItem
            button
            component={Link}
            to={PATHS.relearn.index}
            selected={isIndex()}
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

          <RelearnSidebarTagList lists={publicLists} type="public" />

          <Box mt={2} />
          <RelearnSidebarTagList lists={privateLists} type="private" />
        </List>
      </Box>
    </MySidebar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const mapDispatchToProps = (dispatch: Dispatch) => ({})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(RelearnSidebar)
