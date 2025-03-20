import { Box, Button, Link, Typography } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useState } from "react"
import { useParams } from "react-router-dom"
import useProfileStore from "store/zustand/domain/useProfileStore"
import useAuthStore from "store/zustand/useAuthStore"
import Flex from "../../_UI/Flexboxes/Flex"
import ProfilePicture from "../../_UI/ProfilePicture/ProfilePicture"
import EditProfileDialog from "./EditProfileDialog/EditProfileDialog"
import FollowButton from "./FollowButton/FollowButton"
import FollowDialog from "./FollowDialog/FollowDialog"
import FollowersFollowingButtons from "./FollowersFollowingButtons/FollowersFollowingButtons"

// PE 2/3
const ProfileHeader = () => {
  const { username } = useParams<{ username: string }>()
  const { authUser } = useAuthStore()

  const [openProfileDialog, setOpenProfileDialog] = useState(false)
  const [openFollowDialog, setOpenFollowDialog] = useState(false)

  const { profile } = useProfileStore()

  if (!profile || !username) return null

  return (
    <Flex>
      <Box>
        <ProfilePicture
          username={username}
          isLink={false}
          pictureUrl={profile.pictureUrl}
          size={64}
        />
      </Box>
      <Box ml={2}>
        <FlexVCenter>
          <div style={{ marginRight: 16 }}>
            {profile.fullName.length > 0 && (
              <Box mr={3}>
                <Typography variant="h5">{profile.fullName}</Typography>
              </Box>
            )}
            <Box style={{ opacity: 0.75 }}>
              <Typography variant="body1">{username}</Typography>
            </Box>
          </div>

          {profile?.userId === authUser?.id ? (
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
              <FollowButton userId={profile.userId} />
              {/* {isFollowing(profileStore.profile.userId, authFollowingTags) ? (
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
              )} */}

              <FollowDialog
                open={openFollowDialog}
                onClose={() => setOpenFollowDialog(false)}
              />
            </Box>
          )}
        </FlexVCenter>

        <Box mt={2}>
          <Typography style={{ whiteSpace: "pre-line" }}>
            {profile?.bio}
          </Typography>
        </Box>
        <Box mt={1}>
          {profile?.website.length > 0 && (
            <Link href={profile?.website}>
              <Typography>{profile?.website}</Typography>
            </Link>
          )}
        </Box>

        <Flex mt={3} gap={2}>
          <FollowersFollowingButtons userId={profile.userId} />

          {/* <FollowingButtonDialog /> */}

          {/* FollowersButtonDialog */}
          {/* <Box ml={2} />
          <FollowersButtonDialog /> */}
        </Flex>
      </Box>
    </Flex>
  )
}

export default ProfileHeader
