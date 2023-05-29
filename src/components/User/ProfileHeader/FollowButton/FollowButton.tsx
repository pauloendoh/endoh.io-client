import { Button } from "@mui/material"
import { useMyFollowingUsersQuery } from "hooks/react-query/follow/useMyFollowingUsersQuery"
import useToggleFollowMutation from "hooks/react-query/follow/useToggleFollowMutation"
import { useMemo } from "react"

type Props = {
  userId: number
}

const FollowButton = (props: Props) => {
  const { data: myFollows } = useMyFollowingUsersQuery()
  const { mutate: submitToggle } = useToggleFollowMutation()

  const isFollowing = useMemo(
    () => myFollows?.some((follow) => follow.followedUserId === props.userId),
    [myFollows, props.userId]
  )

  return (
    <Button
      onClick={() => submitToggle(props.userId)}
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
