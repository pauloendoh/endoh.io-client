import { Box, Grid } from "@material-ui/core";
import useUserSuggestionsQuery from "hooks/react-query/feed/useUserSuggestionsQuery";
import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store/store";
import UserSuggestions from "../_common/UserSuggestions/UserSuggestions";
import AuthUserSummary from "./AuthUserSummary/AuthUserSummary";
import FeedResources from "./FeedResources/FeedResources";

type Props = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  followingUsers: state.auth.followingUsers,
});

// PE 3/3
const FeedPage = (props: Props) => {
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

export default connect(mapStateToProps, undefined)(FeedPage);
