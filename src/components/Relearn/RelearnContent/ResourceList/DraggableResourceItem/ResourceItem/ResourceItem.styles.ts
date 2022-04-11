import { Box, styled } from "@material-ui/core";
import Flex from "components/_UI/Flexboxes/Flex";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";

// PE 2/3
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
  IconsWrapper: styled(FlexVCenter)(({ theme }) => ({
    gap: theme.spacing(2),
  })),
  DueDateWrapper: styled(FlexVCenter)(({ theme }) => ({})),
  CompletedWrapper: styled(FlexVCenter)(({ theme }) => ({})),
  DurationWrapper: styled(FlexVCenter)(({ theme }) => ({})),
  PublicReviewWrapper: styled(Flex)(({ theme }) => ({
    flexDirection: "column",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1),
  })),
  PrivateNoteWrapper: styled(Flex)(({ theme }) => ({
    flexDirection: "column",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1),
  })),
};

export default S;
