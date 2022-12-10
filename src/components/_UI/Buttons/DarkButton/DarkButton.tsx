import { LoadingButton } from "@mui/lab"

import React from "react"
import S from "./DarkButton.styles"

// PE 3/3
const DarkButton = (props: Props) => {
  return (
    <S.RootButton color="inherit" {...props}>
      {props.children}
    </S.RootButton>
  )
}

type Props = React.ComponentProps<typeof LoadingButton>

export default DarkButton
