import { useLearningsQuery } from "generated/graphql"
import { DateTime } from "luxon"
import { useMemo } from "react"
import buildGraphqlClient from "utils/consts/buildGraphqlClient"

const useFilteredLearnings = (selectedDate: string) => {
  const { data } = useLearningsQuery(buildGraphqlClient(), undefined, {
    keepPreviousData: true,
  })

  const filteredLearnings = useMemo(
    () =>
      data?.learnings
        .filter(
          (l) => DateTime.fromISO(l.datetime).toISODate() === selectedDate
        )
        .sort((a, b) => a.datetime.localeCompare(b.datetime)) || [],
    [data, selectedDate]
  )

  return filteredLearnings
}

export default useFilteredLearnings
