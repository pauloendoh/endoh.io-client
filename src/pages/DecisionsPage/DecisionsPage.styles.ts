import { Box, styled as materialStyled } from "@material-ui/core";
import Flex from "components/shared/Flexboxes/Flex";
import styled from "styled-components";
import theme from "utils/consts/theme";

const S = {
  DecisionsPageRoot: materialStyled(Flex)(({ theme }) => ({
    padding: theme.spacing(2),
    height: "100%",
  })),
  ContentWrapper: styled(Box)<{ $sidebarIsOpen?: boolean }>((props) => ({
    flexGrow: 1,

    marginLeft: props.$sidebarIsOpen ? 300 : 0,
    transition: theme.transitions.create("margin", {
      easing: props.$sidebarIsOpen
        ? theme.transitions.easing.easeOut
        : theme.transitions.easing.easeIn,
      duration: props.$sidebarIsOpen
        ? theme.transitions.duration.leavingScreen
        : theme.transitions.duration.enteringScreen,
    }),
  })),
};

export default S;
