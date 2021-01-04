import { Box, CssBaseline, MuiThemeProvider } from "@material-ui/core"
import MySnackBar from "components/shared/SnackBars/MySnackBar"
import React, { lazy, Suspense, useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
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
import { checkAuthOrLogoutActionCreator } from "store/auth/authActions"
import { ApplicationState } from "store/store"
import Navbar from "./components/navbar/Navbar"
import PATHS from "./consts/PATHS"
import Home from "./pages/index/Home"
import LandingPage from "./pages/index/LandingPage"
import LoadingPage from "./pages/index/LoadingPage"
import SettingsNavbar from "./pages/settings/SettingsNavbar"
import SettingsPage from "./pages/settings/SettingsPage"
import MY_THEME from "./consts/MY_THEME"

const MoneratePage = lazy(
  () => import("./pages/Monerate/MoneratePage/MoneratePage")
)

const RelearnPage = lazy(() => import("./pages/Relearn/RelearnPage"))

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
  }

  // PE 2/3 - routes = nome ruim?
  let routes = (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      {/* <Route path="/login" component={EnterApplication} /> */}
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
              <Route path="/settings" component={SettingsPage} />
              <Route path="/" exact component={Home} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </Box>
      </Box>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <MuiThemeProvider theme={MY_THEME}>
        {/* What does this do? */}
        <CssBaseline />
        {isLoading ? <LoadingPage /> : routes}

        <MySnackBar />
      </MuiThemeProvider>
    </DndProvider>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{}>

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkAuthOrLogout: () => dispatch(checkAuthOrLogoutActionCreator(dispatch)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
