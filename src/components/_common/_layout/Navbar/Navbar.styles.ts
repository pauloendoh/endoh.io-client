import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AppBar, styled, Toolbar } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import theme from "utils/consts/theme"

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

  RightButtonsWrapper: styled(FlexVCenter)({
    gap: theme.spacing(2),
  }),
}

export default S
