import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../utils/consts/PATHS";
import FlexVCenter from "../shared/Flexboxes/FlexVCenter";

const RelearnDescription = () => {
  return (
    <Grid id="relearn-description" spacing={3} container>
      <Grid item xs={12} sm={4}>
        <Typography variant="h4">
          <FlexVCenter>
            <FontAwesomeIcon icon={faGraduationCap} />
            <Box ml={1}>Relearn</Box>
          </FlexVCenter>
        </Typography>

        <Typography variant="subtitle1">
          A TO-DO list for self-learners
        </Typography>

        <Box mt={2}>
          <Link to={PATHS.relearn.index} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Check /relearn
            </Button>
          </Link>
        </Box>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Box>
          <iframe
            width="480"
            height="315"
            src="https://www.youtube.com/embed/GEbfYVS21CU"
            title="YouTube video player"
            allowFullScreen
            style={{ border: "none" }}
          ></iframe>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RelearnDescription;
