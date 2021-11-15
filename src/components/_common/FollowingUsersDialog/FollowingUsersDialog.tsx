import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { FollowingUserDto } from "types/domain/feed/FollowingUserDto";
import { setFollowingTags } from "../../../store/auth/authActions";
import { FollowingTagDto } from "../../../types/domain/feed/FollowingTagDto";
import pageUrls from "../../../utils/url/urls/pageUrls";
import Flex from "../../_UI/Flexboxes/Flex";
import ProfilePicture from "../../_UI/ProfilePicture/ProfilePicture";

// PE 2/3
const FollowingUsersDialog = (props: Props) => {
  const { username } = useParams<{ username: string }>();

  const onClose = () => {
    props.onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      open={props.open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="following-users-dialog"
    >
      <Box pb={1} px={1}>
        <DialogTitle id="following-users-title">
          {username?.length > 0 ? (
            <span>{username} is following</span>
          ) : (
            <span>You're following</span>
          )}
        </DialogTitle>

        <DialogContent>
          {props.followingUsers.map((followingUser) => (
            <Box key={followingUser.followingUser.userId} mb={3}>
              <Flex>
                <ProfilePicture
                  isLink
                  pictureUrl={followingUser.followingUser.pictureUrl}
                  username={followingUser.followingUser.username}
                  size={48}
                />

                <Box ml={2}>
                  <Box>
                    <Link
                      component={RouterLink}
                      variant="body1"
                      color="inherit"
                      to={pageUrls.user.index(
                        followingUser.followingUser.username
                      )}
                    >
                      <b>{followingUser.followingUser.username}</b>
                    </Link>
                  </Box>
                  <Box>{followingUser.followingUser.fullName}</Box>
                  <Box>
                    Following {followingUser.tags.length}{" "}
                    {followingUser.tags.length > 1 ? "tags" : "tag"}
                  </Box>
                </Box>
              </Flex>
            </Box>
          ))}
        </DialogContent>
      </Box>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFollowingTags: (followingTags: FollowingTagDto[]) =>
    dispatch(setFollowingTags(followingTags)),
});

interface OwnProps {
  followingUsers: FollowingUserDto[];
  open: boolean;
  onClose: () => void;
}

type Props = ReturnType<typeof mapDispatchToProps> & OwnProps;

export default connect(undefined, mapDispatchToProps)(FollowingUsersDialog);
