import { styled, Tab, Tabs } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import React from "react"
import { Link } from "react-router-dom"
import theme from "utils/consts/theme"
import { mediaQueries } from "utils/styles/mediaQueries"

type NavbarTabProps = React.ComponentProps<typeof Tab> & {
  component: typeof Link
  to: string
}

const S = {
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
}

export default S
