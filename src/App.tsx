import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { urls } from "utils/urls"

import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material"
import GlobalDialogs from "components/_UI/Dialogs/GlobalDialogs"
import useCheckAuthOrLogout from "hooks/auth/useCheckAuthOrLogout"
import { useAxios } from "hooks/utils/useAxios"
import { lazy, Suspense, useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
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
import useAuthStore from "store/zustand/useAuthStore"
import LandingPage from "./components/LandingPage/LandingPage"
import ResetPasswordPage from "./components/ResetPassword/ResetPasswordPage"
import SettingsNavbar from "./components/Settings/SettingsNavbar"
import SettingsPage from "./components/Settings/SettingsPage"
import SkillbasePage from "./components/Skillbase/SkillbasePage"
import LoadingPage from "./components/_common/LoadingPage/LoadingPage"
import Navbar from "./components/_common/_layout/Navbar/Navbar"
import MySnackBar2 from "./components/_UI/SnackBars/Snackbars"
import { setTags } from "./store/relearn/relearnActions"
import { UserPreferenceDto } from "./types/domain/auth/AuthUserGetDto"
import { FollowingTagDto } from "./types/domain/feed/FollowingTagDto"
import { TagDto } from "./types/domain/relearn/TagDto"
import { NotificationDto } from "./types/domain/utils/NotificationDto"
import { UserInfoDto } from "./types/domain/_common/UserInfoDto"
import { myQueryClient } from "./utils/consts/myQueryClient"
import theme from "./utils/consts/theme"
import { isValidApplicationPath } from "./utils/domain/app/isValidApplicationPath"

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const MoneratePage = lazy(() => import("./components/Monerate/MoneratePage"))
const SimilarExpensesPage = lazy(
  () => import("./components/Monerate/SimilarExpensesPage/SimilarExpensesPage")
)

const RelearnPage = lazy(() => import("./components/Relearn/RelearnPage"))
const UserPage = lazy(() => import("./components/User/ProfilePage"))
const FeedPage = lazy(() => import("./components/Feed/FeedPage"))
const QuestionsPage = lazy(() => import("./components/Questions/QuestionsPage"))

const NotFoundPage = lazy(() => import("./components/NotFound/NotFoundPage"))
const SearchPage = lazy(() => import("./components/Search/SearchPage"))
const LearningDiaryPage = lazy(
  () => import("./components/LearningDiary/LearningDiaryPage")
)

// PE 2/3
const App = (props: Props) => {
  const axios = useAxios()
  // 0.1s is enough time to check for auth user
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const {
    authUser,
    setPreference,
    setFollowingTags,
    setNotifications,
    setAuthProfile,
  } = useAuthStore()

  const checkAuthOrLogout = useCheckAuthOrLogout()

  const [gaInitialized, setGaInitialized] = useState(false)

  useEffect(() => {
    checkAuthOrLogout()

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!gaInitialized && import.meta.env.PROD) {
      // ReactGA.initialize("UA-248555607-1")
      setGaInitialized(true)
    }

    // ReactGA.set({ page: location.pathname })
    // ReactGA.pageview(location.pathname)
  }, [location])

  useEffect(
    () => {
      // Redirect after login
      if (authUser) {
        const nextUrl = new URLSearchParams(location.search).get("next")
        if (nextUrl) {
          props.history.push(nextUrl)
        }

        axios
          .get<FollowingTagDto[]>(
            urls.api.user.followingTags(authUser.username)
          )
          .then((res) => {
            setFollowingTags(res.data)
          })

        axios
          .get<UserPreferenceDto>(urls.api.auth.userPreference)
          .then((res) => {
            setPreference(res.data)
          })

        axios.get<TagDto[]>(urls.api.relearn.tag).then((res) => {
          props.setTags(res.data)
        })

        axios
          .get<UserInfoDto>(urls.api.user.userInfo(authUser.username))
          .then((res) => {
            setAuthProfile(res.data)
          })

        axios
          .get<NotificationDto[]>(urls.api.utils.notifications)
          .then((res) => {
            setNotifications(res.data)
          })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser]
  )

  // PE 2/3 - Not very scalable...
  let redirectAfterLogout = "/"

  // Redirecting to HTTPS
  if (window.location.href.includes("http://endoh.io")) {
    window.location.replace(window.location.href.replace("http", "https"))
  }

  if (window.location.href.includes("/define")) {
    props.history.push(urls.pages.questionsIndex)
  }

  if (isValidApplicationPath(location.pathname)) {
    redirectAfterLogout = `/?next=${location.pathname}`
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
  if (authUser) {
    if (location.pathname === "/") props.history.push("/relearn")
    routes = (
      <Box height="100%">
        {location.pathname.startsWith("/settings/") ? (
          <SettingsNavbar />
        ) : (
          <Navbar />
        )}

        <Box pt={10}>
          <Suspense fallback={<LoadingPage />}>
            <Switch>
              <Route
                path={urls.pages.monerate.similarExpenses}
                component={SimilarExpensesPage}
              />
              <Route path="/monerate" component={MoneratePage} />

              <Route path="/relearn/tag/:tagId" component={RelearnPage} />
              <Route path="/relearn" component={RelearnPage} />

              <Route path="/skillbase/tag/:tagId" component={SkillbasePage} />
              <Route path="/skillbase" component={SkillbasePage} />
              <Route path="/feed" component={FeedPage} />

              <Route path="/questions/doc/:docId" component={QuestionsPage} />
              <Route path="/questions" exact component={QuestionsPage} />

              <Route path="/user/:username/tag/:tagId" component={UserPage} />
              <Route
                path="/user/:username/roadmap/:skillId"
                component={UserPage}
              />
              <Route path="/user/:username" component={UserPage} />

              <Route path="/settings" component={SettingsPage} />
              <Route path="/LearningDiary" component={LearningDiaryPage} />

              <Route path="/404" component={NotFoundPage} />
              <Route path="/search" component={SearchPage} />
            </Switch>
          </Suspense>
        </Box>

        <GlobalDialogs />
      </Box>
    )
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <QueryClientProvider client={myQueryClient}>
              <ReactQueryDevtools initialIsOpen={false} />

              {/* What does this do? */}
              <CssBaseline />
              {isLoading ? <LoadingPage /> : routes}

              <MySnackBar2 />
            </QueryClientProvider>
          </LocalizationProvider>
        </DndProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

type Props = ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{}>

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTags: (tags: TagDto[]) => dispatch(setTags(tags)),
})

export default withRouter(connect(undefined, mapDispatchToProps)(App))
