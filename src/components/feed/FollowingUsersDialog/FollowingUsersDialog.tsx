import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  List,
  ListItem,
} from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { Link as RouterLink, useParams } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../shared//Flexboxes/Flex"
import PATHS from "../../../consts/PATHS"
import { FollowingTagDto } from "../../../dtos/feed/FollowingTagDto"
import { setFollowingTags } from "../../../store/auth/authActions"
import { ApplicationState } from "../../../store/store"
import * as utilsActions from "../../../store/utils/utilsActions"
import { FollowingUserDto } from "../../../dtos/feed/FollowingUserDto"

// PE 2/3
const FollowingUsersDialog = (props: Props) => {
  const { username } = useParams<{ username: string }>()

  const onClose = () => {
    props.onClose()
  }

  return (
    <Dialog
      onClose={onClose}
      open={props.open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="following-users-dialog"
    >
      <Box pb={1} px={1}>
        <DialogTitle id="following-users-title">
          @{username} is following
        </DialogTitle>

        <DialogContent>
          {props.followingUsers.map((followingUser) => (
            <Box key={followingUser.followingUser.userId} mb={3}>
              <Flex>
                <Avatar alt={followingUser.followingUser.username}>
                  {followingUser.followingUser.username[0]}
                </Avatar>
                <Box ml={2}>
                  <Box>
                    <Link
                      component={RouterLink}
                      variant="body1"
                      color="inherit"
                      to={PATHS.user.index(
                        followingUser.followingUser.username
                      )}
                    >
                      <b>{followingUser.followingUser.username}</b>
                    </Link>
                  </Box>
                  <Box>{followingUser.followingUser.fullName}</Box>
                  <Box>
                    Following {followingUser.tags.length}{" "}
                    {followingUser.tags.length > 1 ? "tags" : "tag"}
                  </Box>
                </Box>
              </Flex>
            </Box>
          ))}
        </DialogContent>
      </Box>
    </Dialog>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setFollowingTags: (followingTags: FollowingTagDto[]) =>
    dispatch(setFollowingTags(followingTags)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

interface OwnProps {
  followingUsers: FollowingUserDto[]
  open: boolean
  onClose: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingUsersDialog)
