import { Box, Typography } from "@material-ui/core"
import React from "react"
import Flex from "../shared/Flexboxes/Flex"
import TextPrimary from "../shared/Text/TextPrimary"
import TextSecondary from "../shared/Text/TextSecondary"

const LandingPageDescription = () => {
  return (
    <Box maxWidth={350}>
      <Typography variant="h3">
        <Flex>
          {`<`}
          <TextPrimary>endoh.io</TextPrimary>
          {`/>`}
        </Flex>
      </Typography>
      <Box>
        {/* TODO: create a utils/SecondaryTxt */}
        <Typography variant="subtitle1">
          My personal<TextSecondary> web development sandbox</TextSecondary>
        </Typography>
      </Box>
    </Box>
  )
}

export default LandingPageDescription
