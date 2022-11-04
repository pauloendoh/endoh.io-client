import { Typography } from "@mui/material"
import React from "react"

const TextSecondary = (props: Props) => {
  return (
    <Typography variant="inherit" color="secondary" {...props}>
      {props.children}
    </Typography>
  )
}

type Props = React.ComponentProps<typeof Typography>

export default TextSecondary
