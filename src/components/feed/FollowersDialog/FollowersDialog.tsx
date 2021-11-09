import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { FollowerDto } from "types/domain/feed/FollowerDto";
import Flex from "../../../components/shared/Flexboxes/Flex";
import pageUrls from "../../../utils/consts/pageUrls";
import ProfilePicture from "../../shared/ProfilePicture/ProfilePicture";

interface Props {
  open: boolean;
  onClose: () => void;
  followers: FollowerDto[];
}

const FollowersDialog = (props: Props) => {
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
      aria-labelledby="followers-dialog"
    >
      <Box pb={1} px={1}>
        <DialogTitle id="followers-title">
          {username?.length > 0 ? (
            <span>{username}'s followers</span>
          ) : (
            <span>Your followers</span>
          )}
        </DialogTitle>

        <DialogContent>
          {props.followers.map((follower) => (
            <Box key={follower.follower.userId} mb={3}>
              <Flex>
                <ProfilePicture
                  isLink
                  pictureUrl={follower.follower.pictureUrl}
                  username={follower.follower.username}
                  size={48}
                />
                <Box ml={2}>
                  <Box>
                    <Link
                      component={RouterLink}
                      variant="body1"
                      color="inherit"
                      to={pageUrls.user.index(follower.follower.username)}
                    >
                      <b>{follower.follower.username}</b>
                    </Link>
                  </Box>
                  <Box>{follower.follower.fullName}</Box>
                  <Box>
                    Following {follower.tags.length}{" "}
                    {follower.tags.length > 1 ? "tags" : "tag"}
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

export default FollowersDialog;
