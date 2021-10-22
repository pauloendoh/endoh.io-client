import { styled } from "@material-ui/core";
import FlexHCenter from "components/shared/Flexboxes/FlexHCenter";
import FlexVCenter from "components/shared/Flexboxes/FlexVCenter";

const S = {
  DialogTitleContent: styled(FlexVCenter)(({ theme }) => ({
    justifyContent: "space-between",
  })),
  ResultsCountWrapper: styled(FlexVCenter)(({ theme }) => ({
    marginTop: theme.spacing(3),
    justifyContent: "space-between",
    width: 350,
    margin: "0 auto",
  })),
  ScorePercentageWrapper: styled(FlexHCenter)(({ theme }) => ({
    marginTop: theme.spacing(4),
  })),
};

export default S;
