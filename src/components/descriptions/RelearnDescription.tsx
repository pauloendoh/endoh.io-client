import { Box, Button, Typography } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import PATHS from "../../consts/PATHS"
import TextSecondary from "../shared/Text/TextSecondary"

const RelearnDescription = () => {
  return (
    <Box maxWidth={400} id="relearn-description">
      <Typography variant="h4">Relearn</Typography>
      <Typography variant="subtitle1">
        <TextSecondary>Organize and review </TextSecondary>your online studies
        with this <TextSecondary>TODO list</TextSecondary> (with link preview).
      </Typography>

      <Box mt={2}>
        <Link to={PATHS.relearn.index} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Check /relearn
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default RelearnDescription
