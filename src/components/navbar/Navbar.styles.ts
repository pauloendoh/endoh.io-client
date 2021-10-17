import { ExtendButtonBase, Tab, TabTypeMap } from "@material-ui/core";
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
};

export default S;
