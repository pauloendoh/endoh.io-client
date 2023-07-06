import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteFromArray, upsert } from "endoh-utils"
import { useAxios } from "hooks/utils/useAxios"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { FollowDto } from "./types/FollowDto"

const useToggleFollowMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  const { setSuccessMessage } = useSnackbarStore()

  return useMutation(
    (followingUserId: number) =>
      axios
        .post<FollowDto | "deleted">(urls.api.toggleFollow(followingUserId))
        .then((res) => res.data),
    {
      onSuccess: (data, followedUserId) => {
        if (data === "deleted") {
          if (followedUserId) {
            queryClient.setQueryData<FollowDto[]>(
              [urls.api.myFollowingUsers],
              (curr) =>
                deleteFromArray(
                  curr,
                  (i) => i.followedUserId === followedUserId
                )
            )
          }

          setSuccessMessage("Unfollowed!")

          return
        }

        queryClient.setQueryData<FollowDto[]>(
          [urls.api.myFollowingUsers],
          (curr) => {
            return upsert(curr, data, (i) => i.id === data.id)
          }
        )

        setSuccessMessage("Followed!")
      },
    }
  )
}

export default useToggleFollowMutation
