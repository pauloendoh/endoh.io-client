import { Box, styled } from "@material-ui/core";
import Flex from "components/_UI/Flexboxes/Flex";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";

const S = {
  ResourceItemRoot: styled(Flex)({}),
  Content: styled(Box)(({ theme }) => ({
    flexGrow: 1,
  })),
  TitleLinkMoreWrapper: styled(Flex)({
    justifyContent: "space-between",
    minHeight: 32,
  }),
  TitleLinkWrapper: styled(Box)({}),
  IconsRow: styled(FlexVCenter)({
    justifyContent: "space-between",
  }),
  IconsWrapper: styled(FlexVCenter)({}),
  DueDateWrapper: styled(FlexVCenter)(({ theme }) => ({
    marginRight: theme.spacing(2),
  })),
  CompletedWrapper: styled(FlexVCenter)(({ theme }) => ({
    marginRight: theme.spacing(2),
  })),
  DurationWrapper: styled(FlexVCenter)(({ theme }) => ({
    marginRight: theme.spacing(2),
  })),
  PublicReviewWrapper: styled(Flex)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1),
  })),
  PrivateNoteWrapper: styled(Flex)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1),
  })),
};

export default S;
