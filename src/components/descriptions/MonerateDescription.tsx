import { Box, Button, Grid, Typography } from "@material-ui/core"
import TextSecondary from "components/shared/Text/TextSecondary"
import PATHS from "consts/PATHS"
import React from "react"
import { Link } from "react-router-dom"
import monerateDemo from "../../static/videos/monerate-demo.mp4"
// PE 2/3
const MonerateDescription = () => {
  return (
    <Grid id="monerate-description" spacing={3} container>
      <Grid item xs={12} sm={4}>
        <Typography variant="h4">Monerate</Typography>
        <Typography variant="subtitle1">
          A <TextSecondary>budget tool</TextSecondary> where I can rate my
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
  )
}

export default MonerateDescription
