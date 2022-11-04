import { faFunnelDollar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import pageUrls from "../../../utils/url/urls/pageUrls"
import monerateDemo from "../../static/videos/monerate-demo.mp4"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import TextSecondary from "../../_UI/Text/TextSecondary"
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
          <Link to={pageUrls.monerate.index} style={{ textDecoration: "none" }}>
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
