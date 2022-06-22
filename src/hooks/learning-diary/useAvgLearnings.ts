import { useLearningsQuery } from "generated/graphql";
import { DateTime } from "luxon";
import { useMemo } from "react";
import buildGraphqlClient from "utils/consts/buildGraphqlClient";
import useDaysWithLearnings from "./useDaysWithLearnings";

const useAvgLearnings = () => {
  const daysWithLearnings = useDaysWithLearnings();
  const { data } = useLearningsQuery(buildGraphqlClient());
  const learnings = useMemo(() => data?.learnings || [], [data]);

  const today = DateTime.now().toISODate();

  const last10Days = useMemo(
    () =>
      daysWithLearnings
        .filter((d) => d !== today)
        .slice(Math.max(daysWithLearnings.length - 5, 0)),
    [daysWithLearnings, today]
  );

  const learningsLast10Days = useMemo(
    () => learnings.filter((l) => last10Days.includes(l.date)),
    [last10Days, learnings]
  );

  const counter = useMemo(
    () =>
      learningsLast10Days.reduce(
        (total, l) => (l.isHighlight ? total + 2 : total + 1),
        0
      ),
    [learningsLast10Days]
  );

  const avg = counter / last10Days.length;

  return {
    avg75: avg * 0.75,
    avg125: avg * 1.25,
    avg,
    daysQty: last10Days.length,
  };
};

export default useAvgLearnings;
