import { Box, styled } from "@mui/material"
import theme from "utils/consts/theme"
import { mediaQueries } from "utils/styles/mediaQueries"

const S = {
  TemporaryUserText: styled(Box)`
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
