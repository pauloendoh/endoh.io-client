import { Box, Button, styled } from "@mui/material"
import theme from "utils/consts/theme"
import { mediaQueries } from "utils/styles/mediaQueries"

const S = {
  RootButton: styled(Button)`
    padding-top: ${theme.spacing(1)}; // PE 2/3 - use ThemeProps?
    padding-bottom: ${theme.spacing(1)};
    background: ${theme.palette.grey[800]};
    color: ${theme.palette.grey[100]};
  `,
  TextWrapper: styled(Box)`
    ${mediaQueries.isBiggerThanSm} {
      width: 180px;
      margin-left: ${theme.spacing(2)};
    }
    ${mediaQueries.isResponsiveSm} {
      width: 160px;
      margin-left: 0;
    }
  `,
}

export default S
