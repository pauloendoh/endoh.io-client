import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Tab, Tabs, Toolbar } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "utils/consts/theme";
import { mediaQueries } from "utils/styles/mediaQueries";

type NavbarTabProps = React.ComponentProps<typeof Tab> & {
  component: typeof Link;
  to: string;
};

const S = {
  AppBarRoot: styled(AppBar)`
    flex-grow: 1;
    background: #202020;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  `,
  NavbarToolbar: styled(Toolbar)`
    min-height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  FireIcon: styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.palette.secondary.main};
    height: 24px !important;
    width: 18px !important;
  `,

  NavbarTabs: styled(Tabs)`
    position: relative;
    z-index: 1202;
  `,

  NavbarTab: styled(Tab)<NavbarTabProps>`
    width: inherit;
    color: white;

    & svg {
      height: 16px;
      font-size: 16px;
    }

    ${mediaQueries.isBiggerThan(950)} {
      min-width: 100px;
    }

    ${mediaQueries.isSmallerThan(950)} {
      min-width: auto;
    }
  `,

  RightButtonsWrapper: styled(FlexVCenter)({
    gap: theme.spacing(2),
  }),
};

export default S;
