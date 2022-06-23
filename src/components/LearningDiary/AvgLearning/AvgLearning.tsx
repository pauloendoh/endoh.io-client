import { Box, Paper } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import Txt from "components/_UI/Text/Txt";
import useAvgLearnings from "hooks/learning-diary/useAvgLearnings";

interface Props {
  test?: string;
}

const AvgLearning = (props: Props) => {
  const { avg, avg75, avg125, daysQty } = useAvgLearnings();
  return (
    <Paper style={{ width: "100%" }}>
      <Box width="100%" p={2}>
        <Txt variant="h6">Average Learning</Txt>

        <Txt style={{ color: "yellow" }}>{avg}</Txt>
        <Txt style={{ color: "green" }}>{avg125} (+25%)</Txt>

        <FlexVCenter justifyContent="flex-end" mt={3}>
          <Txt style={{ fontStyle: "italic" }}>
            Last {daysQty} {daysQty > 1 ? "days" : "day"}
          </Txt>
        </FlexVCenter>
      </Box>
    </Paper>
  );
};

export default AvgLearning;
