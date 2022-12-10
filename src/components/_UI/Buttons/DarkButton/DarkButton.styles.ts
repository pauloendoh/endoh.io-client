import { LoadingButton } from "@mui/lab"
import { styled } from "@mui/material"
const S = {
  RootButton: styled(LoadingButton)`
    background: ${({ theme }) => theme.palette.grey[800]};
  `,
}

export default S
