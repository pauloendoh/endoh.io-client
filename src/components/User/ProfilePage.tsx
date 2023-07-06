import { Grid, Hidden, Typography } from "@mui/material"
import useUserSuggestionsQuery from "hooks/react-query/feed/useUserSuggestionsQuery"
import { useEffect, useMemo, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import useProfileStore, {
  resetProfileStore,
} from "store/zustand/domain/useProfileStore"
import useAuthStore from "store/zustand/useAuthStore"
import { urls } from "utils/urls"
import { UserInfoDto } from "../../types/domain/_common/UserInfoDto"
import myAxios from "../../utils/consts/myAxios"
import LoadingPage from "../_common/LoadingPage/LoadingPage"
import MinRatingButton from "../_common/MinRatingButton/MinRatingButton"
import UserSuggestions from "../_common/UserSuggestions/UserSuggestions"
import CompletedBookmarkedTabs from "./CompletedBookmarkedTabs/CompletedBookmarkedTabs"
import ProfileResources from "./FeedResources/ProfileResources"
import ProfileHeader from "./ProfileHeader/ProfileHeader"
import S from "./ProfilePage.styles"
import ResourcesChart from "./ResourcesChart/ResourcesChart"
import UserPageSidebar from "./UserPageSidebar/UserPageSidebar"

// PE 1/3 - renam eto UserProfilePage
const ProfilePage = () => {
  const history = useHistory()
  const { followingUsers } = useAuthStore()

  const { publicTags, privateTags, resources, profile, setUserInfo } =
    useProfileStore()

  const { username, tagId } = useParams<{
    username: string
    tagId: string
  }>()

  const [minRating, setMinRating] = useState(0)

  const { data: userSuggestions } = useUserSuggestionsQuery()

  const selectedTag = useMemo(() => {
    const tags = [...publicTags, ...privateTags]

    return tags.find((t) => t.id === Number(tagId))
  }, [publicTags, privateTags, tagId])

  const tagResources = useMemo(() => {
    return [...resources].filter((r) => {
      if (!!selectedTag) {
        return r.tag.id === selectedTag.id
      }
      return true
    })
  }, [resources, selectedTag])

  const [selectedTab, setTabValue] = useState<"completed" | "bookmarked">(
    "completed"
  )

  const visibleResources = useMemo(() => {
    return [...resources]
      .filter((r) => r.rating >= minRating)
      .filter((r) => {
        if (!!tagId) {
          return r.tag.id === Number(tagId)
        }
        return true
      })
      .filter((r) => {
        if (selectedTab === "completed") {
          return !!r.rating
        }
        return !r.rating
      })
  }, [tagResources, minRating, selectedTab])

  useEffect(
    () => {
      document.title = username + " - Relearn"

      resetProfileStore()

      myAxios
        .get<UserInfoDto>(urls.api.user.userInfo(username))
        .then((res) => {
          setUserInfo(res.data)
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            history.push(urls.pages.notFound)
          }
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  )

  return (
    <S.UserPageRoot>
      {profile === null ? (
        <LoadingPage />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={3} style={{ width: "22%" }}>
            <UserPageSidebar />
          </Grid>
          <Grid item xs={9} lg={5}>
            <ProfileHeader />

            <S.ChartWrapper>
              <ResourcesChart resources={tagResources} />
            </S.ChartWrapper>

            <S.ResourcesContentHeader alignItems={"center"}>
              <Typography variant="h5">
                {!selectedTag ? "All resources" : selectedTag.name}{" "}
              </Typography>

              <CompletedBookmarkedTabs
                value={selectedTab}
                onChange={setTabValue}
                resources={tagResources}
              />

              <MinRatingButton onChange={setMinRating} value={minRating} />
            </S.ResourcesContentHeader>

            <ProfileResources resources={visibleResources} />
          </Grid>

          <Grid item lg={4}>
            <Hidden lgDown>
              <S.UserSuggestionsWrapper>
                {userSuggestions?.length > 0 && (
                  <UserSuggestions
                    userSuggestions={userSuggestions}
                    followingTags={followingUsers}
                  />
                )}
              </S.UserSuggestionsWrapper>
            </Hidden>
          </Grid>
        </Grid>
      )}
    </S.UserPageRoot>
  )
}

export default ProfilePage
