import { Box, Paper } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import Txt from "components/_UI/Text/Txt";
import useAvgLearningAtCurrentTime from "hooks/learning-diary/useAvgLearningAtCurrentTime";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

interface Props {
  test?: string;
}

const AvgLearningAtCurrentTime = (props: Props) => {
  const { avg, avg75, avg125, daysQty } = useAvgLearningAtCurrentTime();
  const [time, setTime] = useState(DateTime.now().toFormat("HH:mm'h'"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.now().toFormat("HH:mm"));
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Paper style={{ width: "100%" }}>
      <Box width="100%" p={2}>
        <Txt variant="h6">Average at {time}</Txt>

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

export default AvgLearningAtCurrentTime;
