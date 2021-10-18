import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../utils/consts/PATHS";
import FlexVCenter from "../shared/Flexboxes/FlexVCenter";

const SocialDescription = () => {
  return (
    <Grid id="social-description" spacing={3} container>
      <Grid item xs={12} sm={8}>
        <Box>
          <iframe
            width="480"
            height="315"
            src="https://www.youtube.com/embed/8ShJf0W7m_M"
            title="YouTube video player"
            allowFullScreen
            style={{ border: "none" }}
          ></iframe>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h4">
          <FlexVCenter>
            <FontAwesomeIcon icon={faUsers} />
            <Box ml={1}>Social</Box>
          </FlexVCenter>
        </Typography>

        <Typography variant="subtitle1">
          Check what other users are studying
        </Typography>

        <Box mt={2}>
          <Link to={PATHS.feed.index} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Check /feed
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SocialDescription;
