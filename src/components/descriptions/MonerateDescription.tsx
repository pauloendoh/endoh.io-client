import { faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import monerateDemo from "../../static/videos/monerate-demo.mp4";
import PATHS from "../../utils/consts/PATHS";
import FlexVCenter from "../shared/Flexboxes/FlexVCenter";
import TextSecondary from "../shared/Text/TextSecondary";
// PE 2/3
const MonerateDescription = () => {
  return (
    <Grid id="monerate-description" spacing={3} container>
      <Grid item xs={12} sm={4}>
        <Typography variant="h4">
          <FlexVCenter>
            <FontAwesomeIcon icon={faFunnelDollar} />
            <Box ml={1}>Monerate</Box>
          </FlexVCenter>
        </Typography>
        <Typography variant="subtitle1">
          A <TextSecondary>budget tool</TextSecondary> where you can rate your
          expenses
        </Typography>

        <Box mt={2}>
          <Link to={PATHS.monerate.index} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Check /monerate
            </Button>
          </Link>
        </Box>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Box>
          <video width="100%" loop controls={true} muted>
            <source src={monerateDemo} type="video/mp4" />
          </video>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MonerateDescription;
