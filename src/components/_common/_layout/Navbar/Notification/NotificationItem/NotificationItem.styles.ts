import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItem } from "@material-ui/core";
import styled from "styled-components";

const S = {
  MenuItem: styled(MenuItem)(({ theme }) => ({
    whiteSpace: "normal",
    width: 450,
    paddingLeft: 8,
  })),
  Dot: styled(FontAwesomeIcon)(({ theme }) => ({
    fontSize: 8,
    color: theme.palette.primary.main,
  })),
};

export default S;
