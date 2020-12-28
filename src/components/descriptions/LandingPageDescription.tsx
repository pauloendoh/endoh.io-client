import { Box, Typography } from "@material-ui/core"
import FlexHCenter from "components/shared/Flexboxes/FlexHCenter"
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
      <FlexHCenter>
        {/* TODO: create a utils/SecondaryTxt */}
        <Typography variant="subtitle1">
          A suite of <TextSecondary>self-awareness</TextSecondary> tools
        </Typography>
      </FlexHCenter>
    </Box>
  )
}

export default LandingPageDescription
