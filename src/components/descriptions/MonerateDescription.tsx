import { Box, Typography } from "@material-ui/core"
import TextSecondary from "components/shared/Text/TextSecondary"
import React from "react"

const MonerateDescription = () => {
  return (
    <Box maxWidth={400} id="monerate-description">
      <Typography variant="h4">Monerate</Typography>
      <Typography variant="subtitle1">
        A <TextSecondary>budget tool</TextSecondary> where you can{" "}
        <TextSecondary>rate your expenses</TextSecondary>
      </Typography>
    </Box>
  )
}

export default MonerateDescription
