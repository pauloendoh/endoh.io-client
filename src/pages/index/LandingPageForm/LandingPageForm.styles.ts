import { Box } from "@material-ui/core";
import styled from "styled-components";
import theme from "utils/consts/theme";
import { mediaQueries } from "utils/styles/mediaQueries";

const S = {
  TemporaryUserText: styled(Box)`
    ${mediaQueries.isBiggerThanSm} {
      width: 180px;
      margin-left: ${theme.spacing(2)}px;
    }
    ${mediaQueries.isResponsiveSm} {
      width: 160px;
      margin-left: 0;
    }
  `,
};

export default S;
