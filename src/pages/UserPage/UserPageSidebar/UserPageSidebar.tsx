import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, List, ListItem, makeStyles, Typography } from "@material-ui/core"
import ListItemText from "@material-ui/core/ListItemText"
import LabelIcon from "@material-ui/icons/Label"
import React from "react"
import { connect } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import PATHS from "../../../consts/PATHS"
import { ApplicationState } from "../../../store/store"

// PE 3/3
const UserPageSidebar = (props: Props) => {
  const classes = useStyles()
  const { username, tagId } = useParams<{ username: string; tagId: string }>()

  const getResourcesFromListId = (listId: number) => {
    return props.resources.filter((r) => r.tag?.id === listId)
  }

  return (
    <Box maxWidth={300} ml="auto">
      <List component="nav" aria-label="User resource lists">
        <ListItem
          button
          component={Link}
          to={PATHS.user.index(username)}
          selected={tagId === undefined}
        >
          <ListItemText>
            All resources
            <Typography variant="inherit" className={classes.resourcesCount}>
              {props.resources.length}
            </Typography>
          </ListItemText>
        </ListItem>

        {props.publicLists.map((list) => (
          <ListItem
            button
            key={list.id}
            component={Link}
            to={PATHS.user.tag(username, list.id)}
            selected={Number(tagId) === list.id}
          >
            <ListItemText>
              <Flex>
                <LabelIcon style={{ color: list.color }} />
                <Box ml={1}>
                  {list.name}
                  <Typography
                    variant="inherit"
                    className={classes.resourcesCount}
                  >
                    {getResourcesFromListId(list.id).length}
                  </Typography>
                </Box>
              </Flex>
            </ListItemText>
          </ListItem>
        ))}
      </List>

      {props.privateLists.length > 0 && (
        <Box mt={2}>
          <FlexVCenter pl={2}>
            <FontAwesomeIcon icon={faLock} />
            <Box ml={1}>
              <Typography>Private tags</Typography>
            </Box>
          </FlexVCenter>

          <List component="nav" aria-label="User resource lists">
            {/* PE 1/3 - DRY  */}
            {props.privateLists.map((list) => (
              <ListItem
                button
                key={list.id}
                component={Link}
                to={PATHS.user.tag(username, list.id)}
                selected={Number(tagId) === list.id}
              >
                <ListItemText>
                  <Flex>
                    <LabelIcon style={{ color: list.color }} />
                    <Box ml={1}>
                      {list.name}
                      <Typography
                        variant="inherit"
                        className={classes.resourcesCount}
                      >
                        {getResourcesFromListId(list.id).length}
                      </Typography>
                    </Box>
                  </Flex>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  resourcesCount: {
    marginLeft: 8,
    fontSize: 12,
    color: theme.palette.grey[400],
  },
}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  resources: state.profile.resources,
  publicLists: state.profile.publicTags,
  privateLists: state.profile.privateTags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UserPageSidebar)
