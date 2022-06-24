import { useMemo } from "react";
import useLearningsLast10Days from "./useLearningsLast10Days";

const useAvgLearnings = () => {
  const { learnings, last10Days } = useLearningsLast10Days();

  const counter = useMemo(
    () =>
      learnings.reduce(
        (total, l) => (l.isHighlight ? total + 2 : total + 1),
        0
      ),
    [learnings]
  );

  const avg = counter / last10Days.length;

  return {
    avg75: Math.floor(avg * 0.75),
    avg125: Math.floor(avg * 1.25),
    avg: Math.floor(avg),
    daysQty: last10Days.length,
  };
};

export default useAvgLearnings;
