import { Box, Grid, Hidden, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Dispatch } from "redux"
import UserSuggestions from "../../components/feed/UserSuggestions/UserSuggestions"
import {
  IWithRedirectProps,
  withRedirect,
} from "../../components/hocs/withRedirect"
import MinRatingButton from "../../components/resources/MinRatingButton/MinRatingButton"
import Flex from "../../components/shared/Flexboxes/Flex"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import PATHS from "../../consts/PATHS"
import { UserInfoDto } from "../../dtos/UserInfoDto"
import { ResourceDto } from "../../interfaces/dtos/relearn/ResourceDto"
import { TagDto } from "../../interfaces/dtos/relearn/TagDto"
import {
  clearProfile,
  setProfileResources,
  setUserInfo,
} from "../../store/profile/profileActions"
import { ApplicationState } from "../../store/store"
import LoadingPage from "../index/LoadingPage"
import FeedResources from "./FeedResources/FeedResources"
import ProfileHeader from "./ProfileHeader/ProfileHeader"
import ResourcesChart from "./ResourcesChart/ResourcesChart"
import UserPageLists from "./UserPageLists/UserPageLists"

// PE 3/3
const UserPage = (props: Props) => {
  const { username, tagId } = useParams<{
    username: string
    tagId: string
  }>()

  const [filteredResources, setFilteredResources] = useState<ResourceDto[]>([])
  const [minRating, setMinRating] = useState(0)

  const [tag, setTag] = useState<TagDto>(null)

  // filtering resources by min rating
  useEffect(() => {
    const minResources = [...props.resources].filter(
      (r) => r.rating >= minRating
    )

    const filtered = minResources.filter((r) => {
      if (tagId !== undefined) {
        const allTags = props.publicLists.concat(props.privateLists)
        setTag(allTags.find((t) => t.id === Number(tagId)))
        return r.tag?.id === Number(tagId)
      } else {
        setTag(null)
        return true
      }
    })

    setFilteredResources(filtered)
  }, [props.resources, minRating, tagId])

  useEffect(
    () => {
      document.title = username + " - Endoh.io"

      props.clearProfile()

      MY_AXIOS.get<UserInfoDto>(API.user.userInfo(username))
        .then((res) => {
          props.setUserInfo(res.data)
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            props.redirectTo(PATHS.notFound)
          }
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  )

  return (
    <Box p={3}>
      {props.profile === null ? (
        <LoadingPage />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={3} style={{ width: "22%" }}>
            <Box position="fixed" width="inherit">
              <UserPageLists />
            </Box>
          </Grid>
          <Grid item xs={9} md={6} lg={5}>
            <ProfileHeader />

            <Box mt={5} />
            <ResourcesChart resources={filteredResources} />

            <Flex mt={3} justifyContent="space-between">
              <Typography variant="h5">
                {tag === null ? "All resources" : tag.name}
              </Typography>
              <MinRatingButton onChange={setMinRating} value={minRating} />
            </Flex>
            <FeedResources resources={filteredResources} />
          </Grid>

          <Grid item lg={4}>
            <Hidden mdDown>
              <Box mt={10} position="fixed">
                {props.userSuggestions.length > 0 && (
                  <UserSuggestions
                    userSuggestions={props.userSuggestions}
                    followingUsers={props.followingUsers}
                  />
                )}
              </Box>
            </Hidden>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IWithRedirectProps

const mapStateToProps = (state: ApplicationState) => ({
  userSuggestions: state.feed.userSuggestions,
  authUser: state.auth.user,
  followingUsers: state.auth.followingUsers,
  resources: state.profile.resources,
  profile: state.profile.profile,
  publicLists: state.profile.publicLists,
  privateLists: state.profile.privateLists,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearProfile: () => dispatch(clearProfile()),

  setProfileResources: (resources: ResourceDto[]) =>
    dispatch(setProfileResources(resources)),

  setUserInfo: (userInfo: UserInfoDto) => dispatch(setUserInfo(userInfo)),
})

export default withRedirect(
  connect(mapStateToProps, mapDispatchToProps)(UserPage)
)
