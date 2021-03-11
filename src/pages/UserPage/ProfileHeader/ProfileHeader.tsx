import { Box, Button, Link, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import { ApplicationState } from "../../../store/store"
import EditProfileDialog from "./EditProfileDialog/EditProfileDialog"
import FollowDialog from "./FollowDialog/FollowDialog"
import FollowingUsersDialog from "../../../components/feed/FollowingUsersDialog/FollowingUsersDialog"
import FollowersDialog from "../../../components/feed/FollowersDialog/FollowersDialog"
import { isFollowing } from "../../../utils/feed/isFollowing"
// PE 3/3
const ProfileHeader = (props: Props) => {
  const { username } = useParams<{ username: string }>()

  const [openProfileDialog, setOpenProfileDialog] = useState(false)
  const [openFollowDialog, setOpenFollowDialog] = useState(false)

  const [openFollowingUsersDialog, setOpenFollowingUsersDialog] = useState(
    false
  )
  const [openFollowersDialog, setOpenFollowersDialog] = useState(false)

  return (
    <Box>
      <Flex>
        {props.profile?.fullName.length > 0 && (
          <Box mr={3}>
            <Typography variant="h5">{props.profile.fullName}</Typography>
          </Box>
        )}
        {props.profile?.userId === props.authUser.id ? (
          <Box>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => setOpenProfileDialog(true)}
            >
              Edit Profile
            </Button>
            <EditProfileDialog
              open={openProfileDialog}
              onClose={() => setOpenProfileDialog(false)}
            />
          </Box>
        ) : (
          <Box>
            {isFollowing(props.profile.userId, props.authFollowingTags) ? (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => setOpenFollowDialog(true)}
              >
                Following
              </Button>
            ) : (
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => setOpenFollowDialog(true)}
              >
                Follow
              </Button>
            )}

            <FollowDialog
              open={openFollowDialog}
              onClose={() => setOpenFollowDialog(false)}
            />
          </Box>
        )}
      </Flex>

      <Box style={{ opacity: 0.75 }}>
        <Typography variant="body1">@{username}</Typography>
      </Box>

      <Box mt={2}>
        <Typography>{props.profile?.bio}</Typography>
      </Box>
      <Box mt={1}>
        {props.profile?.website.length > 0 && (
          <Link href={props.profile?.website}>{props.profile?.website}</Link>
        )}
      </Box>

      {/* PE 1/3 - separar em subcomponente */}
      <Flex mt={3}>
        {/* Following */}

        <Box>
          <Button
            size="small"
            onClick={() => setOpenFollowingUsersDialog(true)}
          >
            {props.followingUsers.length} Following
          </Button>
          <FollowingUsersDialog
            followingUsers={props.followingUsers}
            open={openFollowingUsersDialog}
            onClose={() => setOpenFollowingUsersDialog(false)}
          />
        </Box>

        {/* Followers */}
        <Box ml={2}>
          <Button size="small" onClick={() => setOpenFollowersDialog(true)}>
            {props.followers.length} Followers
          </Button>
          <FollowersDialog
            followers={props.followers}
            open={openFollowersDialog}
            onClose={() => setOpenFollowersDialog(false)}
          />
        </Box>
      </Flex>
    </Box>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,
  authFollowingTags: state.auth.followingTags,

  profile: state.profile.profile,
  followingUsers: state.profile.followingUsers,
  followers: state.profile.followers,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader)
