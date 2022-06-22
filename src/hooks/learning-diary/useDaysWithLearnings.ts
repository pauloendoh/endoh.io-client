import { useLearningsQuery } from "generated/graphql";
import { DateTime } from "luxon";
import { useMemo } from "react";
import buildGraphqlClient from "utils/consts/buildGraphqlClient";

const useDaysWithLearnings = () => {
  const { data } = useLearningsQuery(buildGraphqlClient());

  const days = useMemo(() => {
    const learnings = data?.learnings || [];

    const days = learnings.reduce(
      (result, learning) => {
        const isoDate = DateTime.fromISO(learning.datetime).toISODate();
        if (!result.includes(isoDate)) return [...result, isoDate];
        return result;
      },
      [DateTime.now().toISODate()]
    );
    return days.sort();
  }, [data]);

  return days;
};

export default useDaysWithLearnings;
