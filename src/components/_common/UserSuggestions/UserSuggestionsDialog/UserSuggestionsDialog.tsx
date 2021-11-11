import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserSuggestionDto } from "../../../../types/domain/feed/UserSuggestionDto";
import pageUrls from "../../../../utils/consts/pageUrls";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";
import ProfilePicture from "../../../_UI/ProfilePicture/ProfilePicture";
// PE 2/3
const UserSuggestionsDialog = (props: Props) => {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="followers-dialog"
    >
      <Box pb={1} px={1}>
        <DialogTitle id="followers-title">Suggested Users</DialogTitle>

        <DialogContent>
          {props.userSuggestions.map((userSuggestion) => (
            <FlexVCenter key={userSuggestion.id} mb={2}>
              <ProfilePicture
                isLink
                pictureUrl={userSuggestion.pictureUrl}
                username={userSuggestion.username}
                size={48}
              />

              <Box ml={1}>
                <Link
                  variant="button"
                  color="inherit"
                  component={RouterLink}
                  to={pageUrls.user.index(userSuggestion.username)}
                >
                  {userSuggestion.username}
                </Link>
                <Box>{userSuggestion.description}</Box>
              </Box>
            </FlexVCenter>
          ))}
        </DialogContent>
      </Box>
    </Dialog>
  );
};

type Props = {
  userSuggestions: UserSuggestionDto[];
  open: boolean;
  onClose: () => void;
};

export default UserSuggestionsDialog;
