import useFilteredLearnings from "hooks/learning-diary/useFilteredLearnings"
import { DateTime } from "luxon"
import { useMemo } from "react"

export const useTodayLearningCount = () => {
  const today = DateTime.now().toISODate()
  const learnings = useFilteredLearnings(today)

  const counter = useMemo(() => {
    return learnings.reduce(
      (total, learning) => (learning.isHighlight ? total + 2 : total + 1),
      0
    )
  }, [learnings])

  return counter
}
