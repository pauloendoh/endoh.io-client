import { Box, Paper } from "@material-ui/core";
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

        <Txt style={{ color: "red" }}>{avg75} (-25%)</Txt>
        <Txt style={{ color: "yellow" }}>{avg}</Txt>
        <Txt style={{ color: "green" }}>{avg125} (+25%)</Txt>
      </Box>
    </Paper>
  );
};

export default AvgLearning;
