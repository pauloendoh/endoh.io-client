import DateFnsUtils from "@date-io/date-fns";
import { Box, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import useCheckAuthOrLogout from "hooks/auth/useCheckAuthOrLogout";
import { lazy, Suspense, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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
import useAuthStore from "store/zustand/useAuthStore";
import { ThemeProvider } from "styled-components";
import { urls } from "utils/urls";
import LandingPage from "./components/LandingPage/LandingPage";
import ResourceDialog from "./components/Relearn/Dialogs/ResourceDialog/ResourceDialog";
import ResetPasswordPage from "./components/ResetPassword/ResetPasswordPage";
import SettingsNavbar from "./components/Settings/SettingsNavbar";
import SettingsPage from "./components/Settings/SettingsPage";
import SkillbasePage from "./components/Skillbase/SkillbasePage";
import SkillDialog from "./components/Skillbase/SkillDialog/SkillDialog";
import LoadingPage from "./components/_common/LoadingPage/LoadingPage";
import Navbar from "./components/_common/_layout/Navbar/Navbar";
import ConfirmDialog from "./components/_UI/Dialogs/ConfirmationDialog";
import MySnackBar2 from "./components/_UI/SnackBars/Snackbars";
import { setTags } from "./store/relearn/relearnActions";
import { UserPreferenceDto } from "./types/domain/auth/AuthUserGetDto";
import { FollowingTagDto } from "./types/domain/feed/FollowingTagDto";
import { TagDto } from "./types/domain/relearn/TagDto";
import { NotificationDto } from "./types/domain/utils/NotificationDto";
import { UserInfoDto } from "./types/domain/_common/UserInfoDto";
import myAxios from "./utils/consts/myAxios";
import { myQueryClient } from "./utils/consts/myQueryClient";
import theme from "./utils/consts/theme";
import { isValidApplicationPath } from "./utils/domain/app/isValidApplicationPath";
import apiUrls from "./utils/url/urls/apiUrls";

const MoneratePage = lazy(() => import("./components/Monerate/MoneratePage"));
const SimilarExpensesPage = lazy(
  () => import("./components/Monerate/SimilarExpensesPage/SimilarExpensesPage")
);

const RelearnPage = lazy(() => import("./components/Relearn/RelearnPage"));
const UserPage = lazy(() => import("./components/User/ProfilePage"));
const FeedPage = lazy(() => import("./components/Feed/FeedPage"));
const DefinePage = lazy(() => import("./components/Define/DefinePage"));
const BigDecisionsPage = lazy(
  () => import("./components/Decisions/DecisionsPage")
);
const NotFoundPage = lazy(() => import("./components/NotFound/NotFoundPage"));
const SearchPage = lazy(() => import("./components/Search/SearchPage"));
const LearningDiaryPage = lazy(
  () => import("./components/LearningDiary/LearningDiaryPage")
);

// PE 2/3
const App = (props: Props) => {
  // 0.1s is enough time to check for auth user
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const {
    authUser,
    setPreference,
    setFollowingTags,
    setNotifications,
    setAuthProfile,
  } = useAuthStore();

  const checkAuthOrLogout = useCheckAuthOrLogout();

  useEffect(() => {
    checkAuthOrLogout();

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      // Redirect after login
      if (authUser) {
        const nextUrl = new URLSearchParams(location.search).get("next");
        if (nextUrl) {
          props.history.push(nextUrl);
        }

        myAxios
          .get<FollowingTagDto[]>(apiUrls.user.followingTags(authUser.username))
          .then((res) => {
            setFollowingTags(res.data);
          });

        myAxios
          .get<UserPreferenceDto>(apiUrls.auth.userPreference)
          .then((res) => {
            setPreference(res.data);
          });

        myAxios.get<TagDto[]>(apiUrls.relearn.tag).then((res) => {
          props.setTags(res.data);
        });

        myAxios
          .get<UserInfoDto>(apiUrls.user.userInfo(authUser.username))
          .then((res) => {
            setAuthProfile(res.data);
          });

        myAxios
          .get<NotificationDto[]>(apiUrls.utils.notifications)
          .then((res) => {
            setNotifications(res.data);
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser]
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
  if (authUser) {
    if (location.pathname === "/") props.history.push("/relearn");
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

              <Route path="/define" exact component={DefinePage} />
              <Route path="/define/doc/:docId" component={DefinePage} />

              <Route path="/BigDecisions" exact component={BigDecisionsPage} />
              <Route path="/BigDecisions/:id" component={BigDecisionsPage} />

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

        <ConfirmDialog />
        <ResourceDialog />
        <SkillDialog />
      </Box>
    );
  }

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <QueryClientProvider client={myQueryClient}>
              <ReactQueryDevtools initialIsOpen={false} />

              {/* What does this do? */}
              <CssBaseline />
              {isLoading ? <LoadingPage /> : routes}

              <MySnackBar2 />
            </QueryClientProvider>
          </MuiPickersUtilsProvider>
        </DndProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

type Props = ReturnType<typeof mapDispatchToProps> & RouteComponentProps<{}>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTags: (tags: TagDto[]) => dispatch(setTags(tags)),
});

export default withRouter(connect(undefined, mapDispatchToProps)(App));
