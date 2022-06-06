import { Box, styled } from "@material-ui/core";
import Flex from "components/_UI/Flexboxes/Flex";

const S = {
  UserPageRoot: styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
  })),
  ChartWrapper: styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
  })),
  ResourcesContentHeader: styled(Flex)(({ theme }) => ({
    marginTop: theme.spacing(3),
    justifyContent: "space-between",
  })),
  UserSuggestionsWrapper: styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(10),
    position: "fixed",
  })),
};

export default S;
