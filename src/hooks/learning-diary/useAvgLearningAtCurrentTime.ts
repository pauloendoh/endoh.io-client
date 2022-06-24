import { DateTime } from "luxon";
import { useMemo } from "react";
import useLearningsLast10Days from "./useLearningsLast10Days";

const useAvgLearningAtCurrentTime = () => {
  const { learnings, last10Days } = useLearningsLast10Days();
  const now = DateTime.now();
  const nowMinutes = now.hour * 60 + now.minute;

  const filteredLearnings = useMemo(
    () =>
      learnings.filter((l) => {
        const datetime = DateTime.fromISO(l.datetime);

        const thenMinutes = datetime.hour * 60 + datetime.minute;
        return thenMinutes < nowMinutes;
      }),
    [learnings, nowMinutes]
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
    avg75: Math.floor(avg * 0.75),
    avg125: Math.floor(avg * 1.25),
    avg: Math.floor(avg),
    daysQty: last10Days.length,
  };
};

export default useAvgLearningAtCurrentTime;
