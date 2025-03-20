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
import { QueryClientProvider } from "@tanstack/react-query"
import GlobalDialogs from "components/_UI/Dialogs/GlobalDialogs"
import useCheckAuthOrLogout from "hooks/auth/useCheckAuthOrLogout"
import { useAxios } from "hooks/utils/useAxios"
import { Suspense, lazy, useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useAuthStore from "store/zustand/useAuthStore"
import LandingPage from "./components/LandingPage/LandingPage"
import ResetPasswordPage from "./components/ResetPassword/ResetPasswordPage"
import SettingsNavbar from "./components/Settings/SettingsNavbar"
import SettingsPage from "./components/Settings/SettingsPage"
import SkillbasePage from "./components/Skillbase/SkillbasePage"
import MySnackBar2 from "./components/_UI/SnackBars/Snackbars"
import LoadingPage from "./components/_common/LoadingPage/LoadingPage"
import Navbar from "./components/_common/_layout/Navbar/Navbar"
import { UserInfoDto } from "./types/domain/_common/UserInfoDto"
import { UserPreferenceDto } from "./types/domain/auth/AuthUserGetDto"
import { FollowingTagDto } from "./types/domain/feed/FollowingTagDto"
import { TagDto } from "./types/domain/relearn/TagDto"
import { NotificationDto } from "./types/domain/utils/NotificationDto"
import { myQueryClient } from "./utils/consts/myQueryClient"
import theme from "./utils/consts/theme"
import { isValidApplicationPath } from "./utils/domain/app/isValidApplicationPath"
const BigDecisionsPage = lazy(
  () => import("./components/Decisions/DecisionsPage")
)

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

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
const App = () => {
  const { setTags } = useRelearnStore()

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
  }, [])

  useEffect(() => {
    if (!gaInitialized && import.meta.env.PROD) {
      // ReactGA.initialize("UA-248555607-1")
      setGaInitialized(true)
    }

    // ReactGA.set({ page: location.pathname })
    // ReactGA.pageview(location.pathname)
  }, [location])

  const navigate = useNavigate()

  useEffect(() => {
    // Redirect after login
    if (authUser) {
      const nextUrl = new URLSearchParams(location.search).get("next")
      if (nextUrl) {
        navigate(nextUrl)
      }

      axios
        .get<FollowingTagDto[]>(urls.api.user.followingTags(authUser.username))
        .then((res) => {
          setFollowingTags(res.data)
        })

      axios.get<UserPreferenceDto>(urls.api.auth.userPreference).then((res) => {
        setPreference(res.data)
      })

      axios.get<TagDto[]>(urls.api.relearn.tag).then((res) => {
        setTags(res.data)
      })

      axios
        .get<UserInfoDto>(urls.api.user.userInfo(authUser.username))
        .then((res) => {
          setAuthProfile(res.data)
        })

      axios.get<NotificationDto[]>(urls.api.utils.notifications).then((res) => {
        setNotifications(res.data)
      })
    }
  }, [authUser])

  // PE 2/3 - Not very scalable...
  let redirectAfterLogout = "/"

  // Redirecting to HTTPS
  if (
    window.location.href.startsWith("https://endoh.io") ||
    window.location.href.startsWith("http://endoh.io")
  ) {
    window.location.replace("https://relearn.to")
    // window.location.replace(window.location.href.replace("http", "https"))
  }

  if (window.location.href.includes("/define")) {
    navigate(urls.pages.questionsIndex)
  }

  if (isValidApplicationPath(location.pathname)) {
    redirectAfterLogout = `/?next=${location.pathname}`
  }

  // PE 2/3 - routes = nome ruim?
  let routes = (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/password-reset" element={<ResetPasswordPage />} />
      <Route path="*" element={<Navigate to={redirectAfterLogout} />} />
    </Routes>
  )

  // PE 2/3 - Talvez criar um <UserRoutes/> ?
  if (authUser) {
    if (location.pathname === "/") navigate(urls.pages.resources.index)
    routes = (
      <Box height="100%">
        {location.pathname.startsWith("/settings/") ? (
          <SettingsNavbar />
        ) : (
          <Navbar />
        )}

        <Box pt={10}>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/resources/tag/:tagId" element={<RelearnPage />} />
              <Route path="/resources" element={<RelearnPage />} />

              <Route path="/skills/tag/:tagId" element={<SkillbasePage />} />
              <Route path="/skills" element={<SkillbasePage />} />
              <Route path="/feed" element={<FeedPage />} />

              <Route
                path="/questions/deck/:deckId"
                element={<QuestionsPage />}
              />
              <Route path="/questions" element={<QuestionsPage />} />

              <Route path="/BigDecisions" element={<BigDecisionsPage />} />
              <Route path="/BigDecisions/:id" element={<BigDecisionsPage />} />

              <Route path="/user/:username/tag/:tagId" element={<UserPage />} />
              <Route
                path="/user/:username/roadmap/:skillId"
                element={<UserPage />}
              />
              <Route path="/user/:username" element={<UserPage />} />

              <Route path="/settings/*" element={<SettingsPage />} />
              <Route path="/LearningDiary" element={<LearningDiaryPage />} />

              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Suspense>
          <GlobalDialogs />
        </Box>
      </Box>
    )
  }

  return (
    <QueryClientProvider client={myQueryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <DndProvider backend={HTML5Backend}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              {/* What does this do? */}
              <CssBaseline />
              {isLoading ? <LoadingPage /> : routes}

              <MySnackBar2 />
            </LocalizationProvider>
          </DndProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  )
}

export default App
