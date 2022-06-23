import { useLearningsQuery } from "generated/graphql";
import { DateTime } from "luxon";
import { useMemo } from "react";
import buildGraphqlClient from "utils/consts/buildGraphqlClient";
import toISODate from "utils/date/toISODate";
import useDaysWithLearnings from "./useDaysWithLearnings";

const useLearningsLast10Days = () => {
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
    () => learnings.filter((l) => last10Days.includes(toISODate(l.datetime))),
    [last10Days, learnings]
  );

  return { learnings: learningsLast10Days, last10Days };
};

export default useLearningsLast10Days;
