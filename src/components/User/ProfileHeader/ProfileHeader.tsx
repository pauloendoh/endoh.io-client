import { Box, Button, Link, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import useProfileStore from "store/zustand/domain/useProfileStore";
import { ApplicationState } from "../../../store/store";
import { isFollowing } from "../../../utils/feed/isFollowing";
import Flex from "../../_UI/Flexboxes/Flex";
import ProfilePicture from "../../_UI/ProfilePicture/ProfilePicture";
import EditProfileDialog from "./EditProfileDialog/EditProfileDialog";
import FollowDialog from "./FollowDialog/FollowDialog";
import FollowersButtonDialog from "./FollowersButtonDialog/FollowersButtonDialog";
import FollowingButtonDialog from "./FollowingButtonDialog/FollowingButtonDialog";

// PE 2/3
const ProfileHeader = (props: Props) => {
  const { username } = useParams<{ username: string }>();

  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openFollowDialog, setOpenFollowDialog] = useState(false);

  const profileStore = useProfileStore();

  return (
    <Flex>
      <Box>
        <ProfilePicture
          username={username}
          isLink={false}
          pictureUrl={profileStore.profile.pictureUrl}
          size={64}
        />
      </Box>
      <Box ml={2}>
        <Flex>
          {profileStore.profile?.fullName.length > 0 && (
            <Box mr={3}>
              <Typography variant="h5">
                {profileStore.profile.fullName}
              </Typography>
            </Box>
          )}
          {profileStore.profile?.userId === props.authUser.id ? (
            <Box>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => setOpenProfileDialog(true)}
              >
                Edit Profile
              </Button>
              <EditProfileDialog
                open={openProfileDialog}
                onClose={() => setOpenProfileDialog(false)}
              />
            </Box>
          ) : (
            <Box>
              {isFollowing(
                profileStore.profile.userId,
                props.authFollowingTags
              ) ? (
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpenFollowDialog(true)}
                >
                  Following
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenFollowDialog(true)}
                >
                  Follow
                </Button>
              )}

              <FollowDialog
                open={openFollowDialog}
                onClose={() => setOpenFollowDialog(false)}
              />
            </Box>
          )}
        </Flex>

        <Box style={{ opacity: 0.75 }}>
          <Typography variant="body1">{username}</Typography>
        </Box>

        <Box mt={2}>
          <Typography style={{ whiteSpace: "pre-line" }}>
            {profileStore.profile?.bio}
          </Typography>
        </Box>
        <Box mt={1}>
          {profileStore.profile?.website.length > 0 && (
            <Link href={profileStore.profile?.website}>
              <Typography>{profileStore.profile?.website}</Typography>
            </Link>
          )}
        </Box>

        <Flex mt={3}>
          <FollowingButtonDialog />

          {/* FollowersButtonDialog */}
          <Box ml={2} />
          <FollowersButtonDialog />
        </Flex>
      </Box>
    </Flex>
  );
};

type Props = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,
  authFollowingTags: state.auth.followingTags,
});

export default connect(mapStateToProps, undefined)(ProfileHeader);
