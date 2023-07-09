import { Button } from "@mui/material"
import { useMyFollowingUsersQuery } from "hooks/react-query/follow/useMyFollowingUsersQuery"
import useToggleFollowMutation from "hooks/react-query/follow/useToggleFollowMutation"
import { useMemo } from "react"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"

type Props = {
  userId: number
}

const FollowButton = (props: Props) => {
  const { data: myFollows } = useMyFollowingUsersQuery()
  const { mutate } = useToggleFollowMutation()

  const isFollowing = useMemo(
    () => myFollows?.some((follow) => follow.followedUserId === props.userId),
    [myFollows, props.userId]
  )

  const { openConfirmDialog } = useConfirmDialogStore()
  const handleClick = () => {
    if (isFollowing) {
      openConfirmDialog({
        title: "Unfollow",
        description: "Are you sure you want to unfollow this user?",
        onConfirm: () => mutate(props.userId),
      })
      return
    }

    mutate(props.userId)
  }

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      sx={{
        backgroundColor: isFollowing ? "gray" : "primary.main",
        "&:hover": {
          backgroundColor: isFollowing ? "gray" : "primary.dark",
        },
      }}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}

export default FollowButton
