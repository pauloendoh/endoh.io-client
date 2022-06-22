import useFilteredLearnings from "hooks/learning-diary/useFilteredLearnings";
import { useMemo } from "react";
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore";

interface Props {
  test?: string;
}

const LearningDayCounter = (props: Props) => {
  const { selectedDate } = useLearningDiaryStore();
  const learnings = useFilteredLearnings(selectedDate);

  const counter = useMemo(() => {
    return learnings.reduce(
      (total, learning) => (learning.isHighlight ? total + 2 : total + 1),
      0
    );
  }, [learnings]);

  return <div>{counter}</div>;
};

export default LearningDayCounter;
