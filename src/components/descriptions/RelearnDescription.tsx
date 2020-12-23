import { Box, Button, Grid, Typography } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import PATHS from "../../consts/PATHS"
import relearnDemo from "../../static/videos/relearn-demo.mp4"
import TextSecondary from "../shared/Text/TextSecondary"

const RelearnDescription = () => {
  return (
    <Grid id="relearn-description" spacing={3} container>
      <Grid item xs={12} sm={4}>
        <Typography variant="h4">Relearn</Typography>
        <Typography variant="subtitle1">
          A <TextSecondary>TO-DO list</TextSecondary> of learning resources
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
          <video width="100%" loop controls={true} muted>
            <source src={relearnDemo} type="video/mp4" />
          </video>
        </Box>
      </Grid>
    </Grid>
  )
}

export default RelearnDescription
