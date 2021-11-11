import styled from "styled-components";
import theme from "utils/consts/theme";
import FlexVCenter from "../Flexboxes/FlexVCenter";

const S = {
  ButtonsWrapper: styled(FlexVCenter)`
    justify-content: flex-end;
    gap: ${theme.spacing(1)};
  `,
};

export default S;
