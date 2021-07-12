import { Box, Button, Link, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import ProfilePicture from "../../../components/shared/ProfilePicture/ProfilePicture"
import { ApplicationState } from "../../../store/store"
import { isFollowing } from "../../../utils/feed/isFollowing"
import EditProfileDialog from "./EditProfileDialog/EditProfileDialog"
import FollowDialog from "./FollowDialog/FollowDialog"
import FollowersButtonDialog from "./FollowersButtonDialog/FollowersButtonDialog"
import FollowingButtonDialog from "./FollowingButtonDialog/FollowingButtonDialog"

// PE 2/3
const ProfileHeader = (props: Props) => {
  const { username } = useParams<{ username: string }>()

  const [openProfileDialog, setOpenProfileDialog] = useState(false)
  const [openFollowDialog, setOpenFollowDialog] = useState(false)

  return (
    <Flex>
      <Box>
        <ProfilePicture
          username={username}
          isLink={false}
          pictureUrl={props.profile.pictureUrl}
          size={64}
        />
      </Box>
      <Box ml={2}>
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
          <Typography variant="body1">{username}</Typography>
        </Box>

        <Box mt={2}>
          <Typography style={{ whiteSpace: "pre-line" }}>
            {props.profile?.bio}
          </Typography>
        </Box>
        <Box mt={1}>
          {props.profile?.website.length > 0 && (
            <Link href={props.profile?.website}>
              <Typography>{props.profile?.website}</Typography>
            </Link>
          )}
        </Box>

        <Flex mt={3}>
          <FollowingButtonDialog />

          {/* FollowersButtonDialog */}
          <Box ml={2} />
          <FollowersButtonDialog />
        </Flex>
      </Box>
    </Flex>
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
