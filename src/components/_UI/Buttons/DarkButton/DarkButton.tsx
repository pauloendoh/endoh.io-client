import { LoadingButton } from "@mui/lab"

import React from "react"
import S from "./DarkButton.styles"

type Props = React.ComponentProps<typeof LoadingButton>

const DarkButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ ...props }, ref) => {
    return (
      <S.RootButton color="inherit" {...props} ref={ref}>
        {props.children}
      </S.RootButton>
    )
  }
)

export default DarkButton
