import { Box, CssBaseline, MuiThemeProvider } from "@material-ui/core"
import React, { lazy, Suspense, useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
  withRouter,
} from "react-router-dom"
import { Dispatch } from "redux"
import Navbar from "./components/navbar/Navbar"
import MySnackBar from "./components/shared/SnackBars/MySnackBar"
import API from "./consts/API"
import MY_AXIOS from "./consts/MY_AXIOS"
import MY_THEME from "./consts/MY_THEME"
import PATHS from "./consts/PATHS"
import { FollowingTagDto } from "./dtos/feed/FollowingTagDto"
import { UserSuggestionDto } from "./dtos/feed/UserSuggestionDto"
import { UserPreferenceDto } from "./interfaces/dtos/AuthUserGetDto"
import LandingPage from "./pages/index/LandingPage"
import LoadingPage from "./pages/index/LoadingPage"
import ResetPasswordPage from "./pages/index/ResetPasswordPage"
import SettingsNavbar from "./pages/settings/SettingsNavbar"
import SettingsPage from "./pages/settings/SettingsPage"
import SkillbasePage from "./pages/SkillbasePage/SkillbasePage"
import {
  checkAuthOrLogoutActionCreator,
  setFollowingTags,
  setPreference,
} from "./store/auth/authActions"
import { setUserSuggestions } from "./store/feed/feedActions"
import { ApplicationState } from "./store/store"

const MoneratePage = lazy(
  () => import("./pages/Monerate/MoneratePage/MoneratePage")
)

const RelearnPage = lazy(() => import("./pages/Relearn/RelearnPage"))
const UserPage = lazy(() => import("./pages/UserPage/UserPage"))
const FeedPage = lazy(() => import("./pages/FeedPage/FeedPage"))

// PE 2/3
const App = (props: Props) => {
  // 0.1s is enough time to check for auth user
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    props.checkAuthOrLogout()

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () => {
      // Redirect after login
      if (props.user) {
        const nextUrl = new URLSearchParams(location.search).get("next")
        if (nextUrl) {
          props.history.push(nextUrl)
        }

        MY_AXIOS.get<FollowingTagDto[]>(
          API.user.followingTags(props.user.username)
        ).then((res) => {
          props.setFollowingTags(res.data)
        })

        MY_AXIOS.get<UserPreferenceDto>(API.auth.userPreference).then((res) => {
          props.setPreference(res.data)
        })

        MY_AXIOS.get<UserSuggestionDto[]>(API.feed.myUserSuggestions).then(
          (res) => {
            props.setUserSuggestions(res.data)
          }
        )
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.user]
  )

  // PE 2/3 - Not very scalable...
  let redirectAfterLogout = "/"
  if (location.pathname.startsWith(PATHS.monerate.index)) {
    redirectAfterLogout = "/?next=/monerate"
  } else if (location.pathname.startsWith(PATHS.relearn.index)) {
    redirectAfterLogout = "/?next=/relearn"
  } else if (location.pathname.startsWith(PATHS.skillbase.index)) {
    redirectAfterLogout = "/?next=/skillbase"
  }

  // PE 2/3 - routes = nome ruim?
  let routes = (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/password-reset" component={ResetPasswordPage} />
      <Redirect to={redirectAfterLogout} />
    </Switch>
  )

  // PE 2/3 - Talvez criar um <UserRoutes/> ?
  if (props.user) {
    routes = (
      <Box height="100%">
        {location.pathname.startsWith("/settings/") ? (
          <SettingsNavbar />
        ) : (
          <Navbar />
        )}

        <Box py={10}>
          <Suspense fallback={<LoadingPage />}>
            <Switch>
              <Route path="/monerate" component={MoneratePage} />
              <Route path="/relearn" component={RelearnPage} />
              <Route path="/skillbase" component={SkillbasePage} />
              <Route path="/feed" component={FeedPage} />

              <Route path="/user/:username/tag/:tagId" component={UserPage} />
              <Route path="/user/:username" component={UserPage} />

              <Route path="/settings" component={SettingsPage} />
              {/* <Route path="/" exact component={Home} /> */}
              <Redirect to="/relearn" />
            </Switch>
          </Suspense>
        </Box>
      </Box>
    )
  }

  return (
    <MuiThemeProvider theme={MY_THEME}>
      {/* What does this do? */}
      <CssBaseline />
      {isLoading ? <LoadingPage /> : routes}

      <MySnackBar />
    </MuiThemeProvider>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{}>

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUserSuggestions: (userSuggestions: UserSuggestionDto[]) =>
    dispatch(setUserSuggestions(userSuggestions)),
  setPreference: (preference: UserPreferenceDto) =>
    dispatch(setPreference(preference)),
  setFollowingTags: (followingTags: FollowingTagDto[]) =>
    dispatch(setFollowingTags(followingTags)),
  checkAuthOrLogout: () => dispatch(checkAuthOrLogoutActionCreator(dispatch)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
