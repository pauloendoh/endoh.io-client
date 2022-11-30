import { styled } from "@mui/material"
import FlexHCenter from "components/_UI/Flexboxes/FlexHCenter"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"

const S = {
  DialogTitleContent: styled(FlexVCenter)(({ theme }) => ({
    justifyContent: "space-between",
  })),
  ResultsCountWrapper: styled(FlexVCenter)(({ theme }) => ({
    marginTop: theme.spacing(3),
    justifyContent: "space-between",
    maxWidth: 350,
    margin: "0 auto",
  })),
  ScorePercentageWrapper: styled(FlexHCenter)(({ theme }) => ({
    marginTop: theme.spacing(4),
  })),
}

export default S
