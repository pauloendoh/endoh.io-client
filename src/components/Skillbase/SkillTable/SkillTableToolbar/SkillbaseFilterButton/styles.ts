import { MenuItem } from "@mui/material"
import styled from "styled-components"

const S = {
  MenuItem: styled(MenuItem)`
    display: flex;
    align-items: center;
    gap: 4;
    padding-top: 0;
    padding-bottom: 0;
  `,
  CheckboxLabel: styled.div`
    padding: 4px 8px;
    flex-grow: 1;
    min-width: 160px;
  `,
}

export default S
