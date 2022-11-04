import { Box } from "@mui/material"
import React from "react"

const FlexCol = (props: Props) => {
  return (
    <Box display="flex" flexDirection="column" {...props}>
      {props.children}
    </Box>
  )
}

type Props = React.ComponentProps<typeof Box>

export default FlexCol
