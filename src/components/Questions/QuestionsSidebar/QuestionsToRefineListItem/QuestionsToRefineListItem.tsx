import { IconButton, ListItem, ListItemText, Tooltip } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { useCallback, useMemo } from "react"
import { MdShuffle } from "react-icons/md"
import useQuestionDialogStore from "store/zustand/dialogs/useQuestionDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import getRandomIntInclusive from "utils/math/getRandomIntInclusive"

interface Props {
  type: "to-refine" | "both-types"
}

const QuestionsToRefineListItem = ({ ...props }: Props) => {
  const [allNotes] = useDocsStore((s) => [s.questions, s.pushOrReplaceQuestion])

  const [openNoteDialog] = useQuestionDialogStore((s) => [s.openDialog])

  const filteredQuestions = useMemo(() => {
    if (props.type === "to-refine") {
      return allNotes.filter((n) => n.toRefine)
    }

    return allNotes.filter(
      (n) =>
        n.toRefine &&
        n.question.trim().length > 0 &&
        n.description.trim().length === 0
    )
  }, [allNotes, props.type])

  const defaultSubmit = useDefaultSubmitQuestion()

  const openRandomQuestionToRefine = useCallback(() => {
    const randomIndex = getRandomIntInclusive(0, filteredQuestions.length - 1)
    openNoteDialog({
      initialValue: filteredQuestions[randomIndex],
      onSubmit: defaultSubmit,
    })
  }, [filteredQuestions])

  const label = useMemo(() => {
    if (props.type === "to-refine") {
      return "questions to refine"
    }

    return "both"
  }, [props.type])

  const tooltipTitle = useMemo(() => {
    if (props.type === "to-refine") {
      return "Open random question to refine"
    }

    return "Open random question to refine or unanswered"
  }, [props.type])

  return (
    <ListItem>
      <ListItemText>
        <FlexVCenter justifyContent="space-between">
          {filteredQuestions.length} {label}
          {filteredQuestions.length > 0 && (
            <Tooltip title={tooltipTitle}>
              <IconButton
                size="small"
                onClick={() => openRandomQuestionToRefine()}
              >
                <MdShuffle />
              </IconButton>
            </Tooltip>
          )}
        </FlexVCenter>
      </ListItemText>
    </ListItem>
  )
}

export default QuestionsToRefineListItem
