import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import useAvgLearningPerHourQuery from "hooks/react-query/learning-diary/useAvgLearningPerHourQuery"
import useLearningsPerDayQuery from "hooks/react-query/learning-diary/useLearningsPerDayQuery"
import { useMemo, useState } from "react"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"

interface Props {
  open: boolean
  onClose: () => void
}

const aria = "learnings-per-day-dialog"

const LearningsPerDayDialog = (props: Props) => {
  const { data } = useLearningsPerDayQuery()
  const [showingAll, setShowingAll] = useState(false)

  const learnings = useMemo(() => {
    if (showingAll) return data
    return data?.slice(0, 7) || []
  }, [showingAll, data])

  const { selectedDate, topPercentage } = useLearningDiaryStore()

  const { data: avgLearningPerHours } =
    useAvgLearningPerHourQuery(topPercentage)

  const currentHourLearning = useMemo(() => {
    if (!avgLearningPerHours) return null
    return avgLearningPerHours.find((avgLearning) => avgLearning.hour === 24)
  }, [avgLearningPerHours])

  const getColor = (learningCount: number) => {
    if (!currentHourLearning) return "white"
    if (learningCount >= currentHourLearning.topPercentDaysLearningCount)
      return "green"
    if (learningCount >= currentHourLearning.avgCount) return "white"
    return "red"
  }

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby={aria}
    >
      <DialogTitle>Learnings Per Day</DialogTitle>
      <DialogContent>
        {learnings?.map((d) => (
          <FlexVCenter key={d.date}>
            <Typography width={100}>{d.date.slice(0, 10)}</Typography>
            <Typography
              style={{
                color: getColor(d.learningCount),
              }}
            >
              {" "}
              {d.learningCount}
            </Typography>
          </FlexVCenter>
        ))}
      </DialogContent>
    </Dialog>
  )
}

export default LearningsPerDayDialog
