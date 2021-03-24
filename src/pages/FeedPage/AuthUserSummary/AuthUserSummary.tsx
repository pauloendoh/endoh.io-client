import { Avatar, Box, Button, Link, makeStyles } from "@material-ui/core"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import { ApplicationState } from "../../../store/store"
import { Link as RouterLink } from "react-router-dom"
import PATHS from "../../../consts/PATHS"
import FollowingUsersDialog from "../../../components/feed/FollowingUsersDialog/FollowingUsersDialog"
import FollowersDialog from "../../../components/feed/FollowersDialog/FollowersDialog"
import ProfilePicture from "../../../components/shared/ProfilePicture/ProfilePicture"

// PE 3/3
const AuthUserSummary = (props: Props) => {
  const classes = useStyles()

  const [openFollowingUsersDialog, setOpenFollowingUsersDialog] = useState(
    false
  )
  const [openFollowersDialog, setOpenFollowersDialog] = useState(false)

  return (
    <Flex>
      {props.profile && (
        <ProfilePicture
          pictureUrl={props.profile.pictureUrl}
          username={props.authUser.username}
          isLink
          size={32}
        />
      )}

      <Box>
        <Link
          variant="button"
          color="inherit"
          component={RouterLink}
          to={PATHS.user.index(props.authUser.username)}
          style={{ marginLeft: 8 }}
        >
          {props.authUser.username}
        </Link>
        <Flex>
          {/* Following */}

          <Box>
            <Button onClick={() => setOpenFollowingUsersDialog(true)}>
              {props.followingUsers.length} Following
            </Button>
            <FollowingUsersDialog
              followingUsers={props.followingUsers}
              open={openFollowingUsersDialog}
              onClose={() => setOpenFollowingUsersDialog(false)}
            />
          </Box>

          {/* Followers */}
          <Box>
            <Button onClick={() => setOpenFollowersDialog(true)}>
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
    </Flex>
  )
}

const useStyles = makeStyles((theme) => ({}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,
  profile: state.auth.profile,
  followingUsers: state.auth.followingUsers,
  followers: state.auth.followers,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AuthUserSummary)
