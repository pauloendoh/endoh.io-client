import { Box, Button, Typography } from "@material-ui/core"
import TextSecondary from "components/shared/Text/TextSecondary"
import PATHS from "consts/PATHS"
import React from "react"
import { Link } from "react-router-dom"

// PE 2/3
const MonerateDescription = () => {
  return (
    <Box maxWidth={400} id="monerate-description">
      <Typography variant="h4">Monerate</Typography>
      <Typography variant="subtitle1">
        A <TextSecondary>budget tool</TextSecondary> where you can{" "}
        <TextSecondary>rate your expenses</TextSecondary>
      </Typography>

      <Box mt={2}>
        <Link to={PATHS.monerate.index} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Check /monerate
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default MonerateDescription
