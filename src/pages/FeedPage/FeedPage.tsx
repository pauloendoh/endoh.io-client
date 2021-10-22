import { Box, Grid } from "@material-ui/core";
import useUserSuggestionsQuery from "hooks/react-query/feed/useUserSuggestionsQuery";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import UserSuggestions from "../../components/feed/UserSuggestions/UserSuggestions";
import { setFeedResources } from "../../store/feed/feedActions";
import { ApplicationState } from "../../store/store";
import { FeedResourceDto } from "../../types/domain/feed/FeedResourceDto";
import apiUrls from "../../utils/consts/apiUrls";
import myAxios from "../../utils/consts/myAxios";
import AuthUserSummary from "./AuthUserSummary/AuthUserSummary";
import FeedResources from "./FeedResources/FeedResources";

// PE 3/3
const FeedPage = (props: Props) => {
  useEffect(
    () => {
      document.title = "Feed - Endoh.io";

      myAxios.get<FeedResourceDto[]>(apiUrls.feed.resources).then((res) => {
        props.setFeedResources(res.data);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { data: userSuggestions } = useUserSuggestionsQuery();

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
          {userSuggestions?.length > 0 && (
            <UserSuggestions
              userSuggestions={userSuggestions}
              followingTags={props.followingUsers}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,

  followingUsers: state.auth.followingUsers,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFeedResources: (feedResources: FeedResourceDto[]) =>
    dispatch(setFeedResources(feedResources)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
