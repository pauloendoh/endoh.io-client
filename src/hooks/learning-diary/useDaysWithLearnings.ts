import { useLearningsQuery } from "generated/graphql";
import { useMemo } from "react";
import buildGraphqlClient from "utils/consts/buildGraphqlClient";

const useDaysWithLearnings = () => {
  const { data } = useLearningsQuery(buildGraphqlClient());

  const days = useMemo(() => {
    const learnings = data?.learnings || [];

    const days = learnings.reduce(
      (result, learning) => {
        if (!result.includes(learning.date)) return [...result, learning.date];
        return result;
      },
      [new Date().toISOString().split("T")[0]]
    );
    return days.sort();
  }, [data]);

  return days;
};

export default useDaysWithLearnings;
