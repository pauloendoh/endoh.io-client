import { DateTime } from "luxon";
import { useMemo } from "react";
import useLearningsLast10Days from "./useLearningsLast10Days";

const useAvgLearningAtCurrentTime = () => {
  const { learnings, last10Days } = useLearningsLast10Days();
  const now = DateTime.now();

  const filteredLearnings = useMemo(
    () =>
      learnings.filter((l) => {
        const datetime = DateTime.fromISO(l.datetime);
        if (datetime.hour > now.hour) return false;
        if (datetime.minute > now.minute) return false;
        return true;
      }),
    [learnings, now]
  );

  const counter = useMemo(
    () =>
      filteredLearnings.reduce(
        (total, l) => (l.isHighlight ? total + 2 : total + 1),
        0
      ),
    [filteredLearnings]
  );

  const avg = counter / last10Days.length;

  return {
    avg75: avg * 0.75,
    avg125: avg * 1.25,
    avg,
    daysQty: last10Days.length,
  };
};

export default useAvgLearningAtCurrentTime;
