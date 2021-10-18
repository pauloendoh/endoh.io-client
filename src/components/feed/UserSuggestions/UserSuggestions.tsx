import { Box, Button, Link, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Dispatch } from "redux";
import { FollowingUserDto } from "../../../dtos/feed/FollowingUserDto";
import { UserSuggestionDto } from "../../../dtos/feed/UserSuggestionDto";
import { ApplicationState } from "../../../store/store";
import PATHS from "../../../utils/consts/PATHS";
import FlexVCenter from "../../shared/Flexboxes/FlexVCenter";
import ProfilePicture from "../../shared/ProfilePicture/ProfilePicture";
import UserSuggestionsDialog from "./UserSuggestionsDialog/UserSuggestionsDialog";

// PE 2/3 - Change to UserSuggestionsSection ?
function UserSuggestions(props: Props) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const [suggestions, setSuggestions] = useState<UserSuggestionDto[]>([]);

  // PE 2/3
  useEffect(() => {
    // guarantees that it won't suggest users you already follow and yourself
    // BUT, it shouldn't be this component responsibility. It should be its parent!

    const dontShowIds = props.followingTags.map(
      (fol) => fol.followingUser.userId
    );
    dontShowIds.push(props.authUser.id);

    const filteredSuggestions = props.userSuggestions.filter(
      (suggestion) => dontShowIds.includes(suggestion.suggestedUserId) === false
    );
    setSuggestions(filteredSuggestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.followingTags, props.userSuggestions]);

  return (
    <Box width={250}>
      <FlexVCenter justifyContent="space-between">
        <Typography>Suggestions for You</Typography>
        <Button size="small" onClick={() => setDialogIsOpen(true)}>
          See All
        </Button>
        <UserSuggestionsDialog
          userSuggestions={suggestions}
          onClose={() => setDialogIsOpen(false)}
          open={dialogIsOpen}
        />
      </FlexVCenter>

      {/* Mini list (top 3) */}
      {suggestions.slice(0, 3).map((userSuggestion) => (
        <FlexVCenter
          key={userSuggestion.id}
          my={1}
          className="suggested-user-item"
        >
          <ProfilePicture
            isLink
            pictureUrl={userSuggestion.pictureUrl}
            username={userSuggestion.username}
            size={32}
          />

          <Box ml={1}>
            <Link
              variant="button"
              color="inherit"
              component={RouterLink}
              to={PATHS.user.index(userSuggestion.username)}
            >
              {userSuggestion.username}
            </Link>
            <Box>{userSuggestion.description}</Box>
          </Box>
        </FlexVCenter>
      ))}
    </Box>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

interface OwnProps {
  userSuggestions: UserSuggestionDto[];
  followingTags: FollowingUserDto[];
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserSuggestions);
