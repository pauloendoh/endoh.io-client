import { Box, Button } from "@material-ui/core";
import theme from "consts/theme";
import styled from "styled-components";
import { mediaQueries } from "utils/styles/mediaQueries";

const S = {
  RootButton: styled(Button)`
    padding-top: ${theme.spacing(1)}px;
    padding-bottom: ${theme.spacing(1)}px;
    background: ${theme.palette.grey[800]};
  `,
  TextWrapper: styled(Box)`
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
