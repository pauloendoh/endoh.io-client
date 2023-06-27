import { Typography } from "@mui/material"
import React from "react"

const Span = (props: Props) => {
  return (
    <Typography component="span" {...props}>
      {props.children}
    </Typography>
  )
}

type Props = React.ComponentProps<typeof Typography>

export default Span
