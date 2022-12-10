import { Box, Button, Link } from "@mui/material"
import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import useAuthStore from "store/zustand/useAuthStore"
import { urls } from "utils/urls"
import FollowersDialog from "../../_common/FollowersDialog/FollowersDialog"
import FollowingUsersDialog from "../../_common/FollowingUsersDialog/FollowingUsersDialog"
import Flex from "../../_UI/Flexboxes/Flex"
import ProfilePicture from "../../_UI/ProfilePicture/ProfilePicture"

// PE 3/3
const AuthUserSummary = () => {
  const { authUser, profile, followingUsers, followers } = useAuthStore()

  const [openFollowersDialog, setOpenFollowersDialog] = useState(false)
  const [openFollowingUsersDialog, setOpenFollowingUsersDialog] = useState(
    false
  )

  return (
    <Flex>
      {profile && (
        <ProfilePicture
          pictureUrl={profile.pictureUrl}
          username={authUser.username}
          isLink
          size={32}
        />
      )}

      <Box>
        <Link
          variant="button"
          color="inherit"
          component={RouterLink}
          to={urls.pages.user.index(authUser.username)}
          style={{ marginLeft: 8 }}
        >
          {authUser.username}
        </Link>
        <Flex>
          {/* Following */}

          <Box>
            <Button onClick={() => setOpenFollowingUsersDialog(true)}>
              {followingUsers.length} Following
            </Button>
            <FollowingUsersDialog
              followingUsers={followingUsers}
              open={openFollowingUsersDialog}
              onClose={() => setOpenFollowingUsersDialog(false)}
            />
          </Box>

          {/* Followers */}
          <Box>
            <Button onClick={() => setOpenFollowersDialog(true)}>
              {followers.length} Followers
            </Button>
            <FollowersDialog
              followers={followers}
              open={openFollowersDialog}
              onClose={() => setOpenFollowersDialog(false)}
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default AuthUserSummary
