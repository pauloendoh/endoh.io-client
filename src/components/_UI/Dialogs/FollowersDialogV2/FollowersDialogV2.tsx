import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
} from "@mui/material"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import ProfilePicture from "components/_UI/ProfilePicture/ProfilePicture"
import { useFollowersQuery } from "hooks/react-query/follow/useFollowersQuery"
import { useFollowingUsersQuery } from "hooks/react-query/follow/useFollowingUsersQuery"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { FollowersDialogValue } from "store/zustand/dialogs/useFollowersDialogStore"
import { urls } from "utils/urls"

const ariaLabel = "followers-dialog"

interface Props {
  isOpen: boolean
  initialValue: FollowersDialogValue
  onClose: () => void
}

const FollowersDialogV2 = (props: Props) => {
  const handleClose = () => {
    props.onClose()
  }

  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    setTabIndex(props.initialValue?.tab === "followers" ? 0 : 1)
  }, [props.initialValue])

  const { data: followers } = useFollowersQuery(props.initialValue.userId)

  const { data: followingUsers } = useFollowingUsersQuery(
    props.initialValue.userId
  )

  const visibleFollows = useMemo(
    () => (tabIndex === 0 ? followers : followingUsers) || [],
    [tabIndex, followers, followingUsers]
  )

  return (
    <Dialog
      onClose={handleClose}
      open={props.isOpen}
      fullWidth
      maxWidth="xs"
      aria-labelledby={ariaLabel}
    >
      <DialogTitle>
        <Tabs
          value={tabIndex}
          onChange={(_, newValue: number) => setTabIndex(newValue)}
        >
          <Tab label={`${followers?.length} Followers`} />
          <Tab label={`${followingUsers?.length} Following`} />
        </Tabs>
      </DialogTitle>
      <DialogContent>
        <FlexCol gap={1}>
          {visibleFollows.map((follow) => {
            const user = tabIndex === 0 ? follow.follower : follow.followedUser
            return (
              <FlexVCenter key={follow.id} gap={1}>
                {user && (
                  <>
                    <ProfilePicture
                      pictureUrl={user.profile.pictureUrl}
                      isLink
                      username={user.username}
                    />
                    <Link
                      to={urls.pages.user.index(user.username)}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                      onClick={handleClose}
                    >
                      <Typography>{user.username}</Typography>
                    </Link>
                  </>
                )}
              </FlexVCenter>
            )
          })}
        </FlexCol>
      </DialogContent>
    </Dialog>
  )
}

export default FollowersDialogV2
