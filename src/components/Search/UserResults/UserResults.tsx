import { Box, Link, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserProfileDto } from "../../../types/domain/feed/UserProfileDto";
import pageUrls from "../../../utils/url/urls/pageUrls";
import Flex from "../../_UI/Flexboxes/Flex";
import ProfilePicture from "../../_UI/ProfilePicture/ProfilePicture";

// PE 3/3
const UserResults = (props: Props) => {
  const theme = useTheme();

  return (
    <Box>
      {props.userProfiles.map((profile, i) => (
        <Flex
          key={profile.userId}
          py={1}
          borderBottom={
            i === props.userProfiles.length - 1
              ? "none"
              : "1px solid rgb(255 255 255 / 0.1)"
          }
        >
          <ProfilePicture
            isLink
            pictureUrl={profile.pictureUrl}
            username={profile.username}
            size={36}
          />
          <Box ml={2}>
            <Link
              component={RouterLink}
              variant="body1"
              color="inherit"
              to={pageUrls.user.index(profile.username)}
            >
              <b>{profile.username}</b>
            </Link>
            <Typography style={{ color: theme.palette.grey[400] }}>
              {profile.fullName}
            </Typography>

            <Box mt={2}>
              <Typography style={{ whiteSpace: "pre-line" }}>
                {profile.bio}
              </Typography>
            </Box>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

interface Props {
  userProfiles: UserProfileDto[];
}

export default UserResults;
