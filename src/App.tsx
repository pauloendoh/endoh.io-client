import { Box, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { QueryClientProvider } from "react-query";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
  withRouter,
} from "react-router-dom";
import { Dispatch } from "redux";
import Navbar from "./components/navbar/Navbar";
import ConfirmDialog from "./components/shared/Dialogs/ConfirmationDialog";
import MySnackBar from "./components/shared/SnackBars/MySnackBar";
import MySnackBar2 from "./components/shared/SnackBars/MySnackbar2";
import LandingPage from "./pages/index/LandingPage";
import LoadingPage from "./pages/index/LoadingPage";
import ResetPasswordPage from "./pages/index/ResetPasswordPage";
import ResourceDialog from "./pages/Relearn/Dialogs/ResourceDialog/ResourceDialog";
import SettingsNavbar from "./pages/settings/SettingsNavbar";
import SettingsPage from "./pages/settings/SettingsPage";
import SkillbasePage from "./pages/SkillbasePage/SkillbasePage";
import SkillDialog from "./pages/SkillbasePage/SkillDialog/SkillDialog";
import {
  checkAuthOrLogoutActionCreator,
  setAuthProfile,
  setFollowingTags,
  setNotifications,
  setPreference,
} from "./store/auth/authActions";
import { setUserSuggestions } from "./store/feed/feedActions";
import { setTags } from "./store/relearn/relearnActions";
import { ApplicationState } from "./store/store";
import { UserPreferenceDto } from "./types/domain/auth/AuthUserGetDto";
import { FollowingTagDto } from "./types/domain/feed/FollowingTagDto";
import { UserSuggestionDto } from "./types/domain/feed/UserSuggestionDto";
import { TagDto } from "./types/domain/relearn/TagDto";
import { NotificationDto } from "./types/domain/utils/NotificationDto";
import { UserInfoDto } from "./types/domain/_common/UserInfoDto";
import { isValidApplicationPath } from "./utils/app/isValidApplicationPath";
import API from "./utils/consts/API";
import myAxios from "./utils/consts/myAxios";
import { myQueryClient } from "./utils/consts/myQueryClient";
import theme from "./utils/consts/theme";

const MoneratePage = lazy(
  () => import("./pages/Monerate/MoneratePage/MoneratePage")
);

const RelearnPage = lazy(() => import("./pages/Relearn/RelearnPage"));
const UserPage = lazy(() => import("./pages/UserPage/UserPage"));
const FeedPage = lazy(() => import("./pages/FeedPage/FeedPage"));
const DefinePage = lazy(() => import("./pages/DefinePage/DefinePage"));
const BigDecisionsPage = lazy(
  () => import("./pages/BigDecisionsPage/BigDecisionsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const SearchPage = lazy(() => import("./pages/SearchPage/SearchPage"));

// PE 2/3
const App = (props: Props) => {
  // 0.1s is enough time to check for auth user
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    props.checkAuthOrLogout();

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      // Redirect after login
      if (props.user) {
        const nextUrl = new URLSearchParams(location.search).get("next");
        if (nextUrl) {
          props.history.push(nextUrl);
        }

        myAxios
          .get<FollowingTagDto[]>(API.user.followingTags(props.user.username))
          .then((res) => {
            props.setFollowingTags(res.data);
          });

        myAxios.get<UserPreferenceDto>(API.auth.userPreference).then((res) => {
          props.setPreference(res.data);
        });

        myAxios
          .get<UserSuggestionDto[]>(API.feed.myUserSuggestions)
          .then((res) => {
            props.setUserSuggestions(res.data);
          });

        myAxios.get<TagDto[]>(API.relearn.tag).then((res) => {
          props.setTags(res.data);
        });

        myAxios
          .get<UserInfoDto>(API.user.userInfo(props.user.username))
          .then((res) => {
            props.setAuthProfile(res.data);
          });

        myAxios.get<NotificationDto[]>(API.utils.notifications).then((res) => {
          props.setNotifications(res.data);
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.user]
  );

  // PE 2/3 - Not very scalable...
  let redirectAfterLogout = "/";

  // Redirecting to HTTPS
  if (window.location.href.includes("http://endoh.io")) {
    window.location.replace(window.location.href.replace("http", "https"));
  }

  if (isValidApplicationPath(location.pathname)) {
    redirectAfterLogout = `/?next=${location.pathname}`;
  }

  // PE 2/3 - routes = nome ruim?
  let routes = (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/password-reset" component={ResetPasswordPage} />
      <Redirect to={redirectAfterLogout} />
    </Switch>
  );

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
              <Route path="/skillbase/tag/:tagId" component={SkillbasePage} />
              <Route path="/skillbase" component={SkillbasePage} />
              <Route path="/feed" component={FeedPage} />

              <Route path="/define" exact component={DefinePage} />
              <Route path="/define/doc/:docId" component={DefinePage} />

              <Route path="/BigDecisions" exact component={BigDecisionsPage} />
              <Route path="/BigDecisions/:id" component={BigDecisionsPage} />

              <Route path="/user/:username/tag/:tagId" component={UserPage} />
              <Route path="/user/:username" component={UserPage} />

              <Route path="/settings" component={SettingsPage} />

              <Route path="/404" component={NotFoundPage} />
              <Route path="/search" component={SearchPage} />
              <Redirect to="/relearn" />
            </Switch>
          </Suspense>
        </Box>

        <ConfirmDialog />
        <ResourceDialog />
        <SkillDialog />
      </Box>
    );
  }

  return (
    <MuiThemeProvider theme={theme}>
      <QueryClientProvider client={myQueryClient}>
        {/* What does this do? */}
        <CssBaseline />
        {isLoading ? <LoadingPage /> : routes}

        <MySnackBar />
        <MySnackBar2 />
      </QueryClientProvider>
    </MuiThemeProvider>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{}>;

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUserSuggestions: (userSuggestions: UserSuggestionDto[]) =>
    dispatch(setUserSuggestions(userSuggestions)),
  setPreference: (preference: UserPreferenceDto) =>
    dispatch(setPreference(preference)),
  setFollowingTags: (followingTags: FollowingTagDto[]) =>
    dispatch(setFollowingTags(followingTags)),
  setTags: (tags: TagDto[]) => dispatch(setTags(tags)),
  setNotifications: (notifications: NotificationDto[]) =>
    dispatch(setNotifications(notifications)),

  setAuthProfile: (userInfo: UserInfoDto) => dispatch(setAuthProfile(userInfo)),

  checkAuthOrLogout: () => dispatch(checkAuthOrLogoutActionCreator(dispatch)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
