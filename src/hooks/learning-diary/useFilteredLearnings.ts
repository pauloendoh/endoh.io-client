import { useLearningsQuery } from "generated/graphql";
import { useMemo } from "react";
import buildGraphqlClient from "utils/consts/buildGraphqlClient";

const useFilteredLearnings = (selectedDate: string) => {
  const { data } = useLearningsQuery(buildGraphqlClient());

  const filteredLearnings = useMemo(
    () =>
      data?.learnings
        .filter((l) => l.date === selectedDate)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt)) || [],
    [data, selectedDate]
  );

  return filteredLearnings;
};

export default useFilteredLearnings;
