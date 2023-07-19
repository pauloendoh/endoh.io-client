import { Box, Link } from "@mui/material"
import FollowersFollowingButtons from "components/User/ProfileHeader/FollowersFollowingButtons/FollowersFollowingButtons"
import { Link as RouterLink } from "react-router-dom"
import useAuthStore from "store/zustand/useAuthStore"
import { urls } from "utils/urls"
import Flex from "../../_UI/Flexboxes/Flex"
import ProfilePicture from "../../_UI/ProfilePicture/ProfilePicture"

const AuthUserSummary = () => {
  const { authUser, profile } = useAuthStore()

  if (!authUser) return null

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
          <FollowersFollowingButtons userId={authUser.id} />
        </Flex>
      </Box>
    </Flex>
  )
}

export default AuthUserSummary
