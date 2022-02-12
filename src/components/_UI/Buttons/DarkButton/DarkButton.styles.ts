import { Button } from "@material-ui/core";
import styled from "styled-components";

const S = {
  RootButton: styled(Button)`
    background: ${({ theme }) => theme.palette.grey[800]};
  `,
};

export default S;
