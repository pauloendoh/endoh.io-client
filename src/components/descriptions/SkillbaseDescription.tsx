import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../utils/consts/PATHS";
import FlexVCenter from "../shared/Flexboxes/FlexVCenter";

const SkillbaseDescription = () => {
  return (
    <Grid id="skillbase-description" spacing={3} container>
      <Grid item xs={12} sm={4}>
        <Typography variant="h4">
          <FlexVCenter>
            <FontAwesomeIcon icon={faUsers} />
            <Box ml={1}>Skillbase</Box>
          </FlexVCenter>
        </Typography>

        <Typography variant="subtitle1">
          Manage your skills, create your own roadmaps
        </Typography>

        <Box mt={2}>
          <Link to={PATHS.skillbase.index} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Check /skillbase
            </Button>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box>
          <iframe
            width="480"
            height="315"
            src="https://www.youtube.com/embed/ac9tKYnRNSE"
            title="YouTube video player"
            allowFullScreen
            style={{ border: "none" }}
          ></iframe>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SkillbaseDescription;
