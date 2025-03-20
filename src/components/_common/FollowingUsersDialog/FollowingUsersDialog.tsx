import { Box, Dialog, DialogContent, DialogTitle, Link } from "@mui/material"
import { Link as RouterLink, useParams } from "react-router-dom"
import { FollowingUserDto } from "types/domain/feed/FollowingUserDto"
import { urls } from "utils/urls"
import Flex from "../../_UI/Flexboxes/Flex"
import ProfilePicture from "../../_UI/ProfilePicture/ProfilePicture"

interface Props {
  followingUsers: FollowingUserDto[]
  open: boolean
  onClose: () => void
}

// PE 2/3
const FollowingUsersDialog = (props: Props) => {
  const { username } = useParams<{ username: string }>()

  const onClose = () => {
    props.onClose()
  }

  if (!username) {
    return null
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
          {username?.length > 0 ? (
            <span>{username} is following</span>
          ) : (
            <span>You're following</span>
          )}
        </DialogTitle>

        <DialogContent>
          {props.followingUsers.map((followingUser) => (
            <Box key={followingUser.followingUser.userId} mb={3}>
              <Flex>
                <ProfilePicture
                  isLink
                  pictureUrl={followingUser.followingUser.pictureUrl}
                  username={followingUser.followingUser.username}
                  size={48}
                />

                <Box ml={2}>
                  <Box>
                    <Link
                      component={RouterLink}
                      variant="body1"
                      color="inherit"
                      to={urls.pages.user.index(
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

export default FollowingUsersDialog
