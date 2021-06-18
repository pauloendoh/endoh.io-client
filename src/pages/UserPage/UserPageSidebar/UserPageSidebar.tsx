import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, List, ListItem, makeStyles, Typography } from "@material-ui/core"
import ListItemText from "@material-ui/core/ListItemText"
import LabelIcon from "@material-ui/icons/Label"
import React, { useRef } from "react"
import { connect } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import FlexHCenter from "../../../components/shared/Flexboxes/FlexHCenter"
import PATHS from "../../../consts/PATHS"
import { ApplicationState } from "../../../store/store"
import useElementSize from "../../../utils/hooks/useElementSize"

// PE 3/3
const UserPageSidebar = (props: Props) => {
  const rootRef = useRef<any>(null)

  const { width, height } = useElementSize(rootRef)

  const classes = useStyles()
  const { username, tagId } = useParams<{ username: string; tagId: string }>()

  const getResourcesFromListId = (listId: number) => {
    return props.resources.filter((r) => r.tag?.id === listId)
  }

  return (
    <Box maxWidth={300} ml="auto" {...({ ref: rootRef } as any)}>
      <List component="nav" aria-label="User resource lists">
        <ListItem
          button
          component={Link}
          to={PATHS.user.index(username)}
          selected={tagId === undefined}
        >
          <ListItemText>
            <Flex>
              <Box width={width - 90}>
                <Typography noWrap style={{ maxWidth: "inherit" }}>
                  All resources
                </Typography>
              </Box>
            </Flex>
          </ListItemText>

          <FlexHCenter mt={0.5} width={24}>
            <Typography className={classes.resourcesCount}>
              {props.resources.length}
            </Typography>
          </FlexHCenter>
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
                <Box ml={1} width={width - 90}>
                  <Typography noWrap style={{ maxWidth: "inherit" }}>
                    {list.name}
                  </Typography>
                </Box>
              </Flex>
            </ListItemText>

            <FlexHCenter mt={0.5} width={24}>
              <Typography className={classes.resourcesCount}>
                {getResourcesFromListId(list.id).length}
              </Typography>
            </FlexHCenter>
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
                    <Box ml={1} width={width - 90}>
                      <Typography noWrap style={{ maxWidth: "inherit" }}>
                        {list.name}
                      </Typography>
                    </Box>
                  </Flex>
                </ListItemText>

                <FlexHCenter mt={0.5} width={24}>
                  <Typography className={classes.resourcesCount}>
                    {getResourcesFromListId(list.id).length}
                  </Typography>
                </FlexHCenter>
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
