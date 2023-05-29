import { Button } from "@mui/material"
import { useFollowersQuery } from "hooks/react-query/follow/useFollowersQuery"
import { useFollowingUsersQuery } from "hooks/react-query/follow/useFollowingUsersQuery"
import useFollowersDialogStore from "store/zustand/dialogs/useFollowersDialogStore"

type Props = {
  userId: number
}

const FollowersFollowingButtons = (props: Props) => {
  const { data: followers } = useFollowersQuery(props.userId)

  const { data: followingUsers } = useFollowingUsersQuery(props.userId)
  const { openDialog } = useFollowersDialogStore()

  return (
    <>
      <Button
        onClick={() =>
          openDialog({
            tab: "followers",
            userId: props.userId,
          })
        }
      >
        {followers?.length} Followers
      </Button>
      <Button
        onClick={() =>
          openDialog({
            tab: "following",
            userId: props.userId,
          })
        }
      >
        {followingUsers?.length} Following
      </Button>
    </>
  )
}

export default FollowersFollowingButtons
