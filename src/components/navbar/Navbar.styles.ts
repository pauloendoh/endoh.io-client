import { ExtendButtonBase, Tab, TabTypeMap } from "@material-ui/core";
import FlexVCenter from "components/shared/Flexboxes/FlexVCenter";
import theme from "consts/theme";
import styled from "styled-components";

const S = {
  NavbarTab: styled(Tab)<ExtendButtonBase<TabTypeMap<{}, "div">>>`
    min-width: 100px;
    width: inherit;
    color: white;

    & svg {
      height: 16px;
      font-size: 16px;
    }
  `,

  ActionButtonsWrapper: styled(FlexVCenter)({
    gap: theme.spacing(2),
  }),
};

export default S;
