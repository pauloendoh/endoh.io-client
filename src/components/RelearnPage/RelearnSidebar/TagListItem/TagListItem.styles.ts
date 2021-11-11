import { styled } from "@material-ui/core";
import Flex from "components/_UI/Flexboxes/Flex";
import FlexHCenter from "components/_UI/Flexboxes/FlexHCenter";

const S = {
  IconTitleWrapper: styled(Flex)(({ theme }) => ({
    gap: theme.spacing(1),
  })),
  ResourcesCountWrapper: styled(FlexHCenter)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
    width: 24,
  })),
};

export default S;
