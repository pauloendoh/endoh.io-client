import styled from "styled-components";
import theme from "utils/consts/theme";
import Flex from "../../../_UI/Flexboxes/Flex";

const S = {
  FooterDescription: styled(Flex)``,
  Content: styled(Flex)({
    flexDirection: "column",
    marginLeft: theme.spacing(2),
    gap: theme.spacing(2),
  }),

  TextWrapper: styled(Flex)({
    flexDirection: "column",
    gap: theme.spacing(1),
  }),

  SocialIconsWrapper: styled.div``,
};

export default S;
