import { Box } from "@material-ui/core";
import Txt from "components/_UI/Text/Txt";
import useCloseColorAvgLearningAtCurrentTime from "hooks/learning-diary/useCloseColorAvgLearningAtCurrentTime";
import useCloserColorAvgLearning from "hooks/learning-diary/useCloserColorAvgLearning";
import useFilteredLearnings from "hooks/learning-diary/useFilteredLearnings";
import { DateTime } from "luxon";
import { useMemo } from "react";
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore";

interface Props {
  test?: string;
}

const LearningDayCounter = (props: Props) => {
  const { selectedDate } = useLearningDiaryStore();
  const learnings = useFilteredLearnings(selectedDate);

  const isToday = useMemo(() => selectedDate === DateTime.now().toISODate(), [
    selectedDate,
  ]);

  const counter = useMemo(() => {
    return learnings.reduce(
      (total, learning) => (learning.isHighlight ? total + 2 : total + 1),
      0
    );
  }, [learnings]);

  const colorDay = useCloserColorAvgLearning(counter);
  const colorCurrentTime = useCloseColorAvgLearningAtCurrentTime(counter);

  return (
    <Box mr={2}>
      {counter > 0 && (
        <Txt
          variant="h5"
          style={{ color: isToday ? colorCurrentTime : colorDay }}
        >
          {counter} learnings {isToday && "today"}
        </Txt>
      )}
    </Box>
  );
};

export default LearningDayCounter;
