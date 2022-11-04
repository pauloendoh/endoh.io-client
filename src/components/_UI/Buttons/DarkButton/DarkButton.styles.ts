import { Button } from "@mui/material"
import styled from "styled-components"

const S = {
  RootButton: styled(Button)`
    background: ${({ theme }) => theme.palette.grey[800]};
  `,
}

export default S
