import { Box, Grid } from "@material-ui/core"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import UserSuggestions from "../../components/feed/UserSuggestions/UserSuggestions"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import { FeedResourceDto } from "../../dtos/feed/FeedResourceDto"
import { UserSuggestionDto } from "../../dtos/feed/UserSuggestionDto"
import { UserInfoDto } from "../../dtos/UserInfoDto"
import { setAuthProfile } from "../../store/auth/authActions"
import {
  setFeedResources,
  setUserSuggestions,
} from "../../store/feed/feedActions"
import { ApplicationState } from "../../store/store"
import FeedResources from "./FeedResources/FeedResources"
import AuthUserSummary from "./AuthUserSummary/AuthUserSummary"

// PE 3/3
const FeedPage = (props: Props) => {
  useEffect(
    () => {
      MY_AXIOS.get<FeedResourceDto[]>(API.feed.resources).then((res) => {
        props.setFeedResources(res.data)
      })

      MY_AXIOS.get<UserInfoDto>(
        API.user.userInfo(props.authUser.username)
      ).then((res) => {
        props.setAuthProfile(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Box pt={3}>
      <Grid container>
        <Grid item xs={1} md={2} lg={3}></Grid>

        <Grid item xs={7} md={6} lg={5}>
          <FeedResources />
        </Grid>
        <Grid item xs={4}>
          <AuthUserSummary />
          <Box mt={2} />
          <UserSuggestions userSuggestions={props.userSuggestions} />
        </Grid>
      </Grid>
    </Box>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  userSuggestions: state.feed.userSuggestions,
  authUser: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFeedResources: (feedResources: FeedResourceDto[]) =>
    dispatch(setFeedResources(feedResources)),

  setAuthProfile: (userInfo: UserInfoDto) => dispatch(setAuthProfile(userInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage)
