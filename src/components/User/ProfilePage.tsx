import { Grid, Hidden, Typography } from "@mui/material"
import useUserSuggestionsQuery from "hooks/react-query/feed/useUserSuggestionsQuery"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import useProfileStore, {
  resetProfileStore,
} from "store/zustand/domain/useProfileStore"
import useAuthStore from "store/zustand/useAuthStore"
import { ResourceDto } from "../../types/domain/relearn/ResourceDto"
import { TagDto } from "../../types/domain/relearn/TagDto"
import { UserInfoDto } from "../../types/domain/_common/UserInfoDto"
import myAxios from "../../utils/consts/myAxios"
import apiUrls from "../../utils/url/urls/apiUrls"
import pageUrls from "../../utils/url/urls/pageUrls"
import LoadingPage from "../_common/LoadingPage/LoadingPage"
import MinRatingButton from "../_common/MinRatingButton/MinRatingButton"
import UserSuggestions from "../_common/UserSuggestions/UserSuggestions"
import ProfileResources from "./FeedResources/ProfileResources"
import ProfileHeader from "./ProfileHeader/ProfileHeader"
import S from "./ProfilePage.styles"
import ResourcesChart from "./ResourcesChart/ResourcesChart"
import UserPageSidebar from "./UserPageSidebar/UserPageSidebar"

// PE 3/3
const ProfilePage = () => {
  const history = useHistory()
  const { followingUsers } = useAuthStore()

  const profileStore = useProfileStore()

  const { username, tagId } = useParams<{
    username: string
    tagId: string
  }>()

  const [filteredResources, setFilteredResources] = useState<ResourceDto[]>([])
  const [minRating, setMinRating] = useState(0)

  const { data: userSuggestions } = useUserSuggestionsQuery()

  const [filterByTag, setFilterByTag] = useState<TagDto>(null)

  // filtering resources by min rating
  useEffect(() => {
    const minResources = [...profileStore.resources].filter(
      (r) => r.rating >= minRating
    )

    const filtered = minResources.filter((r) => {
      if (tagId !== undefined) {
        const allTags = profileStore.publicTags.concat(profileStore.privateTags)
        setFilterByTag(allTags.find((t) => t.id === Number(tagId)))
        return r.tag?.id === Number(tagId)
      } else {
        setFilterByTag(null)
        return true
      }
    })

    setFilteredResources(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileStore.resources, minRating, tagId])

  useEffect(
    () => {
      document.title = username + " - Endoh.io"

      resetProfileStore()

      myAxios
        .get<UserInfoDto>(apiUrls.user.userInfo(username))
        .then((res) => {
          profileStore.setUserInfo(res.data)
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            history.push(pageUrls.notFound)
          }
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  )

  return (
    <S.UserPageRoot>
      {profileStore.profile === null ? (
        <LoadingPage />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={3} style={{ width: "22%" }}>
            <UserPageSidebar />
          </Grid>
          <Grid item xs={9} lg={5}>
            <ProfileHeader />

            <S.ChartWrapper>
              <ResourcesChart resources={filteredResources} />
            </S.ChartWrapper>

            <S.ResourcesContentHeader>
              <Typography variant="h5">
                {filterByTag === null ? "All resources" : filterByTag.name}{" "}
                {filteredResources.length > 0 && (
                  <>· {filteredResources.length}</>
                )}
              </Typography>
              <MinRatingButton onChange={setMinRating} value={minRating} />
            </S.ResourcesContentHeader>
            <ProfileResources resources={filteredResources} />
          </Grid>

          <Grid item lg={4}>
            <Hidden mdDown>
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
